import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import Colors from "../../../../shared/colors/Colors";
import { useNavigation } from "@react-navigation/native";

const ProfileModule = ( props ) => {
  const { data } = props;
  const navigation = useNavigation();

  return <View style={ {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "rgba(255,152,0,.25)",
    padding: 10,
    width: 120,
    borderRadius: 10,
  } }>
        <Avatar size={ "large" } icon={ { name: data.iconName, type: "font-awesome-5", color: Colors.primary, size: 36 } } />
        <Text
          style={ {
            fontSize: 12,
            color: Colors.darkPrimary,
            fontWeight: "bold",
          } }
          onPress={ () => {
            navigation.navigate( data.goTo.name, { user: data.goTo.data } );
          } }
        >{ data.moduleName }</Text>
    </View>;
};

export default ProfileModule;
