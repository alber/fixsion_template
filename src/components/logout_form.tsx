import React from 'react';
import { useState, useEffect } from 'react';
import {
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from '@ionic/react';
import { lockClosedOutline, personOutline } from 'ionicons/icons';
 
//function LoginForm() {
const LogoutForm = ({actionfunc, isLoggedin, usrEmail}: any) : JSX.Element => {
  const [visClass, setVisClass] = useState(null);
  const [usr, setUsr] = useState(null);

  useEffect(() => {
    let visibility_class = null;
    visibility_class = (isLoggedin==true) ? 'vis_true' : 'vis_false'
    setVisClass(visibility_class);

    if (isLoggedin) {
      setUsr(usrEmail.email);
    } else {
      setUsr(null);
    }

  }, [isLoggedin, visClass, setVisClass, usrEmail, usr, setUsr]);
  


  return (
    <IonCard className={visClass}>
      <form name="logout_form_element">
      <IonCardHeader>
        <IonCardTitle>Logout</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonThumbnail slot="start">
            <IonIcon icon={lockClosedOutline} size="large"></IonIcon>
            </IonThumbnail>
            <p>You're currently Logged-In</p>
          </IonItem>
        </IonList>
      </IonCardContent>
      <IonButton expand="block" onClick={actionfunc} color="success">Logout {(usr != null) ? usr : '==UNAVAIL=='}</IonButton>
      </form>
    </IonCard>
  );
}
export default LogoutForm;