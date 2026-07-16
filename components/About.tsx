/* About — editorial text column + contour-line portrait */
export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <header className="sec-head" data-reveal>
          <p className="eyebrow mono">fig. 02 · about</p>
          <h2>
            Where this <em>comes from</em>.
          </h2>
        </header>
        <div className="about-grid">
          <div className="about-text" data-reveal>
            <p>
              I come from a family of teachers, so I grew up watching people make confusing
              things click. I didn&rsquo;t discover design until college and I instantly knew it
              was my passion. It blended my analytical problem solving skills with my need to
              be creative, into a process that benefits real people. I&rsquo;m drawn to the moment
              when something confusing becomes clear.
            </p>
            <p>
              I learn best by doing and I have grown fast. In 5 years I went from rebuilding
              university websites to leading a workflow redesign across 4 product squads at a
              Fortune Global 500 company. My expertise is complex, data heavy workflows where
              trust makes or breaks your product. My core principle is simplifying without
              hiding, because showing the details is what builds trust.
            </p>
            <p>
              What drives me is boundless curiosity and dedication. I adapt quickly to new
              industries, environments, and workflows because I ask the right questions and do
              the extra work. Right now I am all in on AI, learning by building and using it as
              a partner for the tedious parts so I can focus on design thinking and strategy. I
              want to help reinvent design around it.
            </p>
            <p>
              Outside of work you&rsquo;ll find me exploring. I&rsquo;ve been to 11 countries, and the
              best parts are never the landmarks, they&rsquo;re the people I meet and the new
              perspective I gain. When I&rsquo;m not abroad I&rsquo;m in the wild, backpacking, canoeing,
              camping, and occasionally standing 50 feet from a Yellowstone grizzly. At home, my
              competitive nature takes over in pick up soccer, frisbee, and video games.
              Curiosity gets me out the door. Dedication is why I never half-do any of it.
            </p>
          </div>
          <aside className="about-side" data-reveal="0.1">
            <figure className="portrait">
              <svg viewBox="0 0 320 380" aria-hidden="true">
                <path className="contour" d="M160 60 C220 60 256 110 252 170 C249 222 222 250 206 268 C220 276 262 292 270 330 L50 330 C58 292 100 276 114 268 C98 250 71 222 68 170 C64 110 100 60 160 60 Z" />
                <path className="contour" d="M160 84 C206 84 232 122 229 168 C226 208 206 232 192 248 C170 258 150 258 128 248 C114 232 94 208 91 168 C88 122 114 84 160 84 Z" />
                <path className="contour" d="M160 110 C192 110 210 138 208 168 C206 196 192 214 160 222 C128 214 114 196 112 168 C110 138 128 110 160 110 Z" />
                <circle className="contour" cx="160" cy="166" r="22" />
              </svg>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/about/LinkedInHeadshot.png" alt="Portrait of Damean Rittmann" loading="lazy" />
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
