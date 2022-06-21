import React, { useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatRelative, formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import firebase from 'firebase';

const ListNotifi = ({ notifi, rerender }) => {
    const [reset, setReset] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    const formatDate = seconds => {
        let formattedDate = '';
        let now = new Date();
        let createAt = new Date(seconds * 1000);

        if (seconds) {
            if (now - createAt < 259200000) {
                formattedDate = formatDistance(createAt, now, { addSuffix: true, locale: vi });
            } else {
                formattedDate = formatRelative(createAt, now, { locale: vi });
            };
        };
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        return formattedDate;
    };

    const checkNotifi = (uid) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection('notifications')
            .doc(notifi?.id)
            .update({
                checked: true
            })
            .then(res => rerender());
    };

    console.log(notifi)

    return (
        <View style={{ paddingTop: 8, paddingHorizontal: 12, backgroundColor: `${notifi?.checked ? '#ffffff' : '#cccccc'}` }}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <View>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "http://placeimg.com/640/480/food" }}
                        />
                    </View>

                    {notifi?.type === 'follow' &&
                        <Pressable onPress={() => {
                            checkNotifi();
                            navigation.navigate('OtherProfile', { uid: notifi?.creator });
                        }}>
                            <Text style={{ width: windowWidth - 68 }}>
                                <Text style={{ fontWeight: '700', marginLeft: 5 }}>{notifi?.user?.name} </Text>
                                đã theo dõi bạn
                            </Text>

                            <View style={styles.containerFooter}>
                                <Text style={styles.textFooter}>{formatDate(notifi?.createAt)}</Text>
                            </View>
                        </Pressable>
                    }

                    {(notifi?.type === 'like' || notifi?.type === 'comment') &&
                        <Pressable onPress={() => {
                            checkNotifi();
                            navigation.navigate('Post', { 
                                postId: notifi?.postId,
                                ownId: firebase.auth()?.currentUser?.uid
                            });
                        }}>
                            <Text style={{ width: windowWidth - 68 }}>
                                <Text style={{ fontWeight: '700', marginLeft: 5 }}>{notifi?.user?.name} </Text>
                                {notifi?.type === 'like' ? 'đã thích bài viết của bạn' :
                                    notifi?.type === 'comment' ? 'đã bình luận bài viết của bạn' : ''
                                }
                            </Text>

                            <View style={styles.containerFooter}>
                                <Text style={styles.textFooter}>{formatDate(notifi?.createAt)}</Text>
                            </View>
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 30,
        height: 30,
        marginTop: 4,
        borderRadius: 50,
    }
});

export default ListNotifi;