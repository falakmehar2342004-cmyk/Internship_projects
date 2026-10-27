import { Compass, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">
          <Compass size={18} />
          Wanderly
        </p>

        <p>Discover places. Plan memories.</p>

        <p className="footer-credit">
          Made for curious travellers <Heart size={14} />
        </p>
      </div>
    </footer>
  );
}