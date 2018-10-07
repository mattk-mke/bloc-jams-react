import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {albums: albumData};
  }
  render() {
    return (
      <section className="library">
        {
          this.state.albums.map( (album, index) =>
            <Link className="album-column animated bounceIn" to={`/album/${album.slug}`} key={index}>
              <div className="album-art">
                <img height='300px' width="300px" src={album.albumCover} alt={album.title} />
              </div>
              <div className="album-info">
                <div className="album-title">{album.title}</div>
                <div className="album-artist">{album.artist}</div>
                <div className="album-length">{album.songs.length} songs</div>
              </div>
            </Link>
          )
        }
      </section> 
    );
  }
}

export default Library;