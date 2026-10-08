
var K='proactif-advanced-v1', SESSION='proactif-session-v1', now=new Date(), activeView='dash', selected='c1';
function iso(d){return new Date(d).toISOString().slice(0,10)}
function add(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return iso(x)}
function fd(s){if(!s)return'—';var a=s.split('-');return a[2]+'/'+a[1]+'/'+a[0]}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function money(n){return new Intl.NumberFormat('es-PY',{style:'currency',currency:'PYG',maximumFractionDigits:0}).format(Number(n||0))}
function stamp(){var d=new Date();return d.toISOString()}
function hm(s){if(!s)return'—';var d=new Date(s);return d.toLocaleTimeString('es-PY',{hour:'2-digit',minute:'2-digit'})}
function fdt(s){if(!s)return'—';var d=new Date(s);return d.toLocaleDateString('es-PY')+' '+d.toLocaleTimeString('es-PY',{hour:'2-digit',minute:'2-digit'})}
function dayDiff(s){if(!s)return 999;return Math.floor((new Date(iso(now))-new Date(s))/86400000)}
function monthKey(s){var d=new Date(s);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function currentMonth(){return monthKey(now)}
function greeting(){var h=new Date().getHours();return h<12?'Buenos días':h<19?'Buenas tardes':'Buenas noches'}

function seed(){return{
 users:[
  {id:'admin',username:'admin',password:'999',role:'admin',name:'Administrador PROACTIF',active:true},
  {id:'u1',username:'usuario1',password:'111',role:'seller',name:'María López Demo',target:60000000,active:true},
  {id:'u2',username:'usuario2',password:'222',role:'seller',name:'Juan Pérez Demo',target:50000000,active:true},
  {id:'d1',username:'conductor1',password:'333',role:'driver',name:'Carlos Demo',active:true}
 ],
 products:[
  {id:'p1',n:'Papel higiénico max pureza 300mts',b:'Proactif',c:'Pape-319',cat:'Papeles',stock:1850},
  {id:'p2',n:'Papel toalla intercalada',b:'Proactif',c:'Pape-207',cat:'Papeles',stock:820},
  {id:'p3',n:'Dispensador ADX 700ml',b:'Gojo',c:'Mano-130',cat:'Dispensadores',stock:35},
  {id:'p4',n:'Alcohol en espuma ADX',b:'Purell',c:'Mano-127',cat:'Higiene de manos',stock:120},
  {id:'p5',n:'Mild foam FMX',b:'Gojo',c:'Mano-140',cat:'Higiene de manos',stock:74},
  {id:'p6',n:'Dispensador de toalla intercalada',b:'Nobre',c:'Pro-823',cat:'Dispensadores',stock:18},
  {id:'p7',n:'Clean By Peroxy',b:'Spartan',c:'Qui-0155',cat:'Químicos',stock:48},
  {id:'p8',n:'Waterless',b:'Spartan',c:'Qui-0091',cat:'Químicos',stock:22},
  {id:'p9',n:'Supro Max',b:'Gojo',c:'Mano-036',cat:'Higiene de manos',stock:12},
  {id:'p10',n:'Dispensador Dropy jabón espuma',b:'Fortcom',c:'Pro-3030',cat:'Dispensadores',stock:9}
 ],
 clients:[
  {id:'c1',n:'Hotel Demo',ruc:'80000001-1',sector:'Hotelería',contact:'María Demo',phone:'0981000001',email:'compras@hoteldemo.local',seller:'u1',notes:'Cuenta hotelera con reposición mensual de papeles e higiene de manos.',sites:[
    {id:'s1',n:'Hotel Centro',address:'Asunción · dirección demo',m:[{p:'p1',q:24,f:30,last:add(now,-26)},{p:'p2',q:18,f:30,last:add(now,-26)},{p:'p5',q:8,f:45,last:add(now,-41)}]},
    {id:'s2',n:'Hotel Aeropuerto',address:'Luque · dirección demo',m:[{p:'p1',q:30,f:30,last:add(now,-15)},{p:'p4',q:10,f:30,last:add(now,-15)}]}
  ]},
  {id:'c2',n:'Clínica Demo',ruc:'80000002-2',sector:'Salud',contact:'Ana Demo',phone:'0981000002',email:'compras@clinicademo.local',seller:'u1',notes:'Cuenta de salud con alto consumo de higiene de manos y papeles.',sites:[
    {id:'s3',n:'Sede Principal',address:'Asunción · dirección demo',m:[{p:'p2',q:28,f:30,last:add(now,-29)},{p:'p4',q:20,f:30,last:add(now,-29)},{p:'p7',q:6,f:30,last:add(now,-29)}]}
  ]},
  {id:'c5',n:'Cadena Gastronómica Demo',ruc:'80000005-5',sector:'Gastronomía',contact:'Diego Demo',phone:'0981000005',email:'operaciones@gastronomica.local',seller:'u1',notes:'Ejemplo ilustrativo de cadena gastronómica. No representa un cliente real.',sites:[
    {id:'s6',n:'Local Centro Demo',address:'Asunción · dirección demo',m:[{p:'p1',q:1000,f:30,last:add(now,-32)},{p:'p7',q:5,f:30,last:add(now,-32)}]}
  ]},
  {id:'c3',n:'Industria Demo',ruc:'80000003-3',sector:'Industria alimenticia',contact:'Carlos Demo',phone:'0981000003',email:'abastecimiento@industria.local',seller:'u2',notes:'Cuenta industrial con productos especializados de higiene.',sites:[
    {id:'s4',n:'Planta Industrial',address:'Central · dirección demo',m:[{p:'p8',q:8,f:60,last:add(now,-58)},{p:'p9',q:12,f:45,last:add(now,-44)}]}
  ]},
  {id:'c4',n:'Universidad Demo',ruc:'80000004-4',sector:'Educación',contact:'Laura Demo',phone:'0981000004',email:'administracion@universidad.local',seller:'u2',notes:'Cuenta educativa con múltiples consumibles recurrentes.',sites:[
    {id:'s5',n:'Campus Central',address:'San Lorenzo · dirección demo',m:[{p:'p1',q:36,f:30,last:add(now,-18)},{p:'p2',q:30,f:30,last:add(now,-18)},{p:'p10',q:6,f:90,last:add(now,-87)}]}
  ]},
  {id:'c6',n:'Empresa Corporativa Demo',ruc:'80000006-6',sector:'Corporativo',contact:'Sofía Demo',phone:'0981000006',email:'compras@corporativa.local',seller:'u2',notes:'Oficinas corporativas con reposición periódica de papeles y dispensadores.',sites:[
    {id:'s7',n:'Oficina Central',address:'Asunción · dirección demo',m:[{p:'p1',q:20,f:30,last:add(now,-47)},{p:'p2',q:16,f:30,last:add(now,-47)},{p:'p3',q:3,f:120,last:add(now,-110)}]}
  ]}
 ],
 orders:[
  {id:'O-1012',c:'c5',s:'s6',seller:'u1',date:add(now,-2),req:add(now,2),deliveryDate:add(now,2),st:'Confirmado',amount:4850000,it:[{p:'p1',q:1000},{p:'p7',q:5}]},
  {id:'O-1011',c:'c1',s:'s1',seller:'u1',date:add(now,-7),req:add(now,-2),deliveryDate:add(now,-2),st:'Entregado',amount:7600000,it:[{p:'p1',q:24},{p:'p2',q:18}]},
  {id:'O-1010',c:'c2',s:'s3',seller:'u1',date:add(now,-4),req:add(now,2),deliveryDate:add(now,3),st:'Cotizando',amount:9200000,it:[{p:'p2',q:28},{p:'p4',q:20}]},
  {id:'O-1009',c:'c3',s:'s4',seller:'u2',date:add(now,-12),req:add(now,-5),deliveryDate:add(now,-5),st:'Entregado',amount:6300000,it:[{p:'p8',q:8},{p:'p9',q:12}]},
  {id:'O-1008',c:'c4',s:'s5',seller:'u2',date:add(now,-8),req:add(now,4),deliveryDate:add(now,5),st:'Preparando',amount:8100000,it:[{p:'p1',q:36},{p:'p2',q:30}]},
  {id:'O-1007',c:'c6',s:'s7',seller:'u2',date:add(now,-35),req:add(now,-30),deliveryDate:add(now,-30),st:'Entregado',amount:5400000,it:[{p:'p1',q:20},{p:'p2',q:16}]},
  {id:'O-1006',c:'c1',s:'s2',seller:'u1',date:add(now,-24),req:add(now,-19),deliveryDate:add(now,-19),st:'Entregado',amount:11300000,it:[{p:'p1',q:30},{p:'p4',q:10}]},
  {id:'O-1005',c:'c3',s:'s4',seller:'u2',date:add(now,-21),req:add(now,-17),deliveryDate:add(now,-17),st:'Entregado',amount:12400000,it:[{p:'p8',q:8}]}
 ],
 quotes:[
  {id:'COT-209',o:'O-1010',c:'c2',s:'s3',seller:'u1',date:add(now,-3),valid:add(now,7),st:'Enviada'},
  {id:'COT-208',o:'O-1008',c:'c4',s:'s5',seller:'u2',date:add(now,-7),valid:add(now,3),st:'Aceptada'}
 ],
 delivery:[
  {id:'E-510',o:'O-1012',c:'c5',s:'s6',seller:'u1',driver:'d1',date:add(now,2),st:'Asignado',startAt:null,deliveredAt:null,failReason:''},
  {id:'E-509',o:'O-1011',c:'c1',s:'s1',seller:'u1',driver:'d1',date:add(now,-2),st:'Entregado',startAt:new Date(Date.now()-2*86400000+11*3600000).toISOString(),deliveredAt:new Date(Date.now()-2*86400000+15*3600000+42*60000).toISOString(),failReason:''},
  {id:'E-508',o:'O-1009',c:'c3',s:'s4',seller:'u2',driver:'d1',date:add(now,-5),st:'Entregado',startAt:new Date(Date.now()-5*86400000+9*3600000).toISOString(),deliveredAt:new Date(Date.now()-5*86400000+13*3600000+15*60000).toISOString(),failReason:''},
  {id:'E-507',o:'O-1008',c:'c4',s:'s5',seller:'u2',driver:'d1',date:add(now,5),st:'En preparación',startAt:null,deliveredAt:null,failReason:''}
 ],
 tasks:[
  {id:'t1',seller:'u1',c:'c1',date:iso(now),time:'09:00',action:'Contactar Hotel Demo',note:'Validar reposición de papeles',done:false},
  {id:'t2',seller:'u1',c:'c2',date:iso(now),time:'10:30',action:'Seguimiento cotización',note:'Cotización COT-209 pendiente',done:false},
  {id:'t3',seller:'u1',c:'c5',date:add(now,1),time:'14:00',action:'Confirmar entrega',note:'Pedido O-1012',done:false},
  {id:'t4',seller:'u2',c:'c6',date:iso(now),time:'11:00',action:'Reactivar cuenta',note:'Más de 30 días sin compra',done:false},
  {id:'t5',seller:'u2',c:'c4',date:add(now,1),time:'15:30',action:'Verificar entrega',note:'Pedido O-1008',done:false}
 ],
 followups:[
  {id:'f1',seller:'u1',c:'c1',date:add(now,-5),channel:'WhatsApp',result:'Cliente pidió contacto a fin de mes.',next:add(now,4)},
  {id:'f2',seller:'u1',c:'c2',date:add(now,-3),channel:'Email',result:'Cotización enviada.',next:iso(now)},
  {id:'f3',seller:'u2',c:'c3',date:add(now,-12),channel:'Llamada',result:'Pedido confirmado y entregado.',next:add(now,30)}
 ],
 activity:[
  {id:'a1',at:new Date(Date.now()-2*3600000).toISOString(),user:'u1',text:'María López Demo revisó Hotel Demo'},
  {id:'a2',at:new Date(Date.now()-5*3600000).toISOString(),user:'admin',text:'Administrador asignó O-1012 a Carlos Demo'},
  {id:'a3',at:new Date(Date.now()-26*3600000).toISOString(),user:'d1',text:'Carlos Demo marcó E-509 como entregado'}
 ],
 repContact:{},repApproved:{}
}}

var S;
try{S=JSON.parse(localStorage.getItem(K))||seed()}catch(e){S=seed()}
function normalize(){
 S.users=S.users||seed().users;S.products=S.products||[];S.clients=S.clients||[];S.orders=S.orders||[];S.quotes=S.quotes||[];S.delivery=S.delivery||[];
 S.tasks=S.tasks||[];S.followups=S.followups||[];S.activity=S.activity||[];S.repContact=S.repContact||{};S.repApproved=S.repApproved||{};
}
normalize();

function save(noRender){localStorage.setItem(K,JSON.stringify(S));if(!noRender)render()}
function U(id){return S.users.find(function(x){return x.id===id})}
function C(id){return S.clients.find(function(x){return x.id===id})}
function P(id){return S.products.find(function(x){return x.id===id})||{n:'Producto',stock:0}}
function Site(id){for(var i=0;i<S.clients.length;i++){var x=S.clients[i].sites.find(function(z){return z.id===id});if(x)return x}return null}
function me(){var id=sessionStorage.getItem(SESSION);return U(id)}
function sellerName(id){var u=U(id);return u?u.name:'Sin asignar'}
function driverName(id){var u=U(id);return u?u.name:'Sin asignar'}
function roleLabel(r){return r==='admin'?'Administrador':r==='seller'?'Vendedor':'Conductor'}
function log(text,user){S.activity.unshift({id:'a'+Date.now(),at:stamp(),user:user||(me()?me().id:'admin'),text:text});if(S.activity.length>80)S.activity.length=80}
function msg(t){var x=document.getElementById('toast');if(!x)return;x.textContent=t;x.classList.add('show');setTimeout(function(){x.classList.remove('show')},2000)}
function openM(t,b,f){document.getElementById('mt').textContent=t;document.getElementById('mbo').innerHTML=b;document.getElementById('mf').innerHTML=f||'';document.getElementById('mb').classList.add('open')}
function closeM(){document.getElementById('mb').classList.remove('open')}
function waNumber(raw){var n=String(raw||'').replace(/\D/g,'');if(!n)return'';if(n.indexOf('595')===0)return n;return '595'+n.replace(/^0+/,'')}

function permittedClients(){
 var u=me();if(!u)return[];
 if(u.role==='admin')return S.clients.slice();
 if(u.role==='seller')return S.clients.filter(function(c){return c.seller===u.id});
 if(u.role==='driver'){var ids={};S.delivery.filter(function(d){return d.driver===u.id}).forEach(function(d){ids[d.c]=1});return S.clients.filter(function(c){return ids[c.id]})}
 return[];
}
function permittedOrders(){
 var u=me();if(!u)return[];
 if(u.role==='admin')return S.orders.slice();
 if(u.role==='seller')return S.orders.filter(function(o){return o.seller===u.id});
 if(u.role==='driver'){var ids={};S.delivery.filter(function(d){return d.driver===u.id}).forEach(function(d){ids[d.o]=1});return S.orders.filter(function(o){return ids[o.id]})}
 return[];
}
function permittedQuotes(){var u=me();if(!u)return[];return u.role==='admin'?S.quotes.slice():u.role==='seller'?S.quotes.filter(function(q){return q.seller===u.id}):[]}
function permittedDeliveries(){
 var u=me();if(!u)return[];
 if(u.role==='admin')return S.delivery.slice();
 if(u.role==='seller')return S.delivery.filter(function(d){return d.seller===u.id});
 if(u.role==='driver')return S.delivery.filter(function(d){return d.driver===u.id});
 return[];
}
function reps(){
 var a=[],allowed={};permittedClients().forEach(function(c){allowed[c.id]=1});
 S.clients.forEach(function(c){if(!allowed[c.id])return;c.sites.forEach(function(s){s.m.forEach(function(m){var n=add(m.last,m.f),d=Math.ceil((new Date(n)-new Date(iso(now)))/86400000);a.push({c:c,s:s,m:m,n:n,d:d})})})});
 return a.sort(function(a,b){return a.d-b.d})
}
function sc(s){if(['Entregado','Aceptada','Activo'].indexOf(s)>=0)return'ok';if(['Cotizando','Enviada','En ruta','Preparando','En preparación','Salí a entregar'].indexOf(s)>=0)return'blue';if(['No entregado','Vencida','Rechazada'].indexOf(s)>=0)return'red';return'warn'}
function lastOrder(cid){return S.orders.filter(function(o){return o.c===cid}).sort(function(a,b){return new Date(b.date)-new Date(a.date)})[0]||null}
function clientSales(cid){return S.orders.filter(function(o){return o.c===cid&&o.st==='Entregado'}).reduce(function(n,o){return n+(o.amount||0)},0)}
function sellerSales(uid){return S.orders.filter(function(o){return o.seller===uid&&monthKey(o.date)===currentMonth()}).reduce(function(n,o){return n+(o.amount||0)},0)}
function pendingTasks(uid){return S.tasks.filter(function(t){return t.seller===uid&&!t.done}).length}
function inactivity(cid){var o=lastOrder(cid);return o?dayDiff(o.date):999}
function attentionFor(uid){
 var cs=S.clients.filter(function(c){return c.seller===uid}),out=[];
 cs.forEach(function(c){
   var days=inactivity(c.id);
   if(days>=30)out.push({c:c,kind:days>=60?'red':'warn',title:'Sin compra hace '+days+' días',text:'Seguimiento recomendado'});
   var cr=reps().filter(function(r){return r.c.id===c.id&&r.d<=0})[0];
   if(cr)out.push({c:c,kind:'red',title:'Reposición habitual vencida',text:'Contactar y validar necesidad'});
   var q=S.quotes.find(function(q){return q.c===c.id&&q.st==='Enviada'&&dayDiff(q.date)>=5});
   if(q)out.push({c:c,kind:'warn',title:'Cotización pendiente hace '+dayDiff(q.date)+' días',text:q.id+' requiere seguimiento'});
 });
 return out.slice(0,7)
}

function login(){
 var user=(document.getElementById('loginUser').value||'').trim(),pass=document.getElementById('loginPass').value||'';
 var u=S.users.find(function(x){return x.username===user&&x.password===pass&&x.active!==false});
 if(!u){document.getElementById('loginError').textContent='Usuario o contraseña incorrectos.';return}
 sessionStorage.setItem(SESSION,u.id);document.getElementById('loginError').textContent='';activeView='dash';selected=permittedClients()[0]?permittedClients()[0].id:'c1';boot();
}
function fillCred(u,p){document.getElementById('loginUser').value=u;document.getElementById('loginPass').value=p}
function logout(){sessionStorage.removeItem(SESSION);document.getElementById('appShell').hidden=true;document.getElementById('loginScreen').hidden=false;document.getElementById('loginPass').value=''}
function boot(){
 var u=me();if(!u){document.getElementById('loginScreen').hidden=false;document.getElementById('appShell').hidden=true;return}
 document.getElementById('loginScreen').hidden=true;document.getElementById('appShell').hidden=false;
 document.getElementById('userName').textContent=u.name;document.getElementById('userRole').textContent=roleLabel(u.role);
 document.getElementById('userAvatar').textContent=u.name.split(' ').map(function(x){return x[0]}).slice(0,2).join('').toUpperCase();
 renderNav();render();go(activeView);
}
function renderNav(){
 var u=me(),items=[];
 if(u.role==='admin')items=[['dash','▦ Dashboard'],['team','👥 Equipo comercial'],['clients','◉ Clientes & sedes'],['reps','↻ Reposiciones'],['orders','▤ Pedidos'],['quotes','₲ Cotizaciones'],['delivery','▰ Entregas'],['report','▥ Reporte entregas'],['catalog','▥ Catálogo'],['client360','◎ Cliente 360'],['portal','⇄ Portal cliente'],['hygiene','✦ Sistema de higiene']];
 if(u.role==='seller')items=[['dash','▦ Mi dashboard'],['agenda','◷ Mi agenda'],['clients','◉ Mi cartera'],['reps','↻ Reposiciones'],['orders','▤ Pedidos'],['quotes','₲ Cotizaciones'],['delivery','▰ Entregas'],['catalog','▥ Catálogo'],['client360','◎ Cliente 360'],['portal','⇄ Portal cliente'],['hygiene','✦ Sistema de higiene']];
 if(u.role==='driver')items=[['dash','▦ Mi jornada'],['delivery','▰ Mis entregas']];
 document.getElementById('nav').innerHTML=items.map(function(i){return '<button data-v="'+i[0]+'" class="'+(i[0]===activeView?'active':'')+'">'+i[1]+'</button>'}).join('');
 document.getElementById('sideNote').innerHTML=u.role==='driver'?'Acceso operativo de logística. Solo muestra entregas asignadas al conductor.':'Datos comerciales, importes, usuarios y operaciones exclusivamente demostrativos.';
}
function go(id){
 var u=me();if(u.role==='driver'&&['dash','delivery'].indexOf(id)<0)id='dash';
 activeView=id;document.querySelectorAll('.view').forEach(function(v){v.classList.toggle('active',v.id===id)});
 document.querySelectorAll('.nav button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-v')===id)});
 var n={dash:u.role==='driver'?'Mi jornada':u.role==='seller'?'Mi dashboard':'Dashboard gerencial',team:'Equipo comercial',agenda:'Mi agenda',clients:u.role==='seller'?'Mi cartera':'Clientes empresariales',reps:'Reposiciones próximas',orders:'Pedidos',quotes:'Cotizaciones',delivery:u.role==='driver'?'Mis entregas':'Entregas',report:'Reporte de entregas',catalog:'Catálogo y stock demo',client360:'Cliente 360',portal:'Portal del cliente',hygiene:'Sistema de higiene'};
 document.getElementById('title').textContent=n[id]||'ProActif Care Hub';
 window.scrollTo({top:0,behavior:'smooth'})
}
function render(){renderDashboard();renderTeam();renderAgenda();renderClients();renderReps();renderOrders();renderQuotes();renderDeliveries();renderReport();renderCatalog();render360();renderPortal();renderHygiene();renderNav()}

