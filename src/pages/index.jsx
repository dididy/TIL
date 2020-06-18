import React from 'react';
import { Redirect } from '@reach/router';

const IndexPage = (location) => {
  return <Redirect noThrow to={`${location.location.pathname}about`} />;
};

export default IndexPage;
