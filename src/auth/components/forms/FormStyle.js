import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const FormStyle = StyleSheet.create( {
  container: {
    height: Dimensions.get( "screen" ).height,
    backgroundColor: "#ededed",
  },
  logoContainer: {
    backgroundColor: "orange",
    height: Dimensions.get( "screen" ).height * 0.3,
    borderBottomLeftRadius: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    right: 30,
    bottom: 50,
    fontSize: 22,
    color: "#ededed",
  },
  formBody: {
    height: Dimensions.get( "screen" ).height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  formFooter: {
    height: Dimensions.get( "screen" ).height * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  submitFormFooter: {
    alignSelf: "center",
    width: Dimensions.get( "screen" ).width * 0.75,
    borderRadius: 100,
    padding: 15,
  },
  optionsFormFooter: {
    marginTop: 20,
    alignContent: "flex-end",
    flexDirection: "row",
  },
  formInput: {
    backgroundColor: "#ededed",
    fontStyle: "normal",
    color: "#4d4d4d",
    width: Dimensions.get( "screen" ).width * 0.75,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4.65,
    elevation: 4,
  },
  buttonForgotPassword: {
    width: Dimensions.get( "screen" ).width * 0.75,
    marginTop: 15,
    marginBottom: 15,
    color: "#a4a4a4",
    fontWeight: "bold",
    textAlign: "right",
  },
} );

export default FormStyle;
