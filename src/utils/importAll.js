// 自动导入views目录下的所有Vue组件
// const views = importAll(import.meta.glob('@/views/*.vue'))
export function importAll(views) {
  let arr = []
  Object.keys(views).forEach(fileName => {
    console.log('fileName', fileName?.split('/')?.pop().replace('.vue', ''))
    const name = fileName?.split('/')?.pop().replace('.vue', '')
    arr.push({
      path: `/${name.toLowerCase()}`,
      component: () => views[fileName](),
      meta: {
        title: name
      }
    })
  })
  return arr
}