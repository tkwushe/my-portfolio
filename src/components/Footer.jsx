import crest from '../assets/arsenal-crest.svg';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} {profile.firstName} {profile.lastName}
      </p>
      <p className="footer__club">
        <img className="footer__crest" src={crest} alt="" width="292" height="343" />
        Supports {profile.supports}. Not affiliated with the club.
      </p>
      <p className="footer__note">Full time. Thanks for watching.</p>
    </footer>
  );
}
