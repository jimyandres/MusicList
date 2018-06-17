import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addArtist, artistSearchClear, searchArtists } from '../../actions/artists';

import ArtistsPage from './ArtistsPage';

class ArtistsPageContainer extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(artistSearchClear());
  }

  render() {
    const { addArtistFunction, artists, searchArtistsFunction, user } = this.props;
    return (
      <ArtistsPage
        addArtistFunction={addArtistFunction}
        artists={artists}
        searchArtistsFunction={searchArtistsFunction}
        user={user}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addArtistFunction: addArtist,
  searchArtistsFunction: searchArtists,
  dispatch,
}, dispatch);

const mapStateToProps = state => ({ artists: state.artists, user: state.user });

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPageContainer);
