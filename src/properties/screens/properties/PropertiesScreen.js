import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import PropertyCard from "../../../shared/components/cards/PropertyCard";
import { Button, Overlay, Divider, SpeedDial, Header, BottomSheet, ListItem } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import MessageListEmpty from "../../../shared/components/MessageListEmpty";
import RentingStyle from "../../../renting/components/RentingStyle";
import HeadingDescription from "../../../renting/components/HeadingDescription";
import Description from "../../../renting/components/Description";

const PropertiesScreen = ( { navigation: { navigate } } ) => {
  const [ properties, setProperties ] = useState();
  const [ property, setProperty ] = useState( null );
  const [ overlay = false, setOverlay ] = useState();
  const [ refreshing, setRefreshing ] = useState( false );
  const [ bottomSheet, setBottomSheet ] = useState( false );
  const route = useRoute();

  const { user } = route.params;

  const getProperties = async () => {
    setRefreshing( true );
    try {
      let response = await fetch( "http://192.168.1.9:80/api/properties" );
      response = await response.json();
      setProperties( response.data );
      setRefreshing( false );
    } catch (e) {
      setRefreshing( false );
      Alert.alert( "Info", "Problema con la red" );
    }

  };

  function showProperty( item ) {
    setProperty( item );
    toggleOverlay();
  }

  function toggleOverlay() {
    setOverlay( !overlay );
  }

  function toggleBottomSheet() {
    setBottomSheet( !bottomSheet );
  }

  useEffect( () => {
    getProperties();
  }, [] );

  return <View style={ { flex: 1, padding: 0 } }>
        <Header
          leftComponent={ {
            icon: "menu",
            color: "#FFF",
            onPress: () => {
              toggleBottomSheet();
            },
          } }
          centerComponent={ {
            text: "Propiedades",
            style: {
              color: "#FFF",
            },
          } }
          rightComponent={ {
            icon: "home",
            color: "#FFF",
          } }
        />
        <FlatList
          contentContainerStyle={ {
            padding: 0,
          } }
          data={ properties }
          keyExtractor={ ( item, index ) => index.toString() }
          renderItem={ ( { item } ) => <PropertyCard
            info={ item }
            action={ <Button type={ "clear" } title={ "VER PROPIEDAD" } onPressIn={ () => showProperty( item ) } /> }
          /> }
          ListEmptyComponent={ <MessageListEmpty message={ "No hay propiedades" } titleButton={ "QUIERO AGREGAR UNA PROPIEDAD" } goTo={ { name: "NewProperty", data: user } } /> }
          alwaysBounceVertical={ true }
          refreshing={ refreshing }
          onRefresh={ () => {
            getProperties().then( () => {
              if (properties.length <= 0) {
                Alert.alert( "Info", "No se encontraron propiedades" );
              }
            } );
          } }
        />

        <BottomSheet
          modalProps={ { statusBarTranslucent: true } }
          isVisible={ bottomSheet }
          containerStyle={ { backgroundColor: "rgba(0.5, 0.25, 0, 0.5)" } }
        >
            <ListItem onPress={ () => {
              toggleBottomSheet();
              navigate( "Profile", { user: route.params.user } );
            } }>
                <ListItem.Content>
                    <ListItem.Title>
                        Mi perfil
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

        <Overlay isVisible={ overlay } onBackdropPress={ toggleOverlay } animationType={ "slide" } statusBarTranslucent={ true }>
            <View style={ { minWidth: "90%", padding: 5 } }>
                <View style={ { paddingHorizontal: 5 } }><Text style={ RentingStyle.title }>Detalles</Text></View>
                <View style={ RentingStyle.rentingContainer }>
                    <HeadingDescription headingText={ "Propiedad" } />
                    <View style={ { paddingLeft: 20 } }>
                        <Description title={ "Nombre" } content={ property ? property.property.title : "" } />
                        <Description title={ "Dirección" } content={ property ? property.property.address : "" } />
                        <Description title={ "Tipo" } content={ property ? property.property.type.type_name : "" } />
                        <Description title={ "Área" } content={ property ? property.property.area + " metros cuadrados" : "" } />
                        <Description title={ "Habitaciones" } content={ property ? property.property.rooms : "" } />
                        <Description title={ "Descripción" } content={ property ? property.property.description : "" } />
                        <Description title={ "Valor por noche" } content={ property ? "$ " + property.property.price : "" } />
                    </View>
                    <Divider style={ RentingStyle.divider } />
                    <HeadingDescription headingText={ "Contacto" } />
                    <View style={ { paddingLeft: 20 } }>
                        <Description title={ "Nombre" } content={ property ? property.owner.name : "" } />
                        <Description title={ "Email" } content={ property ? property.owner.email : "" } />
                    </View>
                </View>
                <View style={ { marginTop: 20, marginBottom: 5 } }>
                    <Button title={ "ALQUILAR PROPIEDAD" } onPress={ () => {
                      toggleOverlay();
                      navigate( "Renting", { property: property, user: user } );
                    } } />
                </View>
            </View>
        </Overlay>
    </View>;
};

export default PropertiesScreen;
