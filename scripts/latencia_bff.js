process.env.JWT_SECRET='secreto-de-prueba-tesis';
process.env.IA_PANEL_URL='http://127.0.0.1:5001/ia-panel';
const path=require('path').resolve(__dirname,'../backend')+'/';
const express=require(path+'node_modules/express');
const axios=require(path+'node_modules/axios');
const jwt=require(path+'node_modules/jsonwebtoken');
const routes=require(path+'src/routes/iaPanelRoutes');
const app=express(); app.use(express.json()); app.use('/api/ia-panel',routes);
const N=200, body={num_roles:1,is_admin:0,activity_score:10};
const tok=jwt.sign({id:1,roles:['admin']},process.env.JWT_SECRET,{expiresIn:'15m'});
function stats(a){a.sort((x,y)=>x-y);const m=a.reduce((s,x)=>s+x,0)/a.length;return{promedio:+m.toFixed(1),mediana:+a[Math.floor(a.length/2)].toFixed(1),p95:+a[Math.floor(a.length*0.95)].toFixed(1),max:+a[a.length-1].toFixed(1)};}
async function medir(url,headers){const t=[];for(let i=0;i<10;i++)await axios.post(url,body,{headers});
 for(let i=0;i<N;i++){const s=process.hrtime.bigint();await axios.post(url,body,{headers});t.push(Number(process.hrtime.bigint()-s)/1e6);}return stats(t);}
const srv=app.listen(3999,async()=>{
 const directo=await medir('http://127.0.0.1:5001/ia-panel',{});
 const bff=await medir('http://127.0.0.1:3999/api/ia-panel',{Authorization:'Bearer '+tok});
 console.log(JSON.stringify({N,directo,bff},null,1)); srv.close();});
