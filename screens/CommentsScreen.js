import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, FlatList, Button, TextInput, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
require('firebase/firestore');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../redux/actions';

import HeaderCmt from "../components/header/HeaderCmt";
import Comment from "../components/comments/Comment";
import WriteComment from '../components/comments/WriteComment';

const CommentScreen = (props) => {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState("");
    const [text, setText] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then(snapshot => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    matchUserToComment(comments);
                    setPostId(props.route.params.postId);
                })
            setPostId(props.route.params.postId);
        } else {
            matchUserToComment(comments);
        };

        
    }, [props.route.params.postId, props.users])

    const matchUserToComment = (comments) => {
        for (let i = 0; i < comments.length; i++) {

            if (comments[i].hasOwnProperty('user')) continue;

            const user = props.users.find(x => x.uid === comments[i].creator)

            if (user === undefined) props.fetchUsersData(comments[i].creator, false);
            else comments[i].user = user;
        };
        setComments(comments);
    }

    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    const renderItem = ({ item }) => {
        return <Comment comment={item} reply={true} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderCmt />
            <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={(comment, index) => index}
                // ListHeaderComponent={caption}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

const mapStateToProps = (store) => {
    return {
        users: store.usersState.users,
    };
};

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CommentScreen);