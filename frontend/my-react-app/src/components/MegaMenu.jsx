import React from 'react';
import MegaMenuColumn from './MegaMenuColumn';
import './MegaMenu.css';

/**
 * Reusable MegaMenu Component
 * Renders an Apple-authentic multi-column dropdown panel dynamically powered by backend data
 */
const MegaMenu = ({
  activeMenu,
  isOpen,
  data,
  isLoading,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const currentCategory = activeMenu && data ? data[activeMenu] : null;

  return (
    <div
      className={`megamenu ${isOpen ? 'megamenu--open' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!isOpen}
      role="region"
      aria-label="Mega Menu Dropdown"
    >
      <div className="megamenu__inner">
        {isLoading && !currentCategory ? (
          <div className="megamenu__loading">
            <div className="megamenu__skeleton" />
            <div className="megamenu__skeleton" />
            <div className="megamenu__skeleton" />
          </div>
        ) : (
          currentCategory &&
          currentCategory.columns.map((col, idx) => (
            <MegaMenuColumn
              key={col.title}
              title={col.title}
              featured={col.featured}
              items={col.items}
              index={idx}
              onItemClick={onClose}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(MegaMenu);
