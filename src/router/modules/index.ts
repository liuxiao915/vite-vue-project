import { functionalRouter } from './functional'
import { reportRouter } from './report'
import { systemManageRouter } from './systemManage'
import { systemToolsRouter } from './systemTools'
export const menuRouter = [
  ...functionalRouter,
  ...reportRouter,
  ...systemManageRouter,
  ...systemToolsRouter
]