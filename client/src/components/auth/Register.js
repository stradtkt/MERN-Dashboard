import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/auth';
import { ToastContainer, toast } from 'react-toastify';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className="login-box">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
            <div className="user-box">
                <input type='text' value={name} id='name' onChange={onChange} name="name" required autoComplete='none'/>
                <label htmlFor='name'>Name</label>
              </div>
              <div className="user-box">
                <input type='email' value={email} id='email' onChange={onChange} name="email" required autoComplete='none'/>
                <label htmlFor='email'>Email</label>
              </div>
              <div className="user-box">
                <input type="password" value={password} id='password' onChange={onChange} name="password" required autoComplete='none'/>
                <label htmlFor='password'>Password</label>
              </div>
              <div className="user-box">
                <input type="password" value={password2} id='password2' onChange={onChange} name="password2" required autoComplete='none'/>
                <label htmlFor='password2'>Confirm Password</label>
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


Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(Register);