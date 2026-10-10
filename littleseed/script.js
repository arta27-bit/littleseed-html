const $=s=>document.querySelector(s), rp=n=>'Rp '+n.toLocaleString('id-ID');
const P=[
{id:1,n:'Monstera Deliciosa',p:85000,c:'Tanaman Hias',e:'🪴',s:'Sedang',in:1,best:1,d:'Monstera Deliciosa memiliki daun hijau yang lebar dengan tulang alami yang khas. Tanaman ini dapat tumbuh dengan baik di dalam ruangan dan membutuhkan cahaya tidak langsung serta penyiraman secukupnya.',h:'30–50 cm'},
{id:2,n:'Lidah Mertua',p:75000,c:'Tanaman Hias',e:'🌿',s:'Sedang',in:1,best:1,d:'Lidah mertua tahan banting, cocok untuk pemula dan membantu menyegarkan udara ruangan.',h:'40–60 cm'},
{id:3,n:'Peace Lily',p:90000,c:'Bunga',e:'🌷',s:'Sedang',in:1,best:1,d:'Peace Lily berbunga putih elegan dan menyukai tempat teduh dengan tanah lembap.',h:'30–45 cm'},
{id:4,n:'Sirih Gading',p:60000,c:'Tanaman Hias',e:'🍃',s:'Kecil',in:1,best:1,d:'Sirih gading merambat cantik, mudah dirawat, ideal untuk digantung.',h:'20–100 cm'},
{id:5,n:'Calathea',p:80000,c:'Tanaman Hias',e:'☘️',s:'Sedang',in:1,d:'Calathea punya corak daun unik yang bergerak mengikuti cahaya.',h:'30–50 cm'},
{id:6,n:'Kaktus Mini',p:40000,c:'Succulent',e:'🌵',s:'Kecil',in:0,d:'Kaktus mini hemat tempat dan hanya perlu disiram sesekali.',h:'8–15 cm'},
{id:7,n:'Aglaonema',p:70000,c:'Tanaman Hias',e:'🌱',s:'Sedang',in:1,d:'Aglaonema bersemu merah-hijau, tahan cahaya redup.',h:'30–60 cm'},
{id:8,n:'Philodendron',p:65000,c:'Tanaman Hias',e:'🌿',s:'Besar',in:1,d:'Philodendron berdaun lebat dan cepat tumbuh.',h:'40–80 cm'},
{id:9,n:'Sansevieria',p:95000,c:'Outdoor',e:'🪴',s:'Besar',in:0,d:'Sansevieria kokoh, tahan panas, cocok untuk teras.',h:'50–90 cm'},
{id:10,n:'Lavender',p:55000,c:'Aromatik',e:'💜',s:'Kecil',in:0,d:'Lavender beraroma menenangkan, suka sinar matahari.',h:'25–40 cm'},
{id:11,n:'Aloe Vera',p:35000,c:'Succulent',e:'🌵',s:'Kecil',in:1,d:'Aloe vera berguna untuk perawatan kulit dan mudah dirawat.',h:'20–40 cm'},
{id:12,n:'Mawar Mini',p:50000,c:'Bunga',e:'🌹',s:'Kecil',in:0,d:'Mawar mini berbunga sepanjang musim di tempat cerah.',h:'20–35 cm'}];
const CATS=[['Tanaman Hias','🪴'],['Bunga','🌸'],['Succulent','🌵'],['Aromatik','💜'],['Outdoor','☀️']];
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
let cart=ls.get('ls_cart',[]), addrs=ls.get('ls_addr',[
 {id:1,l:'Rumah',t:'Jl. Melati No.12, RT 03/RW 05\nKec. Sukolilo, Surabaya\nJawa Timur 60111'},
 {id:2,l:'Kantor',t:'Jl. Raya Darmo No.45\nWonokromo, Surabaya\nJawa Timur 60225'}]), mainAddr=ls.get('ls_main',1);
