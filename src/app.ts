import { createApp } from 'vue'
import { createUI } from 'taro-ui-vue3'
import { Panel }  from './components/index'
// 引用全部组件样式
import 'taro-ui-vue3/dist/style/index.scss'
import './app.scss'
const App = createApp({
  onShow() { },
})

// 引用全部组件
const tuv3 = createUI()
App.use(tuv3)
App.component(Panel.name, Panel)

export default App
