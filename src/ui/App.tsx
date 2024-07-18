import { registerRootComponent } from 'expo';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
    return (
        <View style={ styles.container }>
            <Text>Hello world react native!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

registerRootComponent(App);
