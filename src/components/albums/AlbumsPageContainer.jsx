import React, { Component } from 'react';
import { connect } from 'react-redux';
import { albumSearchClear, searchAlbum } from '../../actions/albums';

import AlbumsPage from './AlbumsPage';

class AlbumsPageContainer extends Component {
  constructor(props) {
    super(props);

    // bound functions
    this.searchAlbumsFunction = this.searchAlbumsFunction.bind(this);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(albumSearchClear());
  }

  searchAlbumsFunction(searchText) {
    const { dispatch } = this.props;
    dispatch(searchAlbum(searchText));
  }

  render() {
    const { albums } = this.props;
    return (
      <div>
        <AlbumsPage
          albums={albums}
          searchAlbumsFunction={this.searchAlbumsFunction}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
  };
};

export default connect(mapStateToProps)(AlbumsPageContainer);
