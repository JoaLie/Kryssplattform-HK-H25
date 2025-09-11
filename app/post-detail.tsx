import { StyleSheet, Text, View } from "react-native";


export default function PostDetail() {
    return (
        <View style={styles.mainContainer}>
            <Text>Her kommer det detaljer om innlegg</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});