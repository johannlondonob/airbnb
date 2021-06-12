import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const PropertyScreen = ( props ) => {
  const route = useRoute();
  return <ScrollView>
        <View>
            <Text>Hola, mundo</Text>
        </View>
    </ScrollView>;
};

export default PropertyScreen;
