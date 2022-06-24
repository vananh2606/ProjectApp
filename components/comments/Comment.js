import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { formatRelative, formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import firebase from 'firebase';

const Comment = ({ comment, reply, onSetTagText, postId, ownId }) => {
    const [listLiked, setListLiked] = useState([]);
    const [reset, setReset] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    useEffect(() => {
        if (reply) {
            const unsubscribe = async () => firebase.firestore()
                .collection('posts')
                .doc(ownId)
                .collection('userPosts')
                .doc(postId)
                .collection('comments')
                .doc(comment?.id)
                .collection('likes')
                .get()
                .then(snapshot =>
                    setListLiked(snapshot.docs.map(doc => doc.id))
                );

            unsubscribe();
        };
    }, [reset]);

    console.log(comment)

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

    const toggleLike = id => {
        listLiked.indexOf(id) !== -1 ?
            firebase.firestore()
                .collection('posts')
                .doc(ownId)
                .collection('userPosts')
                .doc(postId)
                .collection('comments')
                .doc(comment?.id)
                .collection('likes')
                .doc(id)
                .delete()
                .then(res => setReset(!reset))
            :
            firebase.firestore()
                .collection('posts')
                .doc(ownId)
                .collection('userPosts')
                .doc(postId)
                .collection('comments')
                .doc(comment?.id)
                .collection('likes')
                .doc(id)
                .set({})
                .then(res => setReset(!reset));
    };

    return (
        <View style={[styles.container, {
            borderBottomWidth: reply ? 0 : 1,
            paddingBottom: reply ? 0 : 10,
            borderBottomColor: '#ccc',
        }]}>
            <View style={styles.containerBody}>
                <Pressable>
                    <Image
                        style={styles.avatar}
                        source={{ uri: comment?.user?.image ?? "http://placeimg.com/640/480/food" }}
                    />
                </Pressable>

                <View>
                    <Text style={{ width: reply ? windowWidth - 90 : windowWidth - 65 }}>
                        <Text
                            style={{ fontWeight: '700', marginLeft: 5 }}
                            onPress={() => {
                                if (comment?.user?.uid !== firebase.auth().currentUser.uid) navigation.navigate('OtherProfile', { uid: comment?.user?.uid })
                            }}
                        >{comment?.user?.name} </Text>
                        {comment?.text}
                    </Text>
                    {console.log(comment)}
                    <View style={styles.containerFooter}>
                        <Text style={styles.textFooter}>{formatDate(comment?.createAt)}</Text>
                        {reply &&
                            <Text
                                style={styles.textFooter}
                                onPress={() => onSetTagText(`@${comment?.user?.name} `)}
                            >Trả lời</Text>
                        }
                        {(reply && listLiked.length !== 0) &&
                            <Text
                                style={styles.textFooter}
                                onPress={() =>
                                    navigation.navigate('ListLiked',
                                        {
                                            likes: listLiked,
                                        }
                                    )}
                            >{listLiked.length} lượt thích</Text>
                        }
                    </View>
                </View>

                {reply &&
                    <IonicIcon
                        name={listLiked.indexOf(firebase.auth().currentUser.uid) !== -1 ? 'heart' : 'heart-outline'}
                        size={15}
                        color={listLiked.indexOf(firebase.auth().currentUser.uid) !== -1 ? 'red' : '#000'}
                        onPress={() => toggleLike(firebase.auth().currentUser.uid)}
                    />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
    },
    containerBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,

    },
    containerFooter: {
        flexDirection: 'row',
    },
    avatar: {
        width: 30,
        height: 30,
        marginTop: 4,
        borderRadius: 50,
    },
    textFooter: {
        fontSize: 12,
        color: '#ccc',
        marginRight: 12,
    }
});

export default Comment;