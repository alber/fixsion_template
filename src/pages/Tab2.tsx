import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import LoginForm from '../components/login_form';
import LogoutForm from '../components/logout_form';

import { getFirebase } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  linkWithCredential,
  EmailAuthProvider,
  linkWithRedirect,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { subscribe, unsubscribe, emit } from '../eventface';

const { firebaseApp, auth, firestore } = getFirebase();
let subscription = null;

function getFormDetails(event: { target: {parentNode: HTMLFormElement | undefined;}}) {
  const formData = new FormData(event.target.parentNode);
  const email = formData.get("username");
  const password = formData.get("password");  
  return { email, password };
}

async function signUserIn(ev) {
  ev.preventDefault();
  const {email, password } = getFormDetails(ev);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      //const user = userCredential.user;
      console.log("Actually Signed-In Okay :)");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: " + errorCode);
      emit('loginError', {code: errorCode});
      //setMsgErrToast(error.code);
      //setIsOpenErrToast(true);
    });  
}

function signUserOut(ev) {
  console.log("Signing out. Au revoir!");
  signOut(auth);
}

const Tab2: React.FC = () => {
  /*** *** *** *** *** *** ***/
  /*** STATE DECLARATIONS  ***/
  /*** *** *** *** *** *** ***/
  let [userofapp, setUserofapp] = useState({});
  let [isLoggedin, setIsLoggedin] = useState(null);
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [isOpenErrToast, setIsOpenErrToast] = useState(false);
  const [msgErrToast, setMsgErrToast] = useState("Error");

  //... run once when component is ready/mounted (componentDidMount)
  //... AND run when auth changes
  useEffect(() => {
    subscribe('loginError', notifyLoginError);
    subscribe('ionToastDidDismiss', cleanupLoginError);

    function notifyLoginError(evObj) {
      console.log("loginError event listener active!");
      console.log(evObj.detail);
      setMsgErrToast(evObj.detail.code);
      setIsOpenErrToast(true);
    }
    function cleanupLoginError() {
      setMsgErrToast("Error");
      setIsOpenErrToast(false);
    }

    onAuthStateChanged(auth, async (user) => {
      //state.user = user;
      setIsLoggedin(null);
      setUserofapp(user);
      if(user != null) {
        if ((typeof user.uid !== undefined) && (user.uid !== null)) {
          setUserofapp(user);
          setIsLoggedin(true);  
          setIsOpenToast(true);
        } else {
          setIsLoggedin(false); 
        }
      } else {
        setIsLoggedin(false);  }
    });
  
    //... cleanup on unmount
    return () => {
      unsubscribe("loginError", cleanupLoginError);
    }
  }, [auth, setMsgErrToast, setIsOpenErrToast, setIsLoggedin, setUserofapp, setIsOpenToast]);
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="light">
            <IonTitle size="large">My Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LoginForm actionfunc={signUserIn} isLoggedin={isLoggedin} />
        <LogoutForm actionfunc={signUserOut} isLoggedin={isLoggedin} usrEmail={userofapp} />
        <IonToast
          isOpen={isOpenToast}
          message="Logged-In Okay!" 
          position="bottom" 
          positionAnchor="toastanch" 
          color="success" 
          onDidDismiss={() => setIsOpenToast(false)}
          duration={3000}
        ></IonToast>
        <IonToast
          isOpen={isOpenErrToast}
          message={msgErrToast} 
          position="bottom" 
          positionAnchor="toastanch" 
          color="danger" 
          onDidDismiss={() => setIsOpenErrToast(false)}
          duration={3000}
        ></IonToast>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
