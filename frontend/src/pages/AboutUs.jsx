import { useEffect, useRef } from 'react';
import './AboutUs.css';

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

export default function AboutUs() {
  const root = useRef(null);

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
      <div className="about-wrap">
        <header className="about-hero">
          <h1>About Us</h1>
          <p className="about-sub">Learn more about our mission, vision, and team</p>
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