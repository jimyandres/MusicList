import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAlbum, albumSearchClear, searchAlbum } from '../../actions/albums';

import AlbumsPage from './AlbumsPage';

class AlbumsPageContainer extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(albumSearchClear());
  }

  render() {
    const { addAlbumFunction, albums, authentication, searchAlbumsFunction, user } = this.props;
    return (
      <div>
        <AlbumsPage
          addAlbumFunction={addAlbumFunction}
          albums={albums}
          authentication={authentication}
          searchAlbumsFunction={searchAlbumsFunction}
          user={user}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums,
  authentication: state.authentication,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addAlbumFunction: addAlbum,
  searchAlbumsFunction: searchAlbum,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPageContainer);
