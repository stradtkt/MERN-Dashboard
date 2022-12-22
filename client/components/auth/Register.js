import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Button
} from '@chakra-ui/react'
import {register} from '../../actions/auth';
import { toast } from 'react-toastify';

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
      toast.error('Passwords do not match');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Card align='center'>
  <CardHeader>
    <Heading size='md'>Employee Register</Heading>
  </CardHeader>
  <CardBody>
    <form onSubmit={onSubmit}>
    <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type='text' value={name} onChange={onChange} name="name" />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type='email' value={email} onChange={onChange} name="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type='password' value={password} onChange={onChange} name="password"/>
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input type='password' value={password2} onChange={onChange} name="password2"/>
      </FormControl>
      <Button type='submit' colorScheme='teal'>Register</Button>
    </form>
  </CardBody>
  <CardFooter>
    <Button colorScheme='twitter'><Link to='/login'>Do you need to login instead?</Link></Button>
  </CardFooter>
</Card>
  );
}


Login.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(Login);