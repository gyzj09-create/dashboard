const C='dealboard-v14';
const ASSETS=['./','./index.html','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  e.respondWith(
    fetch(r).then(res=>{ const cc=res.clone(); caches.open(C).then(c=>c.put(r,cc)); return res; })
    .catch(()=>caches.match(r).then(m=>m||caches.match('./index.html')))
  );
});
