import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../shared/colors/Colors";

const RentingStyle = StyleSheet.create( {
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  rentingContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  divider: {
    backgroundColor: "#aaa",
    marginVertical: 20,
  },
  boxDescription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  descriptionWithInputDefault: {
    height: 20,
    width: 130,
    paddingVertical: 0,
    backgroundColor: "#ededed",
    color: Colors.darkPrimary,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#adadad",
    textAlign: "center",
  },
} );

export default RentingStyle;
