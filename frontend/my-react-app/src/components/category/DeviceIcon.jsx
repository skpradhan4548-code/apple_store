/**
 * High-fidelity Apple silhouette icons for ChapterNav
 */
export const DeviceIcon = ({ name = '', className = '' }) => {
  const normalized = name.toLowerCase();

  // Laptop (MacBook Air / MacBook Pro / MacBook Neo)
  if (normalized.includes('macbook')) {
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Screen / Lid */}
        <rect x="10" y="4" width="40" height="26" rx="2" stroke="#1d1d1f" strokeWidth="2" fill="#f5f5f7" />
        <rect x="13" y="7" width="34" height="20" rx="1" fill="#1d1d1f" />
        {/* Notch / Camera dot */}
        <circle cx="30" cy="5.5" r="0.75" fill="#86868b" />
        {/* Base / Keyboard body */}
        <path d="M4 31C4 30.4477 4.44772 30 5 30H55C55.5523 30 56 30.4477 56 31V32.5C56 33.3284 55.3284 34 54.5 34H5.5C4.67157 34 4 33.3284 4 32.5V31Z" fill="#1d1d1f" />
        {/* Trackpad notch */}
        <rect x="26" y="30" width="8" height="1.5" rx="0.5" fill="#f5f5f7" />
      </svg>
    );
  }

  // iMac / Displays
  if (normalized.includes('imac') || normalized.includes('display')) {
    return (
      <svg className={className} viewBox="0 0 60 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Display Screen */}
        <rect x="8" y="2" width="44" height="30" rx="2" stroke="#1d1d1f" strokeWidth="2" fill="#1d1d1f" />
        {/* Screen Bezel / Chin */}
        <rect x="9" y="26" width="42" height="5" fill="#86868b" />
        {/* Stand */}
        <path d="M26 33H34V40H26V33Z" fill="#a1a1a6" />
        <rect x="22" y="40" width="16" height="2" rx="1" fill="#1d1d1f" />
      </svg>
    );
  }

  // Mac mini / Mac Studio
  if (normalized.includes('mini') || normalized.includes('studio')) {
    const isStudio = normalized.includes('studio');
    const height = isStudio ? 20 : 12;
    const yPos = isStudio ? 16 : 24;
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <rect x="14" y={yPos} width="32" height={height} rx="3" stroke="#1d1d1f" strokeWidth="2" fill="#f5f5f7" />
        {/* Power LED dot */}
        <circle cx="41" cy={yPos + height - 3.5} r="0.75" fill="#1d1d1f" />
        {/* Apple logo or front slot */}
        {isStudio && (
          <>
            <rect x="18" y={yPos + 4} width="3" height="3" rx="0.5" fill="#1d1d1f" />
            <rect x="23" y={yPos + 4} width="3" height="3" rx="0.5" fill="#1d1d1f" />
          </>
        )}
      </svg>
    );
  }

  // iPad (iPad Pro, iPad Air, iPad mini)
  if (normalized.includes('ipad')) {
    const isMini = normalized.includes('mini');
    const width = isMini ? 24 : 28;
    const height = isMini ? 34 : 38;
    const xPos = isMini ? 18 : 16;
    return (
      <svg className={className} viewBox="0 0 60 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer bezel */}
        <rect x={xPos} y="4" width={width} height={height} rx="3" stroke="#1d1d1f" strokeWidth="2" fill="#f5f5f7" />
        {/* Inner screen */}
        <rect x={xPos + 2} y="6" width={width - 4} height={height - 4} rx="1.5" fill="#1d1d1f" />
        {/* Camera dot */}
        <circle cx={xPos + width / 2} cy="5" r="0.5" fill="#86868b" />
      </svg>
    );
  }

  // Apple Pencil
  if (normalized.includes('pencil')) {
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="29" y="6" width="3" height="30" rx="1" fill="#1d1d1f" />
        <polygon points="29,6 32,6 30.5,2" fill="#86868b" />
      </svg>
    );
  }

  // Keyboards
  if (normalized.includes('keyboard')) {
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="14" width="36" height="20" rx="2" stroke="#1d1d1f" strokeWidth="1.5" fill="#f5f5f7" />
        {/* Keys grid lines */}
        <line x1="16" y1="18" x2="44" y2="18" stroke="#1d1d1f" strokeWidth="1" strokeDasharray="3 1" />
        <line x1="16" y1="23" x2="44" y2="23" stroke="#1d1d1f" strokeWidth="1" strokeDasharray="3 1" />
        <rect x="22" y="27" width="16" height="4" rx="1" fill="#1d1d1f" />
      </svg>
    );
  }

  // iPhone (iPhone 16 Pro, iPhone 16, iPhone Duo, etc.)
  if (normalized.includes('iphone')) {
    return (
      <svg className={className} viewBox="0 0 60 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chassis */}
        <rect x="20" y="4" width="20" height="38" rx="4" stroke="#1d1d1f" strokeWidth="2" fill="#f5f5f7" />
        {/* Screen */}
        <rect x="22" y="6" width="16" height="34" rx="2.5" fill="#1d1d1f" />
        {/* Dynamic Island */}
        <rect x="27" y="7.5" width="6" height="1.8" rx="0.9" fill="#000000" />
      </svg>
    );
  }

  // Apple Watch
  if (normalized.includes('watch') || normalized.includes('strap')) {
    return (
      <svg className={className} viewBox="0 0 60 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top strap */}
        <path d="M24 2H36V10H24V2Z" fill="#a1a1a6" />
        {/* Watch case */}
        <rect x="20" y="9" width="20" height="26" rx="6" stroke="#1d1d1f" strokeWidth="2" fill="#1d1d1f" />
        {/* Digital crown */}
        <rect x="40" y="14" width="1.5" height="5" rx="0.5" fill="#1d1d1f" />
        {/* Side button */}
        <rect x="40" y="22" width="1" height="6" rx="0.5" fill="#86868b" />
        {/* Bottom strap */}
        <path d="M24 34H36V42H24V34Z" fill="#a1a1a6" />
      </svg>
    );
  }

  // AirPods (AirPods 4, AirPods Pro 2)
  if (normalized.includes('airpods') && !normalized.includes('max')) {
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left earbud */}
        <circle cx="24" cy="14" r="5" fill="#1d1d1f" />
        <rect x="22" y="15" width="3" height="16" rx="1.5" fill="#1d1d1f" />
        {/* Right earbud */}
        <circle cx="36" cy="14" r="5" fill="#1d1d1f" />
        <rect x="35" y="15" width="3" height="16" rx="1.5" fill="#1d1d1f" />
      </svg>
    );
  }

  // AirPods Max
  if (normalized.includes('airpods max') || normalized.includes('max')) {
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Headband */}
        <path d="M19 22C19 13.7157 24.8198 8 30 8C35.1802 8 41 13.7157 41 22" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" />
        {/* Left earcup */}
        <rect x="15" y="20" width="7" height="14" rx="3.5" fill="#1d1d1f" />
        {/* Right earcup */}
        <rect x="38" y="20" width="7" height="14" rx="3.5" fill="#1d1d1f" />
      </svg>
    );
  }

  // Compare
  if (normalized.includes('compare')) {
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="17" y="10" width="11" height="24" rx="2" stroke="#1d1d1f" strokeWidth="1.5" strokeDasharray="2 1" />
        <rect x="32" y="8" width="13" height="26" rx="2" stroke="#1d1d1f" strokeWidth="1.5" fill="#f5f5f7" />
      </svg>
    );
  }

  // Apple Music
  if (normalized.includes('music')) {
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="8" width="24" height="24" rx="6" fill="#fc3c44" />
        <path d="M33 13V22.5C32.3 22.2 31.4 22 30.5 22C28.6 22 27 23.1 27 24.5C27 25.9 28.6 27 30.5 27C32.4 27 34 25.9 34 24.5V16L37 15V13H33Z" fill="#ffffff" />
      </svg>
    );
  }

  // Accessories
  if (normalized.includes('accessori')) {
    return (
      <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* MagSafe Puck */}
        <circle cx="30" cy="18" r="9" stroke="#1d1d1f" strokeWidth="2" fill="#f5f5f7" />
        <circle cx="30" cy="18" r="4" stroke="#86868b" strokeWidth="1" />
        {/* Cable */}
        <path d="M30 27V36" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Generic fallback
  return (
    <svg className={className} viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="8" width="24" height="26" rx="3" stroke="#1d1d1f" strokeWidth="2" fill="#f5f5f7" />
    </svg>
  );
};

export default DeviceIcon;
