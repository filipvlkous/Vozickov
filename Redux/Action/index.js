import firebase from "firebase";
import {
  CLEAR_DATA,
  USER_STATE_CHANGE,
  GET_ALL_VOZIKY,
  GET_ALL_USERS,
} from "../Constants/index";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: {
              data: snapshot.data(),
              uid: firebase.auth().currentUser.uid,
            },
          });
        } else {
          console.log("does not exist User");
        }
      });
  };
}

export function fetchVoziky() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("voziky")
      .orderBy("číslo", "asc")
      .get()
      .then((snapshot) => {
        let allVoziky = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: GET_ALL_VOZIKY, allVoziky });
      });
  };
}

export function fetchAllUsers() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        let allUsers = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: GET_ALL_USERS, allUsers });
      });
  };
}

export function clearData() {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
}
