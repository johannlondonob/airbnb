import React from "react";
import { Alert, Text, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import RentingStyle from "../../../renting/components/RentingStyle";
import { useNavigation } from "@react-navigation/native";

const MyBooking = ( props ) => {
  const { booking } = props;
  const navigation = useNavigation();

  async function deleteBooking( idBooking ) {
    let response = await fetch( "http://192.168.1.9:80/api/bookings/delete/" + idBooking, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Accept": "application/json",
      },
    } );
    Alert.alert( "Info", "Se ha cancelado la reserva. Recuerda actualizar tu lista de reservas.", [ { text: "Actualizar lista" } ] );
    return await response.json();
  }

  async function deletePermanentBooking( idBooking ) {
    let response = await fetch( "http://192.168.1.9:80/api/bookings/delete-permanent/" + idBooking, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Accept": "application/json",
      },
    } );
    Alert.alert( "Info", "Se ha eliminado la reserva. Recuerda actualizar tu lista de reservas.", [ { text: "Actualizar lista" } ] );
    return await response.json();
  }

  const isBooked = booking.booked === "S";

  return <View style={ {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    marginBottom: 20,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: isBooked ? "#ededed" : "#fce7e7",
    borderColor: isBooked ? "#ddd" : "#fcd3d3",
  } }>
        <Text style={ {
          fontWeight: "bold",
          marginBottom: 7,
        } }> { booking.property.title } </Text>
        <View style={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        } }>
            <Text> Fecha entrada: </Text>
            <Text
              style={ {
                fontWeight: "bold",
                color: "#05b36b",
              } }> { booking.check_in }
            </Text>
        </View>
        <View style={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        } }>
            <Text> Fecha salida: </Text>
            <Text
              style={ {
                fontWeight: "bold",
                color: "#d9ab05",
              } }> { booking.check_out }
            </Text>
        </View>
        <View style={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        } }>
            <Text> Dirección: </Text>
            <Text> { booking.property.address }
            </Text>
        </View>
        <Divider style={ RentingStyle.divider } />
        <View style={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        } }>
            <Text>Número de huéspedes: </Text>
            <Text> { booking.guests > 0 ? booking.guests : "Sin invitados" } </Text>
        </View>
        <View style={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        } }>
            <Text>Número de niñxs: </Text>
            <Text>{ booking.children > 0 ? booking.children : "Sin niñxs" } </Text>
        </View>
        <View style={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        } }>
            <Text>Número de vehículos: </Text>
            <Text> { booking.vehicle > 0 ? booking.vehicle : "Sin vehículo" } </Text>
        </View>
        <Divider style={ RentingStyle.divider } />
        <View style={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 10,
        } }>
            <Button
              onPress={ () => navigation.navigate( "EditBooking", { booking: booking } ) }
              title={ "EDITAR" }
              type={ "clear" }
              titleStyle={ {
                color: "#64a1fc",
              } } />
          {
            !isBooked ? (
              <Button
                onPress={ () => deletePermanentBooking( booking.id_booking ) }
                title={ "ELIMINAR" }
                type={ "clear" }
                titleStyle={ {
                  color: "#fc6464",
                } } />
            ) : (
              <Button
                onPress={ () => deleteBooking( booking.id_booking ) }
                title={ "CANCELAR" } type={ "clear" } titleStyle={ {
                color: "#adadad",
              } } />
            )
          }
        </View>
    </View>;
};

export default MyBooking;