let f={cat:'',price:[],size:[],kond:[],sort:'pop',q:''}, step=1, ship={}, tab='Deskripsi', qty=1, shipOpt='reguler', bayar='transfer';
const saveCart=()=>{ls.set('ls_cart',cart);$('#cartCount').textContent=cart.reduce((a,c)=>a+c.q,0)};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),1800)};
const add=(id,q=1)=>{const i=cart.find(c=>c.id==id);i?i.q+=q:cart.push({id:+id,q});saveCart();toast('Ditambahkan ke keranjang')};
const card=p=>`<article class="card">${p.best&&p.id==1?'<span class="tag">Terlaris</span>':''}<a href="#/produk/${p.id}"><div class="thumb">${p.e}</div></a>
<div class="info"><div><b>${p.n}</b><small>${rp(p.p)}</small></div><button class="add" data-add="${p.id}" aria-label="Tambah ${p.n} ke keranjang">🛒</button></div></article>`;
const NAV=[['/','Beranda','🏠'],['/kategori','Kategori','▦'],['/kategori?best','Best Seller','☆'],['/kategori?promo','Promo','％'],['/tentang','Tentang Kami','ⓘ']];
const PNAV=[['/','Beranda','🏠'],['/pesanan','Pesanan Saya','📦'],['/wishlist','Wishlist','♡'],['/profil','Alamat','📍'],['/pengaturan','Pengaturan Akun','⚙'],['/bantuan','Bantuan','?'],['/','Keluar','↪']];
function side(r){const prof=r=='/profil';const L=prof?PNAV:NAV;
 $('#side').innerHTML=(prof?'<div class="me"><div class="avatar">👤</div><div><b>AldaArta</b><br><small>aldaarta@email.com</small></div></div>':'')+
 L.map(([h,t,i])=>`<a href="#${h}" class="${(h==r||(r=='/'&&h=='/')||(r.startsWith('/produk')&&h=='/kategori')||(r=='/profil'&&t=='Alamat'))&&!(h=='/'&&r!='/')?'on':''}">${i} ${t}</a>`).join('')}
