import React from 'react';
import { Redirect } from '@reach/router';

const IndexPage = (location) => <Redirect noThrow to={`${location.location.pathname}about`} />;

export default IndexPage;
