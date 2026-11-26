import { Suspense, useEffect, useState } from "react";
import { apps } from "./apps";
import { Home } from "./Home";
import { UpdateBanner } from "./pwa";
import "./shell.css";

const current = () => location.hash.replace(/^#\/?/, "").split("/")[0];

export function App() {
  const [route, setRoute] = useState(current);
  useEffect(() => {
    const f = () => { setRoute(current()); window.scrollTo(0, 0); };
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  const entry = apps.find((a) => a.id === route);
  useEffect(() => { document.title = entry ? entry.name + " · My Agent App" : "My Agent App"; }, [entry]);
  return (
    <>
      {entry?.component ? (
        <Suspense fallback={<div className="sa-loading">불러오는 중…</div>}>
          <entry.component />
        </Suspense>
      ) : (
        <Home />
      )}
      <UpdateBanner />
    </>
  );
}
