// 서비스 워커. 빌드할 때마다 VERSION이 바뀌므로 배포마다 새 버전으로 인식됩니다.
const VERSION = "__BUILD_ID__";
const CACHE = "my-agent-" + VERSION;
const SHELL = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("message", (e) => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // 데이터는 항상 서버에서 (캐시 안 함)
  if (req.mode === "navigate") {
    // 화면: 네트워크 우선, 오프라인이면 저장본
    e.respondWith(
      fetch(req).then((res) => {
        if (res.ok && !res.redirected) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put("/", copy)); }
        return res;
      }).catch(() => caches.match("/"))
    );
    return;
  }
  if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/icons/")) {
    // 파일 이름에 해시가 붙은 정적 파일: 캐시 우선
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
