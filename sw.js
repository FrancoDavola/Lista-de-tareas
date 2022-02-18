const nombreCache = 'btp-v2221' 
 const archivos = [
    './',
    './index.html',
    './css/custom.css',
    './css/normalize.css',
    './css/skeleton.css',
    './js/app.js',
    './js/btp.js',
    '/manifest.json'
]
 


self.addEventListener('install' , e => {
    console.log('instalado el service worker')
    
    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                
                cache.addAll(archivos)
            })
    )
})

self.addEventListener('active' , e => {
    console.log('service worker activado')

    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== nombreCache)
                    .map(key => caches.delete(key))
                )
            })
    )
})

self.addEventListener('fetch' , e => {

    console.log('fetch..' , e)

      e.respondWith(
         caches
         .match(e.request)
            .then(respuestaCache => {
                return respuestaCache
            })
     ) 
})