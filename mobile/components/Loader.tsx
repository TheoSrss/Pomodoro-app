import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import Colors from '../constant/Colors'
// import ThemedView from './ThemedView';


const Loader = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={theme.text} />
        </View>
    )


}

export default Loader;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});