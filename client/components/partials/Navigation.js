import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MenuItem, MenuList, Menu, MenuButton } from '@chakra-ui/react';

const Navigation = ({auth: {isAuthenticated}, logout}) => {
    const authLinks = (
        <MenuList>
            <MenuItem>
                <Link to="/dashboard">Dashboard</Link>
            </MenuItem>
            <MenuItem>
                <a onClick={logout}>Dashboard</a>
            </MenuItem>
        </MenuList>
    );

    const guestLinks = (
        <MenuList>
            <MenuItem>
                <Link to='/register'>Register</Link>
            </MenuItem>
            <MenuItem>
                <Link to='/login'>Login</Link>
            </MenuItem>
        </MenuList>
    );

  return (
    <Menu>
        <MenuButton
            as={IconButton}
            aria-label='Menu Nav'
            icon={<HamburgerIcon />}
            variant='outline'
        />
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </Menu>
  )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navigation);