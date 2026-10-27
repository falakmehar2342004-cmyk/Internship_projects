import { Compass, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-icon">
        <Compass size={42} />
      </div>

      <p className="section-kicker">OFF THE MAP</p>
      <h1>Looks like you took a wrong turn.</h1>
      <p>
        We could not find this page. Let us take you back to exploring.
      </p>

      <Link to="/" className="primary-button">
        <Home size={17} /> Back to Wanderly
      </Link>
    </section>
  );
}