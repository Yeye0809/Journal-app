
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async() =>{
    
    try {
        
        const result = await signInWithPopup( firebaseAuth, googleProvider);
       // const credential = GoogleAuthProvider.credentialFromResult( result );
       const { displayName, email, photoURL, uid } = result.user;

       return {
           ok: true,
           displayName, email, photoURL, uid
       }
      
        

    } catch (error) {

        console.log( error )

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
        
    }
}

export const registerUserWithEmailAndPassword = async({ displayName, email, password }) => {

    try {
        
        const resp =  await createUserWithEmailAndPassword( firebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        
        //TODO: actualizar el displayName en Faribase

       await  updateProfile( firebaseAuth.currentUser, { displayName } );

       return {
           ok: true,
           uid, photoURL, displayName, email
       }

    } catch (error) {
        console.log( error )
        return { ok: false, errorMessage: error.message } 
    }
}


export const loginWithEmailPassword = async({ email, password }) => {

    try {

       const resp = await signInWithEmailAndPassword( firebaseAuth, email, password );
       const { displayName, uid, photoURL } = resp.user;

       return {
           ok: true,
           displayName, uid, photoURL
       }
       
    } catch (error) {
        
        return { ok: false, errorMessage: error.message } 
    }
}

export const firebaseLogout = async() => {

    return await firebaseAuth.signOut();

}