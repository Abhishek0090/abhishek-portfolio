import { profile } from "@/data/profile";
import LocalTime from "./LocalTime";
import BackToTop from "./BackToTop";

export default function Footer() {
  const links = [
    ["GitHub", profile.links.github],
    ["LinkedIn", profile.links.linkedin],
    ["Resume", profile.links.resume],
  ].filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-name">{profile.name}</div>
          <div className="footer-role">{profile.headline}</div>
        </div>
        {links.length > 0 && (
          <ul className="footer-links">
            {links.map(([label, url]) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="footer-row mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>
          Local time <LocalTime seconds />
        </span>
        <BackToTop />
      </div>
    </footer>
  );
}
