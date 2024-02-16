import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const DetectText = () => {

    const [imageUri, setImageUri] = useState(null);
    const [labels, setLabels] = useState([]);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image: ", error);
        }
    };
    const camImage = async () => {

        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                cameraType: 'back'
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image: ", error);
        }
    };

    const analyzeImage = async () => {
        try {
            if (!imageUri) {
                alert("Please select an image!");
                return;
            }

            const apiKey = "AIzaSyCBFfJzE6p4O0E3yJYpRCanbGC6LL8Z3L4";
            const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

            const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const requestData = {
                requests: [
                    {
                        image: {
                            content: base64ImageData,
                        },
                        features: [{ type: 'TEXT_DETECTION', maxResults: 5 }],
                    },
                ],
            };

            const apiResponse = await axios.post(apiURL, requestData);
            console.log(apiResponse.data.responses[0].fullTextAnnotation.text);

        } catch (error) {
            console.error("Error Analyzing Image: ", error);
            alert("Error analyzing image, please try again later");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Cloud Vision Test
            </Text>
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 300, height: 300 }}
                />
            )}
            <TouchableOpacity
                onPress={pickImage}
                style={styles.button}
            >
                <Text style={styles.text}>Choose an Image from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={camImage}
                style={styles.button}
            >
                <Text style={styles.text}>Choose an Image from Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={analyzeImage}
                style={styles.button}
            >
                <Text style={styles.text}>Analyze</Text>
            </TouchableOpacity>
        </View>
    )
}
export default DetectText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#CCCCCC',
        padding: 10,
        marginBottom: 10,
        marginTop: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});