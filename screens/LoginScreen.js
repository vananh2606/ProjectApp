import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from '../components/login/LoginForm';

const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <LoginForm />
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default LoginScreen;