import { useState } from 'react'
import { View, Text, Image, Pressable, Dimensions, StyleSheet } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons'

const Comment = ({ comment, reply }) => {
    const [liked, setLiked] = useState(false)
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={[styles.container, {
            borderBottomWidth: reply ? 0 : 1,
            paddingBottom: reply ? 0 : 10,
            borderBottomColor: '#ccc',
        }]}>
            <View style={styles.containerBody}>
                <Pressable>
                    <Image
                        style={styles.avatar}
                        source={{ uri: comment.avatar }}
                    />
                </Pressable>

                <View>
                    <Text style={{ width: reply ? windowWidth - 90 : windowWidth - 65 }}>
                        <Text style={{ fontWeight: '700', marginLeft: 5 }}>{comment.name} </Text>
                        {comment.comment}
                    </Text>

                    <View style={styles.containerFooter}>
                        <Text style={styles.textFooter}>10 phút trước</Text>
                        {reply &&
                            <Text style={styles.textFooter}>Trả lời</Text>
                        }
                    </View>
                </View>

                {reply &&
                    <IonicIcon
                        name={liked ? 'heart' : 'heart-outline'}
                        size={15}
                        color={liked ? 'red' : '#000'}
                        onPress={() => setLiked(!liked)}
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
    },
    containerBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,

    },
    containerFooter: {
        flexDirection: 'row',
    },
    avatar: {
        width: 30,
        height: 30,
        marginTop: 4,
        borderRadius: 50,
    },
    textFooter: {
        fontSize: 12,
        color: '#ccc',
        marginRight: 12,
    }
})

export default Comment