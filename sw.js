if(!self.define){let s,e={};const n=(n,l)=>(n=new URL(n+".js",l).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(l,o)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let r={};const t=s=>n(s,i),u={module:{uri:i},exports:r,require:t};e[i]=Promise.all(l.map((s=>u[s]||t(s)))).then((s=>(o(...s),r)))}}define(["./workbox-0f370d1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/apple-touch-icon-77f1cce1.png",revision:null},{url:"assets/ComicMono-742af5ad.woff",revision:null},{url:"assets/ComicMono-Bold-2350c6c1.woff",revision:null},{url:"assets/IBMPlexMono-Bold-6bb3fd98.woff",revision:null},{url:"assets/IBMPlexMono-BoldItalic-5cd662b9.woff",revision:null},{url:"assets/IBMPlexMono-Italic-fc3301da.woff",revision:null},{url:"assets/IBMPlexMono-Regular-06ba2f2e.woff",revision:null},{url:"assets/index-125a7191.css",revision:null},{url:"assets/jgs5-9f26a38a.woff",revision:null},{url:"assets/jgs7-d3f51478.woff",revision:null},{url:"assets/jgs9-0c41ef37.woff",revision:null},{url:"assets/many_universes-d74e86dc.svg",revision:null},{url:"assets/pulses-30df7a48.svg",revision:null},{url:"assets/safari-pinned-tab-61a1253d.svg",revision:null},{url:"assets/times-1426387b.svg",revision:null},{url:"assets/topos_arch-db355d32.svg",revision:null},{url:"assets/topos_frog-e8ab87d1.svg",revision:null},{url:"assets/TransportProcessor-8c525e1a.js",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"index.html",revision:"21d9448ad1805471ddbb140104040fd3"},{url:"manifest.webmanifest",revision:"57ee5fb60f9f17e5897fa9d47daea92a"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute((({url:s})=>[/^https:\/\/raw\.githubusercontent\.com\/.*/i,/^https:\/\/shabda\.ndre\.gr\/.*/i].some((e=>e.test(s)))),new s.CacheFirst({cacheName:"external-samples",plugins:[new s.ExpirationPlugin({maxEntries:5e3,maxAgeSeconds:2592e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
