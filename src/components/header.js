import PropTypes from "prop-types"
import React from "react"
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';


const styles = {
  toggleButton: {
    '&.MuiButtonBase-root': {
      color: 'white',
    },
  },
};

const Header = ({ onClickDrawerButton }) => (

      <AppBar
        style={{ background: 'white'}}
      >
        <Toolbar>
          <IconButton
            css={styles.toggleButton}
            color={'primary'}
            onClick={onClickDrawerButton}
            aria-label="menu"
            size="medium"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
    </AppBar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
