import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSearch from "../components/header/HeaderSearch";
import ListChat from "../components/chat/List";

const ListChatsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSearch name='Tin nhắn' withGoBack={false} />
            <ListChat />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default ListChatsScreen;