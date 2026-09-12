(function(){
 const D=structuredClone(window.DEVIN_DATA); const nav=document.getElementById('studioNav'); const panel=document.getElementById('studioPanel');
 const sections=[{id:'profile',label:'Profile'},{id:'mustang',label:'Mustang'},...D.projects.map((p,i)=>({id:'p'+i,label:p.title}))];
 nav.innerHTML=sections.map((s,i)=>`<button data-id="${s.id}" class="${i===0?'active':''}">${s.label}</button>`).join('');
 function field(label,key,val,type='text'){return `<div class="field"><label>${label}</label>${type==='textarea'?`<textarea data-key="${key}">${val||''}</textarea>`:`<input data-key="${key}" value="${String(val||'').replaceAll('"','&quot;')}">`}</div>`}
 function show(id){
   nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.id===id));
   let obj,title;
   if(id==='profile'){obj=D.profile;title='Profile';}
   else if(id==='mustang'){obj=D.mustang;title='1966 Mustang';}
   else{obj=D.projects[Number(id.slice(1))];title=obj.title;}
   let html=`<div class="eyebrow">Editing / ${title}</div><h2 style="font:900 2.5rem var(--condensed);margin:8px 0 20px;text-transform:uppercase">${title}</h2>`;
   for(const [k,v] of Object.entries(obj)){
      if(Array.isArray(v)||typeof v==='object') continue;
      html+=field(k.replace(/([A-Z])/g,' $1'),k,v,(String(v).length>90?'textarea':'text'));
   }
   html+=`<div class="studio-actions"><button class="btn primary" id="saveLocal">Save browser draft</button><button class="btn" id="exportJson">Export JSON</button><button class="btn" id="resetLocal">Reset draft</button></div><div class="studio-note">Browser draft changes stay on this device. Export JSON when you want a portable content backup.</div>`;
   panel.innerHTML=html;
   panel.querySelectorAll('[data-key]').forEach(el=>el.addEventListener('input',()=>{obj[el.dataset.key]=el.value;}));
   panel.querySelector('#saveLocal').onclick=()=>{localStorage.setItem('devinPortfolioDraft',JSON.stringify(D));alert('Draft saved in this browser.');};
   panel.querySelector('#exportJson').onclick=()=>{const blob=new Blob([JSON.stringify(D,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='devin-portfolio-content.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),700);};
   panel.querySelector('#resetLocal').onclick=()=>{localStorage.removeItem('devinPortfolioDraft');location.reload();};
 }
 nav.addEventListener('click',e=>{const b=e.target.closest('button');if(b)show(b.dataset.id)}); show('profile');
})();
