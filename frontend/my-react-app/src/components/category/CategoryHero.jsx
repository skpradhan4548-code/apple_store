import { Link } from 'react-router-dom';
import './CategoryHero.css';

const CategoryHero = ({ hero }) => {
  if (!hero) return null;

  const isDark = hero.theme === 'dark';

  return (
    <section className={`category-hero category-hero--${isDark ? 'dark' : 'light'}`}>
      <div className="category-hero__content">
        <h1 className="category-hero__headline">{hero.headline}</h1>
        {hero.subhead && <p className="category-hero__subhead">{hero.subhead}</p>}
        {hero.availability && (
          <p className="category-hero__availability">{hero.availability}</p>
        )}

        <div className="category-hero__ctas">
          {hero.primaryCtaText && (
            <Link
              to={hero.primaryCtaLink || '#'}
              className="category-hero__btn category-hero__btn--primary"
            >
              {hero.primaryCtaText}
            </Link>
          )}
          {hero.secondaryCtaText && (
            <Link
              to={hero.secondaryCtaLink || '#'}
              className="category-hero__btn category-hero__btn--secondary"
            >
              {hero.secondaryCtaText} &gt;
            </Link>
          )}
        </div>
      </div>

      <div className="category-hero__media">
        <img
          src={hero.image}
          alt={hero.headline}
          className="category-hero__img"
          loading="eager"
        />
      </div>
    </section>
  );
};

export default CategoryHero;
