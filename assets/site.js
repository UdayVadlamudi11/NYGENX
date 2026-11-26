
document.addEventListener('DOMContentLoaded',()=>{const t=document.querySelector('.mobile-toggle');const n=document.querySelector('.nav');if(t&&n)t.addEventListener('click',()=>n.classList.toggle('open'));document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());});


// Remove Netlify badge frame if injected
const removeNetlifyBadge = () => {
  const badge = document.getElementById('nl-badge-frame') || document.querySelector('iframe[title*="Netlify"]');
  if (badge) badge.remove();
};
removeNetlifyBadge();
if (window.MutationObserver) {
  new MutationObserver(removeNetlifyBadge).observe(document.documentElement, { childList: true, subtree: true });
}
