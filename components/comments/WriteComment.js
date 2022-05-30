import { View, TextInput, Text, Image, StyleSheet, Dimensions } from 'react-native'

const WriteComment = ({ avatar }) => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <Image
                style={styles.story}
                source={{ uri: avatar }}
            />

            <View style={styles.containerInput}>
                <TextInput
                    style={[styles.textInput, { width: windowWidth - 60 }]}
                    multiline={true}
                    keyboardType='default'
                    autoFocus={true}
                />

                <Text style={styles.submit}>Đăng</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    containerInput: {
        justifyContent: 'center',
    },
    story: {
        width: 30,
        height: 30,
        marginTop: 4,
        borderRadius: 50,
    },
    textInput: {
        minHeight: 24,
        maxHeight: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 35,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 80,
    },
    submit: {
        position: 'absolute',
        right: 20,
        paddingLeft: 10,
        fontWeight: '700',
        color: 'blue',
    }
})

export default WriteComment