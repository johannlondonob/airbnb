import React from "react";
import { Text } from "react-native";

const HeadingDescription = ( props ) => {
  return <Text style={ {
    fontSize: 18,
    fontWeight: "bold",
  } }>{ props.headingText }: </Text>;
};

export default HeadingDescription;
