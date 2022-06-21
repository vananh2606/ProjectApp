import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import IonicIcon from 'react-native-vector-icons/Ionicons';

const ImgScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={{ height: '100%', resizeMode: 'contain' }}
                source={{ uri: route.params?.imgUri }}
            />
            <IonicIcon
                name='close'
                size={24}
                color='#ffffff'
                style={styles.closeBtn}
                onPress={() => navigation.goBack()}
            />
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    closeBtn: {
        position: 'absolute',
        top: 12,
        right: 12
    }
});

export default ImgScreen;