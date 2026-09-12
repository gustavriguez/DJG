(function(){
  const D=window.DEVIN_DATA||{};
  const body=document.body;
  body.classList.add('motion');
  requestAnimationFrame(()=>body.classList.add('is-ready'));

  const navBtn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.nav');
  if(navBtn&&nav){navBtn.addEventListener('click',()=>nav.classList.toggle('open'));}

  document.querySelectorAll('[data-profile]').forEach(el=>{const k=el.dataset.profile;if(D.profile&&D.profile[k])el.textContent=D.profile[k];});
  document.querySelectorAll('[data-email]').forEach(el=>{if(D.profile){el.href='mailto:'+D.profile.email;el.textContent=D.profile.email;}});
  document.querySelectorAll('[data-linkedin]').forEach(el=>{if(D.profile)el.href=D.profile.linkedin;});

  const selected=document.getElementById('selectedProjects');
  if(selected&&D.projects){
    selected.innerHTML=D.projects.slice(0,3).map(p=>`<a class="project-card reveal ${p.image?'has-image':''}" href="${p.href}" ${p.image?`style="--card-image:url('${p.image}')"`:''}><span class="idx">${p.no}</span><span class="card-arrow">↗</span><div class="eyebrow">${p.kicker}</div><h3>${p.title}</h3><p>${p.summary}</p></a>`).join('');
  }
  const archive=document.getElementById('archiveList');
  if(archive&&D.projects){
    archive.innerHTML=D.projects.map(p=>`<a class="archive-row reveal" href="${p.href}" id="${p.id}"><span class="idx">${p.no}</span><h2>${p.title}</h2><p>${p.summary}</p><span class="open">Open ↗</span></a>`).join('');
  }

  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -40px'});
    reveals.forEach(el=>io.observe(el));
  }else reveals.forEach(el=>el.classList.add('in'));

  const heroMedia=document.querySelector('[data-parallax]');
  if(heroMedia&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    window.addEventListener('pointermove',e=>{
      const x=(e.clientX/window.innerWidth-.5)*8;
      const y=(e.clientY/window.innerHeight-.5)*6;
      heroMedia.style.setProperty('--px',x+'px');
      heroMedia.style.setProperty('--py',y+'px');
    },{passive:true});
  }

  document.querySelectorAll('a[href]').forEach(a=>{
    const h=a.getAttribute('href');
    if(!h||h.startsWith('#')||h.startsWith('mailto:')||h.startsWith('http')||a.target==='_blank')return;
    a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();body.classList.add('is-leaving');setTimeout(()=>location.href=h,360);});
  });
})();
