import { View, Text, StyleSheet, Pressable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';

const SignupForm = () => {
    const navigation = useNavigation()

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        username: Yup.string().required('Tên người dùng là bắt buộc').min(2, 'Tên người dùng phải có ít nhất 2 kí tự'),
        password: Yup.string()
            .required('Mật khẩu là bắt buộc')
            .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
    })

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={values => {
                    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                        .then(result => {
                            firebase.firestore().collection("users")
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    name: values.username,
                                    email: values.email
                                })
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched }) => (
                    <KeyboardAvoidingView>
                        <View style={styles.inputField}>
                            <TextInput
                                mode='outlined'
                                label='Tên người dùng'
                                error={(errors.username === 'Tên người dùng là bắt buộc' || errors.username === 'Your password has to have at least 2 characters') && touched.username}
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
                                <Text style={styles.textError}>{errors.email}</Text>
                            }
                        </View>

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
                                label='Mật khẩu'
                                error={(errors.password === 'Mật khẩu phải có ít nhất 6 kí tự' || errors.password === 'Mật khẩu là bắt buộc') && touched.password}
                                placeholderTextColor='#444'
                                placeholder='Nhập mật khẩu của bạn'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={{ marginBottom: 5, }}
                            />
                            {((errors.password === 'Mật khẩu phải có ít nhất 6 kí tự' || errors.password === 'Mật khẩu là bắt buộc') && touched.password) &&
                                <Text style={styles.textError}>{errors.password}</Text>
                            }
                        </View>

                        <Pressable
                            titleSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: '#6BB0F5' }}>Log In</Text>
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
        marginTop: 80,
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
        backgroundColor: isValid ? '#663399' : '#9370DB',
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

export default SignupForm;