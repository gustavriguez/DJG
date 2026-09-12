(function(){
const commons=(file)=>'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file)+'?width=1600';
const page=(file)=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file).replace(/%20/g,'_');

const cars=[
 {name:'1967 Ford Mustang Fastback',origin:'USA',era:'1960s',type:'Pony car',file:'Ford Mustang Fastback 1967.jpg'},
 {name:'1969 Chevrolet Camaro',origin:'USA',era:'1960s',type:'Pony car',file:'1969 Chevrolet Camaro SS 350, red & black, vinyl top, front three-quarter view, A Paris Street Market at Aspen Grove car show 2026-05-02.jpg'},
 {name:'1970 Dodge Challenger',origin:'USA',era:'1970s',type:'Muscle car',file:'1970 Dodge Challenger R T.jpg'},
 {name:'1965 Shelby Cobra',origin:'USA',era:'1960s',type:'Roadster',file:'1965 Shelby Cobra 01.jpg'},
 {name:'Ferrari F40',origin:'Italy',era:'1980s',type:'Supercar',file:'Red Ferrari F40 Side View.jpg'},
 {name:'Lamborghini Countach',origin:'Italy',era:'1970s',type:'Supercar',file:'Lamborghini Countach 1.jpg'},
 {name:'Ferrari 288 GTO',origin:'Italy',era:'1980s',type:'Supercar',file:'Ferrari 288 GTO (1984) (55078978412).jpg'},
 {name:'Lamborghini Miura',origin:'Italy',era:'1960s',type:'Supercar',file:'Lamborghini Miuras.jpg'}
];

const day=Math.floor(Date.now()/86400000);
const car=cars[day%cars.length];
const photo=document.getElementById('carPhoto');
if(!photo)return;
const tag=document.getElementById('carPhotoTag');
const credit=document.getElementById('photoCredit');

photo.src=commons(car.file);
photo.alt='Car of the day — identify the model';
if(credit) credit.href=page(car.file);

function revealPhotoName(){
  tag.textContent=car.name.toUpperCase();
  tag.classList.add('revealed');
  photo.classList.add('revealed');
}

document.getElementById('clue1').textContent='ORIGIN / '+car.origin;
document.getElementById('clue2').textContent='ERA / '+car.era;
document.getElementById('clue3').textContent='CLASS / '+car.type;
document.getElementById('gameDate').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'});

const input=document.getElementById('guess');
const result=document.getElementById('gameResult');

document.getElementById('guessBtn').addEventListener('click',()=>{
 const g=(input.value||'').trim().toLowerCase();
 const tokens=car.name.toLowerCase().split(/\s+/).filter(x=>x.length>3);
 if(g && (g===car.name.toLowerCase() || tokens.filter(t=>g.includes(t)).length>=2)){
   result.textContent='CORRECT / '+car.name;
   revealPhotoName();
 }else{
   result.textContent='NO MATCH / TRY AGAIN OR REVEAL';
 }
});

input.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('guessBtn').click();});
document.getElementById('revealBtn').addEventListener('click',()=>{
 result.textContent='REVEALED / '+car.name;
 revealPhotoName();
});
})();