function renderDashboard(){
 var u=me(),el=document.getElementById('dash');
 if(u.role==='driver'){renderDriverDashboard();return}
 if(u.role==='seller'){
   var sales=sellerSales(u.id),target=u.target||1,pct=Math.min(100,Math.round(sales/target*100)),cs=permittedClients(),rs=reps(),qs=permittedQuotes(),os=permittedOrders(),ds=permittedDeliveries(),att=attentionFor(u.id),tasks=S.tasks.filter(function(t){return t.seller===u.id&&!t.done}).sort(function(a,b){return (a.date+a.time).localeCompare(b.date+b.time)}).slice(0,5);
   el.innerHTML='<div class="hero"><div><h1>'+greeting()+', '+esc(u.name)+'</h1><p>Tu cartera, seguimientos, ventas y entregas en una sola vista.</p></div><button class="btn primary" onclick="newOrder()">+ Crear pedido</button></div>'+
   '<div class="note">Dashboard comercial demostrativo. Importes, objetivos y operaciones son datos de muestra.</div>'+
   '<div class="grid kpis"><div class="card kpi"><label>Ventas del mes</label><strong>'+money(sales)+'</strong></div><div class="card kpi"><label>Objetivo</label><strong>'+money(target)+'</strong></div><div class="card kpi"><label>Clientes en cartera</label><strong>'+cs.length+'</strong></div><div class="card kpi"><label>Seguimientos pendientes</label><strong>'+pendingTasks(u.id)+'</strong></div><div class="card kpi"><label>Reposiciones ≤7 días</label><strong>'+rs.filter(function(r){return r.d<=7}).length+'</strong></div><div class="card kpi"><label>Entregas pendientes</label><strong>'+ds.filter(function(d){return d.st!=='Entregado'}).length+'</strong></div></div>'+
   '<div class="grid split"><div class="card panel"><h2>Objetivo comercial</h2><div class="sales-line"><strong>'+money(sales)+'</strong><span>'+pct+'% de '+money(target)+'</span></div><div class="progress"><span style="width:'+pct+'%"></span></div><h2 style="margin-top:18px">Mi agenda</h2><div class="agenda-list">'+(tasks.length?tasks.map(function(t){return '<div class="agenda-item"><time>'+esc(t.time)+'</time><div><b>'+esc(t.action)+'</b><p>'+esc(C(t.c)?C(t.c).n:'Sin cliente')+' · '+esc(t.note||'')+'</p></div><button class="btn small" onclick="completeTask(\''+t.id+'\')">Hecho</button></div>'}).join(''):'<div class="note">No hay tareas pendientes.</div>')+'</div><button class="btn" style="margin-top:10px" onclick="newTask()">+ Nueva tarea</button></div>'+
   '<div class="card panel"><h2>Clientes que requieren atención</h2><div class="attention">'+(att.length?att.map(function(a){return '<div class="attention-item '+(a.kind==='red'?'red':'')+'"><b>'+esc(a.c.n)+' · '+esc(a.title)+'</b><p>'+esc(a.text)+'</p><button class="btn small" onclick="selected=\''+a.c.id+'\';go(\'client360\')">Abrir cliente</button></div>'}).join(''):'<div class="note">No hay alertas críticas en este momento.</div>')+'</div></div></div>';
   return;
 }
 var sellers=S.users.filter(function(x){return x.role==='seller'}),totalSales=sellers.reduce(function(n,s){return n+sellerSales(s.id)},0),open=S.orders.filter(function(o){return o.st!=='Entregado'}).length,pendingQ=S.quotes.filter(function(q){return q.st!=='Aceptada'}).length,del=S.delivery.filter(function(d){return d.st!=='Entregado'}).length,ina=S.clients.filter(function(c){return inactivity(c.id)>=30}).length;
 el.innerHTML='<div class="hero"><div><h1>Dashboard gerencial</h1><p>Resumen de equipo comercial, cuentas, pedidos, entregas y actividad operativa.</p></div><button class="btn primary" onclick="go(\'team\')">Gestionar equipo</button></div>'+
 '<div class="grid kpis"><div class="card kpi"><label>Ventas del mes</label><strong>'+money(totalSales)+'</strong></div><div class="card kpi"><label>Vendedores</label><strong>'+sellers.length+'</strong></div><div class="card kpi"><label>Pedidos abiertos</label><strong>'+open+'</strong></div><div class="card kpi"><label>Cotizaciones pendientes</label><strong>'+pendingQ+'</strong></div><div class="card kpi"><label>Clientes sin actividad +30d</label><strong>'+ina+'</strong></div><div class="card kpi"><label>Entregas pendientes</label><strong>'+del+'</strong></div></div>'+
 '<div class="grid split"><div class="card panel"><h2>Resumen por vendedor</h2>'+sellers.map(function(s){var sales=sellerSales(s.id),target=s.target||1,p=Math.min(100,Math.round(sales/target*100));return '<div class="sales-card" style="padding:10px 0;border-bottom:1px solid #edf1f5"><div class="sales-line"><div><h3>'+esc(s.name)+'</h3><p>'+S.clients.filter(function(c){return c.seller===s.id}).length+' clientes · '+pendingTasks(s.id)+' seguimientos pendientes</p></div><strong>'+money(sales)+'</strong></div><div class="progress"><span style="width:'+p+'%"></span></div></div>'}).join('')+'</div>'+
 '<div class="card panel"><h2>Actividad reciente</h2><div class="timeline-list">'+S.activity.slice(0,7).map(function(a){return '<div class="timeline-item"><span class="timeline-dot"></span><div><b>'+esc(a.text)+'</b><p>'+fdt(a.at)+'</p></div></div>'}).join('')+'</div><div class="crm-future" style="margin-top:14px"><b>Integración CRM — etapa futura</b><br>Se definirá cuando PROACTIF comparta el CRM utilizado y su documentación API. Esta demo no integra ni simula una API real.</div></div></div>';
}
function renderDriverDashboard(){
 var u=me(),ds=permittedDeliveries(),today=iso(now),todayDs=ds.filter(function(d){return d.date===today}),el=document.getElementById('dash');
 el.innerHTML='<div class="driver-shell"><div class="hero"><div><h1>'+greeting()+', '+esc(u.name)+'</h1><p>Entregas asignadas y confirmación operativa desde el celular.</p></div></div>'+
 '<div class="grid driver-kpis kpis"><div class="card kpi"><label>Entregas de hoy</label><strong>'+todayDs.length+'</strong></div><div class="card kpi"><label>Pendientes</label><strong>'+ds.filter(function(d){return ['Asignado','En preparación'].indexOf(d.st)>=0}).length+'</strong></div><div class="card kpi"><label>En ruta</label><strong>'+ds.filter(function(d){return d.st==='Salí a entregar'}).length+'</strong></div><div class="card kpi"><label>Entregadas</label><strong>'+ds.filter(function(d){return d.st==='Entregado'}).length+'</strong></div></div>'+
 '<div class="card panel"><h2>Próximas entregas</h2>'+driverCards(ds.filter(function(d){return d.st!=='Entregado'}).slice(0,5))+'</div></div>';
}
function driverCards(list){
 if(!list.length)return'<div class="note">No hay entregas pendientes asignadas.</div>';
 return '<div class="delivery-cards">'+list.map(function(d){var c=C(d.c),s=Site(d.s),o=S.orders.find(function(x){return x.id===d.o});return '<div class="card delivery-card"><div class="delivery-head"><div><h3>'+esc(c.n)+' · '+esc(s?s.n:'')+'</h3><p>'+d.id+' · Pedido '+d.o+' · '+fd(d.date)+'</p></div><span class="status '+sc(d.st)+'">'+esc(d.st)+'</span></div><p style="font-size:10px;color:var(--muted)">'+esc(s?s.address:'Dirección demo')+' · Contacto: '+esc(c.contact)+' · '+esc(c.phone)+'</p><div class="delivery-products">'+(o?o.it.map(function(i){return '<div><span>'+esc(P(i.p).n)+'</span><b>'+i.q+' u.</b></div>'}).join(''):'')+'</div><div class="delivery-actions">'+
 (d.st==='Asignado'?'<button class="btn" onclick="driverStatus(\''+d.id+'\',\'En preparación\')">En preparación</button>':'')+
 (['Asignado','En preparación'].indexOf(d.st)>=0?'<button class="btn primary" onclick="driverStatus(\''+d.id+'\',\'Salí a entregar\')">Salí a entregar</button>':'')+
 (d.st==='Salí a entregar'?'<button class="btn good" onclick="driverStatus(\''+d.id+'\',\'Entregado\')">Entregado</button><button class="btn bad" onclick="deliveryFail(\''+d.id+'\')">No se pudo entregar</button>':'')+
 '</div>'+(d.deliveredAt?'<div class="note" style="margin-top:10px">Entregado '+fdt(d.deliveredAt)+' · '+esc(driverName(d.driver))+'</div>':'')+'</div>'}).join('')+'</div>';
}

