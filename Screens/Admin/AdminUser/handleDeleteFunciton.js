import firebase from "firebase";

export function onDelete(item) {
  firebase
    .firestore()
    .collection("voziky")
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().rezervace === item) {
          firebase.firestore().collection("voziky").doc(doc.id).update({
            firstName: null,
            lastName: null,
            fyzioFirstName: null,
            fyzioLastName: null,
            rezervace: null,
          });
        }
      });
    });
  firebase.firestore().collection("users").doc(item).delete();
}
