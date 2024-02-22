import {
    StyleSheet,
    SafeAreaView,
    ImageBackground,
} from "react-native";
import ImageToNutrients from "../components/ImageToNutrients";;

export default function KnowYourNutrients() {
    return (
        <ImageBackground
            source={require("../assets/back (3).png")} // Change the path accordingly
            style={styles.backgroundImage}
            resizeMode="repeat"
        >
            <SafeAreaView style={styles.container}>
                <ImageToNutrients />
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover", // or "stretch" for different cover options
        justifyContent: "center",
    },
});
