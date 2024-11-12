import App from '@/hooks'
let comps = {}
const modules = import.meta.glob('./*.vue', { eager: true })
for (const path in modules) {
  let cname = modules[path].default.name || modules[path].default.__name
  comps[cname] = modules[path].default
  App.component(cname, modules[path].default)
}
console.log('comps:::', comps)
export default comps
