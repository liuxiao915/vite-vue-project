import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vitePluginVueMonitor from './vitePluginStar'
// import viteCompression from 'vite-plugin-compression'
const srcPath = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // index.html文件所在位置
  root: './', // js导入的资源路径，src
  envPrefix: 'VITE_', // 环境变量前缀设置
  plugins: [
    vue(),
    vitePluginVueMonitor(),
    AutoImport({
      imports: ["vue", "vue-router", "vuex", "@vueuse/core"], // 自动导入 Vue 相关函数，如：ref, reactive 等
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(srcPath, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(srcPath, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')], // 指定需要缓存的图标文件夹
      symbolId: 'icon-[name]', // 指定symbolId格式
    }),
    //在plugins配置数组里添加gzip插件
    // viteCompression({
    //   verbose: true, // 默认即可
    //   disable: false, // 开启压缩(不禁用)，默认即可
    //   deleteOriginFile: true, // 删除源文件
    //   threshold: 5120, // 压缩前最小文件大小
    //   algorithm: 'gzip', // 压缩算法
    //   ext: '.gz' // 文件类型
    // })
  ],
  resolve: {
    alias: {
      '@': srcPath
    }
  },
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: "always", // 可以不写calc()，直接进行计算：width: 40 / 20px; === width: 2px;
        // 定义全局css变量
        globalVars: {
          blue: "#1177EE", // 用法：color: @blue;
          green: "#11BB77",
          red: "#FA5555",
        }
      }
    }
  },
  server: {
    open: true,
    host: '0.0.0.0',
    // 代理
    proxy: {
      '/api-proxy': {
        target: 'http://10.224.156.74:8080',
        changeOrigin: true // 允许跨域
      }
    }
  },
  build: {
    outDir: 'dist',
    // 启动 / 禁用 CSS 代码拆分
    cssCodeSplit: true,
    // 构建后是否生成 soutrce map 文件
    sourcemap: false,
    // Vite 会在构建时清空outDir指定的目录
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // 多页面配置
        // admin: path.resolve(__dirname, 'src/admin/index.html'),
        // page: path.resolve(__dirname, 'src/page/index.html'),
        index: path.resolve(__dirname, './index.html'),
      },
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js', // 根据格式命名输出文件
        chunkFileNames: `assets/js/[name]-[hash].js`, // 非入口文件的chunk文件名称
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',// 静态资源文件名称
        // 打包后单个静态资源文件太大，需要分解块，将大块分解成更小的块
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    // 提高超大静态资源警告门槛
    chunkSizeWarningLimit: 1000,
    minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',使用terser，terserOptions才有效果
    terserOptions: {
      compress: {
        // 生产环境时移除console.log()
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