// views
const V={
'/'(){return `<section class="hero"><div><small>Tanaman Hias untuk Rumah yang Lebih Hidup</small><h1>Bring Nature<br>Closer to You</h1><p>Temukan berbagai tanaman hias terbaik untuk mempercantik ruanganmu.</p><a class="btn" href="#/kategori">Belanja Sekarang</a></div><div class="art" aria-hidden="true">🪴</div></section>
<h2>Kategori Pilihan <a href="#/kategori">Lihat Semua</a></h2><div class="cats">${CATS.map(([n,e])=>`<a class="cat" href="#/kategori?cat=${encodeURIComponent(n)}"><span>${e}</span>${n}</a>`).join('')}</div>
<h2>Produk Terlaris <a href="#/kategori">Lihat Semua</a></h2><div class="grid">${P.filter(p=>p.best).map(card).join('')}</div>`},
'/kategori'(){const q=f.q.toLowerCase();let l=P.filter(p=>(!f.cat||p.c==f.cat)&&(!q||(p.n+p.c).toLowerCase().includes(q))&&
 (!f.price.length||f.price.some(k=>[[0,5e4],[5e4,1e5],[1e5,2e5],[2e5,1e9]][k][0]<=p.p&&p.p<=[[0,5e4],[5e4,1e5],[1e5,2e5],[2e5,1e9]][k][1]))&&
 (!f.size.length||f.size.includes(p.s))&&(!f.kond.length||f.kond.includes(p.in?'Indoor':'Outdoor')));
 if(f.sort=='lo')l.sort((a,b)=>a.p-b.p);if(f.sort=='hi')l.sort((a,b)=>b.p-a.p);
 const ck=(g,v)=>`<label><input type="checkbox" data-f="${g}" value="${v}" ${f[g].includes(v)?'checked':''}> ${({0:'< Rp 50.000',1:'Rp 50.000 - Rp 100.000',2:'Rp 100.000 - Rp 200.000',3:'> Rp 200.000'})[v]||v}</label>`;
 return `<h1>Kategori</h1><div class="cols"><aside class="filter"><h3>Kategori</h3><label><input type="radio" name="cat" data-cat="" ${!f.cat?'checked':''}> Semua Tanaman</label>${CATS.map(([n])=>`<label><input type="radio" name="cat" data-cat="${n}" ${f.cat==n?'checked':''}> ${n}</label>`).join('')}
 <h3>Harga</h3>${[0,1,2,3].map(v=>ck('price',v)).join('')}<h3>Ukuran Pot</h3>${['Kecil','Sedang','Besar'].map(v=>ck('size',v)).join('')}<h3>Kondisi</h3>${['Indoor','Outdoor'].map(v=>ck('kond',v)).join('')}</aside>
 <div><div class="bar"><div><b>${f.cat||'Semua Tanaman'}</b><br><small>Menampilkan ${l.length} produk</small></div><select id="sort" aria-label="Urutkan"><option value="pop">Terpopuler</option><option value="lo" ${f.sort=='lo'?'selected':''}>Harga terendah</option><option value="hi" ${f.sort=='hi'?'selected':''}>Harga tertinggi</option></select></div>
 ${l.length?`<div class="grid">${l.map(card).join('')}</div>`:'<div class="empty"><p>Tidak ada tanaman yang cocok. Coba ubah filter.</p></div>'}</div></div>`},
'/produk'(id){const p=P.find(x=>x.id==id);if(!p)return V['/kategori']();const T={Deskripsi:p.d,'Cara Merawat':'Siram 1–2 kali seminggu saat tanah mulai kering. Letakkan di tempat terang tanpa sinar matahari langsung. Beri pupuk sebulan sekali.','Ulasan (120)':'★ 4.8 dari 120 ulasan. Pembeli menyukai kondisi tanaman yang segar dan pengemasan yang aman.'};
 return `<div class="crumb"><a href="#/">Beranda</a> › <a href="#/kategori">${p.c}</a> › ${p.n}</div><div class="detail"><div class="thumbs">${[0,1,2,3].map(i=>`<button class="${i?'':'on'}" aria-label="Foto ${i+1}">${p.e}</button>`).join('')}</div><div class="big">${p.e}</div>
 <div><h1 style="margin-bottom:4px">${p.n}</h1><div class="price">${rp(p.p)}</div><div>★ 4.8 <small>(120 ulasan)</small></div><p style="margin-top:10px;color:var(--mu)">${p.d}</p>
 <div class="specs"><div>Tinggi Tanaman: <b>${p.h}</b></div><div>Ukuran Pot: <b>${p.s=='Kecil'?'8':p.s=='Sedang'?'12':'20'} cm</b></div><div>Cahaya: <b>${p.in?'Tidak langsung':'Matahari penuh'}</b></div><div>Perawatan: <b>Mudah</b></div></div>
 <div class="row"><div class="qty"><button data-q="-1" aria-label="Kurangi">−</button><span id="q">${qty}</span><button data-q="1" aria-label="Tambah">+</button></div><button class="btn" data-addq="${p.id}">Tambah ke Keranjang</button><button class="add" style="background:none;color:var(--g);font-size:20px" aria-label="Wishlist">♡</button></div>
 <button class="btn ghost block" data-buy="${p.id}">Beli Sekarang</button></div></div>
 <div class="tabs">${Object.keys(T).map(k=>`<button class="${k==tab?'on':''}" data-tab="${k}">${k}</button>`).join('')}</div><p class="tabpane">${T[tab]}</p>`},
'/keranjang'(){if(!cart.length)return `<h1>Keranjang Belanja</h1><div class="empty"><p>Keranjangmu masih kosong.</p><a class="btn" href="#/kategori">Mulai belanja</a></div>`;
 const sub=cartTotal();return `<h1>Keranjang Belanja</h1><table><tr><th>Produk<th>Harga<th>Jumlah<th>Subtotal<th></tr>${cart.map(c=>{const p=P.find(x=>x.id==c.id);return `<tr><td><div class="item"><div class="thumb">${p.e}</div><div><b>${p.n}</b><br><small>Ukuran Pot: ${p.s=='Kecil'?8:p.s=='Sedang'?12:20} cm</small></div></div><td>${rp(p.p)}<td><div class="qty"><button data-cq="${p.id}:-1" aria-label="Kurangi">−</button><span>${c.q}</span><button data-cq="${p.id}:1" aria-label="Tambah">+</button></div><td>${rp(p.p*c.q)}<td><button data-del="${p.id}" aria-label="Hapus ${p.n}">🗑</button></tr>`}).join('')}</table>
 <div class="row" style="justify-content:space-between;align-items:flex-start"><a href="#/kategori">← Lanjut Belanja</a><div class="total"><div><span>Total (${cart.reduce((a,c)=>a+c.q,0)} item)</span><strong>${rp(sub)}</strong></div><a class="btn block" href="#/checkout" onclick="step=1">Checkout</a></div></div>`},
'/checkout'(){if(!cart.length){location.hash='#/keranjang';return ''}
 const st=['Alamat','Pengiriman','Pembayaran'].map((t,i)=>`<span class="${step==i+1?'on':''}"><i>${i+1}</i>${t}</span>`).join('<hr>');
 const fld=(k,l,ph,ex='')=>`<div class="field"><label for="${k}">${l}</label><input id="${k}" name="${k}" placeholder="${ph}" value="${ship[k]||''}" ${ex}><div class="err" id="e-${k}"></div></div>`;
 let b;if(step==1)b=`<h2 style="margin-top:0">Alamat Pengiriman</h2><form id="shipForm" novalidate>${fld('nama','Nama Lengkap','Masukkan nama lengkap')}${fld('hp','Nomor Telepon','08xxxxxxxxxx','inputmode="tel"')}${fld('alamat','Alamat Lengkap','Nama jalan, no rumah, RT/RW')}<div class="two">${fld('kota','Kota','Contoh: Surabaya')}${fld('pos','Kode Pos','Masukkan kode pos','inputmode="numeric"')}</div><button class="btn" style="float:right">Lanjut ke Pengiriman</button></form>`;
 else if(step==2)b=`<h2 style="margin-top:0">Metode Pengiriman</h2>${[['reguler','Reguler (3–5 hari)',15000],['express','Express (1–2 hari)',30000]].map(([v,t,h])=>`<label class="opt"><input type="radio" name="ship" value="${v}" ${shipOpt==v?'checked':''}> <span style="flex:1">${t}</span><b>${rp(h)}</b></label>`).join('')}<div class="row" style="justify-content:space-between"><button class="btn ghost" data-step="1">Kembali</button><button class="btn" data-step="3">Lanjut ke Pembayaran</button></div>`;
 else{const ong=shipOpt=='express'?30000:15000;b=`<h2 style="margin-top:0">Pembayaran</h2>${[['transfer','Transfer Bank'],['ewallet','E-Wallet'],['cod','Bayar di Tempat']].map(([v,t])=>`<label class="opt"><input type="radio" name="pay" value="${v}" ${bayar==v?'checked':''}> ${t}</label>`).join('')}<div class="total" style="width:100%"><div><span>Produk</span><span>${rp(cartTotal())}</span></div><div><span>Ongkir</span><span>${rp(ong)}</span></div><div><b>Total</b><strong>${rp(cartTotal()+ong)}</strong></div></div><div class="row" style="justify-content:space-between"><button class="btn ghost" data-step="2">Kembali</button><button class="btn" id="pay">Bayar Sekarang</button></div>`}
 return `<div class="steps">${st}</div>${b}`},
'/sukses'(){return `<div class="empty"><div style="font-size:60px">🌱</div><h1>Pesanan diterima</h1><p>Terima kasih! Tanamanmu akan segera dikemas.</p><a class="btn" href="#/">Kembali ke beranda</a></div>`},
'/profil'(){return `<div class="bar"><h1 style="margin:0">Alamat Saya</h1><button class="btn" id="addAddr">+ Tambah Alamat</button></div>${addrs.map(a=>`<div class="addr ${a.id==mainAddr?'on':''}"><input type="radio" name="main" data-main="${a.id}" ${a.id==mainAddr?'checked':''} aria-label="Alamat utama ${a.l}" style="accent-color:var(--g)"><div><b>${a.l}</b><br>${a.t.replace(/\n/g,'<br>')}</div><button data-deladdr="${a.id}" aria-label="Hapus alamat ${a.l}">🗑</button></div>`).join('')||'<div class="empty"><p>Belum ada alamat tersimpan.</p></div>'}`},
'/info'(t){return `<div class="empty"><h1>${t}</h1><p>Halaman ini belum tersedia.</p><a class="btn" href="#/">Kembali ke beranda</a></div>`}};
const cartTotal=()=>cart.reduce((a,c)=>a+P.find(x=>x.id==c.id).p*c.q,0);
function route(){const [path,qs='']=(location.hash.slice(1)||'/').split('?');const seg=path.split('/');const r='/'+(seg[1]||'');
 if(qs.startsWith('cat='))f.cat=decodeURIComponent(qs.slice(4));
 side(r=='/produk'?'/kategori':r);let h;
 if(r=='/produk')h=V['/produk'](seg[2]);else if(V[r])h=V[r]();else h=V['/info']('Segera hadir');
 $('#app').innerHTML=h;scrollTo(0,0)}
