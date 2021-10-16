import React, {useState} from 'react';
import {
    StyleSheet, Text, View, Button,
    Image,
    FlatList
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import config from "./config.json";


export default function App() {

    const [selectedUser, setSelectedUser] = useState<number>(0);
    const [step, setStep] = useState<number>(0);  // The step to show / display
    const [recommendations, setRecommendations] = useState<string[] >([]);

    /**
     * Reset the list of recommendations.
     */
    const reset = () => {
        setStep(0);
        setRecommendations([]);
    };

    const getData = () => {

        // TODO: Adapt based on the url of your project
        fetch(config.API_URL + '?id=' + String(selectedUser), {})
            .then((response) => response.json())
            .then((responseData) => {
                // TODO: Adapt based on the format of your response object
                console.log('Recommendations: ', responseData['id']);
                // @ts-ignore
                setRecommendations(responseData['id']);
                // const recommendations = [34, 32, 893, 1];

                setStep(1);
            })
            .catch(error => console.log('Error', error));
    };


    if (config.API_URL === 'YOUR_API_URL') {
        return (
            <View style={styles.container}>
                <Image
                    style={{resizeMode: "center", width: 450, height: 150}}
                    source={require("./assets/icon-flat.png")}
                />
                <Text style={{color: "red", margin: 20}}>
                    L'app n'est pas configurée correctement. Mettez à jour le fichier
                    config.json comme indiqué dans le README.
                </Text>
            </View>
        );
    }

    if (step === 1) {
        return (
            <View style={styles.container}>
                <Image
                    style={{ resizeMode: "center", width: 450, height: 150 }}
                    source={require("./assets/icon-flat.png")}
                />
                <Text style={{ fontSize: 24, padding: 20, textAlign: "center" }}>
                    Vos recommendations
                </Text>
                <FlatList
                    style={{ maxHeight: 200 }}
                    data={recommendations.map(key => ({
                        key: key.toString()
                    }))}
                    renderItem={({ item }) => <Text>Article n°{item.key}</Text>}
                />
                <Button title="Se déconnecter" onPress={reset} />
            </View>
        );
    }



    return (
        <View style={styles.container}>
            <Image
                style={{ resizeMode: "center", width: 450, height: 150 }}
                source={require("./assets/icon-flat.png")}
            />
            <Text style={{ fontSize: 18, padding: 20, textAlign: "center" }}>
                Choisissez votre profil afin de recevoir des recommendations de
                lecture personnalisées
            </Text>
            <Picker
                style={{ height: 200, width: "80%", margin: 30 }}
                selectedValue={selectedUser}
                onValueChange={(value, _) => setSelectedUser(value)}
            >
                {[...Array(10000).keys()].map(e => (
                    <Picker.Item key={e} label={`User ${e}`} value={e} />
                ))}
            </Picker>
            <Button title="Se connecter" onPress={getData} />
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
