import React, {Component} from 'react';
import albumData from './../data/albums'

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album
    };
  }
  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="Artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Duration</th>
          </tr>
          <tbody>
            { this.state.album.songs.map( (song, index) =>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{song.title}</td>
                <td>{new Date(song.duration * 1000).toISOString().substr(14, 5)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    )
  }
}

export default Album;