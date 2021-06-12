import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { BottomSheet, Header, ListItem } from "react-native-elements";
import MessageListEmpty from "../../../shared/components/MessageListEmpty";
import MyBooking from "./MyBooking";

const MyBookings = ( { route, navigation } ) => {
  const { user } = route.params;
  const [ bookings, setBookings ] = useState( [] );
  const [ bookingsRefresh, setBookingRefresh ] = useState( false );
  const [ bottomSheet, setBottomSheet ] = useState( false );

  async function getBookings() {
    setBookingRefresh( true );
    let response = await fetch( "http://192.168.1.9:80/api/bookings/user/" + user.id );
    response = await response.json();
    setBookings( response.data );
    setBookingRefresh( false );
  }

  function toggleBottomSheet() {
    setBottomSheet( !bottomSheet );
  }

  useEffect( () => {
    getBookings();
  }, [] );

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
            text: "Mis reservas",
            style: {
              color: "#FFF",
            },
          } }
        />
        <View style={ {
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 20,
        } }>
            <FlatList
              scrollEnabled={ true }
              alwaysBounceVertical={ true }
              data={ bookings }
              refreshing={ bookingsRefresh }
              onRefresh={ () => {
                getBookings();
              } }
              keyExtractor={ ( bookin, index ) => index }
              ListEmptyComponent={
                <MessageListEmpty message={ "No tienes reservas" } titleButton={ "Quiero reservar" } goTo={ { name: "Properties", data: user } } />
              }
              renderItem={ ( { item } ) => <MyBooking booking={ item } /> } />
        </View>


        <BottomSheet
          modalProps={ { statusBarTranslucent: true } }
          isVisible={ bottomSheet }
          containerStyle={ { backgroundColor: "rgba(0.5, 0.25, 0, 0.5)" } }
        >
            <ListItem onPress={ () => {
              toggleBottomSheet();
              navigate( "NewBooking", { user: user } );
            } }>
                <ListItem.Content>
                    <ListItem.Title>
                        Quiero reservar una propiedad
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={ { backgroundColor: "red" } } onPress={ () => {
              toggleBottomSheet();
            } }>
                <ListItem.Content>
                    <ListItem.Title style={ { color: "#FFF" } }>
                        CANCELAR
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </BottomSheet>
    </View>;
};

export default MyBookings;
