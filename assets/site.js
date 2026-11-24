
document.addEventListener('DOMContentLoaded',()=>{const t=document.querySelector('.mobile-toggle');const n=document.querySelector('.nav');if(t&&n)t.addEventListener('click',()=>n.classList.toggle('open'));document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());});
