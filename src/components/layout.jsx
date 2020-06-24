import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
  Divider, Drawer, IconButton,
} from '@material-ui/core';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import Sidebar from './sidebar';

import '@progress/kendo-theme-default/dist/all.css';
import './layout.css';
import './layout-custom.css';

deckDeckGoHighlightElement();

const styles = {
  drawer: {
    minWdith: 300,
  },
  content: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '1.45rem 1.0875rem',
    paddingTop: '100px',
  },
};

const Layout = ({ children, toggleDrawer, onClickDrawerButton }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={() => (
      <>
        <Drawer
          style={styles.drawer}
          open={toggleDrawer}
          onEscapeKeyDown={onClickDrawerButton}
          onBackdropClick={onClickDrawerButton}
        >
          <div className="sidebar">
            <IconButton onClick={onClickDrawerButton}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Sidebar />
        </Drawer>
        <div style={styles.content}>
          {children}
          <hr />
          <footer>
            ©
            {new Date().getFullYear()}
            , Built with
            {' '}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
);

Layout.defaultProps = {
  toggleDrawer: true,
  onClickDrawerButton: '',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  toggleDrawer: PropTypes.bool,
  onClickDrawerButton: PropTypes.func,
};

export default Layout;
