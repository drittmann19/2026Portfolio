/* Values — three principles with stroked display numerals */

const VALUES = [
  {
    title: "Clarity over cleverness",
    body: "The best design isn't the most innovative solution. It's the one people understand immediately. Transparency builds trust faster than polish.",
  },
  {
    title: "Stay uncomfortable",
    body: "Every time I've grown, it started with discomfort. Pitching to executives for the first time. Leading design across four squads. Moving to a new country. I seek out the edges of what I know because that's where perspective comes from.",
  },
  {
    title: "Learn fast, share what works",
    body: "The work I'm proudest of came from picking up something new. A tool, a framework, a domain. I stay curious, then I share what I've figured out so the people around me can move faster too.",
  },
];

export default function Values() {
  return (
    <section className="values" id="values">
      <div className="wrap">
        <header className="sec-head" data-reveal>
          <p className="eyebrow mono">fig. 03 · my values</p>
          <h2>
            How I <em>work</em>.
          </h2>
        </header>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <article className="value" data-reveal={i * 0.08} key={v.title}>
              <p className="value-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
