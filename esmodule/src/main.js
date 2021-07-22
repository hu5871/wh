import {createApp,h} from 'vue';
import app from './app.vue'
import './index.css'
// const app={
//   render(){
//     return h('div',null,[h('div',null,String('123'))]);
//   }
// }
createApp(app).mount('#app')