import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../colors/Colors";

const CardStyle = StyleSheet.create( {
  propertyTitle: {
    textAlign: "left",
    color: Colors.primary,
  },
  propertyImage: {
    flex: 1,
  },
  propertyBody: {
    flex: 3,
    padding: 10,
  },
  propertyInfoText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  propertyInfoTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 12,
    // color: Colors.accentColor,
  },
  propertyInfoBody: {
    textAlign: "justify",
    fontSize: 14,
    color: Colors.primaryText,
  },
} );

export default CardStyle;
