/* ✏️ CUSTOMISE: edit here, or add ?name=Her+Name&from=Your+Name&age=21 to the link */
var Q=new URLSearchParams(location.search);
var NAME=Q.get('name')||'Thamarasi', FROM=Q.get('from')||'', AGE=Q.get('age')||'';
var LINES=[
 "Happy Birthday! Wishing you a day full of joy and good moments.",
 "May this new year bring you good health, peace and happiness.",
 "I wish you success in everything you do, and the strength to reach your goals.",
 "Thank you for being such a kind and wonderful person. Have a lovely day. 🌸"
];
var WISHES=[["🌿","Good health"],["😊","Happiness"],["🎓","Success"],["🕊️","Peace"],["🌸","Beautiful days"]];
/* 📸 Her photos: put image files in the images folder and list them here */
var PHOTOS=[
 {src:"photo1.jpg",cap:"Smile like that, always"}
  /* add more: {src:"images/photo2.jpg",cap:"Your caption"} */
];
var FINAL="Wishing you a wonderful year ahead.";

var $=function(i){return document.getElementById(i)};
$('hi').textContent = NAME==='you' ? 'For you' : 'For '+NAME;
$('fin').textContent = 'Happy Birthday'+(NAME==='you'?'':', '+NAME)+'!';
if(AGE) $('finmsg').textContent='Here’s to '+AGE+' years of you, and so many more.'; else $('finmsg').textContent=FINAL;
if(FROM) $('sig').textContent='— '+FROM;

/* scenes */
var cur=0;
function show(n){document.querySelectorAll('.scene').forEach(function(s,i){s.classList.toggle('on',i===n)});cur=n}

/* canvas: stars + fireworks */
var cv=$('c'),x=cv.getContext('2d'),W,H,stars=[],fx=[],DPR=Math.min(devicePixelRatio||1,2);
function size(){W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0);
 stars=[];for(var i=0;i<Math.round(W*H/5500);i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,p:Math.random()*6.28,s:.5+Math.random()*1.5})}
size();addEventListener('resize',size);
var hues=[340,45,280,200,160,20];
function firework(px,py){
 var h=hues[Math.floor(Math.random()*hues.length)],n=70;
 for(var i=0;i<n;i++){var a=i/n*6.283+Math.random()*.2,v=2+Math.random()*4.2;
  fx.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,d:.011+Math.random()*.012,h:h+Math.random()*30-15,t:0})}
}
function confetti(n){for(var i=0;i<n;i++)fx.push({x:Math.random()*W,y:-10,vx:(Math.random()-.5)*2.5,vy:2+Math.random()*3,l:1,d:.004,h:hues[i%6]+Math.random()*20,t:1,r:Math.random()*6,vr:(Math.random()-.5)*.3,s:6+Math.random()*6})}
var T=0;
function loop(){
 T+=.016;x.clearRect(0,0,W,H);
 stars.forEach(function(s){var a=.35+.65*Math.abs(Math.sin(T*s.s+s.p));x.globalAlpha=a;x.fillStyle='#fff';x.beginPath();x.arc(s.x,s.y,s.r,0,6.283);x.fill()});
 fx=fx.filter(function(p){return p.l>0&&p.y<H+30});
 fx.forEach(function(p){
  p.x+=p.vx;p.y+=p.vy;p.l-=p.d;
  if(p.t===0){p.vy+=.045;p.vx*=.99;x.globalAlpha=Math.max(p.l,0);x.fillStyle='hsl('+p.h+',100%,65%)';x.shadowColor='hsl('+p.h+',100%,60%)';x.shadowBlur=8;x.beginPath();x.arc(p.x,p.y,2.2,0,6.283);x.fill();x.shadowBlur=0}
  else{p.r+=p.vr;x.globalAlpha=Math.max(p.l,0);x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle='hsl('+p.h+',90%,65%)';x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore()}
 });
 x.globalAlpha=1;requestAnimationFrame(loop)
}
loop();
function volley(n,gap){for(var i=0;i<n;i++)(function(i){setTimeout(function(){firework(W*(.15+Math.random()*.7),H*(.12+Math.random()*.4));chime(i)},i*gap)})(i)}

