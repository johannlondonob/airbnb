import React from "react";
import { Text, View } from "react-native";
import RentingStyle from "./RentingStyle";

const DescriptionWithInput = ( props ) => {
  return <View style={ RentingStyle.boxDescription }>
        <Text style={ {
          fontWeight: "bold",
        } }>{ props.title }: </Text>
        <View>{ props.content }</View>
    </View>;
};

export default DescriptionWithInput;
