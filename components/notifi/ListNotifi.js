import React, { useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const ListNotifi = () => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={{ marginHorizontal: 12, }}>
            <View>
                <Text style={{ fontWeight: '700', marginBottom: 12, }}>Hôm nay</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, }}>
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "http://placeimg.com/640/480/food" }}
                        />
                    </Pressable>

                    <Pressable>
                        <Text style={{ width: windowWidth - 68 }}>
                            <Text style={{ fontWeight: '700', marginLeft: 5 }}>Văn Anh </Text>
                            đã yêu thích bài viết của bạn
                        </Text>

                        <View style={styles.containerFooter}>
                            <Text style={styles.textFooter}>10 phút trước</Text>

                        </View>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, }}>
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "http://placeimg.com/640/480/food" }}
                        />
                    </Pressable>

                    <Pressable>
                        <Text style={{ width: windowWidth - 68 }}>
                            <Text style={{ fontWeight: '700', marginLeft: 5 }}>Văn Anh </Text>
                            đã yêu thích bài viết của bạn
                        </Text>

                        <View style={styles.containerFooter}>
                            <Text style={styles.textFooter}>10 phút trước</Text>

                        </View>
                    </Pressable>
                </View>
            </View>

            <View>
                <Text style={{ fontWeight: '700', marginBottom: 12, }}>Tuần này</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, }}>
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "http://placeimg.com/640/480/food" }}
                        />
                    </Pressable>

                    <Pressable>
                        <Text style={{ width: windowWidth - 68 }}>
                            <Text style={{ fontWeight: '700', marginLeft: 5 }}>Văn Anh </Text>
                            đã yêu thích bài viết của bạn
                        </Text>

                        <View style={styles.containerFooter}>
                            <Text style={styles.textFooter}>10 phút trước</Text>

                        </View>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, }}>
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "http://placeimg.com/640/480/food" }}
                        />
                    </Pressable>

                    <Pressable>
                        <Text style={{ width: windowWidth - 68 }}>
                            <Text style={{ fontWeight: '700', marginLeft: 5 }}>Văn Anh </Text>
                            đã yêu thích bài viết của bạn
                        </Text>

                        <View style={styles.containerFooter}>
                            <Text style={styles.textFooter}>10 phút trước</Text>

                        </View>
                    </Pressable>
                </View>
            </View>

            <View>
                <Text style={{ fontWeight: '700', marginBottom: 12, }}>Tháng này</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, }}>
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "http://placeimg.com/640/480/food" }}
                        />
                    </Pressable>

                    <Pressable>
                        <Text style={{ width: windowWidth - 68 }}>
                            <Text style={{ fontWeight: '700', marginLeft: 5 }}>Văn Anh </Text>
                            đã yêu thích bài viết của bạn
                        </Text>

                        <View style={styles.containerFooter}>
                            <Text style={styles.textFooter}>10 phút trước</Text>

                        </View>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, }}>
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "http://placeimg.com/640/480/food" }}
                        />
                    </Pressable>

                    <Pressable>
                        <Text style={{ width: windowWidth - 68 }}>
                            <Text style={{ fontWeight: '700', marginLeft: 5 }}>Văn Anh </Text>
                            đã yêu thích bài viết của bạn
                        </Text>

                        <View style={styles.containerFooter}>
                            <Text style={styles.textFooter}>10 phút trước</Text>

                        </View>
                    </Pressable>
                </View>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 30,
        height: 30,
        marginTop: 4,
        borderRadius: 50,
    },
})

export default ListNotifi;