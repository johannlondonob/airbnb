import React, { useState } from "react";
import { View, StatusBar, Image, TextInput, Alert, ScrollView, SafeAreaView } from "react-native";
import { Button, Overlay, Text } from "react-native-elements";
import FormStyle from "../../components/forms/FormStyle";
import LinearGradient from "react-native-linear-gradient";
import RentingStyle from "../../../renting/components/RentingStyle";
import HeadingDescription from "../../../renting/components/HeadingDescription";
import Description from "../../../renting/components/Description";

const RegisterScreen = ( { navigation: { navigate } } ) => {
  const [ registered, setRegistered ] = useState();
  const [ overlayRegistered, setOverlayRegistered ] = useState( false );
  const [ user, setUser ] = useState( {
    identification: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  } );

  function toggleOverlayRegistered() {
    setOverlayRegistered( !overlayRegistered );
  }

  function goProperties() {
    toggleOverlayRegistered();
    navigate( "Properties", { user: registered } );
  }

  const actionRegister = () => {
    if (user.name === "" && user.lastname === "" && user.email === "" && user.password === "" && user.identification === "") {
      Alert.alert(
        "Advertencia",
        "Todos los campos son obligatorios",
      );
    } else {
      fetch( "http://192.168.1.9:80/api/user/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {
          "identification": user.identification,
          "name": user.name,
          "lastname": user.lastname,
          "email": user.email,
          "password": user.password,
        } ),
      } ).then( ( response ) => {
        return response.ok ? response.json() : console.log( "Error de red" );
      } ).then( ( data ) => {
        if (data.message === "error") {
          Alert.alert( "Advertencia", "Se presentaron algunas inconsistencias al registrarse como usuario" );
        } else {
          setRegistered( data.data );
          Alert.alert( "Mensaje", "Registro exitoso", [
            {
              onPress: () => {
                toggleOverlayRegistered();
              },
              style: "default",
            },
          ] );
        }
      } ).catch( ( error ) => {
        Alert.alert( "Advertencia", error.toString() );
      } );
    }
  };

  return <ScrollView>
        <View style={ FormStyle.container }>
            <StatusBar backgroundColor="#ff7500" />
            <LinearGradient colors={ [ "#ff7500", "orange" ] } style={ FormStyle.logoContainer }>
                <Image source={ require( "../../images/baseline_sell_white_48.png" ) } />
                <Text style={ FormStyle.title }> Register </Text>
            </LinearGradient>
            <SafeAreaView>
                <ScrollView snapToAlignment={ "center" }>
                    <View style={ FormStyle.formBody }>
                        <TextInput placeholder="Identification" style={ FormStyle.formInput } placeholderTextColor={ "#aaa" } autoCapitalize={ "words" } keyboardType={ "number-pad" }
                                   onChangeText={ ( text ) => {
                                     setUser( prevState => ({
                                       ...prevState,
                                       identification: text,
                                     }) );
                                   } } />
                        <TextInput placeholder="Name" style={ FormStyle.formInput } placeholderTextColor={ "#aaa" } autoCapitalize={ "characters" } keyboardType={ "default" }
                                   onChangeText={ ( text ) => {
                                     setUser( prevState => ({
                                       ...prevState,
                                       name: text,
                                     }) );
                                   } } />
                        <TextInput placeholder="Lastname" style={ FormStyle.formInput } placeholderTextColor={ "#aaa" } autoCapitalize={ "characters" } keyboardType={ "default" }
                                   onChangeText={ ( text ) => {
                                     setUser( prevState => ({
                                       ...prevState,
                                       lastname: text,
                                     }) );
                                   } } />
                        <TextInput placeholder="Email" style={ FormStyle.formInput } placeholderTextColor={ "#aaa" } autoCapitalize={ "none" } keyboardType={ "default" } onChangeText={ ( text ) => {
                          setUser( prevState => ({
                            ...prevState,
                            email: text,
                          }) );
                        } } />
                        <TextInput placeholder="Phone Number" style={ FormStyle.formInput } placeholderTextColor={ "#aaa" } keyboardType={ "phone-pad" } onChangeText={ ( text ) => {
                          setUser( prevState => ({
                            ...prevState,
                            phone: text,
                          }) );
                        } } />
                        <TextInput placeholder="Password" style={ FormStyle.formInput } placeholderTextColor={ "#aaa" } keyboardType={ "default" } secureTextEntry={ true } onChangeText={ ( text ) => {
                          setUser( prevState => ({
                            ...prevState,
                            password: text,
                          }) );
                        } } />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView>
                <ScrollView contentContainerStyle={ FormStyle.formFooter }>
                    <Button title={ "REGISTER" } buttonStyle={ FormStyle.submitFormFooter } onPress={ actionRegister }
                            ViewComponent={ LinearGradient }
                            linearGradientProps={ {
                              colors: [ "#ff7500", "orange" ],
                              start: { x: 0, y: 0.8 },
                              end: { x: 0.9, y: 0.3 },
                            } } />
                    <View style={ FormStyle.optionsFormFooter }>
                        <Text style={ { color: "#a4a4a4" } }>Already a member?</Text>
                        <Text style={ { color: "#ddd" } }>   |   </Text>
                        <Text style={ { color: "orange", fontWeight: "bold" } } onPress={ () => {
                          navigate( "Login" );
                        } }>Login</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <Overlay isVisible={ overlayRegistered } onBackdropPress={ toggleOverlayRegistered }>
                <View style={ { minWidth: "90%", padding: 5 } }>
                    <View style={ { paddingHorizontal: 5 } }><Text style={ RentingStyle.title }>Resultado de la operación</Text></View>
                    <View style={ RentingStyle.rentingContainer }>
                        <HeadingDescription headingText={ "Usuario" } />
                        <View style={ { paddingLeft: 20 } }>
                            <Description title={ "Id" } content={ registered ? registered.id : "" } />
                            <Description title={ "Identificación" } content={ registered ? registered.identification : "" } />
                            <Description title={ "Nombres" } content={ registered ? registered.name : "" } />
                            <Description title={ "Apellidos" } content={ registered ? registered.lastname : "" } />
                            <Description title={ "Correo electrónico" } content={ registered ? registered.email : "" } />
                            <Description title={ "Fecha creación" } content={ registered ? registered.created_at : "" } />
                        </View>
                    </View>
                    <View style={ { marginTop: 20, marginBottom: 5 } }>
                        <Button title={ "Great!" } type={ "clear" } onPress={ () => {
                          goProperties();
                        } } />
                    </View>
                </View>
            </Overlay>
        </View>
    </ScrollView>;
};

export default RegisterScreen;
