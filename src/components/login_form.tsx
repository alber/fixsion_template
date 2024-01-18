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
  IonThumbnail
} from '@ionic/react';
import { lockOpenOutline, personOutline } from 'ionicons/icons';
 
//function LoginForm() {
const LoginForm = ({actionfunc, isLoggedin}: any) : JSX.Element => {
  const [visClass, setVisClass] = useState(null);
 
  useEffect(() => {
    let visibility_class = null;
    visibility_class = (isLoggedin==true) ? 'vis_false' : 'vis_true'
    setVisClass(visibility_class);
  }, [isLoggedin, visClass, setVisClass]);


  return (
    <IonCard className={visClass}> 
      <form name="login_form_element">
      <IonCardHeader>
        <IonCardTitle>Login</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonThumbnail slot="start">
            <IonIcon icon={personOutline} size="large"></IonIcon>
            </IonThumbnail>
            <IonInput label="Username" name="username" type="email" autocomplete='email' enterkeyhint='next' inputmode='email' shape='round' required={true}></IonInput>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
                <IonIcon icon={lockOpenOutline} size="large"></IonIcon>
            </IonThumbnail>
            <IonInput label="Password" name="password" type="password" enterkeyhint='go' required={true}></IonInput>
          </IonItem>
        </IonList>
      </IonCardContent>
      <IonButton expand="block" onClick={actionfunc} color="danger">Go!</IonButton>
      </form>
    </IonCard>
  );
}
export default LoginForm;