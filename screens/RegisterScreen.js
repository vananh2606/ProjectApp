import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import SignupForm from '../components/register/SignupForm';

const RegisterScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Image
                    style={styles.logo}
                    source={require('../assets/VAL-logo.png')} />
            </View>
            <SignupForm />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    }
})

export default RegisterScreen;