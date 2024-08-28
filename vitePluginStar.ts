
import { PluginOption, ViteDevServer } from 'vite'
import colors from 'picocolors'

export default function vitePluginVueMonitor(): PluginOption {
  return {
    name: 'ts-start',
    apply: 'serve',
    enforce: 'pre',
    configureServer(server: ViteDevServer) {
      const print = server.printUrls
      server.printUrls = () => {
        const network = server.resolvedUrls?.network[0]
        const local = server.resolvedUrls?.local[0]
        if (!network && !local) {
          console.log(colors.red('获取IP地址失败,请检查vite.config.ts文件中server.host配置是否正确!\n'))
        } else {
          console.info(colors.green([

            "                   _ooOoo_",
            "                  o8888888o",
            "                  88\" . \"88",
            "                  (| -_- |)",
            "                  O\\  =  /O",
            "               ____/`---'\\____",
            "             .'  \\\\|     |//  `.",
            "            /  \\\\|||  :  |||//  \\",
            "           /  _||||| -:- |||||-  \\",
            "           |   | \\\\\\  -  /// |   |",
            "           | \\_|  ''\\---/''  |   |",
            "           \\  .-\\__  `-`  ___/-. /",
            "         ___`. .'  /--.--\\  `. . __",
            "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
            "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
            "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
            "======`-.____`-.___\\_____/___.-`____.-'======",
            "                   `=---='",
            "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
            "         佛祖保佑       减少BUG"
          ].join('\n')))
          print()
        }
      }
    }
  }
}