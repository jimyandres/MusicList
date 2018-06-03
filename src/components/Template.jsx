import React from 'react';

import Header from './shared/Header';
import HomePage from './home/HomePage';

const Template = () => {
  return (
    <div className="wrapper">
      <Header username="anonymous" />
      <HomePage />
    </div>
  );
};

export default Template;
