import React, {Component} from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <div class="now-playing">
          <div className="np-left">
            <div className="np">Now Playing:</div>
            <div className="current-time">{this.props.formatTime(this.props.currentTime)} / {this.props.formatTime(this.props.duration)}</div>
          </div>
          <div className="np-right">
            <div className="np-song">{this.props.currentSong.title}</div>
            <div className="np-artist">{this.props.album.artist}</div>
          </div>
        </div>
        <section className="control-buttons">
          <button id="previous" onClick={this.props.handlePrevClick} >
            <span className="icon ion-md-skip-backward"></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span className={this.props.isPlaying ? "icon ion-md-pause" : "icon ion-md-play"} ></span>
          </button>
          <button id="next" onClick={this.props.handleNextClick} >
            <span className="icon ion-md-skip-forward"></span>
          </button>
        </section>
        <section id="time-control">
          
          <div className="seek-container">
            <input 
              type="range"
              className="seek-bar"
              value={(this.props.currentTime / this.props.duration) || 0}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleTimeChange}
            />
          </div>
        </section>
        <section id="volume-control">
          <span className="icon ion-md-volume-low"></span>
          <input
            type="range"
            className="volume-bar"
            value={this.props.volume}
            max="1"
            min="0"
            step="0.1"
            onChange={this.props.handleVolumeChange}
            />
          <span className="icon ion-md-volume-high"></span>
        </section>
      </section>
    );
    }
  }

export default PlayerBar;