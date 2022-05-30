import { View, Text, StyleSheet } from 'react-native';

const HeaderSearch = () => {

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Hoạt động</Text>
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