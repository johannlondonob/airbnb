import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const MessageListEmpty = ( props ) => {
  const navigation = useNavigation();
  return <View style={ {
    marginVertical: "50%",
    display: "flex",
    flexDirection: "column",
  } }>
        <View style={ {
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
        } }>
            <Text style={ {
              fontWeight: "bold",
              fontSize: 24,
              color: "#838382",
              textAlign: "center",
            } }>{ props.message }</Text>
        </View>
        <View style={ {
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
        } }>
            <Button title={ props.titleButton } onPress={ () => {
              navigation.navigate( props.goTo.name, { user: props.goTo.data } );
            } } />
        </View>
    </View>;
};

export default MessageListEmpty;
