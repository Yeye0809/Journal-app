import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLeyout } from '../layout/AuthLeyout';
import { useForm } from '../../hooks';

import { startCreatingWithEmailAndPassword } from '../../store/auth';



const formData = {
  email: '',
  password: '' ,
  displayName: ''
}

const formValidations = {

  email: [ (value) => value.includes('@'), 'El correo debe de contener un @'],
  password: [ (value) => value.length >= 6, 'La contraseña debe contener mas de 6 caracteres'],
  displayName: [ (value) => value.length >= 4, 'el nombre debe ser mayor de 4 caracteres'],

}

export const RegisterPages = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

  const { 
     formState, email, password, displayName, onInputChange,
     isFormValid, emailValid, passwordValid, displayNameValid 
  } = useForm( formData, formValidations );



  const onSubmit = ( e ) => {

    e.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startCreatingWithEmailAndPassword(formState) );

  }



  return (
    
    <AuthLeyout title="Register">

      <h1>FormValid: { isFormValid ? 'Valido' : 'incorrecto'}</h1>

        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField
                  label="Nombre completo"
                  type="text"
                  placeholder="Tu nombre"
                  fullWidth
                  name = "displayName"
                  value={ displayName }
                  onChange={ onInputChange }
                  error={ !!displayNameValid && formSubmitted }
                  helperText={ displayNameValid} 
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField
                  label="correo"
                  type="email"
                  placeholder="correo@google.com"
                  fullWidth
                  name = "email"
                  value={ email }
                  onChange={ onInputChange }
                  error={ !!emailValid && formSubmitted }
                  helperText={ emailValid} 
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField
                  label="contraseña"
                  type="password"
                  placeholder="****"
                  fullWidth
                  name = "password"
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted }
                  helperText={ passwordValid} 
                />
              </Grid>

              <Grid container spacing={ 2 } sx= {{ mb: 2, mt: 1 }}>

              <Grid 
                item 
                xs={ 12 }
                display= { !!errorMessage ? '' : 'none'}
              >
                  <Alert severity='error'> { errorMessage } </Alert>
               </Grid>
                

              <Grid item xs={ 12 }>
                  <Button 
                    disabled={ isCheckingAuthentication }
                    type="submit"
                    variant="contained" 
                    fullWidth>
                      Register
                  </Button>
                </Grid>
                
              
              </Grid>

              <Grid container direction="row" justifyContent="end">

                <Typography sx={{ mr: 1 }}>¿Ya tiene una cuenta?</Typography>
                <Link component={RouterLink } color="inherit" to="/auth/login">
                    Login
                </Link>
              </Grid>


          </Grid>
        </form>
    </AuthLeyout>

      

    
  )
}
