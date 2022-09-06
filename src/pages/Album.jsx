import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

export default class Album extends React.Component {
  state = {
    data: [],
    loading: false,
    saved: [],
  };

  componentDidMount() {
    const start = async () => {
      await this.verifyChecked();
      await this.fetchApi();
    };
    start();
  }

  fetchApi = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const request = await getMusics(id);
    this.setState({ data: request });
  };

  handleClick = async (event) => {
    const { saved } = this.state;
    const newData = saved.some((element) => element.trackName === event.trackName);
    if (newData) {
      this.setState({ loading: true }, async () => {
        await removeSong(event);
        await this.verifyChecked();
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await addSong(event);
        await this.verifyChecked();
        this.setState({ loading: false });
      });
    }
  };

  verifyChecked = async () => {
    const data = await getFavoriteSongs();
    this.setState({ saved: data });
  };

  render() {
    const { data, loading, saved } = this.state;
    return (
      <div data-testid="page-album">
        Album
        {loading ? <Loading /> : (
          <div>
            {data.length > 0 && (
              <div>
                <p data-testid="artist-name">
                  {data[0].artistName}
                </p>
                <p data-testid="album-name">
                  {`${data[0].collectionName} (${data[0].artistName})`}
                </p>
              </div>
            )}
            {data.length > 0 && (
              data.map(
                (track, index) => index > 0 && (
                  <div key={ index }>
                    <label htmlFor={ index }>
                      Favorita
                      <input
                        type="checkbox"
                        id={ index }
                        data-testid={ `checkbox-music-${track.trackId}` }
                        onClick={ async () => {
                          await this.handleClick(track);
                          await this.verifyChecked();
                        } }
                        defaultChecked={ saved.length > 0 && (
                          saved.some((element) => element.trackName === track.trackName)
                        ) }
                      />
                    </label>
                    <MusicCard
                      trackName={ track.trackName }
                      previewUrl={ track.previewUrl }
                    />
                  </div>
                ),
              )
            )}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
