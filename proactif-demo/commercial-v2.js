/* PROACTIF CARE — Commercial v2 demo
   Extiende la demo existente sin conectar APIs reales.
   CRM y Microsoft Dynamics 365 Business Central se representan con eventos locales de demostración.
*/
(function(){
  var SECTORS=['Salud','Gastronomía','Hotelería','Institucional','Industria alimenticia','Corporativo','Grandes áreas','Limpieza general'];
  var catalogClientId=null;
  var baseRender=render;
  var baseDriverDashboard=renderDriverDashboard;

  function ensureUser(id,data){
    var u=U(id);
    if(!u){S.users.push(data);u=data}
    Object.keys(data).forEach(function(k){if(u[k]==null)u[k]=data[k]});
    return u
  }
  function sectorCanonical(s){
    s=String(s||'');
    if(s==='Educación'||s==='Instituciones Educativas')return'Institucional';
    if(s==='Industria Demo'||s==='Industrias Alimenticias')return'Industria alimenticia';
    return s
  }
  function enhanceState(){
    ensureUser('g1',{id:'g1',username:'gerencia',password:'444',role:'management',name:'Gerencia PROACTIF Demo',active:true});
    ensureUser('sup1',{id:'sup1',username:'supervisor1',password:'555',role:'supervisor',name:'Supervisor Comercial Demo',active:true});
    var u1=U('u1'),u2=U('u2');
    if(u1){u1.supervisor='sup1';u1.whatsapp=u1.whatsapp||'0982000011'}
    if(u2){u2.supervisor='sup1';u2.whatsapp=u2.whatsapp||'0982000022'}
    S.targets=S.targets||[
      {id:'tm-u1',seller:'u1',supervisor:'sup1',cadence:'month',type:'amount',value:60000000,month:currentMonth(),active:true,createdAt:stamp(),createdBy:'sup1'},
      {id:'td-u1',seller:'u1',supervisor:'sup1',cadence:'day',type:'amount',value:3000000,date:iso(now),active:true,createdAt:stamp(),createdBy:'sup1'},
      {id:'tp-u1',seller:'u1',supervisor:'sup1',cadence:'month',type:'quantity',value:1200,product:'p1',month:currentMonth(),active:true,createdAt:stamp(),createdBy:'sup1'},
      {id:'tm-u2',seller:'u2',supervisor:'sup1',cadence:'month',type:'amount',value:50000000,month:currentMonth(),active:true,createdAt:stamp(),createdBy:'sup1'},
      {id:'td-u2',seller:'u2',supervisor:'sup1',cadence:'day',type:'amount',value:2500000,date:iso(now),active:true,createdAt:stamp(),createdBy:'sup1'}
    ];
    S.salesInvoices=S.salesInvoices||[
      {id:'BC-1048',seller:'u1',c:'c1',date:iso(now),amount:4800000,status:'Posted',source:'Business Central · demo',items:[{p:'p1',q:120},{p:'p2',q:40}]},
      {id:'BC-1047',seller:'u2',c:'c3',date:iso(now),amount:3100000,status:'Posted',source:'Business Central · demo',items:[{p:'p8',q:7}]},
      {id:'BC-1046',seller:'u1',c:'c2',date:add(now,-1),amount:6400000,status:'Posted',source:'Business Central · demo',items:[{p:'p4',q:28},{p:'p2',q:22}]},
      {id:'BC-1045',seller:'u2',c:'c4',date:add(now,-2),amount:4900000,status:'Posted',source:'Business Central · demo',items:[{p:'p1',q:90}]},
      {id:'BC-1044',seller:'u1',c:'c5',date:add(now,-3),amount:8500000,status:'Posted',source:'Business Central · demo',items:[{p:'p1',q:300},{p:'p7',q:8}]},
      {id:'BC-1043',seller:'u2',c:'c6',date:add(now,-5),amount:8100000,status:'Posted',source:'Business Central · demo',items:[{p:'p2',q:95},{p:'p3',q:4}]},
      {id:'BC-1042',seller:'u1',c:'c1',date:add(now,-7),amount:10200000,status:'Posted',source:'Business Central · demo',items:[{p:'p1',q:240},{p:'p5',q:20}]},
      {id:'BC-1041',seller:'u2',c:'c3',date:add(now,-10),amount:6300000,status:'Posted',source:'Business Central · demo',items:[{p:'p8',q:10},{p:'p9',q:16}]},
      {id:'BC-1040',seller:'u1',c:'c2',date:add(now,-12),amount:7900000,status:'Posted',source:'Business Central · demo',items:[{p:'p4',q:35},{p:'p2',q:30}]}
    ];
    var sectorMap={
      p1:['Salud','Gastronomía','Hotelería','Institucional','Industria alimenticia','Corporativo','Grandes áreas','Limpieza general'],
      p2:['Salud','Gastronomía','Hotelería','Institucional','Industria alimenticia','Corporativo','Grandes áreas','Limpieza general'],
      p3:['Salud','Gastronomía','Hotelería','Institucional','Corporativo'],
      p4:['Salud','Gastronomía','Hotelería','Institucional','Industria alimenticia','Corporativo'],
      p5:['Salud','Gastronomía','Hotelería','Institucional','Industria alimenticia'],
      p6:['Salud','Gastronomía','Hotelería','Institucional','Corporativo'],
      p7:['Salud','Gastronomía','Hotelería','Industria alimenticia','Grandes áreas','Limpieza general'],
      p8:['Industria alimenticia','Grandes áreas','Limpieza general'],
      p9:['Industria alimenticia','Gastronomía','Limpieza general'],
      p10:['Salud','Gastronomía','Hotelería','Institucional','Corporativo']
    };
    S.products.forEach(function(p){p.sectors=p.sectors||sectorMap[p.id]||SECTORS.slice();p.imageData=p.imageData||''});
    S.clients.forEach(function(c){c.sector=sectorCanonical(c.sector);c.source=c.source||'CRM · demo'});
    localStorage.setItem(K,JSON.stringify(S))
  }

  function teamSellerIds(supervisorId){
    return S.users.filter(function(x){return x.role==='seller'&&x.supervisor===supervisorId}).map(function(x){return x.id})
  }
  function sellersVisible(){
    var u=me();if(!u)return[];
    if(u.role==='seller')return[u];
    if(u.role==='supervisor'){var ids=teamSellerIds(u.id);return S.users.filter(function(x){return ids.indexOf(x.id)>=0})}
    return S.users.filter(function(x){return x.role==='seller'})
  }
  function invoicesForSeller(uid,dayOnly){
    return (S.salesInvoices||[]).filter(function(i){
      if(i.seller!==uid||i.status!=='Posted')return false;
      if(dayOnly)return i.date===iso(now);
      return monthKey(i.date)===currentMonth()
    })
  }
  function soldToday(uid){return invoicesForSeller(uid,true).reduce(function(n,i){return n+(i.amount||0)},0)}
  function projection(uid){
    var sales=sellerSales(uid),day=Math.max(1,new Date().getDate()),days=new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate();
    return Math.round(sales/day*days)
  }
  function currentTarget(uid,cadence,type,product){
    var list=(S.targets||[]).filter(function(t){
      if(t.seller!==uid||t.cadence!==cadence||t.type!==type||t.active===false)return false;
      if(product!=null&&(t.product||'')!==(product||''))return false;
      if(product==null&&t.product)return false;
      return cadence==='day'?t.date===iso(now):t.month===currentMonth()
    }).sort(function(a,b){return String(b.createdAt||'').localeCompare(String(a.createdAt||''))});
    return list[0]||null
  }
  function monthlyTarget(uid){var t=currentTarget(uid,'month','amount',null);return t?t.value:(U(uid).target||0)}
  function dailyTarget(uid){var t=currentTarget(uid,'day','amount',null);return t?t.value:0}
  function quantitySold(uid,product,cadence){
    var inv=(S.salesInvoices||[]).filter(function(i){return i.seller===uid&&i.status==='Posted'&&(cadence==='day'?i.date===iso(now):monthKey(i.date)===currentMonth())});
    return inv.reduce(function(sum,i){return sum+(i.items||[]).filter(function(x){return !product||x.p===product}).reduce(function(a,x){return a+(x.q||0)},0)},0)
  }
  function pct(v,t){return t?Math.round(v/t*100):0}
  function capPct(v){return Math.max(0,Math.min(100,v))}
  function sellerGroupLabel(uid){var s=U(uid),sp=s&&s.supervisor?U(s.supervisor):null;return sp?sp.name:'Sin supervisor'}
  function monthDaily(uid){
    var day=new Date().getDate(),out=[];
    for(var d=1;d<=day;d++){
      var val=(S.salesInvoices||[]).filter(function(i){var x=new Date(i.date+'T12:00:00');return i.seller===uid&&i.status==='Posted'&&x.getFullYear()===now.getFullYear()&&x.getMonth()===now.getMonth()&&x.getDate()===d}).reduce(function(n,i){return n+(i.amount||0)},0);
      out.push({d:d,v:val})
    }
    return out
  }
  function sparkline(uid){
    var data=monthDaily(uid),w=440,h=135,pad=16,max=Math.max.apply(null,data.map(function(x){return x.v}).concat([dailyTarget(uid)||1])),pts=data.map(function(x,i){var xx=pad+(w-pad*2)*(data.length===1?0:i/(data.length-1)),yy=h-pad-(h-pad*2)*(x.v/max);return xx.toFixed(1)+','+yy.toFixed(1)}).join(' ');
    var dt=dailyTarget(uid),targetY=h-pad-(h-pad*2)*(dt/max);
    return '<div class="chart-box"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Ventas facturadas diarias"><line x1="'+pad+'" y1="'+(h-pad)+'" x2="'+(w-pad)+'" y2="'+(h-pad)+'" stroke="#dde6ee"/>'+(dt?'<line x1="'+pad+'" y1="'+targetY+'" x2="'+(w-pad)+'" y2="'+targetY+'" stroke="#e2a63b" stroke-dasharray="5 5"/><text x="'+(w-pad)+'" y="'+(targetY-5)+'" text-anchor="end" class="chart-label">meta diaria</text>':'')+'<polyline fill="none" stroke="#276aab" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="'+pts+'"/>'+data.map(function(x,i){var a=pts.split(' ')[i].split(',');return '<circle cx="'+a[0]+'" cy="'+a[1]+'" r="3" fill="#4aa8df"><title>Día '+x.d+': '+money(x.v)+'</title></circle>'}).join('')+'<text x="'+pad+'" y="'+(h-2)+'" class="chart-axis">Día 1</text><text x="'+(w-pad)+'" y="'+(h-2)+'" text-anchor="end" class="chart-axis">Hoy</text></svg></div>'
  }

  roleLabel=function(r){return r==='admin'?'Administración':r==='management'?'Dirección / Gerencia':r==='supervisor'?'Supervisor de ventas':r==='seller'?'Vendedor':'Conductor'};

  permittedClients=function(){
    var u=me();if(!u)return[];
    if(u.role==='admin'||u.role==='management')return S.clients.slice();
    if(u.role==='supervisor'){var ids=teamSellerIds(u.id);return S.clients.filter(function(c){return ids.indexOf(c.seller)>=0})}
    if(u.role==='seller')return clientsForSeller(u.id);
    if(u.role==='driver'){var d={};S.delivery.filter(function(x){return x.driver===u.id}).forEach(function(x){d[x.c]=1});return S.clients.filter(function(c){return d[c.id]})}
    return[]
  };
  permittedOrders=function(){
    var u=me();if(!u)return[];
    if(u.role==='admin'||u.role==='management')return S.orders.slice();
    if(u.role==='supervisor'){var ids=teamSellerIds(u.id);return S.orders.filter(function(o){return ids.indexOf(o.seller)>=0})}
    if(u.role==='seller'){var cs={};clientsForSeller(u.id).forEach(function(c){cs[c.id]=1});return S.orders.filter(function(o){return cs[o.c]})}
    if(u.role==='driver'){var os={};S.delivery.filter(function(d){return d.driver===u.id}).forEach(function(d){os[d.o]=1});return S.orders.filter(function(o){return os[o.id]})}
    return[]
  };
  permittedQuotes=function(){
    var u=me();if(!u)return[];
    if(u.role==='admin'||u.role==='management')return S.quotes.slice();
    if(u.role==='supervisor'){var ids=teamSellerIds(u.id);return S.quotes.filter(function(q){return ids.indexOf(q.seller)>=0})}
    if(u.role==='seller'){var cs={};clientsForSeller(u.id).forEach(function(c){cs[c.id]=1});return S.quotes.filter(function(q){return cs[q.c]})}
    return[]
  };
  permittedDeliveries=function(){
    var u=me();if(!u)return[];
    if(u.role==='admin'||u.role==='management')return S.delivery.slice();
    if(u.role==='supervisor'){var ids=teamSellerIds(u.id);return S.delivery.filter(function(d){return ids.indexOf(d.seller)>=0})}
    if(u.role==='seller'){var cs={};clientsForSeller(u.id).forEach(function(c){cs[c.id]=1});return S.delivery.filter(function(d){return cs[d.c]})}
    if(u.role==='driver')return S.delivery.filter(function(d){return d.driver===u.id});
    return[]
  };
  permittedWebRequests=function(){
    var u=me();if(!u)return[];
    if(u.role==='admin'||u.role==='management')return S.webRequests.slice();
    if(u.role==='supervisor'){var ids=teamSellerIds(u.id);return S.webRequests.filter(function(r){return ids.indexOf(r.seller)>=0})}
    if(u.role==='seller')return S.webRequests.filter(function(r){return r.seller===u.id});
    return[]
  };
  sellerSales=function(uid){return invoicesForSeller(uid,false).reduce(function(n,i){return n+(i.amount||0)},0)};
  clientSales=function(cid){return (S.salesInvoices||[]).filter(function(i){return i.c===cid&&i.status==='Posted'}).reduce(function(n,i){return n+(i.amount||0)},0)};

  renderNav=function(){
    var u=me(),items=[];
    if(u.role==='admin')items=[['dash','▦ Dashboard'],['team','👥 Equipo comercial'],['targets','◎ Metas & proyección'],['discounts','% Descuentos'],['clients','◉ Clientes & sedes'],['reps','↻ Reposiciones'],['orders','▤ Pedidos'],['quotes','₲ Cotizaciones'],['delivery','▰ Entregas'],['report','▥ Reporte entregas'],['catalog','▥ Catálogo por rubro'],['client360','◎ Cliente 360'],['portal','✉ Solicitudes web'],['integrations','⟲ Integraciones'],['hygiene','✦ Soluciones por área']];
    if(u.role==='management')items=[['dash','▦ Dashboard gerencial'],['team','👥 Equipos de venta'],['targets','◎ Metas & proyección'],['discounts','% Descuentos'],['clients','◉ Clientes'],['catalog','▥ Catálogo por rubro'],['integrations','⟲ Integraciones']];
    if(u.role==='supervisor')items=[['dash','▦ Mi equipo'],['team','👥 Mis vendedores'],['targets','◎ Metas & proyección'],['discounts','% Descuentos'],['clients','◉ Clientes del equipo'],['reps','↻ Reposiciones'],['orders','▤ Pedidos'],['catalog','▥ Catálogo por rubro']];
    if(u.role==='seller')items=[['dash','▦ Mi dashboard'],['targets','◎ Mis metas'],['discounts','% Mis descuentos'],['agenda','◷ Mi agenda'],['clients','◉ Mi cartera'],['reps','↻ Reposiciones'],['orders','▤ Pedidos'],['quotes','₲ Cotizaciones'],['delivery','▰ Entregas'],['catalog','▥ Catálogo por rubro'],['client360','◎ Cliente 360'],['portal','✉ Solicitudes web'],['hygiene','✦ Soluciones por área']];
    if(u.role==='driver')items=[['dash','▦ Mi jornada'],['delivery','▰ Mis entregas']];
    document.getElementById('nav').innerHTML=items.map(function(i){return '<button data-v="'+i[0]+'" class="'+(i[0]===activeView?'active':'')+'">'+i[1]+'</button>'}).join('');
    document.getElementById('sideNote').innerHTML=u.role==='driver'?'Acceso operativo de logística. Solo muestra entregas asignadas al conductor.':'Demo funcional V2 · Los eventos CRM y Business Central se simulan localmente hasta disponer de las APIs reales.'
  };

  go=function(id){
    var u=me();if(!u)return;
    if(u.role==='driver'&&['dash','delivery'].indexOf(id)<0)id='dash';
    activeView=id;document.querySelectorAll('.view').forEach(function(v){v.classList.toggle('active',v.id===id)});
    document.querySelectorAll('.nav button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-v')===id)});
    var n={dash:u.role==='driver'?'Mi jornada':u.role==='seller'?'Mi dashboard':u.role==='supervisor'?'Mi equipo comercial':'Dashboard gerencial',team:u.role==='supervisor'?'Mis vendedores':'Equipo comercial',targets:'Metas y proyección',discounts:'Descuentos y autorizaciones',agenda:'Mi agenda',clients:u.role==='seller'?'Mi cartera':'Clientes empresariales',reps:'Reposiciones próximas',orders:'Pedidos',quotes:'Cotizaciones',delivery:u.role==='driver'?'Mis entregas':'Entregas',report:'Reporte de entregas',catalog:'Catálogo por rubro',client360:'Cliente 360',portal:'Solicitudes web',integrations:'Integraciones',hygiene:'Soluciones por área'};
    document.getElementById('title').textContent=n[id]||'PROACTIF CARE';
    window.scrollTo({top:0,behavior:'smooth'})
  };

  renderDashboard=function(){
    var u=me(),el=document.getElementById('dash');
    if(u.role==='driver'){baseDriverDashboard();return}
    if(u.role==='seller'){
      var ms=sellerSales(u.id),ds=soldToday(u.id),mt=monthlyTarget(u.id),dt=dailyTarget(u.id),mp=pct(ms,mt),dp=pct(ds,dt),proj=projection(u.id),missing=Math.max(0,mt-ms);
      el.innerHTML='<div class="hero"><div><h1>'+greeting()+', '+esc(u.name)+'</h1><p>Ventas facturadas, metas y proyección comercial en una sola vista.</p></div><span class="v2-badge demo">Business Central · datos demo</span></div>'+
      '<div class="note">Una venta suma al resultado únicamente cuando la factura figura como emitida/contabilizada en Business Central. En esta demo los eventos son locales.</div>'+
      '<div class="v2-grid v2-kpis"><div class="card v2-kpi"><label>Facturado hoy</label><strong>'+money(ds)+'</strong><small>'+dp+'% de la meta diaria</small></div><div class="card v2-kpi"><label>Meta diaria</label><strong>'+money(dt)+'</strong></div><div class="card v2-kpi"><label>Facturado mes</label><strong>'+money(ms)+'</strong></div><div class="card v2-kpi"><label>Meta mensual</label><strong>'+money(mt)+'</strong></div><div class="card v2-kpi"><label>Falta para meta</label><strong>'+money(missing)+'</strong></div><div class="card v2-kpi"><label>Proyección de cierre</label><strong>'+money(proj)+'</strong><small>Ritmo actual del mes</small></div></div>'+
      '<div class="projection-layout"><div class="card projection-card"><div class="projection-head"><div><h2>Avance mensual</h2><p>Solo ventas facturadas.</p></div><span class="v2-badge '+(mp>=100?'live':'')+'">'+mp+'%</span></div><div class="goal-wrap"><div class="goal-ring" style="--pct:'+capPct(mp)+'"><div><strong>'+mp+'%</strong><span>cumplimiento</span></div></div><div class="goal-copy"><div class="row"><span>Vendido</span><b>'+money(ms)+'</b></div><div class="row"><span>Meta</span><b>'+money(mt)+'</b></div><div class="row"><span>Proyección</span><b>'+money(proj)+'</b></div></div></div></div>'+
      '<div class="card projection-card"><div class="projection-head"><div><h2>Ritmo diario</h2><p>Facturación registrada durante el mes.</p></div></div>'+sparkline(u.id)+'</div></div>';
      return
    }
    var sellers=sellersVisible(),total=sellers.reduce(function(n,s){return n+sellerSales(s.id)},0),today=sellers.reduce(function(n,s){return n+soldToday(s.id)},0),target=sellers.reduce(function(n,s){return n+monthlyTarget(s.id)},0),proj=sellers.reduce(function(n,s){return n+projection(s.id)},0),pc=pct(total,target);
    el.innerHTML='<div class="hero"><div><h1>'+(u.role==='supervisor'?'Dashboard de equipo':'Dashboard gerencial')+'</h1><p>Facturación real, metas y proyección por vendedor y equipo.</p></div>'+(u.role==='supervisor'?'<button class="btn primary" onclick="go(\'targets\')">Gestionar metas</button>':'<span class="v2-badge demo">Business Central · simulación funcional</span>')+'</div>'+
    '<div class="v2-grid v2-kpis"><div class="card v2-kpi"><label>Facturado hoy</label><strong>'+money(today)+'</strong></div><div class="card v2-kpi"><label>Facturado mes</label><strong>'+money(total)+'</strong></div><div class="card v2-kpi"><label>Meta total</label><strong>'+money(target)+'</strong></div><div class="card v2-kpi"><label>Cumplimiento</label><strong>'+pc+'%</strong></div><div class="card v2-kpi"><label>Falta para meta</label><strong>'+money(Math.max(0,target-total))+'</strong></div><div class="card v2-kpi"><label>Proyección cierre</label><strong>'+money(proj)+'</strong></div></div>'+
    '<div class="projection-layout"><div class="card projection-card"><div class="projection-head"><div><h2>Ventas por vendedor</h2><p>Comparación contra meta mensual vigente.</p></div></div><div class="rank-list" style="margin-top:12px">'+sellers.map(function(s){var v=sellerSales(s.id),t=monthlyTarget(s.id),p=pct(v,t);return '<div class="rank-row"><div><h3>'+esc(s.name)+'</h3><p>'+esc(sellerGroupLabel(s.id))+'</p></div><div class="rank-meter"><span style="width:'+capPct(p)+'%"></span></div><div class="rank-value"><b>'+money(v)+'</b><small>'+p+'% de '+money(t)+'</small></div></div>'}).join('')+'</div></div>'+
    '<div class="card projection-card"><div class="projection-head"><div><h2>Lectura ejecutiva</h2><p>Estado general del mes.</p></div></div><div class="goal-wrap"><div class="goal-ring" style="--pct:'+capPct(pc)+'"><div><strong>'+pc+'%</strong><span>meta total</span></div></div><div class="goal-copy"><div class="row"><span>Facturado</span><b>'+money(total)+'</b></div><div class="row"><span>Objetivo</span><b>'+money(target)+'</b></div><div class="row"><span>Proyección</span><b>'+money(proj)+'</b></div></div></div></div></div>'
  };

  renderTeam=function(){
    var el=document.getElementById('team'),u=me();if(['admin','management','supervisor'].indexOf(u.role)<0){el.innerHTML='';return}
    var sellers=sellersVisible();
    el.innerHTML='<div class="hero"><div><h1>'+(u.role==='supervisor'?'Mis vendedores':'Equipo comercial')+'</h1><p>Resultados facturados, responsables, metas y proyección.</p></div>'+(u.role==='admin'?'<button class="btn primary" onclick="newSeller()">+ Nuevo vendedor</button>':'')+'</div><div class="team-grid">'+sellers.map(function(s){var cs=S.clients.filter(function(c){return c.seller===s.id}),sales=sellerSales(s.id),target=monthlyTarget(s.id),pr=projection(s.id),pc=pct(sales,target);return '<div class="card team-card"><div class="team-card-head"><div><h3>'+esc(s.name)+'</h3><p>'+esc(s.username)+' · '+cs.length+' clientes · '+esc(s.whatsapp||'WhatsApp no cargado')+'</p></div><span class="role-hint">VENDEDOR</span></div><div class="mini-kpis"><div class="mini-kpi"><span>Facturado mes</span><b>'+money(sales)+'</b></div><div class="mini-kpi"><span>Meta</span><b>'+money(target)+'</b></div><div class="mini-kpi"><span>Proyección</span><b>'+money(pr)+'</b></div></div><div class="progress"><span style="width:'+capPct(pc)+'%"></span></div><div style="margin-top:12px" class="target-actions">'+((u.role==='supervisor'||u.role==='admin')?'<button class="btn primary" onclick="openTargetModal(\''+s.id+'\')">Asignar meta</button>':'')+(u.role==='admin'?'<button class="btn" onclick="assignClient(\''+s.id+'\')">Asignar cliente</button><button class="btn" onclick="assignSupervisor(\''+s.id+'\')">Supervisor</button>':'')+'</div></div>'}).join('')+'</div>'
  };

  function targetProgress(t){
    var actual=t.type==='amount'?(t.cadence==='day'?soldToday(t.seller):sellerSales(t.seller)):quantitySold(t.seller,t.product,t.cadence);
    return {actual:actual,p:pct(actual,t.value)}
  }
  function targetTitle(t){
    if(t.type==='amount')return (t.cadence==='day'?'Meta diaria':'Meta mensual')+' · Monto';
    return (t.cadence==='day'?'Meta diaria':'Meta mensual')+' · Cantidad'+(t.product?' · '+P(t.product).n:'')
  }
  window.renderSalesTargets=function(){
    var el=document.getElementById('targets'),u=me();if(!el||u.role==='driver'){if(el)el.innerHTML='';return}
    var sellers=sellersVisible(),valid=(S.targets||[]).filter(function(t){return t.active!==false&&(t.cadence==='day'?t.date===iso(now):t.month===currentMonth())&&sellers.some(function(s){return s.id===t.seller})});
    el.innerHTML='<div class="hero"><div><h1>'+(u.role==='seller'?'Mis metas':'Metas y proyección')+'</h1><p>Metas variables por monto, cantidad o producto, con avance calculado desde facturas emitidas.</p></div>'+(u.role==='supervisor'||u.role==='admin'?'<button class="btn primary" onclick="openTargetModal()">+ Nueva meta</button>':'')+'</div>'+
    '<div class="note">Gerencia define la estrategia comercial. El supervisor asigna y ajusta las metas de sus vendedores. Cada cambio queda registrado en la demo.</div>'+
    '<div class="team-grid">'+(valid.length?valid.map(function(t){var s=U(t.seller),r=targetProgress(t);return '<div class="card target-card"><div class="team-card-head"><div><h3>'+esc(s?s.name:'Vendedor')+'</h3><p>'+esc(targetTitle(t))+'</p></div><span class="v2-badge">'+r.p+'%</span></div><div class="target-progress"><div class="head"><span>Avance</span><b>'+(t.type==='amount'?money(r.actual):r.actual+' u.')+' / '+(t.type==='amount'?money(t.value):t.value+' u.')+'</b></div><div class="progress"><span style="width:'+capPct(r.p)+'%"></span></div></div><div class="target-history"><small>Asignada por '+esc(U(t.createdBy)?U(t.createdBy).name:'Usuario')+' · '+(t.cadence==='day'?fd(t.date):esc(t.month))+'</small></div></div>'}).join(''):'<div class="note">No hay metas vigentes.</div>')+'</div>'
  };

  window.openTargetModal=function(sellerId){
    var u=me();if(['admin','supervisor'].indexOf(u.role)<0)return msg('Solo Administración o el Supervisor pueden asignar metas en esta demo');
    var sellers=sellersVisible();if(sellerId)sellers=sellers.filter(function(s){return s.id===sellerId});
    if(!sellers.length)return msg('No hay vendedores disponibles');
    openM('Asignar meta comercial','<div class="form"><div class="field"><label>Vendedor</label><select id="tgSeller">'+sellers.map(function(s){return '<option value="'+s.id+'">'+esc(s.name)+'</option>'}).join('')+'</select></div><div class="field"><label>Periodo</label><select id="tgCadence"><option value="month">Mensual</option><option value="day">Diaria</option></select></div><div class="field"><label>Tipo de meta</label><select id="tgType" onchange="targetTypeChanged()"><option value="amount">Monto facturado (₲)</option><option value="quantity">Cantidad de unidades</option></select></div><div class="field" id="tgProductWrap" style="display:none"><label>Producto específico</label><select id="tgProduct"><option value="">Todos los productos</option>'+S.products.map(function(p){return '<option value="'+p.id+'">'+esc(p.n)+'</option>'}).join('')+'</select></div><div class="field full"><label>Meta</label><input type="number" id="tgValue" min="1" value="50000000"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveTarget()">Guardar meta</button>')
  };
  window.targetTypeChanged=function(){var q=document.getElementById('tgType').value==='quantity';document.getElementById('tgProductWrap').style.display=q?'grid':'none';document.getElementById('tgValue').value=q?'100':'50000000'};
  window.saveTarget=function(){
    var u=me(),seller=document.getElementById('tgSeller').value,cad=document.getElementById('tgCadence').value,type=document.getElementById('tgType').value,value=+document.getElementById('tgValue').value,product=type==='quantity'?document.getElementById('tgProduct').value:'';
    if(!value||value<1)return msg('Ingresá una meta válida');
    S.targets.push({id:'tg'+Date.now(),seller:seller,supervisor:U(seller).supervisor||'',cadence:cad,type:type,value:value,product:product||'',date:cad==='day'?iso(now):'',month:cad==='month'?currentMonth():'',active:true,createdAt:stamp(),createdBy:u.id});
    log(u.name+' asignó una meta a '+sellerName(seller));closeM();save();go('targets');msg('Meta actualizada')
  };

  window.assignSupervisor=function(sellerId){
    if(me().role!=='admin')return msg('Solo Administración puede cambiar supervisores');
    var sups=S.users.filter(function(x){return x.role==='supervisor'}),s=U(sellerId);
    openM('Asignar supervisor','<div class="field"><label>Vendedor</label><input value="'+esc(s.name)+'" disabled></div><div class="field" style="margin-top:10px"><label>Supervisor</label><select id="supSel">'+sups.map(function(x){return '<option value="'+x.id+'" '+(s.supervisor===x.id?'selected':'')+'>'+esc(x.name)+'</option>'}).join('')+'</select></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveSupervisor(\''+sellerId+'\')">Guardar</button>')
  };
  window.saveSupervisor=function(sellerId){var s=U(sellerId);s.supervisor=document.getElementById('supSel').value;log('Administración asignó supervisor a '+s.name);closeM();save();msg('Supervisor actualizado')};

  function productCard(p){
    var media=p.imageData?'<img src="'+p.imageData+'" alt="'+esc(p.n)+'">':'<div class="product-placeholder"><b>'+esc((p.b||'PC').slice(0,2).toUpperCase())+'</b><span>Imagen pendiente de PROACTIF</span></div>';
    return '<div class="card product-v2" data-name="'+esc((p.n+' '+p.b+' '+p.c+' '+p.cat).toLowerCase())+'" data-cat="'+esc(p.cat)+'" data-sectors="'+esc((p.sectors||[]).join('|'))+'"><div class="product-media">'+media+'</div><div class="product-body"><small>'+esc(p.b)+' · '+esc(p.cat)+'</small><h3>'+esc(p.n)+'</h3><p>Código: '+esc(p.c)+'</p><p>Stock demo: <b>'+p.stock+'</b> · Fuente futura: CRM</p><div class="product-sectors">'+(p.sectors||[]).slice(0,4).map(function(s){return '<span class="sector-chip">'+esc(s)+'</span>'}).join('')+((p.sectors||[]).length>4?'<span class="sector-chip">+'+((p.sectors||[]).length-4)+'</span>':'')+'</div><div class="product-actions">'+(me().role==='seller'?'<button class="btn primary small" onclick="offerProduct(\''+p.id+'\')">Ofrecer por WhatsApp</button>':'')+(me().role==='admin'?'<button class="btn small" onclick="uploadProductImage(\''+p.id+'\')">Cargar imagen</button>':'')+'</div></div></div>'
  }
  renderCatalog=function(){
    var el=document.getElementById('catalog'),u=me();if(u.role==='driver'){el.innerHTML='';return}
    var clients=permittedClients(),cats=Array.from(new Set(S.products.map(function(p){return p.cat}))),selectedClient=catalogClientId?C(catalogClientId):null,sec=selectedClient?sectorCanonical(selectedClient.sector):'';
    el.innerHTML='<div class="hero"><div><h1>Catálogo por rubro</h1><p>Productos clasificados para mostrar rápidamente qué puede ofrecerse a cada tipo de cliente.</p></div><span class="v2-badge demo">Stock/precio: origen CRM en producción</span></div>'+
    '<div class="client-offer-note"><b>Flujo previsto:</b> Administración registra/asigna el cliente → se identifica su rubro → el catálogo filtra automáticamente las soluciones aplicables. Las fotografías reales serán incorporadas cuando PROACTIF las entregue.</div>'+
    '<div class="toolbar">'+(clients.length?'<select id="catClient" class="input" onchange="catalogClientChanged()"><option value="">Filtrar según cliente…</option>'+clients.map(function(c){return '<option value="'+c.id+'" '+(catalogClientId===c.id?'selected':'')+'>'+esc(c.n)+' · '+esc(c.sector)+'</option>'}).join('')+'</select>':'')+'<select id="catSector" class="input" onchange="filterCatalogV2()"><option value="">Todos los rubros</option>'+SECTORS.map(function(s){return '<option value="'+s+'" '+(sec===s?'selected':'')+'>'+esc(s)+'</option>'}).join('')+'</select><select id="catCat" class="input" onchange="filterCatalogV2()"><option value="">Todas las categorías</option>'+cats.map(function(c){return '<option value="'+c+'">'+esc(c)+'</option>'}).join('')+'</select><input id="catSearch" class="input" placeholder="Buscar producto, marca o código…" oninput="filterCatalogV2()"></div>'+
    (selectedClient?'<div class="note">Mostrando productos compatibles con <b>'+esc(selectedClient.n)+'</b> · '+esc(selectedClient.sector)+'.</div>':'')+
    '<div class="catalog-v2" id="catalogV2">'+S.products.map(productCard).join('')+'</div>';
    setTimeout(filterCatalogV2,0)
  };
  window.filterCatalogV2=function(){
    var sec=document.getElementById('catSector'),cat=document.getElementById('catCat'),search=document.getElementById('catSearch');if(!sec||!cat||!search)return;
    var s=sec.value,c=cat.value,q=search.value.trim().toLowerCase();
    document.querySelectorAll('#catalogV2 .product-v2').forEach(function(card){var ok=(!s||card.getAttribute('data-sectors').split('|').indexOf(s)>=0)&&(!c||card.getAttribute('data-cat')===c)&&(!q||card.getAttribute('data-name').indexOf(q)>=0);card.style.display=ok?'':'none'})
  };
  window.catalogClientChanged=function(){var x=document.getElementById('catClient');catalogClientId=x&&x.value?x.value:null;var c=catalogClientId?C(catalogClientId):null,sel=document.getElementById('catSector');if(sel)sel.value=c?sectorCanonical(c.sector):'';filterCatalogV2()};
  window.uploadProductImage=function(pid){
    if(me().role!=='admin')return;
    openM('Imagen de producto','<div class="field"><label>'+esc(P(pid).n)+'</label><input id="prodImg" type="file" accept="image/png,image/jpeg,image/webp"></div><div class="note" style="margin-top:10px">Demo: la imagen se guarda únicamente en este navegador. En producción se almacenará en el servidor/almacenamiento definido.</div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveProductImage(\''+pid+'\')">Guardar imagen</button>')
  };
  window.saveProductImage=function(pid){var f=document.getElementById('prodImg').files[0];if(!f)return msg('Seleccioná una imagen');if(f.size>1500000)return msg('Para la demo usá una imagen menor a 1,5 MB');var rd=new FileReader();rd.onload=function(){P(pid).imageData=rd.result;log('Administración agregó imagen a '+P(pid).n);closeM();save();go('catalog');msg('Imagen cargada')};rd.readAsDataURL(f)};
  window.offerProduct=function(pid){
    if(me().role!=='seller')return msg('La oferta por WhatsApp corresponde al vendedor');
    var cs=permittedClients();if(!cs.length)return msg('No tenés clientes asignados');
    if(catalogClientId&&cs.some(function(c){return c.id===catalogClientId}))return offerProductForClient(pid,catalogClientId);
    openM('Elegir cliente','<div class="field"><label>Cliente</label><select id="offerClient">'+cs.map(function(c){return '<option value="'+c.id+'">'+esc(c.n)+' · '+esc(c.sector)+'</option>'}).join('')+'</select></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="offerProductForClient(\''+pid+'\',document.getElementById(\'offerClient\').value)">Preparar mensaje</button>')
  };
  window.offerProductForClient=function(pid,cid){closeM();var p=P(pid),c=C(cid),u=me();var text='Hola '+c.n+', ¿cómo están? Soy '+u.name+' de PROACTIF CARE. Quería compartirles una opción que puede ser útil para su operación: '+p.n+' ('+p.b+', '+p.c+'). Si les interesa, podemos revisar cantidad y disponibilidad.';openWhatsApp(cid,text)};

  openWhatsApp=function(cid,custom,onOpen){
    var c=C(cid),lo=lastPurchase(cid),u=me(),sender=u.role==='seller'?u:U(c.seller)||u,msgText=custom||('Hola '+c.n+', ¿cómo están? Soy '+sender.name+' de PROACTIF CARE. Quería hacer seguimiento de su cuenta'+(lo?', cuya última compra registrada fue el '+fd(lo.date):'')+'. ¿Necesitan reposición o podemos ayudarlos con algún producto?');
    window._waAfter=onOpen||null;
    openM('Mensaje de WhatsApp','<div class="note"><b>Vendedor responsable:</b> '+esc(sender.name)+' · <b>Número comercial demo:</b> '+esc(sender.whatsapp||'A definir')+'</div><div class="field"><label>Mensaje preestablecido y editable</label><textarea class="input" id="wmsg">'+esc(msgText)+'</textarea></div><div class="note" style="margin-top:10px">Al abrir WhatsApp, el envío se realiza desde la cuenta iniciada en el dispositivo del vendedor. Esta demo no utiliza WhatsApp Business API.</div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="launchWhatsApp(\''+cid+'\')">Abrir WhatsApp</button>')
  };

  newClient=function(){
    if(me().role!=='admin')return msg('El alta y asignación de clientes corresponde a Administración');
    var sellers=S.users.filter(function(x){return x.role==='seller'});
    openM('Alta administrativa de cliente','<div class="note">Demo del alta que en producción podrá sincronizarse desde el CRM. Administración clasifica el rubro y asigna al vendedor.</div><div class="form"><div class="field"><label>Empresa</label><input id="v2cn"></div><div class="field"><label>RUC</label><input id="v2cr"></div><div class="field"><label>Rubro / área</label><select id="v2cs">'+SECTORS.map(function(s){return '<option>'+esc(s)+'</option>'}).join('')+'</select></div><div class="field"><label>Vendedor</label><select id="v2cv">'+sellers.map(function(s){return '<option value="'+s.id+'">'+esc(s.name)+'</option>'}).join('')+'</select></div><div class="field"><label>Contacto</label><input id="v2cc"></div><div class="field"><label>WhatsApp cliente</label><input id="v2cp" placeholder="09..."></div><div class="field"><label>Email</label><input id="v2ce"></div><div class="field"><label>Sede inicial</label><input id="v2csite" value="Sede Principal"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveV2Client()">Crear y ver oferta</button>')
  };
  window.saveV2Client=function(){
    var n=document.getElementById('v2cn').value.trim();if(!n)return msg('Ingresá el nombre de la empresa');
    var cid='c'+Date.now(),sid='s'+Date.now(),seller=document.getElementById('v2cv').value;
    S.clients.push({id:cid,n:n,ruc:document.getElementById('v2cr').value.trim(),sector:document.getElementById('v2cs').value,contact:document.getElementById('v2cc').value.trim(),phone:document.getElementById('v2cp').value.trim(),email:document.getElementById('v2ce').value.trim(),seller:seller,access:[],commercialStatus:'Nuevo',preferred:'WhatsApp',source:'CRM · demo',notes:'Alta administrativa demostrativa.',sites:[{id:sid,n:document.getElementById('v2csite').value.trim()||'Sede Principal',address:'Dirección a confirmar',m:[]}]});
    log('Administración dio de alta '+n+' y lo asignó a '+sellerName(seller));catalogClientId=cid;closeM();save(true);render();go('catalog');msg('Cliente creado. Catálogo filtrado por su rubro')
  };

  window.renderIntegrations=function(){
    var el=document.getElementById('integrations'),u=me();if(!el||['admin','management'].indexOf(u.role)<0){if(el)el.innerHTML='';return}
    var inv=(S.salesInvoices||[]).slice().sort(function(a,b){return new Date(b.date)-new Date(a.date)}).slice(0,8);
    el.innerHTML='<div class="hero"><div><h1>Integraciones</h1><p>Cómo se conectarán los sistemas existentes de PROACTIF con la plataforma.</p></div><span class="v2-badge demo">MODO DEMOSTRACIÓN</span></div>'+
    '<div class="note"><b>Importante:</b> esta pantalla no realiza llamadas a APIs reales. Simula el flujo para validar comportamiento antes de disponer de credenciales y documentación del CRM y Business Central.</div>'+
    '<div class="v2-grid integration-grid"><div class="card integration-card"><span class="v2-badge demo">API confirmada · nombre pendiente</span><h3>CRM de PROACTIF</h3><p>Fuente prevista para clientes, productos, stock y precios. Evita doble carga.</p></div><div class="card integration-card"><span class="v2-badge live">Sistema identificado</span><h3>Microsoft Dynamics 365 Business Central</h3><p>La factura emitida/contabilizada es el evento que confirma una venta y actualiza metas y proyección.</p></div><div class="card integration-card"><span class="v2-badge">Por vendedor</span><h3>WhatsApp</h3><p>Mensaje preestablecido, editable y adaptado al cliente/producto. El envío se abre desde la cuenta del vendedor.</p></div></div>'+
    '<div class="card panel" style="margin-top:12px"><h2>Flujo validado</h2><div class="integration-flow"><div class="integration-node">Administración / Vendedor</div><div class="integration-arrow">→</div><div class="integration-node">CRM</div><div class="integration-arrow">→</div><div class="integration-node">Business Central · factura</div></div><div class="integration-flow"><div class="integration-node">Factura confirmada</div><div class="integration-arrow">→</div><div class="integration-node">Sistema PROACTIF</div><div class="integration-arrow">→</div><div class="integration-node">Dashboard · Meta · Proyección</div></div><div class="target-actions"><button class="btn primary" onclick="simulateBCInvoice()">Simular nueva factura BC</button>'+(u.role==='admin'?'<button class="btn" onclick="newClient()">Simular alta desde CRM</button>':'')+'</div></div>'+
    '<div class="card panel" style="margin-top:12px"><h2>Últimas facturas demostrativas</h2><div class="sync-list">'+inv.map(function(i){return '<div class="sync-row"><div><b>'+esc(i.id)+' · '+esc(C(i.c)?C(i.c).n:'Cliente')+'</b><p>'+esc(sellerName(i.seller))+' · '+fd(i.date)+' · '+esc(i.source)+'</p></div><div><b>'+money(i.amount)+'</b><br><span class="status ok">FACTURADA</span></div></div>'}).join('')+'</div></div>'
  };
  window.simulateBCInvoice=function(){
    var sellers=S.users.filter(function(x){return x.role==='seller'}),clients=S.clients;
    openM('Simular factura emitida en Business Central','<div class="note">Esta acción crea un evento local de prueba. Al confirmar, el dashboard del vendedor, supervisor y gerencia se actualiza inmediatamente.</div><div class="form"><div class="field"><label>Vendedor</label><select id="bcSeller">'+sellers.map(function(s){return '<option value="'+s.id+'">'+esc(s.name)+'</option>'}).join('')+'</select></div><div class="field"><label>Cliente</label><select id="bcClient">'+clients.map(function(c){return '<option value="'+c.id+'">'+esc(c.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Monto facturado</label><input id="bcAmount" type="number" value="3500000" min="1"></div><div class="field"><label>Producto</label><select id="bcProduct">'+S.products.map(function(p){return '<option value="'+p.id+'">'+esc(p.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Cantidad</label><input id="bcQty" type="number" value="10" min="1"></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveBCInvoice()">Emitir factura demo</button>')
  };
  window.saveBCInvoice=function(){
    var amount=+document.getElementById('bcAmount').value;if(!amount)return msg('Ingresá un monto válido');
    var id='BC-'+(1100+(S.salesInvoices||[]).length),seller=document.getElementById('bcSeller').value,cid=document.getElementById('bcClient').value,pid=document.getElementById('bcProduct').value,qty=+document.getElementById('bcQty').value||1;
    S.salesInvoices.unshift({id:id,seller:seller,c:cid,date:iso(now),amount:amount,status:'Posted',source:'Business Central · simulación local',items:[{p:pid,q:qty}],postedAt:stamp()});
    log('Business Central confirmó factura '+id+' para '+sellerName(seller),'admin');closeM();save();go('integrations');msg('Factura confirmada: dashboards actualizados')
  };

  restoreDemo=function(){
    if(confirm('¿Restaurar todos los datos originales de la demo V2?')){S=seed();enhanceState();localStorage.setItem(K,JSON.stringify(S));selected='c1';catalogClientId=null;activeView='dash';render();go('dash');msg('Demo V2 restaurada')}
  };

  render=function(){
    baseRender();
    renderSalesTargets();
    renderDiscounts();
    renderIntegrations();
    renderNav()
  };


  function enhanceDiscountState(){
    S.discountRequests=S.discountRequests||[
      {id:'DSC-1001',orderId:'O-1010',seller:'u1',supervisor:'sup1',c:'c2',requestedPct:8,reason:'Cliente solicita una condición especial por volumen para cerrar la compra.',status:'Pendiente',createdAt:stamp(),resolvedAt:'',resolvedBy:''}
    ];
    S.orders.forEach(function(o){
      if(o.listAmount==null)o.listAmount=o.amount||0;
      if(o.discountPct==null)o.discountPct=0;
      if(o.discountApproval==null)o.discountApproval=o.discountPct>5?'Pendiente':(o.discountPct>0?'Autorizado vendedor':'No aplica');
      if(o.discountPct<=5&&o.amount==null)o.amount=Math.round((o.listAmount||0)*(1-o.discountPct/100));
    });
    var sample=S.orders.find(function(o){return o.id==='O-1010'});
    if(sample&&!sample.discountRequestId){
      sample.listAmount=sample.listAmount||sample.amount||9200000;
      sample.discountPct=8;
      sample.discountRequestId='DSC-1001';
      sample.discountApproval='Pendiente';
      sample.pendingNet=Math.round(sample.listAmount*.92);
      sample.amount=sample.listAmount;
      if(sample.st!=='Entregado')sample.st='Pendiente aprobación descuento';
    }
    localStorage.setItem(K,JSON.stringify(S))
  }

  function discountRequestsVisible(){
    var u=me(),all=S.discountRequests||[];
    if(!u)return[];
    if(u.role==='seller')return all.filter(function(x){return x.seller===u.id});
    if(u.role==='supervisor')return all.filter(function(x){return x.supervisor===u.id});
    if(u.role==='admin'||u.role==='management')return all.slice();
    return[]
  }
  function discountBadge(s){
    var cls=s==='Aprobada'?'ok':s==='Rechazada'?'red':s==='Pendiente'?'warn':'blue';
    return '<span class="status '+cls+'">'+esc(s)+'</span>'
  }
  function discountNet(list,p){return Math.round((Number(list)||0)*(1-(Number(p)||0)/100))}
  function nextDiscountId(){return 'DSC-'+(1001+(S.discountRequests||[]).length)}
  function requestDiscount(order,pct,reason){
    var seller=U(order.seller),supervisor=seller&&seller.supervisor?U(seller.supervisor):null;
    if(!supervisor)return {ok:false,error:'Este vendedor todavía no tiene un supervisor asignado.'};
    (S.discountRequests||[]).filter(function(x){return x.orderId===order.id&&x.status==='Pendiente'}).forEach(function(x){x.status='Reemplazada';x.resolvedAt=stamp()});
    var req={id:nextDiscountId(),orderId:order.id,seller:order.seller,supervisor:supervisor.id,c:order.c,requestedPct:pct,reason:reason,status:'Pendiente',createdAt:stamp(),resolvedAt:'',resolvedBy:''};
    S.discountRequests.unshift(req);
    order.discountPct=pct;order.discountRequestId=req.id;order.discountApproval='Pendiente';order.pendingNet=discountNet(order.listAmount,pct);order.amount=order.listAmount;order.st='Pendiente aprobación descuento';
    log(sellerName(order.seller)+' solicitó '+pct+'% de descuento para '+order.id);
    return {ok:true,request:req}
  }

  window.discountPctChanged=function(){
    var p=Number(document.getElementById('odisc')?document.getElementById('odisc').value:0)||0,wrap=document.getElementById('discountReasonWrap');
    if(wrap)wrap.style.display=p>5?'grid':'none';
    updateOrderDiscountPreview()
  };
  window.updateOrderDiscountPreview=function(){
    var total=Number(document.getElementById('oa')?document.getElementById('oa').value:0)||0,p=Number(document.getElementById('odisc')?document.getElementById('odisc').value:0)||0,el=document.getElementById('discountPreview');
    if(!el)return;
    p=Math.max(0,Math.min(100,p));
    var net=discountNet(total,p),approval=p>5?'Requiere autorización del supervisor':'Dentro de la autonomía del vendedor (máx. 5%)';
    el.innerHTML='<b>Total con descuento: '+money(net)+'</b><br><span>'+p+'% · '+esc(approval)+'</span>'
  };

  newOrder=function(cid){
    var cs=permittedClients(),c0=C(cid)||cs[0];if(!c0)return msg('No hay clientes disponibles');
    var u=me();if(['seller','admin'].indexOf(u.role)<0)return msg('Este perfil es de consulta/supervisión');
    openM('Crear pedido con política de descuento','<div class="discount-policy"><b>Política comercial demo</b><span>El vendedor puede aplicar hasta 5% sin autorización. Más de 5% genera una solicitud automática a su supervisor con porcentaje y motivo.</span></div><div class="form"><div class="field"><label>Cliente</label><select id="oc" onchange="fillSites()">'+cs.map(function(x){return '<option value="'+x.id+'" '+(x.id===c0.id?'selected':'')+'>'+esc(x.n)+'</option>'}).join('')+'</select></div><div class="field"><label>Sede</label><select id="os">'+c0.sites.map(function(s){return '<option value="'+s.id+'">'+esc(s.n)+'</option>'}).join('')+'</select></div><div class="field full"><div class="field-head"><label>Productos</label><button type="button" class="btn small" onclick="addOrderItem()">+ Agregar producto</button></div><div id="orderItems">'+orderItemRow()+'</div></div><div class="field"><label>Fecha requerida</label><input type="date" id="or" value="'+add(now,5)+'"></div><div class="field"><label>Fecha prevista entrega</label><input type="date" id="od" value="'+add(now,5)+'"></div><div class="field"><label>Subtotal / precio lista (CRM demo)</label><input type="number" id="oa" value="0" min="0" oninput="updateOrderDiscountPreview()"></div><div class="field"><label>Descuento (%)</label><input type="number" id="odisc" value="0" min="0" max="100" step="0.1" oninput="discountPctChanged()"></div><div class="field full" id="discountReasonWrap" style="display:none"><label>Motivo obligatorio para solicitar más de 5%</label><textarea class="input" id="odiscReason" placeholder="Ej.: volumen de compra, cierre de negociación, condición especial del cliente…"></textarea></div><div class="field full"><div class="discount-preview" id="discountPreview"><b>Total con descuento: '+money(0)+'</b><br><span>0% · Dentro de la autonomía del vendedor (máx. 5%)</span></div></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveOrder()">Crear pedido</button>')
  };

  saveOrder=function(){
    var cid=document.getElementById('oc').value,c0=C(cid),sid=document.getElementById('os').value;if(!sid)return msg('El cliente necesita una sede');
    var items=Array.from(document.querySelectorAll('#orderItems .order-item')).map(function(row){return{p:row.querySelector('.opi').value,q:+row.querySelector('.oqi').value||1}});
    if(!items.length)return msg('Agregá al menos un producto');
    var list=+document.getElementById('oa').value||0,p=Math.max(0,Math.min(100,+document.getElementById('odisc').value||0)),reason=(document.getElementById('odiscReason')?document.getElementById('odiscReason').value.trim():'');
    if(p>5&&!reason)return msg('Para solicitar más de 5% tenés que indicar el motivo');
    var id='O-'+(1013+S.orders.length),order={id:id,c:cid,s:sid,seller:c0.seller,date:iso(now),req:document.getElementById('or').value,deliveryDate:document.getElementById('od').value,st:'Recibido',listAmount:list,discountPct:p,discountApproval:p>5?'Pendiente':(p>0?'Autorizado vendedor':'No aplica'),amount:p<=5?discountNet(list,p):list,pendingNet:p>5?discountNet(list,p):null,it:items};
    S.orders.unshift(order);
    if(p>5){var rr=requestDiscount(order,p,reason);if(!rr.ok){S.orders.shift();return msg(rr.error)}}
    log(me().name+' creó pedido '+id+' para '+c0.n+(p?' con '+p+'% de descuento':''));
    closeM();save();
    if(p>5){go('discounts');msg('Solicitud enviada al supervisor')}else msg('Pedido creado · descuento autorizado')
  };

  window.editOrderDiscount=function(oid){
    var o=S.orders.find(function(x){return x.id===oid});if(!o)return;
    var u=me();if(u.role!=='seller'||o.seller!==u.id)return msg('Solo el vendedor responsable puede ajustar este descuento');
    openM('Ajustar descuento · '+o.id,'<div class="discount-policy"><b>Autonomía: hasta 5%</b><span>Una solicitud superior a 5% quedará pendiente de aprobación de tu supervisor.</span></div><div class="form"><div class="field"><label>Precio lista</label><input value="'+money(o.listAmount||o.amount||0)+'" disabled></div><div class="field"><label>Nuevo descuento (%)</label><input type="number" id="editDisc" min="0" max="100" step="0.1" value="'+(o.discountPct||0)+'" oninput="document.getElementById(\'editDiscReasonWrap\').style.display=(+this.value>5?\'grid\':\'none\')"></div><div class="field full" id="editDiscReasonWrap" style="display:'+(o.discountPct>5?'grid':'none')+'"><label>Motivo si supera 5%</label><textarea id="editDiscReason" class="input" placeholder="Explicá la razón comercial de la excepción"></textarea></div></div>','<button class="btn" onclick="closeM()">Cancelar</button><button class="btn primary" onclick="saveOrderDiscount(\''+oid+'\')">Guardar / solicitar</button>')
  };
  window.saveOrderDiscount=function(oid){
    var o=S.orders.find(function(x){return x.id===oid}),p=Math.max(0,Math.min(100,+document.getElementById('editDisc').value||0)),reason=document.getElementById('editDiscReason').value.trim();
    if(p>5&&!reason)return msg('Indicá el motivo de la solicitud');
    if(p<=5){
      (S.discountRequests||[]).filter(function(x){return x.orderId===oid&&x.status==='Pendiente'}).forEach(function(x){x.status='Cancelada';x.resolvedAt=stamp()});
      o.discountPct=p;o.discountApproval=p?'Autorizado vendedor':'No aplica';o.amount=discountNet(o.listAmount,p);o.pendingNet=null;o.discountRequestId='';if(o.st==='Pendiente aprobación descuento'||o.st==='Descuento rechazado')o.st='Recibido';
      log(me().name+' ajustó '+oid+' a '+p+'% dentro de su autonomía');closeM();save();msg('Descuento aplicado')
    }else{
      var rr=requestDiscount(o,p,reason);if(!rr.ok)return msg(rr.error);closeM();save();go('discounts');msg('Nueva solicitud enviada al supervisor')
    }
  };

  renderOrders=function(){
    var el=document.getElementById('orders'),u=me();if(u.role==='driver'){el.innerHTML='';return}var os=permittedOrders(),canCreate=['seller','admin'].indexOf(u.role)>=0;
    el.innerHTML='<div class="hero"><div><h1>Pedidos</h1><p>Seguimiento comercial, descuentos y operación desde la solicitud hasta la entrega.</p></div>'+(canCreate?'<div><button class="btn" onclick="repeatOrder()">Repetir anterior</button> <button class="btn primary" onclick="newOrder()">+ Crear pedido</button></div>':'')+'</div><div class="discount-policy"><b>Descuento comercial</b><span>Hasta 5%: autonomía del vendedor. Más de 5%: requiere autorización del supervisor con porcentaje solicitado y motivo.</span></div><div class="table"><table><thead><tr><th>Pedido</th><th>Cliente / sede</th><th>Vendedor</th><th>Lista</th><th>Descuento</th><th>Total / solicitado</th><th>Estado</th><th>Acción</th></tr></thead><tbody>'+os.map(function(o){var list=o.listAmount!=null?o.listAmount:o.amount||0,p=o.discountPct||0,discountInfo=p?'<b>'+p+'%</b><br>'+discountBadge(o.discountApproval==='Aprobada'?'Aprobada':o.discountApproval==='Rechazada'?'Rechazada':o.discountApproval==='Pendiente'?'Pendiente':o.discountApproval):'<span class="status">0%</span>',total=o.discountApproval==='Pendiente'?money(o.pendingNet)+'<br><small>si se aprueba</small>':money(o.amount||0);return '<tr><td><b>'+o.id+'</b><br><small>'+o.it.length+' producto(s)</small></td><td>'+esc(C(o.c).n)+'<br><small>'+esc(Site(o.s)?Site(o.s).n:'')+'</small></td><td>'+esc(sellerName(o.seller))+'</td><td>'+money(list)+'</td><td>'+discountInfo+'</td><td>'+total+'</td><td><span class="status '+sc(o.st)+'">'+esc(o.st)+'</span></td><td><div class="action-stack">'+(u.role==='seller'&&o.seller===u.id?'<button class="btn small" onclick="editOrderDiscount(\''+o.id+'\')">Ajustar descuento</button>':'')+'<select class="input action-select" onchange="handleOrderAction(this,\''+o.id+'\')"><option value="">Seleccionar acción…</option><option value="status:Borrador">Pasar a Borrador</option><option value="status:Recibido">Pasar a Recibido</option><option value="status:Cotizando">Pasar a Cotizando</option><option value="status:Confirmado">Pasar a Confirmado</option><option value="quote">Generar cotización</option>'+(u.role==='admin'?'<option value="delivery">Asignar entrega</option>':'')+'</select></div></td></tr>'}).join('')+'</tbody></table></div>'
  };

  window.renderDiscounts=function(){
    var el=document.getElementById('discounts'),u=me();if(!el||u.role==='driver'){if(el)el.innerHTML='';return}
    var rs=discountRequestsVisible().sort(function(a,b){return String(b.createdAt).localeCompare(String(a.createdAt))}),pending=rs.filter(function(x){return x.status==='Pendiente'}).length;
    el.innerHTML='<div class="hero"><div><h1>'+(u.role==='seller'?'Mis solicitudes de descuento':'Descuentos y autorizaciones')+'</h1><p>Control de excepciones comerciales superiores al 5% permitido al vendedor.</p></div><span class="v2-badge '+(pending?'demo':'live')+'">'+pending+' pendiente(s)</span></div><div class="discount-policy"><b>Regla vigente en la demo</b><span>0–5% se aplica directamente. Más de 5% queda bloqueado hasta que el supervisor responsable apruebe o rechace la excepción.</span></div>'+
    '<div class="discount-request-grid">'+(rs.length?rs.map(function(x){var o=S.orders.find(function(z){return z.id===x.orderId}),c0=C(x.c),canResolve=u.role==='supervisor'&&x.supervisor===u.id&&x.status==='Pendiente';return '<div class="card discount-request-card '+(x.status==='Pendiente'?'pending':'')+'"><div class="discount-request-head"><div><h3>'+esc(x.id)+' · '+esc(c0?c0.n:'Cliente')+'</h3><p>Pedido '+esc(x.orderId)+' · '+esc(sellerName(x.seller))+' → '+esc(U(x.supervisor)?U(x.supervisor).name:'Supervisor')+'</p></div><div class="discount-big">'+x.requestedPct+'%</div></div><div class="discount-reason"><b>Motivo de la solicitud</b><p>'+esc(x.reason)+'</p></div><div class="mini-kpis"><div class="mini-kpi"><span>Precio lista</span><b>'+money(o?o.listAmount:0)+'</b></div><div class="mini-kpi"><span>Total solicitado</span><b>'+money(o?discountNet(o.listAmount,x.requestedPct):0)+'</b></div><div class="mini-kpi"><span>Estado</span><b>'+x.status+'</b></div></div>'+(canResolve?'<div class="discount-approval-actions"><button class="btn good" onclick="approveDiscountRequest(\''+x.id+'\')">Aprobar '+x.requestedPct+'%</button><button class="btn bad" onclick="rejectDiscountRequest(\''+x.id+'\')">Rechazar</button></div>':'')+(x.resolvedAt?'<small class="discount-resolved">Resuelto '+fdt(x.resolvedAt)+' por '+esc(U(x.resolvedBy)?U(x.resolvedBy).name:'Usuario')+'</small>':'')+'</div>'}).join(''):'<div class="note">No hay solicitudes de descuento.</div>')+'</div>'
  };
  window.approveDiscountRequest=function(id){
    var u=me(),r=(S.discountRequests||[]).find(function(x){return x.id===id});if(!r)return;
    if(u.role!=='supervisor'||r.supervisor!==u.id)return msg('La aprobación corresponde al supervisor asignado');
    if(r.status!=='Pendiente')return msg('Esta solicitud ya fue resuelta');
    var o=S.orders.find(function(x){return x.id===r.orderId});r.status='Aprobada';r.resolvedAt=stamp();r.resolvedBy=u.id;
    if(o){o.discountPct=r.requestedPct;o.discountApproval='Aprobada';o.amount=discountNet(o.listAmount,r.requestedPct);o.pendingNet=null;if(o.st==='Pendiente aprobación descuento'||o.st==='Descuento rechazado')o.st='Recibido'}
    log(u.name+' aprobó '+r.requestedPct+'% de descuento en '+r.orderId);save();go('discounts');msg('Descuento aprobado')
  };
  window.rejectDiscountRequest=function(id){
    var u=me(),r=(S.discountRequests||[]).find(function(x){return x.id===id});if(!r)return;
    if(u.role!=='supervisor'||r.supervisor!==u.id)return msg('La decisión corresponde al supervisor asignado');
    if(r.status!=='Pendiente')return msg('Esta solicitud ya fue resuelta');
    var o=S.orders.find(function(x){return x.id===r.orderId});r.status='Rechazada';r.resolvedAt=stamp();r.resolvedBy=u.id;
    if(o){o.discountApproval='Rechazada';o.amount=o.listAmount;o.pendingNet=null;o.st='Descuento rechazado'}
    log(u.name+' rechazó '+r.requestedPct+'% de descuento en '+r.orderId);save();go('discounts');msg('Solicitud rechazada')
  };

  enhanceState();
  enhanceDiscountState();
  if(me())boot()
})();