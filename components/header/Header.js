import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>VAL</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', width: 60, justifyContent: 'space-between' }}>
                <TouchableOpacity>
                    <AntDesign
                        name='plussquareo'
                        size={25}
                        color='#000'
                        onPress={() => navigation.push('NewPost')}
                    />
                </TouchableOpacity>
                <IonicIcon
                    name='navigate-outline'
                    size={25}
                    color='#000'
                />
            </View>
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
});

export default Header;