export function Placeholder({ name, desc }: { name: string; desc: string }) {
  return (
    <main className="sa-home">
      <a className="sa-back" href="#/">← 앱 홈</a>
      <div className="sa-empty">
        <h1>{name}</h1>
        <p>{desc}</p>
        <p className="sa-muted">다음 업데이트에서 채워질 예정이에요.</p>
      </div>
    </main>
  );
}
