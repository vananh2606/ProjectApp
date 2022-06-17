import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from 'firebase';
require('firebase/firestore');

const WriteComment = ({ avatar, uid, postId, rerender, tagText }) => {
    const windowWidth = Dimensions.get('window').width;
    const [text, setText] = useState('');

    useEffect(() => {
        setText(tagText);
    }, [tagText]);

    const onCommentSend = () => {
        if (text) {
            firebase.firestore()
                .collection('posts')
                .doc(uid)
                .collection('userPosts')
                .doc(postId)
                .collection('comments')
                .add({
                    creator: firebase.auth().currentUser.uid,
                    text,
                    createAt: firebase.firestore.Timestamp.fromDate(new Date()).seconds
                })
                .then(res => {
                    rerender();
                    setText('');
                })
        };
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.story}
                source={{ uri: avatar }}
            />

            <View>
                <TextInput
                    mode='outlined'
                    value={text}
                    placeholder='Nhập bình luận...'
                    onChangeText={text => setText(text)}
                    style={{ width: windowWidth - 60 }}
                    multiline={true}
                    autoFocus={true}
                    autoCorrect={false}
                    right={
                        <TextInput.Icon
                            name="send"
                            color='#663399'
                            onPress={onCommentSend}
                        />
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    story: {
        width: 30,
        height: 30,
        marginTop: 4,
        marginRight: 10,
        borderRadius: 50,
    },
    textInput: {
        minHeight: 24,
        maxHeight: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 35,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 80,
    },
    submit: {
        position: 'absolute',
        right: 20,
        paddingLeft: 10,
        fontWeight: '700',
        color: 'blue',
    }
})

export default WriteComment