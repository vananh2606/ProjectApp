import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

import Header from "../components/header/Header";
import Info from '../components/profile/Info';
import ListPost from '../components/profile/ListPost';

const ProfileScreen = (props) => {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const { currentUser, posts } = props;
        setUser(currentUser)
        setUserPosts(posts)
    }, [])

    // const onLogout = () => {
    //     firebase.auth().signOut();
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Info user={user} checkFollowing={[]} />
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
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(ProfileScreen);