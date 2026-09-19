import './Herosection.css';

const HeroSection = () => {
  return (
    <section className="hero" aria-label="Apple Event Hero">
      {/* Animated gradient background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="hero__bg-orb hero__bg-orb--3" />
      </div>

      <div className="hero__content">
        {/* Glowing Apple Logo */}
        <div className="hero__logo-container" aria-hidden="true">
          <div className="hero__logo-halo" />
          <div className="hero__logo-halo hero__logo-halo--2" />
          <svg className="hero__apple-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" fill="white">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 672.4 0 541.2 0 426.6c0-175.2 114.4-267.8 226.7-267.8 60 0 109.7 40.4 147.2 40.4 35.7 0 92-43 161.6-43 25.8 0 108.2 2.6 168.6 71.9zm-209.7-144.5c31.4-37 54.4-88.2 54.4-139.4 0-7.1-.6-14.3-1.9-20.1-51.5 2-112.5 34.5-149.5 76.7-28.5 32-56.4 83.1-56.4 135.1 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 46.4 0 102.5-31.1 138-71.7z"/>
          </svg>
        </div>

        {/* Event Label */}
        <p className="hero__eyebrow">Apple Event</p>

        {/* Headline */}
        <h1 className="hero__title">Surprise and shine.</h1>

        {/* Subtitle */}
        <p className="hero__subtitle">
          Watch a special Apple Event online on{' '}
          <strong>9 September at 10:30&nbsp;PM IST.</strong>
        </p>

        {/* CTA */}
        <div className="hero__actions">
          <a
            href="#"
            id="hero-calendar-btn"
            className="hero__cta hero__cta--white"
            aria-label="Add Apple Event to calendar"
          >
            Add to calendar
          </a>
        </div>
      </div>

      {/* Scroll chevron */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
