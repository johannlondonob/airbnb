import React, { useEffect, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { Button, Header, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RentingStyle from "../../../renting/components/RentingStyle";
import HeadingDescription from "../../../renting/components/HeadingDescription";
import DescriptionWithInput from "../../../renting/components/DescriptionWithInput";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";

const EditBooking = ( { route } ) => {
  const auxBooking = route.params.booking;
  const navigation = useNavigation();

  const [ booking, setBooking ] = useState( {
    bookingId: auxBooking.id_booking,
    userId: auxBooking.user.id,
    propertyId: auxBooking.property.id,
    checkIn: new Date( String( auxBooking.check_in ).substring( 0, 10 ) + "T00:00:00" ),
    checkOut: new Date( String( auxBooking.check_out ).substring( 0, 10 ) + "T00:00:00" ),
    guests: auxBooking.guests,
    vehicle: auxBooking.vehicle,
    children: auxBooking.children,
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

  function updateBooking() {
    fetch( "http://192.168.1.9:80/api/bookings/update", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {
        bookingId: booking.bookingId,
        userId: booking.userId,
        propertyId: booking.propertyId,
        checkIn: Moment( booking.checkIn ).format( "YYYY-MM-DD" ),
        checkOut: Moment( booking.checkOut ).format( "YYYY-MM-DD" ),
        guests: booking.guests,
        vehicle: booking.vehicle,
        children: booking.children,
      } ),
    } ).then( ( response ) => {
      if (response.ok) {
        return response.json();
      } else {
        Alert.alert( "Error", "Error en la solicitud" );
      }
    } ).then( ( data ) => {
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
          centerComponent={ {
            text: "Actualizando mi reserva",
            style: {
              color: "#FFF",
            },
          } }
        />
        <View style={ {
          padding: 20,
        } }>
            <Text style={ RentingStyle.title }> Actualizaci??n </Text>

            <View style={ RentingStyle.rentingContainer }>
                <HeadingDescription headingText={ "Reserva" } />
                <View style={ { paddingLeft: 20 } }>
                    <DescriptionWithInput
                      title={ "N??mero de hu??spedes" }
                      content={
                        <TextInput
                          value={ booking.guests.toString() }
                          keyboardType={ "phone-pad" }
                          placeholder={ "N??mero de hu??spedes" }
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
                      title={ "Cantidad de ni??xs" }
                      content={
                        <TextInput
                          value={ booking.children.toString() }
                          keyboardType={ "phone-pad" }
                          placeholder={ "Cantidad de ni??xs" }
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
                      title={ "N??mero de veh??culos" }
                      content={
                        <TextInput
                          value={ booking.vehicle.toString() }
                          keyboardType={ "phone-pad" }
                          placeholder={ "N??mero de veh??culos" }
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
                  title={ "GUARDAR" }
                  onPress={ () => {
                    updateBooking();
                  } } />
            </View>
        </View>
    </View>;
};

export default EditBooking;
