// Element-UI弹出提示框太多的解决办法封装
import { Message } from 'element-ui'
let messageInstance = null
const resetMessage = (options) => {
  if (messageInstance) { messageInstance.close() }
  messageInstance = Message(options)
};
['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = { message: options }
    } options.type = type
    return resetMessage(options)
  }
})
export const message = resetMessage

// main.js中引入以下
// import { message } from './api/resetMessage'
// Vue.use(ElementUI)
// Vue.prototype.$message = message