function renderTeam(){
 var el=document.getElementById('team'),u=me();if(u.role!=='admin'){el.innerHTML='';return}
 var sellers=S.users.filter(function(x){return x.role==='seller'});
 el.innerHTML='<div class="hero"><div><h1>Equipo comercial</h1><p>Usuarios, cartera asignada, objetivos y seguimiento por vendedor.</p></div><button class="btn primary" onclick="newSeller()">+ Nuevo vendedor</button></div><div class="team-grid">'+sellers.map(function(s){var cs=S.clients.filter(function(c){return c.seller===s.id}),sales=sellerSales(s.id),open=S.orders.filter(function(o){return o.seller===s.id&&o.st!=='Entregado'}).length;return '<div class="card team-card"><div class="team-card-head"><div><h3>'+esc(s.name)+'</h3><p>'+esc(s.username)+' · '+cs.length+' clientes asignados</p></div><span class="role-hint">VENDEDOR</span></div><div class="mini-kpis"><div class="mini-kpi"><span>Ventas mes</span><b>'+money(sales)+'</b></div><div class="mini-kpi"><span>Seguimientos</span><b>'+pendingTasks(s.id)+'</b></div><div class="mini-kpi"><span>Pedidos abiertos</span><b>'+open+'</b></div></div><div class="pills">'+cs.map(function(c){return '<span class="pill">'+esc(c.n)+'</span>'}).join('')+'</div><div style="margin-top:12px"><button class="btn" onclick="assignClient(\''+s.id+'\')">Asignar clientes</button> <button class="btn" onclick="editSeller(\''+s.id+'\')">Editar</button></div></div>'}).join('')+'</div>';
}
function newSeller(){openM('Nuevo vendedor','<div class="form"><div class="field"><label>Nombre</label><input id="sun"></div><div class="field"><label>Usuario demo</label><input id="suu"></div><div class="field"><label>Contraseña demo</label><input id="sup"></div><div class="field"><label>Objetivo mensual demo</label><input id="sut" type="number" value="50000000"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveSeller()">Crear vendedor</button>')}
function saveSeller(){var n=document.getElementById('sun').value.trim(),un=document.getElementById('suu').value.trim(),pw=document.getElementById('sup').value.trim();if(!n||!un||!pw)return msg('Completá nombre, usuario y contraseña');if(S.users.some(function(x){return x.username===un}))return msg('Ese usuario ya existe');S.users.push({id:'u'+Date.now(),username:un,password:pw,role:'seller',name:n,target:+document.getElementById('sut').value||50000000,active:true});log('Administrador creó vendedor '+n);closeM();save();msg('Vendedor creado')}
function editSeller(id){var s=U(id);openM('Editar vendedor','<div class="form"><div class="field"><label>Nombre</label><input id="sen" value="'+esc(s.name)+'"></div><div class="field"><label>Objetivo mensual demo</label><input id="set" type="number" value="'+(s.target||0)+'"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveSellerEdit(\''+id+'\')">Guardar</button>')}
function saveSellerEdit(id){var s=U(id);s.name=document.getElementById('sen').value.trim()||s.name;s.target=+document.getElementById('set').value||s.target;log('Administrador actualizó datos de '+s.name);closeM();save();msg('Vendedor actualizado')}
function assignClient(uid){var seller=U(uid);openM('Asignar cliente a '+seller.name,'<div class="form"><div class="field full"><label>Cliente</label><select id="ac">'+S.clients.map(function(c){return '<option value="'+c.id+'">'+esc(c.n)+' · actual: '+esc(sellerName(c.seller))+'</option>'}).join('')+'</select></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveAssign(\''+uid+'\')">Asignar</button>')}
function saveAssign(uid){var c=C(document.getElementById('ac').value);c.seller=uid;S.orders.filter(function(o){return o.c===c.id&&o.st!=='Entregado'}).forEach(function(o){o.seller=uid});log('Administrador asignó '+c.n+' a '+sellerName(uid));closeM();save();msg('Cartera actualizada')}

