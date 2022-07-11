import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLeyout } from '../layout/AuthLeyout';

import { useForm } from '../../hooks';
import { starGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth';


const loginData = {
  email: '',
  password: ''
}

export const LoginPages = () => {

  const { status, errorMessage } = useSelector( state => state.auth );
  

  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm( loginData )

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = (e) => {
      e.preventDefault();
      console.log({email, password});

      dispatch( startLoginWithEmailPassword({ email, password }) )
  }

  const onGoogleSingIn = () => {
    console.log('OnGoogleSingIn')
    dispatch( starGoogleSingIn() )
  }



  return (
    
    <AuthLeyout title="Login">

        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2}}>
              <TextField
                label="correo"
                type="email"
                placeholder="correo@google.com"
                name="email"
                value={ email }
                onChange={ onInputChange }
                fullWidth
              />
            </Grid>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField
                  label="contraseña"
                  type="password"
                  placeholder="****"
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                  fullWidth
                />
              </Grid>

              <Grid container
               sx={{ mt: 2 }}
               display={ !!errorMessage ? '' : 'none'}
              >
                <Grid 
                  item
                  xs={ 12 } 
                 >
                  
                    <Alert severity='error'>
                      { errorMessage }
                    </Alert>

                </Grid>
              </Grid>

              <Grid container spacing={ 2 } sx= {{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                  <Button 
                  disabled = { isAuthenticating }
                  type="submit" 
                  variant="contained" 
                  fullWidth>
                      Login
                  </Button>
                </Grid>
                
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button 
                    disabled = { isAuthenticating }
                    variant="contained" 
                    fullWidth
                    onClick={ onGoogleSingIn }
                    >
                      <Google />
                      <Typography sx={{ ml:1 }}>google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction="row" justifyContent="end">
                <Link component={RouterLink } color="inherit" to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>


          </Grid>
        </form>
    </AuthLeyout>

      

    
  )
}
