import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProfileHeader from "./ProfileHeader";
import ProfileModules from "./ProfileModules";
import Colors from "../../../../shared/colors/Colors";
import { Header } from "react-native-elements";

const ProfileScreen = ( { navigation } ) => {
  const route = useRoute();
  const [ user, setUser ] = useState( { user } );

  useEffect( () => {
    setUser( route.params.user );
  } );

  return <View>
        <Header
          leftComponent={ {
            icon: "arrow-back",
            color: "#fff",
            onPress: () => {
              navigation.goBack();
            },
          } }
          centerComponent={ {
            text: "Mi perfil",
            style: {
              color: "#FFF",
            },
          } }
        />
        <ProfileHeader user={ user } style={ {
          display: "flex",
          flex: 1,
          backgroundColor: "red",
        } } />
        <View style={ {
          display: "flex",
          marginVertical: 20,
          paddingHorizontal: 20,
        } }>
            <Text style={ {
              marginVertical: 10,
              fontWeight: "bold",
              color: Colors.accentColor,
            } }>Mis cosas</Text>
            <ProfileModules user={ user } />
        </View>
    </View>;
};

export default ProfileScreen;
