import React, { useEffect, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { Button, Divider, Header, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RentingStyle from "../../../renting/components/RentingStyle";
import HeadingDescription from "../../../renting/components/HeadingDescription";
import Description from "../../../renting/components/Description";
import DescriptionWithInput from "../../../renting/components/DescriptionWithInput";
import ModalSelector from "react-native-modal-selector";
import Colors from "../../../shared/colors/Colors";
import Moment from "moment";

const EditProperty = ( { route } ) => {
  const auxProperty = route.params.property;
  const navigation = useNavigation();
  const [ propertyTypes, setPropertyTypes ] = useState();

  const [ property, setProperty ] = useState( {
    propertyId: auxProperty.property.id,
    idUser: auxProperty.owner.id,
    title: auxProperty.property.title,
    idType: auxProperty.property.type.id,
    address: auxProperty.property.address,
    rooms: auxProperty.property.rooms,
    price: auxProperty.property.price,
    area: auxProperty.property.area,
    description: auxProperty.property.description,
  } );

  async function getPropertyTypes() {
    console.log( property );
    let response = await fetch( "http://192.168.1.9:80/api/property-types" );
    response = await response.json();
    setPropertyTypes( response.data );
  }

  useEffect( () => {
    // console.log(auxProperty)
    getPropertyTypes();
  }, [] );


  function updateProperty() {
    console.log( property );
    fetch( "http://192.168.1.9:80/api/property/update", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {
        propertyId: property.propertyId,
        title: property.title,
        idType: property.idType,
        address: property.address,
        rooms: property.rooms,
        price: property.price,
        area: property.area,
        description: property.description,
      } ),
    } ).then( ( response ) => {
      if (response.ok) {
        return response.json();
      } else {
        Alert.alert( "Error", "Error en la solicitud" );
      }
    } ).then( ( data ) => {
      console.log( data );
      if (data.message === "successful") {
        Alert.alert( "Info", "Registro guardado correctamente", [ {
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          },
        } ] );
      } else {
        Alert.alert( "Info", "Se presentaron inconsistencias en el proceso" );
      }
    } );
  }

  return <View style={ { flex: 1 } }>
        <Header
          leftComponent={ {
            icon: "arrow-back",
            color: "#FFF",
            onPress: () => {
              navigation.goBack();
            },
          } }
          rightComponent={ {
            icon: "menu",
            color: "#FFF",
            onPress: () => {
              toggleBottomSheet();
            },
          } }
          centerComponent={ {
            text: "Actualizando mi propiedad",
            style: {
              color: "#FFF",
            },
          } }
        />
        <View style={ {
          padding: 20,
        } }>
            <Text style={ RentingStyle.title }> Actualización </Text>
            <View style={ RentingStyle.rentingContainer }>
                <HeadingDescription headingText={ "Propiedad" } />
                <View style={ { paddingLeft: 20 } }>
                    <DescriptionWithInput
                      title={ "Título o nombre" }
                      content={
                        <TextInput
                          value={ property.title }
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
                          initValue={ auxProperty.property.type.type_name }
                          initValueTextStyle={ {
                            color: Colors.darkPrimary,
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
                          value={ property.address }
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
                          value={ property.rooms.toString() }
                          keyboardType={ "phone-pad" }
                          placeholder={ "# habitaciones" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ text => {
                            setProperty( prevState => ({
                              ...prevState,
                              rooms: text,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Precio por noche" }
                      content={
                        <TextInput
                          value={ property.price.toString() }
                          keyboardType={ "phone-pad" }
                          placeholder={ "Precio por noche" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ text => {
                            setProperty( prevState => ({
                              ...prevState,
                              price: text,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Área en metros cuadrados" }
                      content={
                        <TextInput
                          value={ property.area }
                          keyboardType={ "phone-pad" }
                          placeholder={ "Metros cuadrados" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ text => {
                            setProperty( prevState => ({
                              ...prevState,
                              area: text,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Descripción" }
                      content={
                        <TextInput
                          value={ property.description }
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
                  title={ "GUARDAR" }
                  onPress={ () => {
                    updateProperty();
                  } } />
            </View>
        </View>
    </View>;
};

export default EditProperty;
