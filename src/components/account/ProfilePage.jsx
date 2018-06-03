import React from 'react';

import Sidebar from '../shared/Sidebar';

const ProfilePage = (props) => {
  const { match } = props;
  return (
    <div className="row">
      <div className="col-sm-12 col-md-8">
        This is the Profile Page. The profile id is: {match.params.id}
      </div>
      <Sidebar />
    </div>
  );
};

export default ProfilePage;
