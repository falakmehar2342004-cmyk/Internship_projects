import { Heart, MapPin } from "lucide-react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

export default function Favorites() {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="section-kicker">YOUR PERSONAL COLLECTION</p>
        <h1>Saved destinations</h1>
        <p>Keep the places you love close at hand.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Heart size={30} />
          </div>

          <h2>Your list is waiting</h2>
          <p>
            You have not saved any destinations yet. Explore places
            and add your favourites here.
          </p>

          <Link to="/" className="primary-button">
            <MapPin size={17} /> Explore destinations
          </Link>
        </div>
      ) : (
        <div className="destination-grid">
          {favorites.map((place) => (
            <article className="destination-card" key={place.id}>
              <div className="destination-card-content">
                <h2>{place.name}</h2>
                {place.address && <p>{place.address}</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}