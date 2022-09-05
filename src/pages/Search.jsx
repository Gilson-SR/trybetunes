import React from 'react';

export default class Search extends React.Component {
  state = {
    artist: '',
  };

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <input
          type="text"
          name="artist"
          id="inputArtist"
          data-testid="search-artist-input"
          onChange={ ({ target: { value } }) => this.setState({ artist: value }) }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ artist.length < 2 }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
