import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../redux/actions';
import HeaderNotifi from '../components/header/HeaderNotifi';
import ListNotifi from '../components/notifi/ListNotifi';
import firebase from 'firebase';

const NotifiScreen = (props) => {
    const [users, setUsers] = useState([]);
    const [notifies, setNotifies] = useState([]);

    useEffect(() => {
        const unsubscribe = async () => {
            await firebase.firestore()
                .collection('users')
                .get()
                .then(snapshot => {
                    let users = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    setUsers(users);
                });
            await firebase.firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .collection('notifications')
                .orderBy('createAt')
                .get()
                .then(snapshot => {
                    let notifies = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    matchUserToNotifies(notifies);
                });
        };

        unsubscribe();
    }, []);
    console.log('noti:', notifies)
    const matchUserToNotifies = notifies => {
        for (let i = 0; i < notifies.length; i++) {
            if (notifies[i].hasOwnProperty('user')) continue;
            const user = users.find(x => x.id === notifies[i].creator)
            if (user === undefined) props.fetchUsersData(notifies[i].creator, false);
            else notifies[i].user = user;
        };
        setNotifies(notifies);
    };

    console.log('props: ', users)

    const renderItem = ({ item }) => {
        return <ListNotifi notifi={item} />
    };
    // console.log('props: ', notifies)
    return (
        <SafeAreaView style={styles.container}>
            <HeaderNotifi />
            <FlatList
                data={notifies}
                renderItem={renderItem}
                keyExtractor={(notifi, index) => index}
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
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    users: store.usersState.users,
});

const mapDispatchProps = dispatch => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(NotifiScreen);
