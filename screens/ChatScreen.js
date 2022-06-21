import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import HeaderSearch from "../components/header/HeaderSearch";
import Chat from "../components/chat/Chat";

const ChatScreen = () => {
    const route = useRoute();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSearch name={route.params?.user?.name} withGoBack={true} />
            <Chat />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default ChatScreen;