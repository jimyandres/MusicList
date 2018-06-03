import React from 'react';

import Sidebar from '../shared/Sidebar';

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-sm-12 col-lg-8">
        This is the Home Page.
      </div>
      <Sidebar />
    </div>
  );
};

export default HomePage;
