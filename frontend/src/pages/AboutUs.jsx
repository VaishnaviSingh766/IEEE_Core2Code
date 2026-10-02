import { useEffect, useRef } from 'react';

//Images for the photos section
import img4 from '../assets/about/img4.jpeg';
import club from '../assets/about/club.jpg';
import img2 from '../assets/about/img2.jpg';
import img3 from '../assets/about/img3.jpg';
import ieeeImg from '../assets/about/ideeeas1.jpg';
import sitImg from '../assets/about/adblock.jpg';

const stripImages = [
  { src: img4, alt: 'Photo 1' },
  { src: club, alt: 'Photo 2' },
  { src: img2, alt: 'Photo 3' },
  { src: img3, alt: 'Photo 4' },
];

// Css part
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

.about-page {
  --black: #000000;
  --gold: #D4AF37;
  --white: #FFFFFF;
  --muted: rgba(255, 255, 255, 0.78);
  --glass: rgba(255, 255, 255, 0.07);
  --glass-border: rgba(212, 175, 55, 0.35);
  position: relative;
  overflow: hidden;
  background: var(--black);
  color: var(--white);
  font-family: 'DM Sans', system-ui, sans-serif;
  min-height: 100vh;
}
.about-page *, .about-page *::before, .about-page *::after { box-sizing: border-box; }

.about-wrap {
  position: relative; z-index: 1;
  max-width: 1180px; margin: 0 auto;
  padding: clamp(48px, 8vw, 96px) clamp(20px, 5vw, 72px);
}

/* Glass surface */
.about-page .glass {
  background: var(--glass);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  transition: scale 0.3s ease, box-shadow 0.3s ease;
}
@media (hover: hover) {
  .about-page .glass:hover {
    scale: 1.04;
    box-shadow: 0 16px 50px rgba(212, 175, 55, 0.18), 0 10px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
}

/* Heading */
.about-hero { text-align: center; animation: aboutRise 1s ease-out both; }
.about-hero h1 {
  font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
  font-size: clamp(3rem, 9vw, 5.5rem);
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(180deg, #FFB300 0%, #F5B000 55%, #FFE9A8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
@keyframes aboutRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }

.about-page .bar { display: block; height: 3px; width: 0; background: var(--gold); border-radius: 3px; }
.about-hero .bar { margin: 18px auto 0; animation: aboutGrow 1s 0.5s ease-out forwards; --w: 72px; }
@keyframes aboutGrow { to { width: var(--w); } }

/* Photos */
.about-page .photo { margin: 0; padding: 8px; }
.about-page .photo img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 16px; }

.strip { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: clamp(36px, 6vw, 64px); }
.strip .photo { flex: 1.3; aspect-ratio: 4 / 3; animation: aboutFloat 6s ease-in-out infinite alternate; }
.strip .photo:nth-child(odd) { flex: 1; aspect-ratio: 3 / 4; }
.strip .photo:nth-child(2) { animation-delay: -1.5s; }
.strip .photo:nth-child(3) { animation-delay: -3s; }
.strip .photo:nth-child(4) { animation-delay: -4.5s; }
@keyframes aboutFloat { from { transform: translateY(-8px); } to { transform: translateY(8px); } }

/* Split sections */
.split {
  display: grid; grid-template-columns: 1fr 1fr; align-items: center;
  gap: clamp(24px, 4vw, 48px);
  margin-top: clamp(64px, 10vw, 120px);
}
.split .photo { aspect-ratio: 4 / 3; }
.split.reverse .photo { order: 2; }
.panel { padding: clamp(24px, 4vw, 44px); }
.panel h2 {
  font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
  font-size: clamp(1.9rem, 4vw, 2.8rem); margin: 0 0 14px; letter-spacing: -0.01em;
}
.panel .bar { margin-bottom: 22px; --w: 56px; }
.panel p { margin: 0 0 18px; color: var(--muted); line-height: 1.75; font-size: 1rem; }
.panel p:last-child { margin-bottom: 0; }
.panel p.note { color: var(--white); border-left: 3px solid var(--gold); padding-left: 18px; }

/* Scroll reveal */
.about-page .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.9s ease, transform 0.9s ease, scale 0.3s ease, box-shadow 0.3s ease; }
.about-page .reveal.in { opacity: 1; transform: none; }
.split.reverse .photo.reveal { transition-delay: 0.1s; }
.reveal.in .bar { animation: aboutGrow 0.9s 0.4s ease-out forwards; }

@media (max-width: 820px) {
  .strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .strip .photo, .strip .photo:nth-child(odd) { aspect-ratio: 3 / 4; padding: 4px; border-radius: 14px; }
  .strip .photo img { border-radius: 10px; }
  .split, .split.reverse { grid-template-columns: 1fr; }
  .split .photo, .split.reverse .photo { order: -1; }
}

@media (prefers-reduced-motion: reduce) {
  .about-page *, .about-page *::before, .about-page *::after { animation: none !important; transition: none !important; }
  .about-page .reveal { opacity: 1; transform: none; }
  .about-page .bar { width: var(--w, 56px); }
}
`;

export default function AboutUs() {
  const root = useRef(null);

  // Fade sections in as they scroll into view
  useEffect(() => {
    const items = root.current.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="about-page" ref={root}>
      <style>{css}</style>

      <div className="about-wrap">
        <header className="about-hero">
          <h1>About Us</h1>
          <p className="note" style={{ textAlign: 'center', marginTop: '24px' }}>
          Learn more about our mission, vision, and team!
        </p>
          <span className="bar" />
        </header>
        
        <div className="strip">
          {stripImages.map((img) => (
            <figure className="photo glass" key={img.alt}>
              <img src={img.src} alt={img.alt} />
            </figure>
          ))}
        </div>

        <section className="split">
          <figure className="photo glass reveal">
            <img src={ieeeImg} alt="IEEE SIT SB" />
          </figure>
          <div className="panel glass reveal">
            <h2>IEEE SIT SB</h2>
            <span className="bar" />
            <p>
              IEEE SIT SB was established in 2002 under the inspiring leadership of Professor
              Basavarajaiah. The legacy continued under the vision of Dr. K V Suresh (HOD, ECE) and
              Dr. N R Sunitha (HOD, CSE). Our current branch counsellors, Dr. K Vishwanath (HOD,
              ETE) and Dr. Veena Karjigi (Associate Professor, ECE), have led IEEE SIT SB to many
              laurels. This is the only student branch from Bangalore Section to be featured in the
              IEEE India Council Newsletter, 2019
            </p>
            <p className="note">
              IEEE SIT SB fosters a diverse team, offering opportunities for individuals to explore
              and enhance their skills. The WIE IEEE SIT SB wing supports innovation and technology
              by and for women through various events.
            </p>
          </div>
        </section>

        <section className="split reverse">
          <figure className="photo glass reveal">
            <img src={sitImg} alt="SIT" />
          </figure>
          <div className="panel glass reveal">
            <h2>SIT</h2>
            <span className="bar" />
            <p>
              Siddaganga Institute of Technology has a rich heritage of bestowing knowledge and
              passion to young minds. Its motto &apos;work is worship&apos; is ingrained into the
              minds of every student, thus creating an inclusive and empowering community for
              students that encourages growth and achievement. The unwavering assistance from
              professors and administrators played a significant role in building the confidence
              and perspective of every individual.
            </p>
            <p>
              The institution stands as a beacon of academic excellence and innovation, providing
              state-of-the-art facilities and world-class education to its students. With a
              commitment to holistic development, SIT nurtures technical expertise alongside
              ethical and social values, preparing graduates who are not only skilled professionals
              but also responsible global citizens.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
