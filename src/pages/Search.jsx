import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    inputArtist: '',
    artist: '',
    artistAlbum: [],
    loading: false,
  };

  handleClick = async () => {
    const { inputArtist } = this.state;
    this.setState({ inputArtist: '' });
    this.setState({ loading: true }, async () => {
      const request = await searchAlbumsAPI(inputArtist);
      this.setState({ loading: false, artistAlbum: request });
    });
  };

  render() {
    const { inputArtist, artistAlbum, loading, artist } = this.state;
    console.log(this.state);
    return (
      <div data-testid="page-search">
        {
          !loading && (
            <div>
              <input
                value={ inputArtist }
                type="text"
                data-testid="search-artist-input"
                onChange={ ({ target: { value } }) => {
                  this.setState({ inputArtist: value, artist: value });
                } }
              />

              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ inputArtist.length < 2 }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </div>
          )
        }
        {
          loading && <Loading />
        }

        <div>
          {artist.length >= 2 && artistAlbum.length > 0 ? (
            <div>
              <h2>{`Resultado de álbuns de: ${artist}`}</h2>
              {
                artistAlbum.map((element, index) => (
                  <div key={ `${element.artistId} ${index}` }>
                    <img src={ element.artworkUrl100 } alt={ element.artistName } />
                    <p>{`Album ${element.trackCount} ${element.collectionName}`}</p>
                    <p>{`Artista ${element.artistName}`}</p>
                    <Link
                      to={ `/album/${element.collectionId}` }
                      data-testid={ `link-to-album-${element.collectionId}` }
                    >
                      Álbum
                    </Link>
                  </div>
                ))
              }
            </div>
          ) : (
            <h1>Nenhum álbum foi encontrado</h1>
          )}
        </div>
      </div>
    );
  }
}
