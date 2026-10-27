import {
  Compass,
  Globe2,
  MapPin,
  Sparkles,
} from "lucide-react";

import SearchBar from "../components/search/SearchBar";

export default function Explore() {
  return (
    <div className="explore-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            YOUR NEXT ADVENTURE STARTS HERE
          </div>

          <h1>
            The world is
            <br />
            <span>waiting for you.</span>
          </h1>

          <p className="hero-description">
            Find inspiring destinations, explore places on
            the map, and keep your favourite discoveries in
            one place.
          </p>

          {/* Reusable Search Component */}
          <SearchBar />

          <div className="hero-note">
            <Globe2 size={16} />
            Discover somewhere new, one search at a time.
          </div>
        </div>

        {/* Travel Inspiration Section */}
        <div
          className="hero-art"
          aria-label="Travel inspiration"
        >
          <div className="hero-image-placeholder">
            <Compass
              size={78}
              strokeWidth={1.1}
            />

            <span className="hero-art-label">
              <MapPin size={16} />
              Your next destination
            </span>
          </div>

          <div className="floating-note">
            <span className="floating-note-icon">
              <Sparkles size={18} />
            </span>

            <div>
              <strong>Made for explorers</strong>
              <p>Your journey, your way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div>
          <p className="section-kicker">
            START EXPLORING
          </p>

          <h2>Where will you go next?</h2>

          <p>
            Search for a destination to begin discovering
            places and building your personal travel list.
          </p>
        </div>

        <div className="welcome-icon">
          <Globe2 size={30} />
        </div>
      </section>
    </div>
  );
}