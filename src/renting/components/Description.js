import React from "react";
import { Text, View } from "react-native";
import RentingStyle from "./RentingStyle";

const Description = ( props ) => {
  return <View style={ RentingStyle.boxDescription }>
        <Text style={ {
          fontWeight: "bold",
        } }>{ props.title }: </Text>
        <Text style={ {
          display: "flex",
          maxWidth: 230,
        } }>{ props.content }</Text>
    </View>;
};

export default Description;
