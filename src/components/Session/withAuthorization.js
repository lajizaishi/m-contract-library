import React from 'react';
import Router from 'next/router';

import * as routes from '../../constants/routes';

const withAuthorization = (needsAuthorization) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
    }

    render() {
      return (
        <Component { ...this.props } />
      );
    }
  }

  return WithAuthorization;
}

export default withAuthorization;
