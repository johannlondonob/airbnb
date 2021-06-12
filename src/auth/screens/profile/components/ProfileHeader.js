import React from "react";
import { View, Text } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const ProfileHeader = ( props ) => {
  const { user } = props;
  const navigation = useNavigation();
  return <View
    style={ {
      display: "flex", flexDirection: "row",
      padding: 15,
      justifyContent: "flex-start",
    } }
  >
    <Avatar
      source={ require( "./../../../../shared/images/male_avatar.png" ) }
      rounded={ true }
      size={ "large" } />
    <View style={ {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingHorizontal: 15,
    } }>
      <Text style={ { fontWeight: "100", color: "#616161" } }> { user.lastname }, { user.name }</Text>
      <Text style={ { fontWeight: "100", color: "#919191", fontSize: 13 } }> { user.email }</Text>
    </View>
    <View style={ {
      display: "flex",
      flex: 1,
      alignItems: "flex-end",
      justifyContent: "center",
    } }>
      <Button type={ "clear" } title={ "CERRAR SESIÓN" } titleStyle={ { color: "#FC6464", fontSize: 12 } } onPress={ () => {
        navigation.navigate( "Login" );
      } } />
    </View>

  </View>;
};

export default ProfileHeader;
