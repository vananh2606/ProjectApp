import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView, Pressable, TouchableOpacity, View, Text, Image, StyleSheet, TextInput, Dimensions } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons'

const NewPost = () => {
    const [image, setImage] = useState(null)
    const windowWidth = Dimensions.get('window').width;

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TouchableOpacity
                    style={styles.addImg}
                    onPress={pickImage}
                >
                    <IonicIcon
                        name='add-outline'
                        size={100}
                        color='#ccc'
                        style={{ lineHeight: 100 }}
                    />
                </TouchableOpacity>
                {console.log(image)}
                <TextInput
                    style={styles.textInput}
                    placeholder='Viết chú thích...'
                    keyboardType='default'
                    multiline={true}
                />
            </View>

            <View style={styles.tagImg}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 12,
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    addImg: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ccc'
    },
    textInput: {
        flex: 1,
        marginLeft: 12,
    },
    tagImg: {
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        marginTop: 20,
    }
})

export default NewPost