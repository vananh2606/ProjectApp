import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import IonicIcon from 'react-native-vector-icons/Ionicons'

const HeaderMyPost = ({ name }) => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <IonicIcon 
                name='chevron-back'
                size={25}
                color='#000'
                onPress={() => navigation.goBack()}
            />
            <View>
                <Text style={{ fontWeight: '700', textAlign: 'center' }}>{name}</Text>
                <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Tạo bài đăng</Text>
            </View>
            <Text>      </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginTop: 10,
        paddingBottom: 4,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    }
})

export default HeaderMyPost