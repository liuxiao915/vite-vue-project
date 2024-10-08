export default {
  namespaced: true,
  state: () => ({
    // routers: [
    //   {name: 'toBeReleased', path: '', hidden: false, meta: {title: '待发布', value: 0, showValue: true, icon: 'daifabu', code: 'dhl-dafb'}, component: () => import('@/views/system/toBeReleased.vue')},
    //   {name: 'unprocessed', path: 'unprocessed', hidden: false, meta: {title: '待办', value: 0, showValue: true, icon: 'daiban', code: 'dhl-db01'}, component: () => import('@/views/system/unprocessed.vue')},
    //   {name: 'processing', path: 'processing', hidden: false, meta: {title: '办理中', value: 0, icon: 'banlizhong', code: 'dhl-clz01'}, component: () => import('@/views/system/processing.vue')},
    //   {name: 'completed', path: 'completed', hidden: false, meta: {title: '已办结', value: 0, icon: 'yibanjie', code: 'dhl-ybj01'}, component: () => import('@/views/system/completed.vue')},
    //   {name: 'totalQuery', path: 'totalQuery', hidden: false, meta: {title: '综合查询', value: 0, icon: 'chaxun', code: 'dhl-zhcx'}, component: () => import('@/views/system/totalQuery.vue')},
    // ],
    permissionList: [
      'dhl-dafb', // 待发布
      'dhl-db01', // 待办
      'dhl-clz01', // 处理中
      'dhl-ybj01', // 已办结
      'dhl-zhcx', // 综合查询

      'sxcl-xzqywqdx', // 新增企业外迁动向
      'sxcl-fs01', // 发送
      'sxcl-scfj', // 上传附件
      'sxcl-ch01', // 撤回
      'sxcl-cxfb', // 重新发布
      'sxcl-sc01', // 删除
      'sxcl-xg01', // 修改
      'sxcl-qs01', // 签收
      'sxcl-db01', // 督办

      'sxcx-cx01', // 查询
      'sxcx-cz01', // 重置
      'sxcx-xq01', // 详情
      'sxcx-qyxq', // 企业详情
      'sxcx-clxq', // 处理详情
      'sxcx-lsjl', // 历史记录
      'sxcx-xzfj' // 下载附件
    ]
  }),
  mutations: {
    storeRouters: (state, payload) => {
      state.routers = payload
    },
    storePermissions: (state, payload) => {
      state.permissionList = payload
    }
  }
}