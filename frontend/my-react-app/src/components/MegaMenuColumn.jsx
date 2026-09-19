import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Column Component for Mega Menu
 */
const MegaMenuColumn = ({ title, featured, items, index, onItemClick }) => {
  return (
    <div
      className={`megamenu__col ${featured ? 'megamenu__col--featured' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className="megamenu__heading">{title}</span>
      <ul className="megamenu__list">
        {items.map((item) => (
          <li key={item.label} className="megamenu__item">
            <Link to={item.path} className="megamenu__link" onClick={onItemClick}>
              <span>{item.label}</span>
              {item.badge && <span className="megamenu__badge">{item.badge}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(MegaMenuColumn);
