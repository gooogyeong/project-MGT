import firebase from 'firebase/compat'

export type Admin = {
  createdAt: firebase.firestore.Timestamp;
  nickName: string;
  profileImgUrl: string;
  role: string;
  uid: string;
  updatedAt: firebase.firestore.Timestamp;
}
