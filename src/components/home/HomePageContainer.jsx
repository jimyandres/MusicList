import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementProgress, decrementProgress } from '../../actions/progress';

import HomePage from './HomePage';

const HomePageContainer = (props) => {
  const { incrementProgressAction, decrementProgressAction } = props;
  return (
    <HomePage
      incrementFunction={incrementProgressAction}
      decrementFunction={decrementProgressAction}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    incrementProgressAction: incrementProgress,
    decrementProgressAction: decrementProgress,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(HomePageContainer);
