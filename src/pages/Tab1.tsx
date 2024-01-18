import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import { getFirebase } from '../firebase'; //'../firebase';
import { collection, onSnapshot, limitToLast, query, where, doc, orderBy, getDoc, limit } from 'firebase/firestore';
//const { firestore } = getFirebase();

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="light">
            <IonTitle size="large">My Co.</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="My Co. page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
