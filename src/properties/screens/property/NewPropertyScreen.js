import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { Button, Divider, Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RentingStyle from "../../../renting/components/RentingStyle";
import HeadingDescription from "../../../renting/components/HeadingDescription";
import Description from "../../../renting/components/Description";
import DescriptionWithInput from "../../../renting/components/DescriptionWithInput";
import ModalSelector from "react-native-modal-selector";
import Colors from "../../../shared/colors/Colors";

const NewPropertyScreen = ( { route } ) => {
  const navigation = useNavigation();
  const { user } = route.params;
  const [ propertyTypes, setPropertyTypes ] = useState( [] );
  const [ property, setProperty ] = useState( {
    idUser: user.id,
    title: "",
    idType: null,
    address: "",
    rooms: null,
    price: null,
    area: null,
    description: "",
  } );

  function registerNewProperty() {
    console.log(property)
    if (property.title === "" && property.idType == null && property.address === "" && property.rooms == null && property.price == null && property.area == null && property.address === "") {
      Alert.alert( "Info", "Todos los campos son obligatorios" );
    } else {
      fetch( "http://192.168.1.9:80/api/property/create", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify( property ),
      }).then((res) => {
        if (res.ok) {
          Alert.alert( "Info", "Propiedad registrada correctamente", [ {
            style: "default", text: "Great", onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            },
          } ] );
          return res.json();
        } else {
          console.log(res.json())
          Alert.alert( "Error", "Error al registrar la nueva propiedad" );
        }
      } ).then( ( res ) => {
        console.log( res );
      } ).catch( ( error ) => {
        Alert.alert( "Error", "RE error" );
      } );
    }
  }

  async function getPropertyTypes() {
    let response = await fetch( "http://192.168.1.9:80/api/property-types" );
    response = await response.json();
    setPropertyTypes( response.data );
  }

  useEffect( () => {
    getPropertyTypes().then( () => {
      console.log( "Se pudo consultar la consulta de los tipos de propiedad" );
    } ).catch( () => {
      console.log( "Error. No se pudo conectar con el servidor" );
    } );
  }, [] );

  return <View>
        <Header
          leftComponent={ {
            icon: "arrow-back",
            color: "#FFF",
            onPress: () => {
              navigation.goBack();
            },
          } }
          centerComponent={ {
            text: "Agregar propiedad",
            style: {
              color: "#FFF",
            },
          } }
        />
        <View style={ {
          padding: 20,
        } }>
            <Text style={ RentingStyle.title }> Nueva propiedad </Text>
            <View style={ RentingStyle.rentingContainer }>
                <HeadingDescription headingText={ "Datos propietario" } />
                <View style={ { paddingLeft: 20 } }>
                    <Description title={ "Nombres y apellidos" } content={ user.name + " " + user.lastname } />
                    <Description title={ "Número de identificación" } content={ user.identification } />
                    <Description title={ "Correo electrónico" } content={ user.email } />
                </View>
                <Divider style={ RentingStyle.divider } />
                <HeadingDescription headingText={ "Datos propiedad" } />
                <View style={ { paddingLeft: 20 } }>
                    <DescriptionWithInput
                      title={ "Título o nombre" }
                      content={
                        <TextInput
                          autoCapitalize={ "characters" }
                          keyboardType={ "default" }
                          placeholder={ "Título o nombre" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ ( text ) => {
                            setProperty( prevState => ({
                              ...prevState,
                              title: text,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Tipo propiedad" }
                      content={
                        <ModalSelector
                          initValue={ "Tipo" }
                          initValueTextStyle={ {
                            color: "#aaa",
                            fontSize: 14,
                          } }
                          data={ propertyTypes }
                          keyExtractor={ item => item.id }
                          labelExtractor={ item => item.type_name }
                          selectedItemTextStyle={ {
                            color: Colors.darkPrimary,
                          } }
                          selectTextStyle={ {
                            color: Colors.darkPrimary,
                            fontWeight: "normal",
                          } }
                          selectStyle={ {
                            height: 20,
                            width: 130,
                            paddingVertical: 0,
                            backgroundColor: "#ededed",
                            marginLeft: 5,
                            borderBottomWidth: 1,
                            borderTopWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderRadius: 0,
                            borderBottomColor: "#adadad",
                          } }
                          onChange={ ( item ) => {
                            setProperty( prevState => ({
                              ...prevState,
                              idType: item.id,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Dirección" }
                      content={
                        <TextInput
                          autoCapitalize={ "characters" }
                          keyboardType={ "default" }
                          placeholder={ "Dirección propiedad" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ ( text ) => {
                            setProperty( prevState => ({
                              ...prevState,
                              address: text,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Número de habitaciones" }
                      content={
                        <TextInput
                          keyboardType={ "phone-pad" }
                          placeholder={ "# habitaciones" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ text => {
                            setProperty( prevState => ({
                              ...prevState,
                              rooms: parseInt(text),
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Precio por noche" }
                      content={
                        <TextInput
                          keyboardType={ "phone-pad" }
                          placeholder={ "Precio por noche" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ text => {
                            setProperty( prevState => ({
                              ...prevState,
                              price: parseInt(text),
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Área en metros cuadrados" }
                      content={
                        <TextInput
                          keyboardType={ "phone-pad" }
                          placeholder={ "Metros cuadrados" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ text => {
                            setProperty( prevState => ({
                              ...prevState,
                              area: parseInt(text),
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Descripción" }
                      content={
                        <TextInput
                          autoCapitalize={ "characters" }
                          keyboardType={ "default" }
                          placeholder={ "Descripción" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ text => {
                            setProperty( prevState => ({
                              ...prevState,
                              description: text,
                            }) );
                          } }
                        />
                      } />
                </View>
            </View>
            <View style={ { marginVertical: 30 } }>
                <Button
                  title={ "ENVIAR" }
                  onPress={ () => {
                    registerNewProperty();
                  } } />
            </View>
        </View>
    </View>;
};

export default NewPropertyScreen;
