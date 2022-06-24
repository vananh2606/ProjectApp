import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { formatRelative, formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import firebase from 'firebase';

const PostHeader = ({ post }) => {
    const navigation = useNavigation();

    const deletePost = () => {
        Alert.alert(
            'Thông báo',
            'Bạn muốn xoá bài viết này?',
            [
                { text: 'Không', onPress: () => console.log('Cancel!'), style: 'cancel' },
                {
                    text: 'Có', onPress: () => {
                        firebase.firestore()
                            .collection("posts")
                            .doc(firebase.auth().currentUser.uid)
                            .collection("userPosts")
                            .doc(post?.id)
                            .delete()
                            .then(res => navigation.goBack());
                    }
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
            alignItems: 'center',
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={styles.story}
                    source={{ uri: post?.user?.image ?? "http://placeimg.com/640/480/food" }}
                />
                <Pressable
                    onPress={() => navigation.navigate('OtherProfile', { uid: post?.user?.uid })}
                >
                    <Text style={{ margin: 5, fontWeight: '700' }}>
                        {post?.user?.name}
                    </Text>
                </Pressable>
            </View>

            {post?.user?.uid === firebase.auth().currentUser.uid &&
                <IonicIcon
                    name='close'
                    size={16}
                    color='#000'
                    onPress={() => deletePost()}
                />
            }
        </View>
    )
};

const PostImage = ({ post }) => {
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    return (
        <Pressable
            style={{ width: windowWidth, height: windowWidth }}
            onPress={() => navigation.navigate('Img', {
                imgUri: post?.downloadURL
            })}
        >
            <Image
                style={{ height: '100%', resizeMode: 'cover' }}
                source={{ uri: post?.downloadURL }}
            />
        </Pressable>
    )
};

const PostFooter = ({ post, currentId }) => {
    const [listLiked, setListLiked] = useState([]);
    const [reset, setReset] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = async () =>
            firebase.firestore()
                .collection('posts')
                .doc(post?.user?.uid)
                .collection('userPosts')
                .doc(post?.id)
                .collection('likes')
                .get()
                .then(snapshot =>
                    setListLiked(snapshot.docs.map(doc => doc.id))
                );

        unsubscribe();
    }, [reset]);

    const toggleLike = id => {
        if (listLiked.indexOf(id) !== -1) {
            firebase.firestore()
                .collection('posts')
                .doc(post?.user?.uid)
                .collection('userPosts')
                .doc(post?.id)
                .collection('likes')
                .doc(id)
                .delete()
                .then(res => setReset(!reset))
            if (uid !== firebase.auth().currentUser.uid) {
                firebase.firestore()
                    .collection("users")
                    .doc(route.params?.uid)
                    .collection('notifications')
                    .add({
                        creator: firebase.auth().currentUser.uid,
                        type: 'like',
                        checked: false,
                        postId: post?.id,
                        createAt: firebase.firestore.Timestamp.fromDate(new Date()).seconds
                    });
            };
        } else {
            firebase.firestore()
                .collection('posts')
                .doc(post?.user?.uid)
                .collection('userPosts')
                .doc(post?.id)
                .collection('likes')
                .doc(id)
                .set({})
                .then(res => setReset(!reset));
        };

    };

    const formatDate = seconds => {
        let formattedDate = '';
        let now = new Date();
        let createAt = new Date(seconds * 1000);

        if (seconds) {
            if (now - createAt < 259200000) {
                formattedDate = formatDistance(createAt, now, { addSuffix: true, locale: vi });
            } else {
                formattedDate = formatRelative(createAt, now, { locale: vi });
            };
        };
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        return formattedDate;
    };

    return (
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View style={styles.leftFooterIconsContainer}>
                    <IonicIcon
                        name={listLiked.indexOf(currentId) !== -1 ? 'heart' : 'heart-outline'}
                        size={25}
                        color={listLiked.indexOf(currentId) !== -1 ? 'red' : '#000'}
                        onPress={() => toggleLike(currentId)}
                    />
                    <IonicIcon
                        name='chatbox-outline'
                        size={25}
                        color='#000'
                        onPress={() =>
                            navigation.navigate('Comments',
                                {
                                    postId: post.id,
                                    ownName: post?.user?.name,
                                    uid: post.user.uid
                                }
                            )}
                    />
                    <IonicIcon
                        name='navigate-outline'
                        size={25}
                        color='#000'
                    />
                </View>
            </View>

            <Pressable
                style={{ marginTop: 4 }}
                onPress={() =>
                    navigation.navigate('ListLiked',
                        {
                            likes: listLiked,
                        }
                    )}
            >
                <Text style={{ fontWeight: '600' }}>
                    {listLiked.length} lượt thích
                </Text>
            </Pressable>

            <View style={{ marginTop: 5 }}>
                <Text>
                    <Text style={{ fontWeight: '700', marginLeft: 5 }}>{`${post?.user?.name} `}</Text>
                    {post.caption}
                </Text>

                <Text
                    onPress={() =>
                        navigation.navigate('Comments',
                            {
                                postId: post.id,
                                ownName: post?.user?.name,
                                uid: post.user.uid
                            }
                        )}
                >
                    Xem tất cả bình luận
                </Text>

                <Text>{formatDate(post?.creation?.seconds)}</Text>
            </View>
        </View>
    )
};

const Post = ({ post, currentId }) => {
    return (
        <View
            style={{ marginBottom: 20 }}
        >
            <View style={styles.divider}></View>
            <PostHeader post={post} />
            <PostImage post={post} />
            <PostFooter post={post} currentId={currentId} />
        </View>
    )
};

const styles = StyleSheet.create({
    divider: {
        width: '90%',
        height: 1,
        backgroundColor: '#ccc',
        marginHorizontal: '5%',
        marginBottom: 10,
    },
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
    },
    quantityImg: {
        width: 32,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        position: 'absolute',
        top: 24,
        right: 24,
        borderRadius: 12
    },
    footerIcon: {
        width: 25,
        height: 25,
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between',
    },
    shareIcon: {
        transform: [{ rotate: '320deg' }],
        marginTop: -3,
    }
});

export default Post;