import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Sidebar from './sidebar';

import '@progress/kendo-theme-default/dist/all.css';
import './layout.css';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();


const isMobile = window.innerWidth <= 576;
const styles = {
  content: {
    margin: `0 auto`,
    maxWidth: 960,
    padding: `1.45rem 1.0875rem`,
    paddingTop: `100px`,
  }
}

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
    render={data => (
      <>
        <div>
          <Drawer
            open={toggleDrawer}
            variant={isMobile ? 'temporary' : 'persistent'}
          >
            <div>
              <IconButton onClick={onClickDrawerButton}>
                <ChevronLeftIcon />
              </IconButton>
            </div>  
            <Divider />
            <Sidebar />
          </Drawer>
          <div 
            style={styles.content}>
            {children}
            <hr />
            <footer>
              © {new Date().getFullYear()}, Built with
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;