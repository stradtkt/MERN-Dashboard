import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Navigation = ({auth: {isAuthenticated}, logout}) => {
    const authLinks = (
        <ul className='nav'>
            <li className='nav-item'>
                <Link className='nav-link' to='/dashboard'>Dashboard</Link>
            </li>
            <li className='nav-item'>
                <a className='nav-link' onClick={logout}>Logout</a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className='nav'>
            <li className='nav-item'>
                <Link className='nav-link' to='/'>Register</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
            </li>
        </ul>
    );

  return (
    <>
        <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-teal p-4">
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            </div>
            </div>
            <nav className="navbar navbar-box">
            <div className="container-fluid">
                <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Menu
                </button>
            </div>
        </nav>
    </>
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