import React, { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import PropertyCard from "../../../shared/components/cards/PropertyCard";
import { BottomSheet, Button, Header, ListItem } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import MessageListEmpty from "../../../shared/components/MessageListEmpty";

const PropertiesScreen = ( { navigation } ) => {
  const [ properties, setProperties ] = useState();
  const [ refreshing, setRefreshing ] = useState( false );
  const [ bottomSheet, setBottomSheet ] = useState( false );
  const route = useRoute();

  const { user } = route.params;

  const getProperties = async () => {
    setRefreshing( true );
    let response = await fetch( "http://192.168.1.9:80/api/properties/owner/" + user.id );
    response = await response.json();
    setProperties( response.data );
    setRefreshing( false );
  };

  function toggleBottomSheet() {
    setBottomSheet( !bottomSheet );
  }

  useEffect( () => {
    getProperties();
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
          rightComponent={ {
            icon: "menu",
            color: "#FFF",
            onPress: () => {
              toggleBottomSheet();
            },
          } }
          centerComponent={ {
            text: "Mis propiedades",
            style: {
              color: "#FFF",
            },
          } }
        />
        <FlatList
          data={ properties }
          keyExtractor={ ( item, index ) => index.toString() }
          renderItem={ ( { item } ) => <PropertyCard
            info={ item }
            action={
              <View style={ {
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-around",
              } }>
                <Button
                  title={ "EDITAR" }
                  type={ "clear" }
                  onPressIn={ () => navigation.navigate( "EditProperty", { property: item } ) } />
                <Button
                  title={ "ELIMINAR" }
                  type={ "clear" }
                  onPressIn={ () => {
                    Alert.alert( "ELIMINAR PROPIEDAD", "¿Está seguro de eliminar esta propiedad?", [
                      {
                        text: "SÍ, ESTOY SEGURO",
                        onPress: () => {
                          console.log( item );
                          fetch( "http://192.168.1.9:80/api/property/delete/" + item.property.id, {
                            method: "DELETE",
                          } )
                            .then( ( response ) => {
                              if (response.ok) {
                                return response.json();
                              } else {
                                Alert.alert( "Info", "No se pudo procesar la solicitud" );
                              }
                            } ).then( ( data ) => {
                            if (data.message === "successful") {
                              Alert.alert( "Info", "Eliminación exitosa", [
                                {
                                  style: "default",
                                  onPress: () => {
                                    getProperties();
                                  },
                                },
                              ] );
                            } else {
                              Alert.alert( "Info", "No se pudo eliminar la propiedad" );
                            }
                          } );
                        },
                      },
                      {
                        text: "SÁCAME DE AQUÍ",
                        style: "cancel",
                      },
                    ] );
                  } }
                  titleStyle={ {
                    color: "#fc6464",
                  } } />
              </View>
            }
          /> }
          ListEmptyComponent={ <MessageListEmpty message={ "No hay propiedades" } titleButton={ "Quiero agregar una propiedad" } goTo={ { name: "NewProperty", data: user } } /> }
          alwaysBounceVertical={ true }
          refreshing={ refreshing }
          onRefresh={ () => {
            getProperties()
          } }
        />

        <BottomSheet
          modalProps={ { statusBarTranslucent: true } }
          isVisible={ bottomSheet }
          containerStyle={ { backgroundColor: "rgba(0.5, 0.25, 0, 0.5)" } }
        >
            <ListItem onPress={ () => {
              toggleBottomSheet();
              navigation.navigate( "NewProperty", { user: user } );
            } }>
                <ListItem.Content>
                    <ListItem.Title>
                        Agregar propiedad
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={ { backgroundColor: "red" } } onPress={ () => {
              toggleBottomSheet();
            } }>
                <ListItem.Content>
                    <ListItem.Title style={ { color: "#FFF" } }>
                        Cancelar
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </BottomSheet>
    </View>;
};

export default PropertiesScreen;
