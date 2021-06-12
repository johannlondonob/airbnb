import React from "react";
import { View } from "react-native";
import { Header, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const navigation = useNavigation();
  return <View style={ { flex: 1 } }>
        <Header
          leftComponent={ {
            icon: "arrow-back",
            color: "#FFF",
            onPress: () => {
              navigation.goBack();
            },
          } }
          rightComponent={ {
            icon: "menu",
            color: "#FFF",
            onPress: () => {
              toggleBottomSheet();
            },
          } }
          centerComponent={ {
            text: "Actualizando mi perfil",
            style: {
              color: "#FFF",
            },
          } }
        />
        <Text>Editando Perfil</Text>
    </View>;
};

export default EditProfile;
