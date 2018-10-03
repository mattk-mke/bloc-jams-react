import React, {Component} from 'react';
import albumData from './../data/albums'

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      hoveredSong: null
      
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({isPlaying: false});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song)};
      this.play();
    }
  }

  handleMouseOver(song) {
    this.setState({hoveredSong: song});
  }

  handleMouseOff() {
    this.setState({hoveredSong: null});
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover" />
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
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            { this.state.album.songs.map( (song, index) => 

            
              <tr className="song" key={index} onClick={ () => this.handleSongClick(song)} onMouseEnter={ () => this.handleMouseOver(song) } onMouseLeave={this.handleMouseOff.bind(this)}>
                {(song !== this.state.currentSong && song !== this.state.hoveredSong) &&
                  <td>{index + 1}</td>
                }
                {(song === this.state.currentSong && song !== this.state.hoveredSong && !this.state.isPlaying ) &&
                  <td><span className="icon ion-md-play" /></td>
                }
                {(song === this.state.hoveredSong && song !== this.state.currentSong) &&
                  <td><span className="icon ion-md-play" /></td>
                }
                {(song === this.state.currentSong && song === this.state.hoveredSong && !this.state.isPlaying) &&
                  <td><span className="icon ion-md-play" /></td>
                }
                {(song === this.state.currentSong && this.state.isPlaying) && 
                  <td><span className="icon ion-md-pause" /></td>
                }
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