import React from "react";
import { Text, Card } from "react-native-elements";
import CardStyle from "./CardStyle";
import { View } from "react-native";

const PropertyCard = ( props ) => {
  const { info } = props;

  return <Card containerStyle={ {
    borderWidth: 0.5,
    padding: 5,
    margin: 0,
  } }>
        <View style={ { flexDirection: "row" } }>
            <Card.Image containerStyle={ CardStyle.propertyImage } source={ require( "../../images/baseline_apartment_black_24.png" ) } resizeMode={ "contain" } />
            <View style={ CardStyle.propertyBody }>
                <Card.Title h4={ true } style={ CardStyle.propertyTitle }>{ info.property.title } </Card.Title>
                <View style={ CardStyle.propertyInfoText }>
                    <Text style={ CardStyle.propertyInfoTitle }>Ubicación: </Text>
                    <Text style={ CardStyle.propertyInfoBody }>{ info.property.address }</Text>
                </View>
                <View style={ CardStyle.propertyInfoText }>
                    <Text style={ CardStyle.propertyInfoTitle }>Habitaciones: </Text>
                    <Text> { info.property.rooms }</Text>
                </View>
                <View style={ CardStyle.propertyInfoText }>
                    <Text style={ CardStyle.propertyInfoTitle }>Tipo: </Text>
                    <Text>{ info.property.type.type_name }</Text>
                </View>
                <View style={ CardStyle.propertyInfoText }>
                    <Text style={ CardStyle.propertyInfoTitle }>Precio por noche: </Text>
                    <Text style={ CardStyle.propertyInfoBody }> $ { info.property.price }</Text>
                </View>
            </View>
        </View>
    { props.action }
    </Card>;
};

export default PropertyCard;
