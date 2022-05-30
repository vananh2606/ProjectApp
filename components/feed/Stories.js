import { ScrollView, View, StyleSheet, Image, Text } from "react-native"
import { stories } from '../../data'

const Stories = () => {
    return (
        <View style={{ marginBottom: 13 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {stories.map((story, index) => (
                    <View 
                        key={index}
                        style={styles.container}
                    >
                        <Image
                            style={styles.story}
                            source={{ uri: story.avatar }}
                        />
                        <Text>{story.name.length > 11
                            ? story.name.slice(0, 10).toLowerCase() + '...'
                            : story.name.toLowerCase()
                        }</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }, 
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 3,
        borderColor: '#ff8501',
    }
})

export default Stories