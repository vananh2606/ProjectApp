import { USER_STATE_CHAGE } from "../constants/index";
import firebase from "firebase";

export function fetchUser() {
    return ((dispacth) => {
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispacth({ type: USER_STATE_CHAGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exits')
                }
            })
    })
}