/* balloons */
var BAL=['🎈','🎈','🎈','💗','🎀','🌸'];
function balloons(n){for(var i=0;i<n;i++)(function(i){setTimeout(function(){var b=document.createElement('div');b.className='balloon';b.textContent=BAL[Math.floor(Math.random()*BAL.length)];
 b.style.left=(Math.random()*92)+'vw';b.style.setProperty('--dx',(Math.random()*80-40)+'px');b.style.animationDuration=(7+Math.random()*6)+'s';b.style.fontSize=(34+Math.random()*28)+'px';
 document.body.appendChild(b);setTimeout(function(){b.remove()},14000)},i*350)})(i)}

/* audio (WebAudio, no files) */
var AC=null,MG=null,MUS=null,musicOn=true,mt=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}if(AC){MG=AC.createGain();MG.gain.value=.8;MG.connect(AC.destination);MUS=AC.createGain();MUS.connect(MG)}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,t0,d,v,type,dest){var a=ac();if(!a)return;var o=a.createOscillator(),g=a.createGain();o.type=type||'triangle';o.frequency.value=f;
 g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(v,t0+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(dest||MG||a.destination);o.start(t0);o.stop(t0+d+.05)}
function chime(i){var a=ac();if(!a)return;var f=[784,988,1175,1568][i%4];tone(f,a.currentTime,.5,.05,'sine')}
var C4=261.63,D=293.66,E=329.63,F=349.23,G=392,A=440,Bb=466.16,C5=523.25;
var SONG=[[C4,.75],[C4,.25],[D,1],[C4,1],[F,1],[E,2],[C4,.75],[C4,.25],[D,1],[C4,1],[G,1],[F,2],[C4,.75],[C4,.25],[C5,1],[A,1],[F,1],[E,1],[D,2],[Bb,.75],[Bb,.25],[A,1],[F,1],[G,1],[F,2]];
function playSong(){var a=ac();if(!a)return;var t=a.currentTime+.1,b=.62;SONG.forEach(function(n){tone(n[0],t,n[1]*b*.95,.09,null,MUS);tone(n[0]/2,t,n[1]*b*.95,.04,'sine',MUS);t+=n[1]*b});return t}
function startMusic(){$('mus').style.display='';if(MUS){MUS.gain.cancelScheduledValues(0);MUS.gain.value=musicOn?1:0}if(mt)return;mt=true;playSong()}
function stopMusic(){clearTimeout(mt);mt=null;if(MUS&&AC){MUS.gain.cancelScheduledValues(AC.currentTime);MUS.gain.setTargetAtTime(0,AC.currentTime,.15)}$('mus').style.display='none'}
$('mus').onclick=function(){musicOn=!musicOn;this.textContent='🎵 Music: '+(musicOn?'on':'off');if(MUS)MUS.gain.value=musicOn?1:0};

/* flow */
$('go').onclick=function(){ac();startMusic();show(1);var n=3,c=$('count');
 var iv=setInterval(function(){n--;if(n>0){c.textContent=n;c.style.animation='none';c.offsetWidth;c.style.animation=''}else{clearInterval(iv);show(2);}},1000)};
var blown=false;
$('blow').onclick=function(){
 if(blown){show(3);start();return}
 blown=true;stopMusic();$('cake').parentNode.classList.add('out');$('cake').classList.add('out');
 $('note').innerHTML='Your wish is on its way ✨<br>I hope it comes true 💫';
 this.textContent='Open your messages 💌';
 volley(6,260);confetti(140);balloons(10);
 var a=ac();if(a)tone(180,a.currentTime,.25,.06,'sine');
};
var idx=0;
function start(){idx=0;render()}
function render(){
 var d=$('dots');d.innerHTML='';LINES.forEach(function(_,i){var e=document.createElement('i');if(i===idx)e.className='a';d.appendChild(e)});
 var c=$('card');c.style.opacity=0;setTimeout(function(){c.textContent=LINES[idx];c.style.opacity=1},800);
 $('next').textContent=idx===LINES.length-1?'One last thing 🎁':'Next 💌';
 if(idx>0)firework(W*(.2+Math.random()*.6),H*.2)
}
function finale(){clearInterval(ptimer);show(5);volley(9,300);confetti(160);balloons(14)}
$('next').onclick=function(){if(idx<LINES.length-1){idx++;render()}else{showWishes()}};
function toPhotos(){loadPhotos(function(ok){P=ok;if(P.length){pi=0;show(4);showPhoto();autoplay()}else finale()})}
function showWishes(){var g=$('wgrid');g.innerHTML='';WISHES.forEach(function(w,i){var d=document.createElement('div');d.className='w';d.style.animationDelay=(i*1)+'s';d.innerHTML='<span>'+w[0]+'</span>'+w[1];g.appendChild(d)});show(6);volley(4,1200)}
$('wcont').onclick=toPhotos;

/* photo gallery */
var P=[],pi=0,ptimer=null;
function loadPhotos(cb){var ok=[],n=PHOTOS.length,c=0;if(!n)return cb([]);
 function done(){if(++c===n)cb(ok.filter(Boolean))}
 PHOTOS.forEach(function(p,i){var im=new Image();im.onload=function(){ok[i]=p;done()};im.onerror=done;im.src=p.src})}
function showPhoto(){
 var f=$('frame');f.style.opacity=0;f.style.transform='rotate(6deg) scale(.95)';
 setTimeout(function(){$('pimg').src=P[pi].src;$('pcap').textContent=P[pi].cap||'';
  f.style.setProperty('--tilt',(Math.random()*6-3)+'deg');f.style.transform='';f.style.opacity=1;
  firework(W*(.2+Math.random()*.6),H*.15)},350);
 var d=$('pdots');d.innerHTML='';P.forEach(function(_,i){var e=document.createElement('i');if(i===pi)e.className='a';d.appendChild(e)});
 $('pnext').innerHTML=pi===P.length-1?'Continue 💖':'Next &#8250;';
 $('pprev').style.visibility=pi===0?'hidden':'visible'}
function autoplay(){clearInterval(ptimer);ptimer=setInterval(function(){if(pi<P.length-1){pi++;showPhoto()}else clearInterval(ptimer)},3800)}
$('pnext').onclick=function(){clearInterval(ptimer);if(pi<P.length-1){pi++;showPhoto()}else finale()};
$('pprev').onclick=function(){clearInterval(ptimer);if(pi>0){pi--;showPhoto()}};
$('more').onclick=function(){volley(10,220);confetti(80);balloons(6)};
$('again').onclick=function(){blown=false;$('cake').classList.remove('out');$('cake').parentNode.classList.remove('out');$('note').innerHTML='Close your eyes, make a wish…<br>then blow out the candles 🌬️';$('blow').textContent='Blow out the candles';show(0)};
document.addEventListener('pointerdown',function(e){if(cur>=2&&e.target.tagName!=='BUTTON')firework(e.clientX,e.clientY)});

/* ✨ ambient petals and shooting stars */
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
 setInterval(function(){if(document.hidden)return;var p=document.createElement('div');p.className='petal';p.textContent=['🌸','✨','🌺','💮'][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+'vw';p.style.fontSize=(12+Math.random()*14)+'px';p.style.setProperty('--dx',(Math.random()*120-60)+'px');p.style.setProperty('--rot',(Math.random()*540-270)+'deg');p.style.animationDuration=(9+Math.random()*7)+'s';document.body.appendChild(p);setTimeout(function(){p.remove()},17000)},1300);
 setInterval(function(){if(document.hidden)return;var s=document.createElement('div');s.className='shoot';s.style.left=(40+Math.random()*55)+'vw';s.style.top=(Math.random()*35)+'vh';document.body.appendChild(s);setTimeout(function(){s.remove()},1500)},5500);
}

