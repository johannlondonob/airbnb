import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Divider, Header } from "react-native-elements";
import Description from "../../components/Description";
import HeadingDescription from "../../components/HeadingDescription";
import DescriptionWithInput from "../../components/DescriptionWithInput";
import RentingStyle from "../../components/RentingStyle";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";

const RentingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { property } = route.params;
  const { user } = route.params;
  const [ booking, setBooking ] = useState( {
    userId: user.id,
    propertyId: property.property.id,
    checkIn: new Date(),
    checkOut: new Date(),
    guests: null,
    vehicle: null,
    children: null,
  } );
  const [ showEndDate, setShowEndDate ] = useState( false );
  const [ showStartDate, setShowStartDate ] = useState( false );

  function onChangeCheckIn( event, selectedDate ) {
    const currentDate = selectedDate || booking.checkIn;
    setBooking( prevState => ({
      ...prevState,
      checkIn: currentDate,
    }) );
    setShowStartDate( false );
  }

  function onChangeCheckOut( event, selectedDate ) {
    const currentDate = selectedDate || booking.checkOut;
    setBooking( prevState => ({
      ...prevState,
      checkOut: currentDate,
    }) );
    setShowEndDate( false );
  }

  function registerNewBookig() {
    if (booking.checkIn === "" && booking.checkOut === "" && booking.guests === null && booking.vehicle == null && booking.children == null) {
      Alert.alert( "Info", "Todos los campos son obligatorios" );
    } else {
      fetch( "http://192.168.1.9:80/api/bookings/create", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {
          userId: booking.userId,
          propertyId: booking.propertyId,
          checkIn: Moment( booking.checkIn ).format( "YYYY-MM-DD" ),
          checkOut: Moment( booking.checkOut ).format( "YYYY-MM-DD" ),
          guests: booking.guests,
          vehicle: booking.vehicle,
          children: booking.children,
        } ),
      } ).then( ( res ) => {
        if (res.ok) {
          return res.json();
        } else {
          Alert.alert( "Error", "Error al reservar la propiedad" );
        }
      } ).then( ( res ) => {
        if (res.message === "error") {
          Alert.alert( "Info", "Se presentaron inconsistencias al reservar la propiedad" );
        } else {
          Alert.alert( "Info", "Propiedad reservada correctamente", [ {
            style: "default", text: "Great", onPress: () => {
              if (navigation.canGoBack()) {
                navigation.navigate( "MyBookings", { user: user } );
              }
            },
          } ] );
        }
      } );
    }
  }

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
            text: "Alquilando propiedad",
            style: {
              color: "#FFF",
            },
          } }
        />
        <View style={ {
          padding: 20,
        } }>
            <Text style={ RentingStyle.title }> Renta de propiedad </Text>

            <View style={ RentingStyle.rentingContainer }>
                <HeadingDescription headingText={ "Propiedad" } />
                <View style={ { paddingLeft: 20 } }>
                    <Description title={ "Nombre" } content={ property.property.title } />
                    <Description title={ "Dirección" } content={ property.property.address } />
                    <Description title={ "Habitaciones" } content={ property.property.rooms } />
                    <Description title={ "Área" } content={ property.property.area + " metros cuadrados" } />
                    <Description title={ "Valor por noche" } content={ property.property.price } />
                </View>
                <Divider style={ RentingStyle.divider } />
                <HeadingDescription headingText={ "Huésped" } />
                <View style={ { paddingLeft: 20 } }>
                    <Description title={ "Nombres y apellidos" } content={ user.name + " " + user.lastname } />
                    <Description title={ "Número de identificación" } content={ user.identification } />
                    <Description title={ "Correo electrónico" } content={ user.email } />
                </View>
                <Divider style={ RentingStyle.divider } />
                <HeadingDescription headingText={ "Datos reserva" } />
                <View style={ { paddingLeft: 20 } }>
                    <DescriptionWithInput
                      title={ "Número de huéspedes" }
                      content={
                        <TextInput
                          keyboardType={ "phone-pad" }
                          placeholder={ "Número de huéspedes" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ ( text ) => {
                            setBooking( prevState => ({
                              ...prevState,
                              guests: text,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Cantidad de niñxs" }
                      content={
                        <TextInput
                          keyboardType={ "phone-pad" }
                          placeholder={ "Cantidad de niñxs" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ ( text ) => {
                            setBooking( prevState => ({
                              ...prevState,
                              children: text,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Número de vehículos" }
                      content={
                        <TextInput
                          keyboardType={ "phone-pad" }
                          placeholder={ "Número de vehículos" }
                          placeholderTextColor={ "#aaa" }
                          style={ RentingStyle.descriptionWithInputDefault }
                          onChangeText={ ( text ) => {
                            setBooking( prevState => ({
                              ...prevState,
                              vehicle: text,
                            }) );
                          } }
                        />
                      } />
                    <DescriptionWithInput
                      title={ "Fecha llegada" }
                      content={
                        <View>
                                <Button
                                  buttonStyle={ {
                                    display: "flex",
                                    width: 130,
                                    paddingVertical: 0,

                                  } }
                                  title={ booking.checkIn.toDateString() }
                                  onPress={ () => {
                                    setShowStartDate( true );
                                  } } />
                          {
                            showStartDate && (
                              <RNDateTimePicker value={ booking.checkIn } onChange={ onChangeCheckIn } display={ "default" } />
                            )
                          }
                            </View>
                      }
                    />
                    <DescriptionWithInput
                      title={ "Fecha salida" }
                      content={
                        <View>
                                <Button
                                  buttonStyle={ {
                                    display: "flex",
                                    width: 130,
                                    paddingVertical: 0,

                                  } }
                                  title={ booking.checkOut.toDateString() }
                                  onPress={ () => {
                                    setShowEndDate( true );
                                  } } />
                          {
                            showEndDate && (
                              <RNDateTimePicker value={ booking.checkOut } onChange={ onChangeCheckOut } display={ "default" } />
                            )
                          }
                            </View>
                      }
                    />
                </View>
            </View>
            <View style={ { marginVertical: 30 } }>
                <Button
                  title={ "RESERVAR" }
                  onPress={ () => {
                    registerNewBookig();
                  } } />
            </View>
        </View>
    </View>;
};

export default RentingScreen;