const refresh=()=>{const y=scrollY;route();scrollTo(0,y)};
addEventListener('hashchange',()=>{qty=1;tab='Deskripsi';route()});
document.addEventListener('click',e=>{const t=e.target.closest('button,input');if(!t)return;const d=t.dataset;
 if(d.add)add(d.add);
 if(d.q){qty=Math.max(1,qty+ +d.q);$('#q').textContent=qty}
 if(d.addq)add(d.addq,qty);
 if(d.buy){add(d.buy,qty);step=1;location.hash='#/checkout'}
 if(d.tab){tab=d.tab;refresh()}
 if(d.cq){const[i,n]=d.cq.split(':');const c=cart.find(x=>x.id==i);c.q=Math.max(1,c.q+ +n);saveCart();refresh()}
 if(d.del){cart=cart.filter(x=>x.id!=d.del);saveCart();refresh()}
 if(d.step){step=+d.step;refresh()}
 if(t.id=='pay'){cart=[];saveCart();location.hash='#/sukses'}
 if(d.main){mainAddr=+d.main;ls.set('ls_main',mainAddr);refresh()}
 if(d.deladdr){addrs=addrs.filter(a=>a.id!=d.deladdr);ls.set('ls_addr',addrs);refresh()}
 if(t.id=='addAddr'){const l=prompt('Label alamat (mis. Rumah)');if(!l)return;const a=prompt('Alamat lengkap');if(!a)return;addrs.push({id:Date.now(),l,t:a});ls.set('ls_addr',addrs);refresh()}});
