import React from 'react';
import { Alert } from 'reactstrap';

const ErrorBox = (props) => {
  const { closeErrorFunction } = props;
  const { error, isError } = props.errorStore;
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <Alert color="danger" isOpen={isError} toggle={closeErrorFunction}>
          <strong>Error:</strong> {error.message}
        </Alert>
      </div>
    </div>
  );
};

export default ErrorBox;
