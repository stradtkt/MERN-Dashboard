import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
              <div className="user-box">
                <input type='email' value={email} id='email' onChange={onChange} name="email" required autoComplete='none'/>
                <label htmlFor='email'>Email</label>
              </div>
              <div className="user-box">
                <input type="password" value={password} id='password' onChange={onChange} name="password" required autoComplete='none'/>
                <label htmlFor='password'>Password</label>
              </div>
              <button type='submit'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </form>
          </div>
      </div>
    </div>
  </div>
  );
}


Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);