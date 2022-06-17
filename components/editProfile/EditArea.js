import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Checkbox, Portal, Modal, Provider, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import 'firebase/firestore';

const EditArea = () => {
    const [visible, setVisible] = React.useState(false);
    const [user, setUser] = useState(null);
    const [man, setMan] = useState(true);
    const navigation = useNavigation();

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const signOut = () => firebase.auth().signOut();

    useEffect(() => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                setUser(snapshot.data());
                setMan(snapshot.data()?.sex === 'man' ? true : false);
            });
    }, []);


    console.log(user);

    const EditFormSchema = Yup.object().shape({
        username: Yup.string().required('Tên người dùng là bắt buộc').min(2, 'Tên người dùng phải có ít nhất 2 kí tự'),
        history: Yup.string('Tiểu sử không hợp lệ.'),
        phone: Yup.number('Số điện thoại không hợp lệ.'),
    });

    return (
        <Provider style={styles.container}>
            <ScrollView>
                {user &&
                    <View>
                        <View style={{ alignItems: 'center', paddingTop: 20 }}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: "http://placeimg.com/640/480/food" }}
                            />

                            <Text style={{ fontWeight: '700', color: 'blue' }}>Thay đổi ảnh đại diện</Text>
                        </View>

                        <View style={styles.body}>
                            <View style={{ marginHorizontal: 12, }}>
                                <Formik
                                    initialValues={{
                                        username: user?.name,
                                        history: user?.history ?? '',
                                        phone: user?.phone ?? ''
                                    }}
                                    onSubmit={values => {
                                        let creatAt = firebase.firestore.Timestamp.fromDate(new Date());
                                        let uploadTime = firebase.firestore.FieldValue.serverTimestamp();

                                        console.log('creatAt: ', creatAt);
                                        console.log('uploadTime: ', uploadTime);

                                        firebase.firestore().collection("users")
                                            .doc(firebase.auth().currentUser.uid)
                                            .update({
                                                name: values.username,
                                                history: values.history,
                                                phone: values.phone,
                                                sex: man ? 'man' : 'woman',
                                                // time: firebase.firestore.Timestamp(new Date())
                                            })
                                            .then(res => Toast.show({
                                                type: 'success',
                                                text1: 'Thành công!',
                                                text2: 'Thay đổi của bạn đã được lưu.'
                                            }))
                                    }}
                                    validationSchema={EditFormSchema}
                                    validateOnMount={true}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched }) => (
                                        <KeyboardAwareScrollView
                                            showsVerticalScrollIndicator={false}
                                            extraScrollHeight={30}
                                            enableOnAndroid={true}
                                            keyboardShouldPersistTaps='handled'
                                            resetScrollToCoords={{ x: 0, y: 0 }}
                                        >
                                            <View style={styles.inputField}>
                                                <TextInput
                                                    mode='outlined'
                                                    label='Tên người dùng'
                                                    error={(errors.username === 'Tên người dùng là bắt buộc' || errors.username === 'Tên người dùng phải có ít nhất 2 kí tự') && touched.username}
                                                    placeholderTextColor='#444'
                                                    placeholder='Nhập tên người dùng của bạn'
                                                    autoCapitalize='none'
                                                    textContentType='emailAddress'
                                                    onChangeText={handleChange('username')}
                                                    onBlur={handleBlur('username')}
                                                    value={values.username}
                                                    style={{ marginBottom: 5, }}
                                                />
                                                {((errors.username === 'Tên người dùng là bắt buộc' || errors.username === 'Tên người dùng phải có ít nhất 2 kí tự') && touched.username) &&
                                                    <Text style={styles.textError}>{errors.username}</Text>
                                                }
                                            </View>

                                            <View style={styles.inputField}>
                                                <TextInput
                                                    mode='outlined'
                                                    label='Tiểu sử'
                                                    placeholderTextColor='#444'
                                                    error={errors.history === 'Tiểu sử không hợp lệ.' && touched.history}
                                                    placeholder='Nhập tiểu sử của bạn'
                                                    autoCapitalize='none'
                                                    textContentType='none'
                                                    onChangeText={handleChange('history')}
                                                    onBlur={handleBlur('history')}
                                                    value={values.history}
                                                    multiline={true}
                                                    style={{ marginBottom: 5, }}
                                                />
                                                {(errors.history === 'Tiểu sử không hợp lệ.' && touched.history) &&
                                                    <Text style={styles.textError}>{errors.history}</Text>
                                                }
                                            </View>

                                            <View style={styles.inputField}>
                                                <TextInput
                                                    mode='outlined'
                                                    label='Số điện thoại'
                                                    placeholderTextColor='#444'
                                                    error={errors.phone === 'Số điên thoại không hợp lệ.' && touched.phone}
                                                    placeholder='Nhập số điện thoại của bạn'
                                                    autoCapitalize='none'
                                                    textContentType='none'
                                                    onChangeText={handleChange('phone')}
                                                    onBlur={handleBlur('phone')}
                                                    value={values.phone}
                                                    style={{ marginBottom: 5, }}
                                                />
                                                {(errors.phone === 'Số điên thoại không hợp lệ.' && touched.phone) &&
                                                    <Text style={styles.textError}>{errors.phone}</Text>
                                                }
                                            </View>

                                            <View style={styles.checkboxContainer}>
                                                <View style={styles.checkbox}>
                                                    <Text>Trai</Text>
                                                    <Checkbox
                                                        status={man ? 'checked' : 'unchecked'}
                                                        onPress={() => setMan(true)}
                                                    />
                                                </View>

                                                <View style={styles.checkbox}>
                                                    <Text>Gái</Text>
                                                    <Checkbox
                                                        status={man ? 'unchecked' : 'checked'}
                                                        onPress={() => setMan(false)}
                                                    />
                                                </View>
                                            </View>

                                            <Pressable
                                                titleSize={20}
                                                style={styles.button(isValid)}
                                                onPress={handleSubmit}
                                            >
                                                <Text style={styles.buttonText}>Xong</Text>
                                            </Pressable>
                                        </KeyboardAwareScrollView>
                                    )}
                                </Formik>
                            </View>
                        </View>

                        <Pressable>
                            <Text
                                style={{ fontWeight: '700', marginLeft: 12, color: 'blue', alignSelf: 'flex-start' }}
                            >Đổi mật khẩu</Text>
                        </Pressable>

                        <Pressable
                            style={{ marginBottom: 20 }}
                            onPress={showModal}
                        >
                            <Text
                                style={{ fontWeight: '700', marginTop: 12, marginLeft: 12, color: 'blue', alignSelf: 'flex-start' }}
                            >Đăng xuất</Text>
                        </Pressable>
                    </View>
                }

                <Portal>
                    <Modal visible={visible} dismissable={false} contentContainerStyle={styles.containerModal}>
                        <Text
                            style={{ fontWeight: '700', marginBottom: 20, }}
                        >
                            Đăng xuất khỏi tài khoản?</Text>

                        <Divider />

                        <Pressable
                            style={{ marginBottom: 20, width: 200 }}
                            onPress={signOut}
                        >
                            <Text
                                style={{ fontWeight: '700', color: 'red', textAlign: 'center' }}
                            >Đăng xuất</Text>
                        </Pressable>

                        <Divider />

                        <Pressable
                            style={{ marginBottom: 20, width: 200 }}
                            onPress={hideModal}
                        >
                            <Text
                                style={{ fontWeight: '700', textAlign: 'center' }}
                            >Huỷ</Text>
                        </Pressable>
                    </Modal>
                </Portal>
            </ScrollView>

            <Toast />
        </Provider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerModal: {
        height: 150,
        width: 250,
        paddingTop: 20,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    body: {
        paddingTop: 12,
        paddingBottom: 12,
        marginBottom: 12,
        marginTop: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    avatar: {
        width: 150,
        height: 150,
        marginBottom: 4,
        borderRadius: 75,
    },
    inputField: {
        marginBottom: 16,
    },
    textError: {
        fontSize: 12,
        color: '#B22222',

    },
    button: isValid => ({
        backgroundColor: isValid ? '#663399' : '#9370DB',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    }),
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    checkbox: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 20,
    },
});

export default EditArea;