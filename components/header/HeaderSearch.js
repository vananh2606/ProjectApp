import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IonicIcon from 'react-native-vector-icons/Ionicons';

const HeaderSearch = ({ withGoBack, name }) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { flexDirection: `${withGoBack ? 'row' : 'column'}` }]}>
            {withGoBack &&
                <IonicIcon
                    name='chevron-back'
                    size={25}
                    color='#000'
                    onPress={() => navigation.goBack()}
                />
            }
            <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>{name}</Text>
            {withGoBack &&
                <Text>      </Text>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        paddingBottom: 4,
    }
});

export default HeaderSearch;