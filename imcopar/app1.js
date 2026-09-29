
    const projects = [
      {id:'portal', name:'Portal de Itá', city:'Itá', price:'Gs. 1.200.000', desc:'Frente al peaje de Itá, sobre Ruta I. Servicios básicos y calles empedradas.', image:null},
      {id:'guarapi', name:'Guarapí', city:'Yaguarón', price:'Gs. 350.000', desc:'A 15 minutos del centro de Yaguarón. Agua potable, energía eléctrica y calles empedradas.', image:null},
      {id:'brisas', name:'Brisas del Sur', city:'Guarambaré', price:'Gs. 1.100.000', desc:'Ubicación en Guarambaré. Agua potable, energía eléctrica, calles asfaltadas y empedradas.', image:null},
      {id:'mbaritu', name:'Mbaritu', city:'Yaguarón', price:'Gs. 500.000', desc:'A 2 minutos del centro de Yaguarón. Agua potable, energía eléctrica y calles empedradas.', image:null}
    ];

    const seedLeads = [
      {id:'D-104',name:'María González',phone:'098X 111 234',email:'maria.demo@example.com',interest:'Guarapí',goal:'Construir vivienda',budget:'Hasta Gs. 500.000',timing:'Próximos 3 meses',status:'Seguimiento',source:'Demo web',created:'Hoy · 09:42',notes:['Solicitó conocer opciones de visita.'],followup:'Mañana · 10:30'},
      {id:'D-103',name:'Carlos Benítez',phone:'097X 321 880',email:'carlos.demo@example.com',interest:'Portal de Itá',goal:'Inversión',budget:'Gs. 1.000.000 a 1.500.000',timing:'Estoy explorando',status:'Contactado',source:'Demo web',created:'Ayer · 16:18',notes:['Contacto inicial registrado como demostración.'],followup:'Viernes · 15:00'},
      {id:'D-102',name:'Laura Martínez',phone:'099X 908 442',email:'laura.demo@example.com',interest:'Brisas del Sur',goal:'Construir vivienda',budget:'Gs. 1.000.000 a 1.500.000',timing:'Quiero avanzar pronto',status:'Visita coordinada',source:'Demo web',created:'Ayer · 11:07',notes:['Visita simulada coordinada para mostrar trazabilidad.'],followup:'Jueves · 09:00'},
      {id:'D-101',name:'Diego Ramírez',phone:'098X 223 119',email:'diego.demo@example.com',interest:'Mbaritu',goal:'Inversión',budget:'Hasta Gs. 500.000',timing:'Próximos 6 meses',status:'Nuevo',source:'Demo web',created:'Lun · 13:22',notes:[],followup:''}
    ];
    const STORAGE_KEY='imcopar-demo-v2-leads';
    let leads = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || seedLeads;
    let wizard = {step:1, project:null, mode:null, city:null, budget:null, goal:null, timing:null, name:'',phone:'',email:'',message:''};
    let activeLeadId = null;

    function persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(leads)); }
    function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
    function renderProjects(){
      document.getElementById('projectGrid').innerHTML = projects.map(p=>`<article class="project">
        <div class="project-media ${p.id}"><span class="visual-label">Visual conceptual</span><span class="location-chip">${p.city}</span></div>
        <div class="project-body"><div><h3>${p.name}</h3><p>${p.desc}</p></div><div class="price"><small>Desde</small> ${p.price}</div>
        <div class="project-actions"><button onclick="projectDetail('${p.id}')">Ver detalle</button><button class="interest" onclick="startWizard('${p.id}')">Me interesa</button></div></div>
      </article>`).join('');
    }
    function projectDetail(id){
      const p=projects.find(x=>x.id===id); if(!p)return;
      wizard={step:0,project:p.name,mode:'specific',city:p.city,budget:null,goal:null,timing:null,name:'',phone:'',email:'',message:''};
      document.getElementById('wizardOverlay').classList.remove('hidden');
      document.getElementById('wizardBody').innerHTML=`<span class="eyebrow">${p.city}</span><h2 id="wizardTitle">${p.name}</h2><p class="sub">${p.desc}</p><div class="summary-box"><div class="summary-row"><span>Referencia publicada</span><strong>Desde ${p.price}</strong></div><div class="summary-row"><span>Disponibilidad</span><strong>A confirmar con el equipo comercial</strong></div></div><p class="source-note">Esta demo no confirma stock, lotes específicos ni condiciones finales.</p>`;
      document.getElementById('progressBar').style.width='8%';
      document.getElementById('wizardFoot').innerHTML=`<button class="btn btn-light" onclick="closeWizard()">Cerrar</button><button class="btn btn-primary" onclick="startWizard('${p.id}')">Consultar este loteamiento →</button>`;
    }
    function startWizard(projectId=null){
      const p=projects.find(x=>x.id===projectId);
      wizard={step:p?2:1,project:p?.name||null,mode:p?'specific':null,city:p?.city||null,budget:null,goal:null,timing:null,name:'',phone:'',email:'',message:''};
      document.getElementById('wizardOverlay').classList.remove('hidden'); renderWizard();
    }
    function closeWizard(){document.getElementById('wizardOverlay').classList.add('hidden')}
    function choose(key,value){wizard[key]=value; if(wizard.step<6) wizard.step++; renderWizard();}
    function backWizard(){if(wizard.step>1){wizard.step--;renderWizard()}else closeWizard()}
    function selected(v,current){return v===current?'selected':''}
