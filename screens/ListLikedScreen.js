import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import HeaderSearch from '../components/header/HeaderSearch';

const ListLikedScreen = props => {
    const [infoLikeds, setInfoLikeds] = useState([]);
    const [reset, setReset] = useState(false);
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
                });
                setInfoLikeds(users.filter(user => route.params?.likes.indexOf(user?.id) !== -1));
            })
    }, [reset]);

    const toggleFollow = (id) => {
        if (props?.following.indexOf(id) !== -1) {
            firebase.firestore()
                .collection("following")
                .doc(firebase.auth().currentUser.uid)
                .collection("userFollowing")
                .doc(id)
                .delete()
                .then(res => setReset(!reset))
            firebase.firestore()
                .collection("users")
                .doc(item?.id)
                .collection('notifications')
                .add({
                    creator: firebase.auth().currentUser.uid,
                    type: 'follow',
                    checked: false,
                    createAt: firebase.firestore.Timestamp.fromDate(new Date()).seconds
                });
        } else {
            firebase.firestore()
                .collection("following")
                .doc(firebase.auth().currentUser.uid)
                .collection("userFollowing")
                .doc(id)
                .set({})
                .then(res => setReset(!reset));
        };
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        style={styles.story}
                        source={{ uri: "http://placeimg.com/640/480/food" }}
                    />
                    <Pressable
                        onPress={() => {
                            if (item?.id !== firebase.auth().currentUser.uid) navigation.navigate('OtherProfile', { uid: item?.id })
                        }}
                    >
                        <Text style={{ margin: 12, fontWeight: '700' }}>
                            {item?.name}
                        </Text>
                    </Pressable>
                </View>

                {item?.id !== firebase.auth().currentUser.uid &&
                    <View style={{ alignItems: 'center', width: 138, justifyContent: 'flex-end' }}>
                        <Pressable
                            style={styles.button}
                            onPress={() => toggleFollow(item?.id)}
                        >
                            <Text style={styles.buttonText}>{props.following.indexOf(item?.id) !== -1 ? 'Đang theo dõi' : 'Theo dõi'}</Text>
                        </Pressable>
                    </View>
                }
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSearch withGoBack={true} name={'Lượt thích'} />
            <FlatList
                data={infoLikeds}
                renderItem={renderItem}
                keyExtractor={(like, index) => index}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 8,
        backgroundColor: 'blue',
    },
    buttonText: {
        width: 90,
        textAlign: 'center',
        fontWeight: '700',
        color: '#ffffff',
    }
});

const mapStateToProps = store => ({
    following: store.userState.following
});

export default connect(mapStateToProps, null)(ListLikedScreen);