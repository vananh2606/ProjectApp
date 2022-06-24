import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';

const LoginForm = () => {
    const [hidePass, setHidePass] = useState(true);
    const navigation = useNavigation();

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: Yup.string()
            .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
            .required('Mật khẩu là bắt buộc')
    });
    firebase.auth().updateCurrentUser
    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={LoginFormSchema}
                onSubmit={values => {
                    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                        .then(result => console.log(result))
                        .catch(error => console.log(error))
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched }) => (
                    <KeyboardAvoidingView>
                        <View style={styles.inputField}>
                            <TextInput
                                mode='outlined'
                                label='Email'
                                error={(errors.email === 'Email không hợp lệ' || errors.email === 'Email là bắt buộc') && touched.email}
                                placeholderTextColor='#444'
                                placeholder='Nhập email của bạn'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={{ marginBottom: 5, }}
                            />
                            {((errors.email === 'Email không hợp lệ' || errors.email === 'Email là bắt buộc') && touched.email) &&
                                <Text style={styles.textError}>{errors.email}</Text>
                            }
                        </View>

                        <View style={styles.inputField}>
                            <TextInput
                                mode='outlined'
                                label='Password'
                                error={(errors.password === 'Mật khẩu phải có ít nhất 6 kí tự' || errors.password === 'Mật khẩu là bắt buộc') && touched.password}
                                placeholderTextColor='#444'
                                placeholder='Nhập mật khẩu của bạn'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={hidePass}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={{ marginBottom: 5, }}
                                right={
                                    hidePass ?
                                        <TextInput.Icon
                                            name="eye"
                                            onPress={() => setHidePass(false)}
                                        />
                                        :
                                        <TextInput.Icon
                                            name="eye-off"
                                            onPress={() => setHidePass(true)}
                                        />
                                }
                            />
                            {((errors.password === 'Mật khẩu phải có ít nhất 6 kí tự' || errors.password === 'Mật khẩu là bắt buộc') && touched.password) &&
                                <Text style={styles.textError}>{errors.password}</Text>
                            }
                        </View>

                        <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                            <Text style={{ color: '#009ACD' }}>Quên mặt khẩu?</Text>
                        </View>

                        <Pressable
                            titleSize={20}
                            style={styles.button(isValid)}
                            onPress={() => {
                                handleSubmit();
                            }}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Bạn chưa có tài khoản? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={{ color: '#009ACD' }}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 12,
    },
    inputField: {
        marginBottom: 16,
    },
    textError: {
        fontSize: 12,
        color: '#B22222',

    },
    button: isValid => ({
        backgroundColor: isValid ? '#009ACD' : '#87CEFF',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    }),
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    },
})

export default LoginForm;