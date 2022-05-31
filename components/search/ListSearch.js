import React, { useState, useEffect } from 'react';
import { View, Pressable, Image, Text, StyleSheet, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import firebase from 'firebase';
require('firebase/firestore');

const ListSearch = ({ currentId, following }) => {
    const [listUsers, setListUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followUsers, setFollowUsers] = useState([]);
    const [selectItem, setSelectItem] = useState(0);
    const [search, setSearch] = useState('');
    const [reset, setReset] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then(snapshot => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setListUsers(users.filter(user => user?.id !== currentId));
                setFollowingUsers(users.filter(user => user?.id !== currentId && following.indexOf(user?.id) !== -1));
                setFollowUsers(users.filter(user => user?.id !== currentId && following.indexOf(user?.id) === -1));
            })
    }, [search, reset]);

    const toggleFollow = (id) => {
        following.indexOf(id) !== -1 ?
            firebase.firestore()
                .collection("following")
                .doc(currentId)
                .collection("userFollowing")
                .doc(id)
                .delete()
                .then(res => setReset(!reset))
                :
            firebase.firestore()
                .collection("following")
                .doc(currentId)
                .collection("userFollowing")
                .doc(id)
                .set({})
                .then(res => setReset(!reset));
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        style={styles.story}
                        source={{ uri: "http://placeimg.com/640/480/food" }}
                    />
                    <Pressable
                        onPress={() => navigation.navigate('OtherProfile', { uid: item?.id })}
                    >
                        <Text style={{ margin: 12, fontWeight: '700' }}>
                            {item?.name}
                        </Text>
                    </Pressable>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: 138, justifyContent: 'space-between' }}>
                    <Pressable
                        style={styles.button}
                        onPress={() => toggleFollow(item?.id)}
                    >
                        <Text style={styles.buttonText}>{following.indexOf(item?.id) !== -1 ? 'Đang theo dõi' : 'Theo dõi'}</Text>
                    </Pressable>
                    <EntypoIcon
                        name='dots-three-horizontal'
                        size={20}
                        color='#000'
                    />
                </View>
            </View>
        )
    };

    return (
        <View>
            <View style={styles.containerIcons}>
                <Pressable
                    style={[styles.containerIcon, selectItem === 0 && styles.borderIcon]}
                    onPress={() => setSelectItem(0)}
                >
                    <Text style={{ fontWeight: selectItem === 0 ? '700' : '400' }}>Mọi người</Text>
                </Pressable>
                <Pressable
                    style={[styles.containerIcon, selectItem === 1 && styles.borderIcon]}
                    onPress={() => setSelectItem(1)}
                >
                    <Text style={{ fontWeight: selectItem === 1 ? '700' : '400' }}>Người theo dõi</Text>
                </Pressable>
                <Pressable
                    style={[styles.containerIcon, selectItem === 2 && styles.borderIcon]}
                    onPress={() => setSelectItem(2)}
                >
                    <Text style={{ fontWeight: selectItem === 2 ? '700' : '400' }}>Đang theo dõi</Text>
                </Pressable>
            </View>

            <View style={{ marginHorizontal: 12, }}>
                <View style={{ marginBottom: 12, }}>
                    <Searchbar
                        placeholder='Tìm kiếm'
                        onChangeText={text => setSearch(text)}
                        style={styles.inputSearch}
                        underlineColor='#ffffff'
                        activeUnderlineColor='#ffffff'
                    />
                </View>

                {selectItem === 0 ? (
                    <FlatList
                        horizontal={false}
                        data={listUsers}
                        renderItem={renderItem}
                        keyExtractor={(listUser, index) => index}
                        showsVerticalScrollIndicator={false}
                    />
                ) : selectItem === 1 ? (
                    <FlatList
                        horizontal={false}
                        data={followUsers}
                        renderItem={renderItem}
                        keyExtractor={(followUser, index) => index}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <FlatList
                        horizontal={false}
                        data={followingUsers}
                        renderItem={renderItem}
                        keyExtractor={(followingUser, index) => index}
                        showsVerticalScrollIndicator={false}
                    />
                )}

            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    containerIcons: {
        width: '100%',
        height: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    containerIcon: {
        width: '33%',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderIcon: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1.6,
        borderColor: '#ff8501',
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
    },
    inputSearch: {
        height: 42,
    }
})

export default ListSearch;