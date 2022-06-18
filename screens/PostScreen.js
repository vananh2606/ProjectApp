import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import HeaderSearch from '../components/header/HeaderSearch';
import Post from '../components/feed/Post';
import firebase from 'firebase';

const PostScreen = () => {
    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const route = useRoute();

    useEffect(() => {
        const unsubscribe = async () => {
            await firebase.firestore()
                .collection('posts')
                .doc(route.params?.ownId)
                .collection('userPosts')
                .doc(route.params?.postId)
                .get()
                .then(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    setPost({ id, ...data })
                
                });
            await firebase.firestore()
                .collection('users')
                .doc(route.params?.ownId)
                .get()
                .then(doc => {
                    const data = doc.data();
                    const uid = doc.id;
                    setUser({uid, ...data});
                });
        };
        unsubscribe();
    }, []);
    // console.log('post: ', post)
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSearch
                withGoBack={true}
                name='Bài viết' />
            <Post
                post={{...post, user: user}}
                currentId={firebase.auth()?.currentUser?.uid} />
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default PostScreen;