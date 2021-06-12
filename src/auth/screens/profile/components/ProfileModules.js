import React from "react";
import { View, Text, ScrollView } from "react-native";
import ProfileModule from "./ProfileModule";

const ProfileModules = ( props ) => {
  const { user } = props;
  const modules = [
    {
      moduleName: "Mis reservas",
      iconName: "address-book",
      goTo: {
        name: "MyBookings",
        data: user,
      },
    },
    {
      moduleName: "Mis propiedades",
      iconName: "globe",
      goTo: {
        name: "MyProperties",
        data: user,
      },
    },
    {
      moduleName: "Solicitudes",
      iconName: "th-list",
      goTo: {
        name: "MyBookings",
        data: user,
      },
    },
    {
      moduleName: "Reseñas",
      iconName: "comments",
      goTo: {
        name: "MyBookings",
        data: user,
      },
    },
  ];

  return <ScrollView horizontal={ true } centerContent={ true }>
        <View style={ {
          display: "flex",
          flexDirection: "row",
        } }>
            {
              modules.map( ( item, index ) => {
                return <ProfileModule data={ item } key={ index } />;
              } )
            }
        </View>
    </ScrollView>;
};

export default ProfileModules;
