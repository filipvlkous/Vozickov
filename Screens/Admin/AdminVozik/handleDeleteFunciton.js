import firebase from "firebase";

export function onDelete({ id, url }) {
  firebase.firestore().collection("voziky").doc(id).delete();
  firebase.storage().refFromURL(url).delete();
}
