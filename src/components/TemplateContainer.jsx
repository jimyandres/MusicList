import React from 'react';
import { connect } from 'react-redux';
import Template from './Template';

const TemplateContainer = (props) => {
  const { authentication, progress } = props;
  return (
    <Template progress={progress} authentication={authentication} />
  );
};

const mapStateToProps = (state) => {
  return {
    progress: state.progress,
    authentication: state.authentication,
  };
};

export default connect(mapStateToProps)(TemplateContainer);
