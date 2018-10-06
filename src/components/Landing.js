import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <section className="landing">
    <section id="splash">
      <div className="splash-column">
        <h1 className="bloc-jams">Bloc Jams</h1>
        <h2 className="bloc-jams">Turn the music up!</h2>
      </div>
      <div className="splash-column">
        <Link to='/library' >
          <button className="call-to-action">Listen Now</button>
        </Link>
      </div>
    </section>
    <div className="selling-points">
      <div className="point">
        <h2 className="point-title">Choose your music.</h2>
        <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <h2 className="point-title">Unlimited streaming, ad-free.</h2>
        <p className="point-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <h2 className="point-title">Mobile enabled</h2>
        <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </div>
  </section>
  );

export default Landing;