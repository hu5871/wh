
const Koa=require('koa');
const fs =require('fs')
const path=require('path')
const app=new Koa();
app.use(async ctx=>{
  const {url,query} =ctx.request;
  console.log('url',url,'query',query.type)

  if(url === '/'){
    ctx.type='text/html';
    let content=fs.readFileSync('./index.html','utf-8');
    content=content.replace("<script",`<script>
    window.process={ env:{ NODE_ENV:'dev'}}
    </script>
    <script`);
    ctx.body=content
  }else if(url.endsWith('.js')){
    const p =path.resolve(__dirname,url.slice(1));
    ctx.type='application/javascript';
    let content=fs.readFileSync(p,'utf-8');
    content=rewriteImport(content)
    ctx.body=content
  }else if(url.startsWith('/web_modules/')){
    // 第三方库对应的es入口
    const prefix=path.resolve(__dirname,'node_modules',url.replace('/web_modules/',''))
    const modules=require(prefix+'/package.json').module;
    const p =path.resolve(prefix,modules);
    const ret=fs.readFileSync(p,'utf-8');
    ctx.type='application/javascript';
    ctx.body=rewriteImport(ret)
  }
})
app.listen(3000,()=>{
  console.log('vite start at 3000')
})

function rewriteImport(content) {
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
  console.log("s", s0, s1);
  // . ../ /开头的，都是相对路径
  if (s1[0] !== "." && s1[1] !== "/") {
  return `from '/web_modules/${s1}'`;
   } else {
  return s0;
   }
   });
  }