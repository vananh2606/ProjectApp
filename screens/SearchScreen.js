import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';

import { connect } from 'react-redux';

import HeaderSearch from '../components/header/HeaderSearch';
import ListSearch from '../components/search/ListSearch';

const SearchScreen = (props) => {
    const route = useRoute();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSearch name={props?.currentUser?.name} />
            <ListSearch currentId={route.params?.uid} following={props?.following} />
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