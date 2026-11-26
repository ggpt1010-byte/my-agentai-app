import { apps } from "./apps";

export function Home() {
  const hour = new Date().getHours();
  const hello = hour < 12 ? "좋은 아침이에요" : hour < 18 ? "좋은 오후예요" : "좋은 저녁이에요";
  return (
    <main className="sa-home">
      <header className="sa-head">
        <span className="sa-eyebrow">MY AGENT APP</span>
        <h1>{hello}, Taehyun</h1>
        <p>오늘 열어볼 앱을 골라 주세요.</p>
      </header>
      <div className="sa-grid">
        {apps.map((a) => (
          <a key={a.id} className={"sa-card" + (a.ready ? "" : " soon")} href={"#/" + a.id}>
            <span className="sa-icon" style={{ background: a.color }} aria-hidden="true">{a.emoji}</span>
            <span className="sa-text">
              <strong>{a.name}{!a.ready && <em>준비 중</em>}</strong>
              <small>{a.desc}</small>
            </span>
          </a>
        ))}
      </div>
      <footer className="sa-foot">버전 {__BUILD_ID__.slice(0, 16).replace("T", " ")}</footer>
    </main>
  );
}