document.addEventListener('change',e=>{const t=e.target,d=t.dataset;
 if('cat' in d){f.cat=d.cat;refresh()}
 if(d.f){const g=d.f,v=g=='price'?+t.value:t.value;f[g]=t.checked?[...f[g],v]:f[g].filter(x=>x!==v);refresh()}
 if(t.id=='sort'){f.sort=t.value;refresh()}
 if(t.name=='ship')shipOpt=t.value;if(t.name=='pay')bayar=t.value});
document.addEventListener('submit',e=>{e.preventDefault();
 if(e.target.id=='searchForm'){f.q=$('#searchInput').value;f.cat='';location.hash='#/kategori';refresh()}
 if(e.target.id=='shipForm'){const fd=Object.fromEntries(new FormData(e.target));Object.assign(ship,fd);let ok=true;
  const rules={nama:v=>v.trim()?'':'Nama wajib diisi',hp:v=>/^08\d{8,12}$/.test(v)?'':'Gunakan format 08xxxxxxxxxx',alamat:v=>v.trim().length>5?'':'Alamat wajib diisi',kota:v=>v.trim()?'':'Kota wajib diisi',pos:v=>/^\d{5}$/.test(v)?'':'Kode pos 5 digit'};
  for(const k in rules){const m=rules[k](fd[k]||'');$('#e-'+k).textContent=m;if(m)ok=false}
  if(ok){step=2;refresh()}}});
saveCart();route();