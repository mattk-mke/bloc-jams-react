import React, {Component} from 'react';
import albumData from './../data/albums'
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.5,
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

  formatTime(time) {
    if (time > 0) {
      const timeFormatted = new Date(time * 1000).toISOString().substr(15, 4);
      return timeFormatted;
    } else return "-:--";
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

  handlePrevClick(song) {
    if (!this.state.isPlaying) {return};
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick(song) {
    if (!this.state.isPlaying) {return};
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length, currentIndex + 1);
    if (currentIndex >= this.state.album.songs.length - 1) {return};
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime});
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume});
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration});
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume});
      },
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  render() {
    return (
      <section className="album">
        <section className="current-album-info">
          <div className="art-div"><img id="album-cover-art" className="animated slideInUp" src={this.state.album.albumCover} alt="album cover" /></div>
          <div className="album-details animated slideInUp">
            <h1 className="album-title">{this.state.album.title}</h1>
            <h2 className="album-artist">{this.state.album.artist}</h2>
            <div className="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list" className="animated slideInUp">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <thead>
            <tr id="song-list-headers">
              <th>#</th>
              <th>Title</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            { this.state.album.songs.map( (song, index) => 

            
              <tr className="song" key={index} onClick={ () => this.handleSongClick(song)} onMouseEnter={ () => this.handleMouseOver(song) } onMouseLeave={this.handleMouseOff.bind(this)}>
                {(song !== this.state.currentSong && song !== this.state.hoveredSong) &&
                  <td className="songnumber">{index + 1}</td>
                }
                {(song === this.state.currentSong && song !== this.state.hoveredSong && !this.state.isPlaying ) &&
                  <td className="songnumber"><span className="icon ion-md-play" /></td>
                }
                {(song === this.state.hoveredSong && song !== this.state.currentSong) &&
                  <td className="songnumber"><span className="icon ion-md-play" /></td>
                }
                {(song === this.state.currentSong && song === this.state.hoveredSong && !this.state.isPlaying) &&
                  <td className="songnumber"><span className="icon ion-md-play" /></td>
                }
                {(song === this.state.currentSong && this.state.isPlaying) && 
                  <td className="songnumber"><span className="icon ion-md-pause" /></td>
                }
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{this.formatTime(song.duration)}</td>
              </tr>

            
            )}
          </tbody>
        </table>
        <PlayerBar className="player-bar"
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          album={this.state.album}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={ () => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={ () => this.handlePrevClick() }
          handleNextClick={ () => this.handleNextClick() }
          handleTimeChange={ (e) => this.handleTimeChange(e)}
          handleVolumeChange={ (e) => this.handleVolumeChange(e)}
          formatTime={ (time) => this.formatTime(time) }
        />
      </section>
    )
  }
}

export default Album;