#使用es module实现一个简易的vite处理vue单文件组件

#主要逻辑indx.js 启动一个服务,import 会向后端发起一个get请求 但有时候from 'xxx' 比如 'vue' 这不是一个正确的路径请求会报错:Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".

#不是一个路径怎么实现请求》 给它一个路径 //在snowpack中是在请求的时候replace替换拼接一个路径 /web_modules/xxx

#请求通过 && 报404 

#报不报错无所谓 》只要通过就可以为所欲为了 在请求拦截 里处理不同的类型的文件 

#最后把路径打向正确的node_modules对应的包》》》》》》》》一般正确的esm模块都可以通过packjson拿到对应的入口，但npm生态下的依赖还不支持，所以vite在初次启动项目时进行预打包，完成 CJS / UMD 转化为 ESM 的操作》》》如果packjson中的依赖发生了变化，dev的时候重新预打包并过滤出已经生成ESM的模块，降低打包成本