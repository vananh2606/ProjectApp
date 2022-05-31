import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import EditArea from "../components/editProfile/EditArea";
import HeaderEditProfile from '../components/header/HeaderEditProfile';

const EditProfile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderEditProfile />
            <EditArea />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default EditProfile;