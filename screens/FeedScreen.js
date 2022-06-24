import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from 'react-redux';
import firebase from 'firebase';
import Stories from '../components/feed/Stories'
import Header from "../components/header/Header";
import Post from '../components/feed/Post';

const Feed = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = [];
        if (props.userFollowingLoaded === props.following.length) {
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find(el => el.uid === props.following[i]);
                if (user !== undefined) {
                    posts = [...posts, ...user.posts]
                }
            }

            posts.sort((x, y) => x.creation - y.creation);

            setPosts(posts);
        }
    }, [props.userFollowingLoaded]);

    const renderItem = ({ item }) => {
        return <Post post={item} currentId={firebase.auth()?.currentUser?.uid} />
    };

    // console.log('posts: ', posts)
    
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(post, index) => index}
                ListHeaderComponent={Stories}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

const mapStateToProps = store => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    userFollowingLoaded: store.usersState.userFollowingLoaded
});

export default connect(mapStateToProps, null)(Feed);