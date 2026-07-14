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
              I come from a family of teachers. Growing up, I watched my parents find ways to
              make difficult concepts click for students who were struggling. That probably
              explains why I ended up in design. I&rsquo;m drawn to the moment when something
              confusing becomes clear.
            </p>
            <p>
              I didn&rsquo;t know design was a job until college. I started in computer science, but
              something was missing. When I discovered design, it clicked. I could blend my
              creative and technical sides to solve real, complex problems that empower people.
              Growing up in Shanghai, studying abroad in Sweden, and landing at CU Boulder
              taught me that perspective matters. What works for one person, one culture, one
              workflow doesn&rsquo;t automatically transfer to the next. You have to truly understand
              the problem and the person behind it before you solve.
            </p>
            <p>
              My real design education came at Nutrien, where I spent four years in the
              agricultural technology space. The problems were the kind I&rsquo;ve come to love.
              Field workers with unreliable connectivity, seasonal workflows that shifted
              constantly, legacy systems that didn&rsquo;t always cooperate, and expert users who
              noticed every wrong detail. I learned that simplifying complexity isn&rsquo;t about
              hiding it. It&rsquo;s about making it legible enough that people trust what they&rsquo;re
              looking at. Somewhere in those four years I also got curious about how AI could
              change the way I work, and I haven&rsquo;t stopped experimenting since. It&rsquo;s become
              part of how I think, prototype, and ship.
            </p>
            <p>
              That curiosity has spilled into building too. I designed and shipped GasCast
              (live on the App Store), then designed and built this portfolio site to keep
              stretching what I can do. Both started as learning projects. Both ended up real.
            </p>
            <p>
              Outside of work, you&rsquo;ll find me feeding my growth mindset by traveling to explore
              new cultures, getting outdoors for camping and adventures, catching live shows,
              or channeling my competitive spirit through table tennis, ultimate frisbee, and
              Rocket League. Games taught me to adapt quickly and think strategically under
              pressure, which translates to design more than I expected. When I&rsquo;m not out
              exploring, I&rsquo;m hanging out with my three cats Rotary, Axl, and Piper (see if you
              can guess the theme). They&rsquo;re my best work partners, helping me think through
              tricky problems and making sure I actually take breaks.
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
