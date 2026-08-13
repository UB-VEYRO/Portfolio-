const menu=document.getElementById('menu');
const nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('show');menu.setAttribute('aria-expanded',open);menu.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>'});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('show');menu.setAttribute('aria-expanded','false');menu.innerHTML='<i class="fa-solid fa-bars"></i>'}));
const progress=document.getElementById('progress');
const topBtn=document.getElementById('top');
const links=[...document.querySelectorAll('#nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
function scrollUI(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+'%';topBtn.classList.toggle('show',scrollY>500);let current='home';sections.forEach(s=>{if(scrollY>=s.offsetTop-150)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))}
addEventListener('scroll',scrollUI,{passive:true});scrollUI();
topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();const n=document.getElementById('name').value.trim(),em=document.getElementById('email').value.trim(),m=document.getElementById('message').value.trim();const subject=encodeURIComponent('Portfolio message from '+n);const body=encodeURIComponent(`Name: ${n}\nEmail: ${em}\n\nMessage:\n${m}`);location.href=`mailto:udaybehra219@gmail.com?subject=${subject}&body=${body}`});
