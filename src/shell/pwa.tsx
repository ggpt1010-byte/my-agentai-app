import { useEffect, useState } from "react";

let waiting: ServiceWorker | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((f) => f());

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || import.meta.env.DEV) return;
  addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      const track = (w: ServiceWorker | null) => {
        if (!w) return;
        w.addEventListener("statechange", () => {
          if (w.state === "installed" && navigator.serviceWorker.controller) { waiting = w; notify(); }
        });
      };
      if (reg.waiting && navigator.serviceWorker.controller) { waiting = reg.waiting; notify(); }
      reg.addEventListener("updatefound", () => track(reg.installing));
      // 앱으로 돌아올 때마다 새 버전 확인
      document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") reg.update().catch(() => {}); });
      let reloaded = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => { if (!reloaded) { reloaded = true; location.reload(); } });
    } catch { /* 등록 실패해도 앱은 동작 */ }
  });
}

export function UpdateBanner() {
  const [show, setShow] = useState(!!waiting);
  useEffect(() => { const f = () => setShow(!!waiting); listeners.add(f); return () => { listeners.delete(f); }; }, []);
  if (!show) return null;
  return (
    <div className="sa-update" role="status">
      <span>새 버전이 있어요</span>
      <button type="button" onClick={() => waiting?.postMessage("SKIP_WAITING")}>새로고침</button>
    </div>
  );
}