function renderAgenda(){
 var el=document.getElementById('agenda'),u=me();if(u.role!=='seller'){el.innerHTML='';return}
 var ts=S.tasks.filter(function(t){return t.seller===u.id}).sort(function(a,b){return (a.date+a.time).localeCompare(b.date+b.time)});
 el.innerHTML='<div class="hero"><div><h1>Mi agenda</h1><p>Tareas, seguimientos y próximas acciones de tu cartera.</p></div><button class="btn primary" onclick="newTask()">+ Nueva tarea</button></div><div class="card panel"><div class="agenda-list">'+(ts.length?ts.map(function(t){return '<div class="agenda-item" style="'+(t.done?'opacity:.55':'')+'"><time>'+fd(t.date)+'<br>'+esc(t.time)+'</time><div><b>'+esc(t.action)+'</b><p>'+esc(C(t.c)?C(t.c).n:'Sin cliente')+' · '+esc(t.note||'')+'</p></div>'+(t.done?'<span class="status ok">Hecho</span>':'<button class="btn small" onclick="completeTask(\''+t.id+'\')">Hecho</button>')+'</div>'}).join(''):'<div class="note">Todavía no hay tareas.</div>')+'</div></div>';
}
function newTask(cid){var u=me(),cs=u.role==='admin'?S.clients:permittedClients();openM('Nueva tarea','<div class="form"><div class="field"><label>Cliente</label><select id="tc">'+cs.map(function(c){return '<option value="'+c.id+'" '+(cid===c.id?'selected':'')+'>'+esc(c.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Acción</label><input id="ta" placeholder="Ej.: Contactar cliente"></div><div class="field"><label>Fecha</label><input id="td" type="date" value="'+iso(now)+'"></div><div class="field"><label>Hora</label><input id="tt" type="time" value="09:00"></div><div class="field full"><label>Observación</label><input id="tn"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveTask()">Guardar tarea</button>')}
function saveTask(){var u=me(),cid=document.getElementById('tc').value;S.tasks.push({id:'t'+Date.now(),seller:u.role==='seller'?u.id:C(cid).seller,c:cid,date:document.getElementById('td').value,time:document.getElementById('tt').value,action:document.getElementById('ta').value||'Seguimiento',note:document.getElementById('tn').value,done:false});log((u.name||'Usuario')+' creó una tarea para '+C(cid).n);closeM();save();msg('Tarea guardada')}
function completeTask(id){var t=S.tasks.find(function(x){return x.id===id});if(t)t.done=true;log((me().name||'Usuario')+' completó tarea '+(t?t.action:''));save();msg('Tarea completada')}

function renderClients(){
 var cs=permittedClients(),el=document.getElementById('clients'),u=me();
 if(u.role==='driver'){el.innerHTML='';return}
 el.innerHTML='<div class="hero"><div><h1>'+(u.role==='seller'?'Mi cartera':'Clientes empresariales y sedes')+'</h1><p>Información comercial, responsable, última compra y seguimiento de cada cuenta.</p></div><div><button class="btn" onclick="newSite()">+ Nueva sede</button> <button class="btn primary" onclick="newClient()">+ Nuevo cliente</button></div></div><div class="toolbar"><input id="clientSearch" class="input" placeholder="Buscar empresa, sector o contacto…" oninput="filterClients()"><select id="clientSector" class="input" onchange="filterClients()"><option value="">Todos los sectores</option>'+Array.from(new Set(cs.map(function(c){return c.sector}))).map(function(x){return '<option>'+esc(x)+'</option>'}).join('')+'</select></div><div class="clients" id="clientList">'+cs.map(function(c){var o=lastOrder(c.id),n=c.sites.reduce(function(a,s){return a+s.m.length},0);return '<div class="card client" data-search="'+esc((c.n+' '+c.sector+' '+c.contact).toLowerCase())+'" data-sector="'+esc(c.sector)+'"><div><h3>'+esc(c.n)+' <span class="status ok">Activo</span></h3><p>'+esc(c.sector)+' · '+esc(c.contact)+' · '+esc(c.phone)+'</p><p>Vendedor: '+esc(sellerName(c.seller))+'</p></div><div class="pills"><span class="pill">'+c.sites.length+' sede(s)</span><span class="pill">'+n+' productos recurrentes</span><span class="pill">Última compra: '+(o?fd(o.date):'Sin compras')+'</span></div><div><button class="btn" onclick="selected=\''+c.id+'\';go(\'client360\')">Ver cliente</button> <button class="btn" onclick="openWhatsApp(\''+c.id+'\')">WhatsApp</button> <button class="btn primary" onclick="newOrder(\''+c.id+'\')">Pedido</button></div></div>'}).join('')+'</div>';
}
function filterClients(){var q=(document.getElementById('clientSearch').value||'').toLowerCase(),s=document.getElementById('clientSector').value;document.querySelectorAll('#clientList .client').forEach(function(el){el.style.display=((!q||el.getAttribute('data-search').indexOf(q)>=0)&&(!s||el.getAttribute('data-sector')===s))?'grid':'none'})}
function newClient(fromOrder){var u=me(),sellers=S.users.filter(function(x){return x.role==='seller'});openM('Nuevo cliente','<div class="form"><div class="field"><label>Empresa</label><input id="cn"></div><div class="field"><label>RUC demo</label><input id="cr"></div><div class="field"><label>Sector</label><select id="cs"><option>Hotelería</option><option>Salud</option><option>Gastronomía</option><option>Corporativo</option><option>Educación</option><option>Industria alimenticia</option><option>Grandes áreas</option><option>Otro</option></select></div><div class="field"><label>Contacto</label><input id="cc"></div><div class="field"><label>WhatsApp</label><input id="cp" placeholder="0981 000 000"></div><div class="field"><label>Email</label><input id="ce" type="email"></div><div class="field"><label>Sede inicial</label><input id="csite" placeholder="Sede Principal"></div>'+(u.role==='admin'?'<div class="field"><label>Vendedor responsable</label><select id="cv">'+sellers.map(function(s){return '<option value="'+s.id+'">'+esc(s.name)+'</option>'}).join('')+'</select></div>':'')+'<div class="field full"><label>Descripción / observaciones</label><input id="cnotes"></div><input type="hidden" id="cback" value="'+(fromOrder?'1':'0')+'"></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveClient()">Crear cliente</button>')}
function saveClient(){var u=me(),n=document.getElementById('cn').value.trim(),sn=document.getElementById('csite').value.trim();if(!n||!sn)return msg('Ingresá empresa y sede inicial');var id='c'+Date.now(),sid='s'+Date.now(),seller=u.role==='seller'?u.id:document.getElementById('cv').value;S.clients.push({id:id,n:n,ruc:document.getElementById('cr').value,sector:document.getElementById('cs').value,contact:document.getElementById('cc').value||'Contacto',phone:document.getElementById('cp').value,email:document.getElementById('ce').value,seller:seller,notes:document.getElementById('cnotes').value,sites:[{id:sid,n:sn,address:'Dirección demo',m:[]}]});log(u.name+' creó cliente '+n);var back=document.getElementById('cback').value==='1';closeM();save();if(back)newOrder(id);msg('Cliente creado y asignado')}
function newSite(){var cs=permittedClients();if(!cs.length)return msg('No hay clientes disponibles');openM('Nueva sede','<div class="form"><div class="field"><label>Cliente</label><select id="sc">'+cs.map(function(c){return '<option value="'+c.id+'">'+esc(c.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Nombre de sede</label><input id="sn"></div><div class="field full"><label>Dirección demo</label><input id="sa"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveSite()">Crear sede</button>')}
function saveSite(){var c=C(document.getElementById('sc').value),n=document.getElementById('sn').value.trim();if(!n)return msg('Ingresá la sede');c.sites.push({id:'s'+Date.now(),n:n,address:document.getElementById('sa').value||'Dirección demo',m:[]});log(me().name+' agregó sede '+n+' a '+c.n);closeM();save();msg('Sede creada')}

function repKey(cid,sid,pid){return cid+'|'+sid+'|'+pid}
function renderReps(){
 var el=document.getElementById('reps'),u=me();if(u.role==='driver'){el.innerHTML='';return}
 var rs=reps();el.innerHTML='<div class="hero"><div><h1>Reposiciones próximas</h1><p>Prioriza clientes según frecuencia habitual y última compra registrada.</p></div></div><div class="table"><table><thead><tr><th>Cliente</th><th>Vendedor</th><th>Sede</th><th>Producto</th><th>Cant.</th><th>Frecuencia</th><th>Próxima</th><th>Estado</th><th>Acción</th></tr></thead><tbody>'+rs.map(function(x){var key=repKey(x.c.id,x.s.id,x.m.p),contacted=!!(S.repContact[key]&&S.repContact[key].sent),approved=!!S.repApproved[key];return '<tr><td>'+esc(x.c.n)+'</td><td>'+esc(sellerName(x.c.seller))+'</td><td>'+esc(x.s.n)+'</td><td>'+esc(P(x.m.p).n)+'</td><td>'+x.m.q+'</td><td>'+x.m.f+' días</td><td>'+fd(x.n)+'</td><td><span class="status '+(x.d<=0?'red':x.d<=7?'warn':'blue')+'">'+(x.d<=0?'Vencida':x.d<=7?'Sugerida':'Programada')+'</span></td><td><div class="action-stack"><button class="btn small" onclick="repWhatsApp(\''+x.c.id+'\',\''+x.s.id+'\',\''+x.m.p+'\')">Contactar por WhatsApp</button><button class="btn small" '+(contacted?'':'disabled')+' onclick="markRepOk(\''+x.c.id+'\',\''+x.s.id+'\',\''+x.m.p+'\')">Cliente respondió OK</button><button class="btn primary small" '+(approved?'':'disabled')+' onclick="prep(\''+x.c.id+'\',\''+x.s.id+'\',\''+x.m.p+'\')">Preparar</button></div></td></tr>'}).join('')+'</tbody></table></div>';
}
function repWhatsApp(cid,sid,pid){var c=C(cid),s=Site(sid),m=s.m.find(function(x){return x.p===pid}),p=P(pid),text='Hola '+c.contact+', soy '+me().name+' de PROACTIF CARE. Viendo su consumo habitual quería consultar si necesitan realizar una nueva reposición de '+p.n+' para '+s.n+'. Referencia habitual: '+m.q+' unidades cada '+m.f+' días. Si están de acuerdo, respondan OK y avanzamos con la preparación.';openWhatsApp(cid,text,function(){var key=repKey(cid,sid,pid);S.repContact[key]={sent:true,date:iso(now)};save(true)})}
function markRepOk(cid,sid,pid){var key=repKey(cid,sid,pid);if(!S.repContact[key])return msg('Primero contactá al cliente');S.repApproved[key]=true;log(me().name+' registró OK de '+C(cid).n+' para reposición');save();msg('OK registrado')}
function prep(cid,sid,pid){var key=repKey(cid,sid,pid);if(!S.repApproved[key])return msg('Primero registrá el OK del cliente');var c=C(cid),s=Site(sid),m=s.m.find(function(x){return x.p===pid}),id='O-'+(1013+S.orders.length);S.orders.unshift({id:id,c:cid,s:sid,seller:c.seller,date:iso(now),req:add(now,5),deliveryDate:add(now,5),st:'Borrador',amount:0,it:[{p:pid,q:m.q}]});log(me().name+' preparó reposición '+id+' para '+c.n);save();go('orders');msg('Reposición preparada')}

function renderOrders(){
 var el=document.getElementById('orders'),u=me();if(u.role==='driver'){el.innerHTML='';return}var os=permittedOrders();
 el.innerHTML='<div class="hero"><div><h1>Pedidos</h1><p>Seguimiento comercial y operativo desde la solicitud hasta la entrega.</p></div><div><button class="btn" onclick="repeatOrder()">Repetir anterior</button> <button class="btn primary" onclick="newOrder()">+ Crear pedido</button></div></div><div class="table"><table><thead><tr><th>Pedido</th><th>Cliente / sede</th><th>Vendedor</th><th>Fecha</th><th>Entrega prevista</th><th>Total demo</th><th>Estado</th><th>Acción</th></tr></thead><tbody>'+os.map(function(o){return '<tr><td><b>'+o.id+'</b><br><small>'+o.it.length+' producto(s)</small></td><td>'+esc(C(o.c).n)+'<br><small>'+esc(Site(o.s)?Site(o.s).n:'')+'</small></td><td>'+esc(sellerName(o.seller))+'</td><td>'+fd(o.date)+'</td><td>'+fd(o.deliveryDate||o.req)+'</td><td>'+money(o.amount||0)+'</td><td><span class="status '+sc(o.st)+'">'+esc(o.st)+'</span></td><td><select class="input action-select" onchange="handleOrderAction(this,\''+o.id+'\')"><option value="">Seleccionar acción…</option><option value="status:Borrador">Pasar a Borrador</option><option value="status:Recibido">Pasar a Recibido</option><option value="status:En revisión">Pasar a En revisión</option><option value="status:Cotizando">Pasar a Cotizando</option><option value="status:Confirmado">Pasar a Confirmado</option><option value="status:Preparando">Pasar a Preparando</option><option value="status:Despachado">Pasar a Despachado</option><option value="status:Entregado">Pasar a Entregado</option><option value="quote">Generar cotización</option>'+(u.role==='admin'?'<option value="delivery">Asignar entrega</option>':'')+'</select></td></tr>'}).join('')+'</tbody></table></div>';
}
function newOrder(cid){var cs=permittedClients(),c=C(cid)||cs[0];if(!c)return msg('No hay clientes disponibles');openM('Crear pedido','<div class="form"><div class="field"><div class="field-head"><label>Cliente</label><button type="button" class="btn small" onclick="newClient(true)">+ Nuevo cliente</button></div><select id="oc" onchange="fillSites()">'+cs.map(function(x){return '<option value="'+x.id+'" '+(x.id===c.id?'selected':'')+'>'+esc(x.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Sede</label><select id="os">'+c.sites.map(function(s){return '<option value="'+s.id+'">'+esc(s.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Producto</label><select id="op">'+S.products.map(function(p){return '<option value="'+p.id+'">'+esc(p.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Cantidad</label><input type="number" id="oq" value="1" min="1"></div><div class="field"><label>Fecha requerida</label><input type="date" id="or" value="'+add(now,5)+'"></div><div class="field"><label>Fecha prevista entrega</label><input type="date" id="od" value="'+add(now,5)+'"></div><div class="field full"><label>Total demostrativo</label><input type="number" id="oa" value="0"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveOrder()">Crear pedido</button>')}
function fillSites(){var c=C(document.getElementById('oc').value);document.getElementById('os').innerHTML=c.sites.map(function(s){return '<option value="'+s.id+'">'+esc(s.n)+'</option>'}).join('')}
function saveOrder(){var cid=document.getElementById('oc').value,c=C(cid),sid=document.getElementById('os').value;if(!sid)return msg('El cliente necesita una sede');var id='O-'+(1013+S.orders.length);S.orders.unshift({id:id,c:cid,s:sid,seller:c.seller,date:iso(now),req:document.getElementById('or').value,deliveryDate:document.getElementById('od').value,st:'Recibido',amount:+document.getElementById('oa').value||0,it:[{p:document.getElementById('op').value,q:+document.getElementById('oq').value||1}]});log(me().name+' creó pedido '+id+' para '+c.n);closeM();save();msg('Pedido creado')}
function repeatOrder(){var o=permittedOrders().find(function(x){return x.st==='Entregado'})||permittedOrders()[0];if(!o)return msg('No hay pedido para repetir');var id='O-'+(1013+S.orders.length);S.orders.unshift({id:id,c:o.c,s:o.s,seller:o.seller,date:iso(now),req:add(now,5),deliveryDate:add(now,5),st:'Recibido',amount:o.amount,it:o.it.map(function(i){return{p:i.p,q:i.q}})});log(me().name+' repitió pedido '+o.id+' como '+id);save();msg('Pedido anterior repetido')}
function setOrderStatus(id,status){var o=S.orders.find(function(x){return x.id===id});if(!o)return;o.st=status;log(me().name+' cambió '+id+' a '+status);save();msg('Estado: '+status)}
function handleOrderAction(el,id){var v=el.value;el.value='';if(!v)return;if(v==='quote')return quote(id);if(v==='delivery')return newDelivery(id);if(v.indexOf('status:')===0)return setOrderStatus(id,v.slice(7))}
function quote(oid){var o=S.orders.find(function(x){return x.id===oid});if(!o)return;if(S.quotes.some(function(q){return q.o===oid}))return msg('Ese pedido ya tiene cotización demo');var id='COT-'+(210+S.quotes.length);S.quotes.unshift({id:id,o:o.id,c:o.c,s:o.s,seller:o.seller,date:iso(now),valid:add(now,10),st:'Enviada'});o.st='Cotizando';log(me().name+' generó '+id+' para '+C(o.c).n);save();go('quotes');msg('Cotización creada')}

function renderQuotes(){
 var el=document.getElementById('quotes'),u=me();if(u.role==='driver'){el.innerHTML='';return}var qs=permittedQuotes();
 el.innerHTML='<div class="hero"><div><h1>Cotizaciones</h1><p>Seguimiento de propuestas comerciales vinculadas a pedidos.</p></div></div><div class="table"><table><thead><tr><th>Cotización</th><th>Cliente</th><th>Vendedor</th><th>Pedido</th><th>Fecha</th><th>Vigencia</th><th>Estado</th><th>Acción</th></tr></thead><tbody>'+qs.map(function(q){return '<tr><td><b>'+q.id+'</b></td><td>'+esc(C(q.c).n)+'</td><td>'+esc(sellerName(q.seller))+'</td><td>'+q.o+'</td><td>'+fd(q.date)+'</td><td>'+fd(q.valid)+'</td><td><span class="status '+sc(q.st)+'">'+q.st+'</span></td><td><button class="btn primary" onclick="approve(\''+q.id+'\')">Aprobar demo</button></td></tr>'}).join('')+'</tbody></table></div><div class="note" style="margin-top:10px">Flujo demostrativo. La integración con el CRM de PROACTIF no forma parte de esta versión.</div>';
}
function approve(id){var q=S.quotes.find(function(x){return x.id===id});if(!q)return;q.st='Aceptada';var o=S.orders.find(function(x){return x.id===q.o});if(o)o.st='Confirmado';log(me().name+' aprobó '+id);save();msg('Cotización aprobada')}

function renderDeliveries(){
 var u=me(),el=document.getElementById('delivery'),ds=permittedDeliveries();
 if(u.role==='driver'){el.innerHTML='<div class="driver-shell"><div class="hero"><div><h1>Mis entregas</h1><p>Solo aparecen los pedidos asignados a tu usuario.</p></div></div>'+driverCards(ds)+'</div>';return}
 el.innerHTML='<div class="hero"><div><h1>Entregas</h1><p>Asignación de conductor, fecha prevista y trazabilidad hasta recepción.</p></div>'+(u.role==='admin'?'<button class="btn primary" onclick="newDelivery()">+ Asignar entrega</button>':'')+'</div><div class="table"><table><thead><tr><th>Entrega</th><th>Pedido</th><th>Cliente / sede</th><th>Vendedor</th><th>Conductor</th><th>Fecha</th><th>Estado</th><th>Confirmación</th></tr></thead><tbody>'+ds.map(function(d){return '<tr><td><b>'+d.id+'</b></td><td>'+d.o+'</td><td>'+esc(C(d.c).n)+'<br><small>'+esc(Site(d.s)?Site(d.s).n:'')+'</small></td><td>'+esc(sellerName(d.seller))+'</td><td>'+esc(driverName(d.driver))+'</td><td>'+fd(d.date)+'</td><td><span class="status '+sc(d.st)+'">'+esc(d.st)+'</span></td><td>'+(d.deliveredAt?'Entregado '+fdt(d.deliveredAt):d.failReason?'No entregado: '+esc(d.failReason):'Pendiente')+'</td></tr>'}).join('')+'</tbody></table></div>';
}
function newDelivery(oid){
 var available=S.orders.filter(function(o){return ['Confirmado','Preparando'].indexOf(o.st)>=0}),o=S.orders.find(function(x){return x.id===oid})||available[0];if(!o)return msg('Primero confirmá un pedido');var drivers=S.users.filter(function(x){return x.role==='driver'});
 openM('Asignar entrega','<div class="form"><div class="field"><label>Pedido</label><select id="do">'+available.map(function(x){return '<option value="'+x.id+'" '+(x.id===o.id?'selected':'')+'>'+x.id+' · '+esc(C(x.c).n)+'</option>'}).join('')+'</select></div><div class="field"><label>Conductor</label><select id="dd">'+drivers.map(function(d){return '<option value="'+d.id+'">'+esc(d.name)+'</option>'}).join('')+'</select></div><div class="field full"><label>Fecha prevista de entrega</label><input type="date" id="ddate" value="'+(o.deliveryDate||add(now,1))+'"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveDelivery()">Asignar</button>')
}
function saveDelivery(){var oid=document.getElementById('do').value,o=S.orders.find(function(x){return x.id===oid}),driver=document.getElementById('dd').value,existing=S.delivery.find(function(d){return d.o===oid});if(existing){existing.driver=driver;existing.date=document.getElementById('ddate').value;existing.st='Asignado'}else S.delivery.unshift({id:'E-'+(511+S.delivery.length),o:o.id,c:o.c,s:o.s,seller:o.seller,driver:driver,date:document.getElementById('ddate').value,st:'Asignado',startAt:null,deliveredAt:null,failReason:''});o.deliveryDate=document.getElementById('ddate').value;log('Administrador asignó '+oid+' a '+driverName(driver));closeM();save();msg('Entrega asignada')}
function driverStatus(id,status){var d=S.delivery.find(function(x){return x.id===id});if(!d)return;if(status==='Salí a entregar')d.startAt=stamp();if(status==='Entregado'){d.deliveredAt=stamp();var o=S.orders.find(function(x){return x.id===d.o});if(o)o.st='Entregado'}d.st=status;log(me().name+' marcó '+id+' como '+status);save();msg('Entrega: '+status)}
function deliveryFail(id){openM('No se pudo entregar','<div class="form"><div class="field full"><label>Motivo</label><select id="dfr"><option>Cliente ausente</option><option>Local cerrado</option><option>Dirección incorrecta</option><option>Pedido rechazado</option><option>Problema con mercadería</option><option>Otro</option></select></div><div class="field full"><label>Observación</label><input id="dfn"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn bad" onclick="saveDeliveryFail(\''+id+'\')">Registrar incidencia</button>')}
function saveDeliveryFail(id){var d=S.delivery.find(function(x){return x.id===id});d.st='No entregado';d.failReason=document.getElementById('dfr').value+(document.getElementById('dfn').value?' · '+document.getElementById('dfn').value:'');log(me().name+' registró entrega no completada '+id);closeM();save();msg('Incidencia registrada')}

function renderReport(){
 var el=document.getElementById('report'),u=me();if(u.role!=='admin'){el.innerHTML='';return}var ds=S.delivery,del=ds.filter(function(d){return d.st==='Entregado'}),fail=ds.filter(function(d){return d.st==='No entregado'}),drivers=S.users.filter(function(x){return x.role==='driver'});
 el.innerHTML='<div class="hero"><div><h1>Reporte de entregas</h1><p>Resumen mensual y trazabilidad por conductor, cliente y estado.</p></div></div><div class="report-summary"><div class="card report-box"><span>Asignadas</span><strong>'+ds.length+'</strong></div><div class="card report-box"><span>Entregadas</span><strong>'+del.length+'</strong></div><div class="card report-box"><span>No entregadas</span><strong>'+fail.length+'</strong></div><div class="card report-box"><span>Cumplimiento</span><strong>'+(ds.length?Math.round(del.length/ds.length*100):0)+'%</strong></div></div>'+
 '<div class="toolbar"><select id="reportDriver" class="input" onchange="filterDeliveryReport()"><option value="">Todos los conductores</option>'+drivers.map(function(d){return '<option value="'+d.id+'">'+esc(d.name)+'</option>'}).join('')+'</select><select id="reportState" class="input" onchange="filterDeliveryReport()"><option value="">Todos los estados</option><option>Asignado</option><option>En preparación</option><option>Salí a entregar</option><option>Entregado</option><option>No entregado</option></select></div>'+
 '<div class="table"><table><thead><tr><th>Fecha</th><th>Conductor</th><th>Cliente</th><th>Pedido</th><th>Productos</th><th>Hora</th><th>Estado</th></tr></thead><tbody id="reportRows">'+ds.map(function(d){var o=S.orders.find(function(x){return x.id===d.o}),prods=o?o.it.map(function(i){return P(i.p).n+' x'+i.q}).join(', '):'';return '<tr data-driver="'+esc(d.driver)+'" data-state="'+esc(d.st)+'"><td>'+fd(d.date)+'</td><td>'+esc(driverName(d.driver))+'</td><td>'+esc(C(d.c).n)+'</td><td>'+d.o+'</td><td>'+esc(prods)+'</td><td>'+(d.deliveredAt?hm(d.deliveredAt):'—')+'</td><td><span class="status '+sc(d.st)+'">'+esc(d.st)+'</span></td></tr>'}).join('')+'</tbody></table></div>'+
 '<div class="team-grid" style="margin-top:12px">'+drivers.map(function(dr){var x=ds.filter(function(d){return d.driver===dr.id}),ok=x.filter(function(d){return d.st==='Entregado'}).length;return '<div class="card team-card"><h3>'+esc(dr.name)+'</h3><div class="mini-kpis"><div class="mini-kpi"><span>Asignadas</span><b>'+x.length+'</b></div><div class="mini-kpi"><span>Entregadas</span><b>'+ok+'</b></div><div class="mini-kpi"><span>Cumplimiento</span><b>'+(x.length?Math.round(ok/x.length*100):0)+'%</b></div></div></div>'}).join('')+'</div>';
}
function filterDeliveryReport(){var d=document.getElementById('reportDriver').value,s=document.getElementById('reportState').value;document.querySelectorAll('#reportRows tr').forEach(function(tr){tr.style.display=(!d||tr.getAttribute('data-driver')===d)&&(!s||tr.getAttribute('data-state')===s)?'':'none'})}

function renderCatalog(){
 var el=document.getElementById('catalog'),u=me();if(u.role==='driver'){el.innerHTML='';return}
 el.innerHTML='<div class="hero"><div><h1>Catálogo y stock demostrativo</h1><p>Categorías y disponibilidad de referencia. Sin carrito ni checkout.</p></div></div><div class="note">Stock demostrativo — integración con inventario real pendiente de definición.</div><div class="toolbar"><input id="prodSearch" class="input" placeholder="Buscar producto, marca o código…" oninput="filterProducts()"><select id="prodCat" class="input" onchange="filterProducts()"><option value="">Todas las categorías</option>'+Array.from(new Set(S.products.map(function(p){return p.cat}))).map(function(x){return '<option>'+esc(x)+'</option>'}).join('')+'</select></div><div class="products" id="productList">'+S.products.map(function(p){var state=p.stock<=0?'Sin stock':p.stock<20?'Stock bajo':'Disponible';return '<div class="card product" data-search="'+esc((p.n+' '+p.b+' '+p.c).toLowerCase())+'" data-cat="'+esc(p.cat)+'"><small>'+esc(p.cat)+'</small><h3>'+esc(p.n)+'</h3><p>'+esc(p.b)+'</p><span class="code">'+esc(p.c)+'</span><div class="stock"><b>Stock demo: '+p.stock+'</b><span class="status '+(p.stock<=0?'red':p.stock<20?'warn':'ok')+'">'+state+'</span></div></div>'}).join('')+'</div>';
}
function filterProducts(){var q=(document.getElementById('prodSearch').value||'').toLowerCase(),c=document.getElementById('prodCat').value;document.querySelectorAll('#productList .product').forEach(function(el){el.style.display=((!q||el.getAttribute('data-search').indexOf(q)>=0)&&(!c||el.getAttribute('data-cat')===c))?'block':'none'})}

function render360(){
 var u=me(),el=document.getElementById('client360');if(u.role==='driver'){el.innerHTML='';return}var cs=permittedClients(),c=C(selected);if(!c||!cs.some(function(x){return x.id===c.id}))c=cs[0];if(!c){el.innerHTML='<div class="note">No hay clientes disponibles.</div>';return}selected=c.id;
 var os=S.orders.filter(function(o){return o.c===c.id}),qs=S.quotes.filter(function(q){return q.c===c.id}),ds=S.delivery.filter(function(d){return d.c===c.id}),fs=S.followups.filter(function(f){return f.c===c.id}).sort(function(a,b){return new Date(b.date)-new Date(a.date)}),lo=lastOrder(c.id);
 el.innerHTML='<div class="c360-head"><div><h1 style="margin:0">'+esc(c.n)+'</h1><div class="c360-meta"><span class="pill">'+esc(c.sector)+'</span><span class="pill">Vendedor: '+esc(sellerName(c.seller))+'</span><span class="pill">Última compra: '+(lo?fd(lo.date):'Sin compras')+'</span><span class="pill">Días sin comprar: '+inactivity(c.id)+'</span></div><p style="font-size:11px;color:var(--muted)">'+esc(c.notes||'')+'</p></div><select class="input" onchange="selected=this.value;render360()">'+cs.map(function(x){return '<option value="'+x.id+'" '+(x.id===c.id?'selected':'')+'>'+esc(x.n)+'</option>'}).join('')+'</select></div>'+
 '<div class="section-actions" style="margin:12px 0"><button class="btn" onclick="openWhatsApp(\''+c.id+'\')">Contactar por WhatsApp</button> <button class="btn" onclick="newFollowup(\''+c.id+'\')">Registrar seguimiento</button> <button class="btn" onclick="newTask(\''+c.id+'\')">Programar tarea</button> <button class="btn primary" onclick="newOrder(\''+c.id+'\')">Crear pedido</button></div>'+
 '<div class="grid split"><div class="card panel"><h2>Productos habituales</h2>'+c.sites.map(function(s){return '<div class="alert"><b>'+esc(s.n)+'</b><p>'+esc(s.address||'')+'</p><div class="table" style="margin-top:8px"><table><thead><tr><th>Producto</th><th>Cant.</th><th>Frecuencia</th><th>Último</th><th>Próximo</th></tr></thead><tbody>'+s.m.map(function(m){return '<tr><td>'+esc(P(m.p).n)+'</td><td>'+m.q+'</td><td>'+m.f+' días</td><td>'+fd(m.last)+'</td><td>'+fd(add(m.last,m.f))+'</td></tr>'}).join('')+'</tbody></table></div></div>'}).join('')+'<button class="btn" style="margin-top:10px" onclick="addHabitual(\''+c.id+'\')">+ Producto habitual</button></div>'+
 '<div class="card panel"><h2>Resumen comercial</h2><div class="mini-kpis"><div class="mini-kpi"><span>Pedidos</span><b>'+os.length+'</b></div><div class="mini-kpi"><span>Cotizaciones</span><b>'+qs.length+'</b></div><div class="mini-kpi"><span>Entregas</span><b>'+ds.length+'</b></div></div><h2>Seguimientos</h2><div class="timeline-list">'+(fs.length?fs.map(function(f){return '<div class="timeline-item"><span class="timeline-dot"></span><div><b>'+fd(f.date)+' · '+esc(f.channel)+'</b><p>'+esc(f.result)+' · Próximo: '+fd(f.next)+'</p></div></div>'}).join(''):'<div class="note">Sin seguimientos registrados.</div>')+'</div><h2 style="margin-top:16px">Entregas</h2>'+ds.slice(0,4).map(function(d){return '<div class="alert '+(d.st==='No entregado'?'red':'')+'"><b>'+d.id+' · '+esc(d.st)+'</b><p>'+(d.deliveredAt?'Entregado '+fdt(d.deliveredAt)+' por '+esc(driverName(d.driver)):fd(d.date)+' · '+esc(driverName(d.driver)))+'</p></div>'}).join('')+'</div></div>';
}
function addHabitual(cid){var c=C(cid);if(!c.sites.length)return msg('El cliente necesita una sede');openM('Agregar producto habitual','<div class="form"><div class="field"><label>Sede</label><select id="hs">'+c.sites.map(function(s){return '<option value="'+s.id+'">'+esc(s.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Producto</label><select id="hp">'+S.products.map(function(p){return '<option value="'+p.id+'">'+esc(p.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Cantidad habitual</label><input type="number" id="hq" value="1"></div><div class="field"><label>Frecuencia días</label><input type="number" id="hf" value="30"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveHabitual(\''+cid+'\')">Guardar</button>')}
function saveHabitual(cid){var s=Site(document.getElementById('hs').value);s.m.push({p:document.getElementById('hp').value,q:+document.getElementById('hq').value||1,f:+document.getElementById('hf').value||30,last:iso(now)});log(me().name+' agregó producto habitual a '+C(cid).n);closeM();save();msg('Producto habitual agregado')}
function newFollowup(cid){openM('Registrar seguimiento','<div class="form"><div class="field"><label>Canal</label><select id="fc"><option>WhatsApp</option><option>Llamada</option><option>Email</option><option>Visita</option><option>Cotización</option><option>Otro</option></select></div><div class="field"><label>Fecha</label><input type="date" id="fd" value="'+iso(now)+'"></div><div class="field full"><label>Resultado</label><input id="fr" placeholder="¿Qué ocurrió?"></div><div class="field full"><label>Próximo seguimiento</label><input type="date" id="fn" value="'+add(now,7)+'"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveFollowup(\''+cid+'\')">Guardar seguimiento</button>')}
function saveFollowup(cid){var c=C(cid),u=me();S.followups.unshift({id:'f'+Date.now(),seller:c.seller,c:cid,date:document.getElementById('fd').value,channel:document.getElementById('fc').value,result:document.getElementById('fr').value||'Seguimiento registrado',next:document.getElementById('fn').value});S.tasks.push({id:'t'+Date.now(),seller:c.seller,c:cid,date:document.getElementById('fn').value,time:'09:00',action:'Seguimiento '+c.n,note:document.getElementById('fr').value,done:false});log(u.name+' registró seguimiento de '+c.n);closeM();save();msg('Seguimiento registrado y agregado a agenda')}
function openWhatsApp(cid,custom,onOpen){var c=C(cid),lo=lastOrder(cid),msgText=custom||('Hola '+c.contact+', ¿cómo estás? Soy '+me().name+' de PROACTIF CARE. Quería hacer seguimiento de su cuenta'+(lo?', cuya última compra registrada fue el '+fd(lo.date):'')+'. ¿Necesitan reposición o podemos ayudarlos con algún producto?');window._waAfter=onOpen||null;openM('Mensaje de WhatsApp','<div class="field"><label>Mensaje automático editable</label><textarea class="input" id="wmsg">'+esc(msgText)+'</textarea></div><div class="note" style="margin-top:10px">Se abrirá WhatsApp con el mensaje preparado. No utiliza una API de WhatsApp en esta demo.</div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="launchWhatsApp(\''+cid+'\')">Abrir WhatsApp</button>')}
function launchWhatsApp(cid){var c=C(cid),text=document.getElementById('wmsg').value,phone=waNumber(c.phone);if(window._waAfter)window._waAfter();S.followups.unshift({id:'f'+Date.now(),seller:c.seller,c:cid,date:iso(now),channel:'WhatsApp',result:'Mensaje de seguimiento preparado desde el sistema.',next:add(now,7)});log(me().name+' contactó por WhatsApp a '+c.n);save(true);closeM();render();if(phone)window.open('https://wa.me/'+phone+'?text='+encodeURIComponent(text),'_blank');else msg('Cliente sin WhatsApp cargado')}

function renderPortal(){var el=document.getElementById('portal'),u=me();if(u.role==='driver'){el.innerHTML='';return}var cs=permittedClients(),c=C(selected);if(!c||!cs.some(function(x){return x.id===c.id}))c=cs[0];if(!c){el.innerHTML='';return}el.innerHTML='<div class="hero"><div><h1>Portal del cliente · vista demostrativa</h1><p>Cómo un cliente podría consultar productos habituales y repetir una solicitud.</p></div></div><div class="note">Vista conceptual. No representa un portal productivo ni un acceso externo habilitado.</div><div class="card panel"><h2>'+esc(c.n)+'</h2><div class="products">'+c.sites.flatMap(function(s){return s.m.map(function(m){return '<div class="card product"><small>'+esc(s.n)+'</small><h3>'+esc(P(m.p).n)+'</h3><p>Habitual: '+m.q+' u. cada '+m.f+' días</p><button class="btn primary" style="margin-top:8px" onclick="prepPortal(\''+c.id+'\',\''+s.id+'\',\''+m.p+'\')">Solicitar reposición</button></div>'})}).join('')+'</div></div>'}
function prepPortal(cid,sid,pid){var c=C(cid),s=Site(sid),m=s.m.find(function(x){return x.p===pid}),id='O-'+(1013+S.orders.length);S.orders.unshift({id:id,c:cid,s:sid,seller:c.seller,date:iso(now),req:add(now,5),deliveryDate:add(now,5),st:'Recibido',amount:0,it:[{p:pid,q:m.q}]});log('Portal demo generó solicitud '+id+' de '+c.n);save();msg('Solicitud creada en pedidos')}

function renderHygiene(){var el=document.getElementById('hygiene'),u=me();if(u.role==='driver'){el.innerHTML='';return}el.innerHTML='<div class="hero"><div><h1>Sistema de higiene</h1><p>Registro conceptual de soluciones definidas por área para cada cuenta.</p></div></div><div class="grid split"><div class="card panel"><h2>Hotel Demo · solución demostrativa</h2><div class="alert"><b>Habitaciones</b><p>Papeles, dispensadores y consumibles definidos para la operación.</p></div><div class="alert"><b>Baños públicos</b><p>Higiene de manos, papel y dispensadores.</p></div><div class="alert"><b>Cocina</b><p>Químicos y elementos de limpieza profesional.</p></div></div><div class="card panel"><h2>Objetivo</h2><p style="font-size:11px;color:var(--muted)">Conservar dentro de la cuenta el conocimiento de qué solución fue definida por PROACTIF para cada área, sin depender de la memoria de una sola persona.</p></div></div>'}

function restoreDemo(){if(confirm('¿Restaurar todos los datos originales de la demo avanzada?')){S=seed();localStorage.setItem(K,JSON.stringify(S));selected='c1';activeView='dash';render();go('dash');msg('Demo restaurada')}}
document.getElementById('nav').onclick=function(e){var b=e.target.closest('button[data-v]');if(b)go(b.getAttribute('data-v'))};
document.getElementById('mb').onclick=function(e){if(e.target.id==='mb')closeM()};
document.getElementById('loginPass').addEventListener('keydown',function(e){if(e.key==='Enter')login()});
boot();
