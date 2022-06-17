import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, CLEAR_DATA } from "../constants/index";
import firebase from "firebase";
require('firebase/firestore');

export const clearData = () => {
    return (dispatch => {
        dispatch({ type: CLEAR_DATA });
    });
};

export const fetchUser =() => {
    return (dispatch => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
                }
                else {
                    console.log('does not exits')
                }
            })
    });
};

export const fetchUserPosts = () => {
    return (dispatch => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_POSTS_STATE_CHANGE, posts });

            });
    });
};

export const fetchUserFollowing = () => {
    return (dispatch => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following })
                for (let i = 0; i < following.length; i++) {
                    dispatch(fetchUsersData(following[i], true));
                }
            });
    });
};

export const fetchUsersData = (uid, getPosts) => {
    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);

        if (!found) {
            firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        let user = snapshot.data();
                        user.uid = snapshot.id;

                        dispatch({ type: USERS_DATA_STATE_CHANGE, user })
                    }
                    else {
                        console.log('does not exits')
                    }
                })
            if (getPosts) {
                dispatch(fetchUsersFollowingPosts(uid));
            };
        };
    });
};

export const fetchUsersFollowingPosts = (uid) => {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {

                // const uid = snapshot.docs[0].ref.path.split('/')[1]
                console.log({ snapshot, uid })
                const user = getState().usersState.users.find(el => el.uid === uid);

                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data, user }
                })

                console.log(posts)
                dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
                console.log(getState())
            });
    });
};