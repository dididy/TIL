import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

deckDeckGoHighlightElement();

const IndexPage = () => (
  <Layout>
    <Link to="/about">About</Link>
  </Layout>
);

export default IndexPage;
