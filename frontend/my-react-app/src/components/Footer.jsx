import './Footer.css';

const footerData = [
  {
    heading: 'Shop and Learn',
    links: ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods', 'TV & Home', 'AirTag', 'Accessories', 'Gift Cards'],
  },
  {
    heading: 'Apple Wallet',
    links: ['Wallet', 'Apple Card', 'Apple Pay', 'Apple Cash'],
  },
  {
    heading: 'Account',
    links: ['Manage Your Apple ID', 'Apple Store Account', 'iCloud.com'],
  },
  {
    heading: 'Entertainment',
    links: ['Apple One', 'Apple TV+', 'Apple Music', 'Apple Arcade', 'Apple Fitness+', 'Apple News+', 'Apple Podcasts', 'Apple Books', 'App Store'],
  },
  {
    heading: 'Apple Store',
    links: [
      'Find a Store',
      'Genius Bar',
      'Today at Apple',
      'Apple Camp',
      'Apple Store App',
      'Certified Refurbished',
      'Apple Trade In',
      'Financing',
      'Carrier Deals at Apple',
      'Order Status',
      'Shopping Help',
    ],
  },
  {
    heading: 'For Business',
    links: ['Apple and Business', 'Shop for Business'],
  },
  {
    heading: 'For Education',
    links: ['Apple and Education', 'Shop for K-12', 'Shop for College'],
  },
  {
    heading: 'For Healthcare',
    links: ['Apple in Healthcare', 'Health on Apple Watch', 'Health Records on iPhone'],
  },
  {
    heading: 'For Government',
    links: ['Shop for Government', 'Shop for Veterans and Military'],
  },
  {
    heading: 'Apple Values',
    links: ['Accessibility', 'Education', 'Environment', 'Inclusion and Diversity', 'Privacy', 'Racial Equity and Justice', 'Supply Chain'],
  },
  {
    heading: 'About Apple',
    links: ['Newsroom', 'Apple Leadership', 'Career Opportunities', 'Investors', 'Ethics & Compliance', 'Events', 'Contact Apple'],
  },
];

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      {/* Shopping Shortcuts */}
      <div className="footer__top">
        <p className="footer__top-text">
          More ways to shop:{' '}
          <a href="#" className="footer__top-link">Find an Apple Authorised Reseller</a>{' '}
          near you. Or call 000800 040 1966.
        </p>
      </div>

      {/* Main Link Grid */}
      <div className="footer__links-grid">
        {footerData.map((col) => (
          <div key={col.heading} className="footer__col">
            <h3 className="footer__col-heading">{col.heading}</h3>
            <ul className="footer__col-list">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="footer__col-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="footer__divider" />

      {/* Legal */}
      <div className="footer__legal">
        <p className="footer__legal-note">
          Copyright &copy; {new Date().getFullYear()} Apple Inc. All rights reserved.
        </p>
        <nav className="footer__legal-links" aria-label="Legal links">
          {['Privacy Policy', 'Terms of Use', 'Sales and Refunds', 'Legal', 'Site Map'].map((item) => (
            <a key={item} href="#" className="footer__legal-link">{item}</a>
          ))}
        </nav>
        <p className="footer__country">India</p>
      </div>
    </footer>
  );
};

export default Footer;
