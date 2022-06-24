import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.logo}
                    source={require('../../assets/VAL-logo.png')} />
            </View>

            <TouchableOpacity style={{ flexDirection: 'row', width: 60, justifyContent: 'flex-end' }}>
                <AntDesign
                    name='plussquareo'
                    size={25}
                    color='#000'
                    onPress={() => navigation.navigate('Add')}
                />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
});

export default Header;