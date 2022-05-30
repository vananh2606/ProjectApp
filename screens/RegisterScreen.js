import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import SignupForm from '../components/register/SignupForm';

const RegisterScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <SignupForm />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})

export default RegisterScreen;