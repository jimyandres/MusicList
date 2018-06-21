import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

const formatGenre = discogsGenre => discogsGenre.join(', ');
const formatMembers = (discogsMembers) => {
  const activeMembers = discogsMembers.filter(member => member.active);
  const memberNames = activeMembers.map(member => member.name);
  return memberNames.join(', ');
};

const formatArtists = artists => artists.map(artist => <p key={artist.discogsId}>{artist.name}</p>);

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
  }

  createTable(items) {
    return (
      <Table striped responsive className="flex">
        <thead>
          <tr>
            <th className="thumb" />
            <th>{ items.type === 'album' ? 'Title' : 'Name' }</th>
            <th>{ items.type === 'album' ? 'Artist' : 'Active Members' }</th>
            <th>{ items.type === 'album' ? 'Genre(s)' : ' ' }</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { this.listItems(items) }
        </tbody>
      </Table>
    );
  }

  deleteItem(id, type) {
    const { deleteAlbumFunction, deleteArtistFunction } = this.props;
    if (type === 'album') {
      deleteAlbumFunction(id);
    }
    if (type === 'artist') {
      deleteArtistFunction(id);
    }
  }

  listItems(items) {
    const { authentication, username } = this.props;
    return items.list.map(item =>
      (
        <tr key={item.discogsId}>
          <td className="thumb"><img src={item.images[0] ? item.images[0].uri : ''} alt="item thumbnail" /></td>
          <td>{ items.type === 'album' ? item.title : item.name }</td>
          <td>{ items.type === 'album' ? item.artists[0].name : formatMembers(item.members) }</td>
          <td>{ items.type === 'album' ? formatGenre(item.genres) : ' ' }</td>
          <td>
            { username === authentication.username ?
              <Button
                color="secondary"
                onClick={() => this.deleteItem(item.discogsId, items.type)}
                outline
              >
                Remove From List
              </Button> :
              null
            }
          </td>
        </tr>
      ));
  }

  render() {
    const { username, albums, artists } = this.props;
    const albumsFormatted = { type: 'album', list: albums };
    const artistsFormatted = { type: 'artist', list: artists };
    return (
      <div className="row">
        <div className="col-12 col-sm-12">
          <h2>{ username }‘s Profile</h2>
          <h3>Artists They Like</h3>
          <div>
            { artists && artists.length > 0 ? this.createTable(artistsFormatted) : null }
          </div>
          <h3>Albums They Own</h3>
          <div>
            { albums && albums.length > 0 ? this.createTable(albumsFormatted) : null }
          </div>
        </div>
      </div>
    );
  }
}

export default ListPage;
