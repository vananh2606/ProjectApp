import React, { useState } from 'react';
import { TextInput, StyleSheet, Button, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import HeaderSave from '../components/header/HeaderSave';
import firebase from 'firebase';
require("firebase/firestore")
require("firebase/firebase-storage")

const Save = (props) => {
    const [caption, setCaption] = useState("");
    const navigation = useNavigation();

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot)
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                navigation.navigate("FeedStack");
            }))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderSave />
            <Image source={{ uri: props.route.params.image }} />
            <TextInput
                placeholder='Write a Caption ...'
                onChangeText={(caption) => setCaption(caption)}
                multiline={true}
            />

            <Button title='Save' onPress={() => uploadImage()} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default Save;