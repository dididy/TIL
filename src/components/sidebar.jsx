import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import parseLinksToTree from '../utils/parse-links-to-tree';
import { NavTree } from './navtree';
import './sidebar.css';

const Sidebar = ({ className }) => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___path], order: ASC }) {
          edges {
            node {
              frontmatter {
                path
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMarkdownRemark: { edges: pages } }) => (
      <NavTree tree={parseLinksToTree(pages)} className={className} />
    )}
  />
);

Sidebar.defaultProps = {
  className: '',
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
