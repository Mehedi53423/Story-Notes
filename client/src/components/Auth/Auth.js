import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import Icon from './icon';
import Input from './Input';
import useStyles from './styles';


const initialState = { 
  firstName: '', 
  lastName: '', 
  email: '', 
  password: '', 
  confirmPassword: ''
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: AUTH, 
        data: { result, token } 
      });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container 
      component="main" 
      maxWidth="xs"
    >
      <Paper 
        className={classes.paper} 
        elevation={6}
      >
        <Avatar 
          className={classes.avatar}
        >
          <LockOutlinedIcon />
        </Avatar>

        <Typography 
          component="h1" 
          variant="h5"
        >
          { isSignup ? 'Sign up' : 'Sign in' }
        </Typography>

        <form 
          className={classes.form} 
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input 
                name="firstName" 
                label="First Name" 
                handleChange={handleChange} 
                autoFocus half 
              />

              <Input 
              name="lastName" 
              label="Last Name" 
              handleChange={handleChange} 
              half 
              />
            </>
            )}

            <Input 
              name="email"
              label="Email Address" 
              handleChange={handleChange} 
              type="email" 
            />

            <Input 
              name="password" 
              label="Password" 
              handleChange={handleChange} 
              type={showPassword ? 'text' : 'password'} 
              handleShowPassword={handleShowPassword} 
            />

            { isSignup && <Input 
                            name="confirmPassword" 
                            label="Repeat Password" 
                            handleChange={handleChange} 
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword} 
                            /> 
            }
          </Grid>

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            className={classes.submit}
          >

            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button 
                className={classes.googleButton} 
                color="primary" 
                fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon />} 
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid 
            container 
            //justify="flex-end"
          >
            <Grid item>
              <Button onClick={switchMode}  style={{marginLeft:50}}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;