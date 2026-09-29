    function submitLead(){
      const id='D-'+String(Math.floor(200+Math.random()*700));
      const newLead={id,name:wizard.name,phone:wizard.phone,email:wizard.email||'No informado',interest:wizard.project||'A definir con asesor',goal:wizard.goal,budget:wizard.budget||'A definir',timing:wizard.timing,status:'Nuevo',source:'Demo web',created:'Ahora',notes:wizard.message?[wizard.message]:[],followup:''};
      leads.unshift(newLead);persist();renderDashboard();
      const body=document.getElementById('wizardBody');document.getElementById('progressBar').style.width='100%';
      body.innerHTML=`<div class="success-icon">✓</div><span class="eyebrow">Consulta creada</span><h2 id="wizardTitle">La oportunidad ya está en la vista IMCOPAR.</h2><p class="sub">En una implementación real, este punto podría disparar las notificaciones o integraciones que IMCOPAR decida utilizar.</p><div class="summary-box"><div class="summary-row"><span>ID demostrativo</span><strong>${id}</strong></div><div class="summary-row"><span>Interés</span><strong>${esc(newLead.interest)}</strong></div><div class="summary-row"><span>Estado inicial</span><strong>Nuevo</strong></div></div>`;
      document.getElementById('wizardFoot').innerHTML=`<button class="btn btn-light" onclick="closeWizard()">Cerrar</button><button class="btn btn-primary" onclick="closeWizard();switchMode('staff');setTimeout(()=>openLead('${id}'),200)">Ver cómo lo recibe IMCOPAR →</button>`;
    }

