const products = Array.isArray(window.GEMMA_PRODUCTS) ? window.GEMMA_PRODUCTS : [];
const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('productSearch');
const emptyState = document.getElementById('emptyState');
const dialog = document.getElementById('productDialog');
const dialogContent = document.getElementById('dialogContent');
let activeCategory = 'all';
const categoryNames = {keychains:'Handmade keychains','hair-accessories':'Hair clips & accessories',flowers:'Handmade flowers',bouquets:'Flower bouquets','flower-arrangements':'Flower arrangements','flower-pots':'Decorative vases & flower pots',other:'Other handmade creations'};
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderProducts(){
 const term=searchInput.value.trim().toLowerCase();
 const visible=products.filter(p=>(activeCategory==='all'||p.category===activeCategory)&&(`${p.name} ${p.description} ${categoryNames[p.category]||''}`).toLowerCase().includes(term));
 grid.innerHTML=visible.map(p=>`<article class="product-card"><button class="product-image-button" data-open="${p.id}" aria-label="View ${esc(p.name)}"><img src="images/${encodeURIComponent(p.image)}" alt="${esc(p.name)}" loading="lazy"><span class="image-view">View creation ↗</span></button><div class="product-info"><span class="product-label">${esc(p.label||categoryNames[p.category]||'Handmade creation')}</span><h3>${esc(p.name)}</h3><div class="product-bottom"><span class="product-price">${p.price?esc(p.price):'Ask for price'}</span><span class="availability ${p.available===false?'unavailable':''}">${p.available===false?'Currently unavailable':'Made with love ♡'}</span></div></div></article>`).join('');
 emptyState.hidden=visible.length!==0;
}
function openProduct(id){const p=products.find(x=>String(x.id)===String(id));if(!p)return;const sms=encodeURIComponent(`Hello! I'm interested in "${p.name}". May I ask about its price and availability?`);dialogContent.innerHTML=`<div class="detail-image"><img src="images/${encodeURIComponent(p.image)}" alt="${esc(p.name)}"></div><div class="detail-copy"><span class="product-label">${esc(p.label||categoryNames[p.category]||'Handmade creation')}</span><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p><strong class="detail-price">${p.price?esc(p.price):'Message us for the price'}</strong><p class="detail-availability">${p.available===false?'Currently unavailable':'Availability may vary. Please message us to confirm.'}</p><div class="detail-actions"><a class="button button-primary" href="https://www.facebook.com/espelembergogemma" target="_blank" rel="noopener">Inquire on Facebook ↗</a><a class="button button-outline" href="sms:09682562592?body=${sms}">Send an SMS</a></div></div>`;dialog.showModal();}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openProduct(b.dataset.open);});
document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x===b));renderProducts();});
searchInput.addEventListener('input',renderProducts);
document.getElementById('dialogClose').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
const menuToggle=document.getElementById('menuToggle'),mainNav=document.getElementById('mainNav');
menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!expanded));mainNav.classList.toggle('open',!expanded);});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
renderProducts();
