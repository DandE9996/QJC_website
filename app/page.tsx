export default function Home() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-intro">
        <p className="home-kicker">Personal field notes</p>
        <h1 id="home-title">Juncheng Qian</h1>
        <p className="home-subtitle">Welcome to my cyber world.</p>
      </div>
      <div className="home-horizon" aria-hidden="true">
        <span />
        <p>Earth · air · everyday life</p>
      </div>
    </section>
  );
}
