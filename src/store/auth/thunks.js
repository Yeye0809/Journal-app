import { firebaseLogout, loginWithEmailPassword, registerUserWithEmailAndPassword, singInWithGoogle } from "../../faribase/provider";
import { clearLogoutNotes } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";



export const checkingAuthentication = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}

export const starGoogleSingIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

      const result =  await  singInWithGoogle();
      if( !result.ok ) return dispatch( logout( result.errorMessage ) );

      dispatch( login( result));
    }
}

export const startCreatingWithEmailAndPassword = ({displayName, email, password }) => {

    return async(dispatch) => {
        
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPassword({ displayName, email, password });
       
        if( !ok ) return dispatch( logout({ errorMessage }));

        dispatch( login({ uid, displayName, email, photoURL }));
    }

}


export const startLoginWithEmailPassword = ( {email, password }) => {

    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password});
        
       

        if( !ok ) return dispatch( logout({ errorMessage} ));

        dispatch(login({ ok, uid, photoURL, displayName, errorMessage }));

    }

}

export const startLogout = () => {

    return async(dispatch) => { 

        await firebaseLogout();

        dispatch( clearLogoutNotes() );
        dispatch( logout() );

    }

}