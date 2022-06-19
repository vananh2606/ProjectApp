import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

import HeaderSearch from '../components/header/HeaderSearch';
import Info from '../components/profile/Info';
import ListPost from '../components/profile/ListPost';

const OtherProfileScreen = (props) => {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const route = useRoute();

    useEffect(() => {
        firebase.firestore()
            .collection("users")
            .doc(route?.params?.uid)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    setUser(snapshot.data());
                }
                else {
                    console.log('does not exits')
                }
            })
            
        firebase.firestore()
            .collection("posts")
            .doc(route?.params?.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then(snapshot => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setUserPosts(posts)
            })
    }, [route?.params?.uid, props?.following])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSearch withGoBack={true} name={user?.name}  />
            <Info user={user} checkFollowing={props?.following} postsQuantity={userPosts.length} />
            <ListPost userPosts={userPosts} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});

const mapStateToProps = (store) => ({
    following: store.userState.following
});

export default connect(mapStateToProps, null)(OtherProfileScreen);