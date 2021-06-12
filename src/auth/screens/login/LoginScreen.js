import React, { useState } from "react";
import { View, StatusBar, Image, TextInput, Alert, SafeAreaView, ScrollView } from "react-native";
import { Button, Text } from "react-native-elements";
import FormStyle from "../../components/forms/FormStyle";
import LinearGradient from "react-native-linear-gradient";
import { NavigationActions as navigation } from "react-navigation";
import Colors from "./../../../shared/colors/Colors";

const LoginScreen = ( { navigation: { navigate } } ) => {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const login = async () => {
    let response = await fetch( "http://192.168.1.9:80/api/user/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {
        email: email,
        password: password,
      } ),
    } );

    response = await response.json();

    if (response.data.code === 1) {
      Alert.alert(
        `Login`,
        response.data.message,
        [
          {
            style: "default",
            onPress: () => {
              navigate( "Properties", { user: response.data.user } );
            },
          },
        ],
        {},
      );
    } else if (response.data.code === 0) {
      Alert.alert(
        `Login`,
        response.data.message,
        [
          {
            text: "Retry",
            style: "default",
          },
        ],
        {},
      );
    }
  };

  return <ScrollView>
        <View style={ FormStyle.container }>
            <StatusBar backgroundColor={ Colors.primary } />
            <LinearGradient colors={ [ Colors.primary, Colors.darkPrimary ] } style={ FormStyle.logoContainer }>
                <Image source={ require( "../../images/baseline_sell_white_48.png" ) } />
                <Text style={ FormStyle.title }> Login </Text>
            </LinearGradient>
            <SafeAreaView>
                <ScrollView snapToAlignment={ "center" }>
                    <View style={ FormStyle.formBody }>
                        <TextInput onChangeText={ ( email ) => {
                          setEmail( email );
                        } } placeholder="Email" style={ FormStyle.formInput } placeholderTextColor={ Colors.dividerColor } autoCapitalize={ "none" } keyboardType={ "email-address" } />
                        <TextInput onChangeText={ ( password ) => {
                          setPassword( password );
                        } } placeholder="Password" style={ FormStyle.formInput } placeholderTextColor={ Colors.dividerColor } keyboardType={ "default" } secureTextEntry={ true } />
                        <Text style={ FormStyle.buttonForgotPassword } onPress={ () => {
                          navigation.navigate( "ResetPassword" );
                        } }>Forgot Password?</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView>
                <ScrollView contentContainerStyle={ FormStyle.formFooter }>
                    <Button title={ "LOGIN" } buttonStyle={ FormStyle.submitFormFooter } onPress={ login }
                            ViewComponent={ LinearGradient }
                            linearGradientProps={ {
                              colors: [ "#ff7500", "orange" ],
                              start: { x: 0, y: 0.8 },
                              end: { x: 0.9, y: 0.3 },
                            } } />
                    <View style={ FormStyle.optionsFormFooter }>
                        <Text style={ { color: "#a4a4a4" } }>Dont have an account?</Text>
                        <Text style={ { color: Colors.dividerColor } }>   |   </Text>
                        <Text style={ { color: "orange", fontWeight: "bold" } } onPress={ () => {
                          navigate( "Register" );
                        } }>Register</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    </ScrollView>;
};

export default LoginScreen;
