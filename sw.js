const V="mi-caja-v4";
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(
    fetch(e.request).then(res=>{
      const u=new URL(e.request.url);
      if(res.ok&&(u.origin===location.origin||u.hostname.indexOf("fonts.g")===0)){const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp))}
      return res;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html")))
  );
});
