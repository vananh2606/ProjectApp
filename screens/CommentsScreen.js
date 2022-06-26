import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../redux/actions';
import Swipeout from 'react-native-swipeout-mod';
import HeaderCmt from "../components/header/HeaderCmt";
import Comment from "../components/comments/Comment";
import WriteComment from '../components/comments/WriteComment';

const CommentScreen = (props) => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [tagText, setTagText] = useState('');
    const route = useRoute();

    useEffect(() => {
        setTagText('');
    }, []);
    
    useEffect(() => {
        const unsubscribe = async () => {
            firebase.firestore()
                .collection('posts')
                .doc(route.params?.uid)
                .collection('userPosts')
                .doc(route.params?.postId)
                .collection('comments')
                .orderBy('createAt')
                .get()
                .then(snapshot => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    matchUserToComment(comments);
                });

            firebase.firestore()
                .collection('posts')
                .doc(route.params?.uid)
                .collection('userPosts')
                .doc(route.params?.postId)
                .get()
                .then(snapshot => {
                    if (snapshot.exists) {
                        setPost({
                            user: {
                                name: route.params?.ownName,
                                uid: route.params?.uid,
                                image: route.params?.image
                            },
                            text: snapshot.data()?.caption,
                            createAt: snapshot.data()?.creation?.seconds
                        });
                    }
                    else {
                        console.log('does not exits');
                    }
                });
        };

        unsubscribe();
    }, [props.route.params.postId, props.users, rerender]);

    const matchUserToComment = comments => {
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].hasOwnProperty('user')) continue;
            const user = props.users.find(x => x.uid === comments[i].creator)
            if (user === undefined) props.fetchUsersData(comments[i].creator, false);
            else comments[i].user = user;
        };
        setComments(comments);
    };

    const renderItem = ({ item }) => {
        const swipeoutSetting = {
            autoClose: true,
            right: [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Thông báo',
                            'Bạn muốn xoá bình luận này?',
                            [
                                { text: 'Không', onPress: () => console.log('Cancel!'), style: 'cancel' },
                                {
                                    text: 'Có', onPress: () => {
                                        firebase.firestore()
                                            .collection('posts')
                                            .doc(route.params?.uid)
                                            .collection('userPosts')
                                            .doc(route.params?.postId)
                                            .collection('comments')
                                            .doc(item?.id)
                                            .delete()
                                            .then(res => setRerender(!rerender));
                                    }
                                }
                            ],
                            { cancelable: true }
                        )
                    }
                }
            ]
        };

        return (
            <>
                {(route.params?.uid === firebase.auth().currentUser.uid || item?.user?.uid === firebase.auth().currentUser.uid) ? (
                    <Swipeout
                        {...swipeoutSetting}
                        style={{ backgroundColor: '#ffffff' }}
                    >
                        <Comment
                            comment={item}
                            reply={true}
                            ownId={route.params?.uid}
                            postId={route.params?.postId}
                            onSetTagText={value => setTagText(value)}
                        />
                    </Swipeout>
                ) : (
                    <Comment
                        comment={item}
                        reply={true}
                        ownId={route.params?.uid}
                        postId={route.params?.postId}
                        onSetTagText={value => setTagText(value)}
                    />
                )}
            </>
        );
    };

    const caption = () => {
        return <Comment
            comment={post}
            reply={false}
            ownId={route.params?.uid}
        />
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderCmt />
            <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={(comment, index) => index}
                ListHeaderComponent={caption}
                showsVerticalScrollIndicator={false}
            />
            <WriteComment
                avatar={props?.currentUser?.image ?? "http://placeimg.com/640/480/food"}
                uid={props.route.params?.uid}
                postId={props.route.params?.postId}
                rerender={() => setRerender(!rerender)}
                tagText={tagText}
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

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    users: store.usersState.users,
});

const mapDispatchProps = dispatch => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CommentScreen);