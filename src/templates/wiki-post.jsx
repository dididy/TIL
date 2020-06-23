import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Layout>
    </div>

  );
}

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
      html: PropTypes.string.isRequired,
    }),
  }),
};

Template.defaultProps = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
      html: PropTypes.string.isRequired,
    }),
  }),
};

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
