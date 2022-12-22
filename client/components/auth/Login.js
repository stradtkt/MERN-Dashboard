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
    <Card align='center'>
  <CardHeader>
    <Heading size='md'>Employee Login</Heading>
  </CardHeader>
  <CardBody>
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type='email' value={email} onChange={onChange} name="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type='password' value={password} onChange={onChange} name="password"/>
      </FormControl>
      <Button type='submit' colorScheme='twitter'>Login</Button>
    </form>
  </CardBody>
  <CardFooter>
    <Button colorScheme='teal'><Link to='/register'>Do you need to register instead?</Link></Button>
  </CardFooter>
</Card>
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