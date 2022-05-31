import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import firebase from 'firebase';
import { connect } from 'react-redux';

import HeaderSearch from '../components/header/HeaderSearch';
import ListSearch from '../components/search/ListSearch';

const SearchScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSearch withGoBack={false} name={props?.currentUser?.name} />
            <ListSearch currentId={firebase.auth().currentUser.uid} following={props?.following} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following
});

export default connect(mapStateToProps, null)(SearchScreen);