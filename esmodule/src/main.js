import {createApp,h} from 'vue';
// import app from './app.vue'
const app={
  render(){
    return h('div',null,[h('div',null,String('123'))]);
  }
}
createApp(app).mount('#app')