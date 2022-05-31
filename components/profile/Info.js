import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase';

const Info = ({ user, checkFollowing, postsQuantity }) => {
    const [following, setFollowing] = useState(false);
    const [followUsers, setFollowUsers] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        firebase.firestore()
            .collection('users')
            .get()
            .then(snapshot => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setFollowUsers(users.filter(user => user?.id !== firebase.auth().currentUser.uid && checkFollowing.indexOf(user?.id) === -1));
            })
    }, []);

    useEffect(() => {
        if (checkFollowing.indexOf(route.params?.uid) !== -1) {
            setFollowing(true);
        }
        else {
            setFollowing(false);
        }
    }, [checkFollowing]);

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(route.params?.uid)
            .set({});
    };

    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(route.params?.uid)
            .delete();
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.avatarContainer}>
                    <View>
                        <Image style={styles.avatar} source={{ uri: "http://placeimg.com/640/480/food" }} />
                        <Pressable style={styles.addStory}>
                            <Text style={{ color: '#fff', fontSize: 20, marginTop: -4 }}>+</Text>
                        </Pressable>
                    </View>
                    <Text style={{ fontWeight: '700' }}>{user?.name}</Text>
                </View>

                <View style={{ width: 250, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25, }}>
                    <View style={styles.statisticalContainer}>
                        <Text style={{ fontWeight: '700', fontSize: 18 }}>{postsQuantity}</Text>
                        <Text>Bài viết</Text>
                    </View>
                    <View style={styles.statisticalContainer}>
                        <Text style={{ fontWeight: '700', fontSize: 18 }}>{followUsers.length}</Text>
                        <Text>Người theo dõi</Text>
                    </View>
                    <View style={styles.statisticalContainer}>
                        <Text style={{ fontWeight: '700', fontSize: 18 }}>{checkFollowing.length}</Text>
                        <Text>Đang theo dõi</Text>
                    </View>
                </View>
            </View>

            {route.params?.uid !== firebase.auth().currentUser.uid ? (
                <Pressable
                    style={styles.button}
                    backgroundColor='#663399'
                    onPress={() => following ? onUnfollow() : onFollow()}
                >
                    <Text style={[styles.buttonText, { color: '#ffffff' }]}>{following ? 'Đang theo dõi' : 'Theo dõi'}</Text>
                </Pressable>
            ) : (
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    <Text style={[styles.buttonText, { color: '#000000', }]}>Chỉnh sửa trang cá nhân</Text>
                </Pressable>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginBottom: 12,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 90,
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    addStory: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 67,
        left: 65,
        backgroundColor: 'blue',
        borderRadius: 50,
        alignItems: 'center',
    },
    statisticalContainer: {
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonText: {
        fontWeight: '700',
    },
});

export default Info;