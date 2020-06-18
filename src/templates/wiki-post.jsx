import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Header from '../components/header';

export default function Template({ data }) {
  const { markdownRemark: post } = data;

  const [state, setState] = useState({
    toggleDrawer: true,
  });

  const { toggleDrawer } = state;

  function handleClickDrawerButton() {
    setState({
      toggleDrawer: !toggleDrawer,
    });
  }

  return (
    <div>
      <Header onClickDrawerButton={() => handleClickDrawerButton()} />
      <Layout toggleDrawer={toggleDrawer} onClickDrawerButton={() => handleClickDrawerButton()}>
        <Helmet title={`Wiki - ${post.frontmatter.title}`} />
        <div>
          {/* <h1>{post.frontmatter.title}</h1> */}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Layout>
    </div>

  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
