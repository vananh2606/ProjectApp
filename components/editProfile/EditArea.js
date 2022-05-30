import { useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, Dimensions, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const EditArea = () => {
    const [sex, setSex] = useState(true)
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false)
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    const onChange = (event, selectedDate) => {
        const birthday = selectedDate || date
        setShow(false)
        setDate(birthday)
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={styles.avatar}
                    source={{ uri: "http://placeimg.com/640/480/food" }}
                />

                <Text style={{ fontWeight: '700', color: 'blue' }}>Thay đổi ảnh đại diện</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.containerTextInput}>
                    <Text style={{ width: 80 }}>Tên</Text>
                    <TextInput
                        defaultValue='Long Nguyen'
                        style={{ minWidth: windowWidth - 120, maxWidth: windowWidth - 120, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                    />
                </View>

                <View style={styles.containerTextInput}>
                    <Text style={{ width: 80 }}>Tiểu sử</Text>
                    <TextInput
                        defaultValue='Hi'
                        style={{ minWidth: windowWidth - 120, maxWidth: windowWidth - 120, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                    />
                </View>

                <View style={styles.containerTextInput}>
                    <Text style={{ width: 80 }}>Email</Text>
                    <TextInput
                        defaultValue='long@gmail.com'
                        keyboardType='email-address'
                        style={{ minWidth: windowWidth - 120, maxWidth: windowWidth - 120, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                    />
                </View>

                <View style={styles.containerTextInput}>
                    <Text style={{ width: 80 }}>Điện thoại</Text>
                    <TextInput
                        defaultValue='0999999999'
                        keyboardType='number-pad'
                        style={{ minWidth: windowWidth - 120, maxWidth: windowWidth - 120, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                    />
                </View>

                <View style={styles.containerTextInput}>
                    <Text style={{ width: 80 }}>Giới tính</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable
                            style={[styles.sex, { borderColor: sex ? 'blue' : '#000' }]}
                            onPress={() => setSex(true)}
                        >
                            <Text style={{ color: sex ? 'blue' : '#000' }}>Nam</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.sex, { borderColor: sex ? '#000' : 'blue' }]}
                            onPress={() => setSex(false)}
                        >
                            <Text style={{ color: sex ? '#000' : 'blue' }}>Nữ</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.containerTextInput}>
                    <Text style={{ width: 80 }}>Ngày sinh</Text>
                    <Text
                        style={{ color: 'blue' }}
                        onPress={() => setShow(true)}
                    >Chỉnh sửa ngày sinh</Text>
                    {show &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            onChange={onChange}
                            is24Hour={true}
                            display="default"
                        />
                    }
                </View>
            </View>

            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text
                    style={{ width: 70, fontWeight: '700', marginTop: 12, marginLeft: 12, color: 'blue' }}
                >Đăng xuất</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    body: {
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    containerTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginHorizontal: 12,
    },
    avatar: {
        width: 150,
        height: 150,
        marginBottom: 4,
        borderRadius: 75,
    },
    sex: {
        width: 50,
        height: 25,
        marginBottom: 4,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        borderWidth: 1,
    }
})

export default EditArea