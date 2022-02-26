import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styled, { StyledComponent } from "styled-components";
import { useMediaQuery } from "react-responsive";
import tw from "twin.macro";
import SCREENS from "../../../components/screens";

/**
 * Images
 */
// import Icon from "images/marker_wedding.svg";

const MapContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    shadow-xl
  `}
`;

const center: { lat: number; lng: number } = {
  lat: 52.3737603,
  lng: 22.0601653,
};

const marker1: { lat: number; lng: number } = {
  lat: 52.3747729,
  lng: 22.0600774,
};

const marker2: { lat: number; lng: number } = {
  lat: 52.3734603,
  lng: 22.0656,
};

const styles: google.maps.MapTypeStyle[] | null | undefined = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#a8bbcc",
      },
      {
        lightness: 50,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f2ea",
      },
      {
        lightness: 30,
      },
    ],
  },
  {
    stylers: [
      {
        saturation: 0,
      },
      {
        gamma: 1,
      },
      {
        lightness: 6,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#a7a7a7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dad8cd",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dad8cd",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#dad8cd",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#dad8cd",
      },
      {
        lightness: 50,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#093a6a",
      },
      {
        lightness: 80,
      },
      {
        saturation: -80,
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#f1f0ea",
      },
      {
        lightness: 30,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#bab6a4",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
      {
        hue: "#3e4852",
      },
      {
        lightness: 30,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2f2f2",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dddddd",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

// const onLoad = (marker: any) => {
//   console.log("marker: ", marker);
// };

function Map() {
  const isDesktop: boolean = useMediaQuery({ minWidth: SCREENS.md });

  const containerStyle: { width: string; height: string } = {
    width: "100%",
    height: isDesktop ? "507px" : "300px",
  };

  return (
    <MapContainer>
      <LoadScript googleMapsApiKey='AIzaSyCrvvUQqeJYgEv_lpakC_PAZPKCjbAT57Y'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{ styles }}>
          <Marker position={marker1} icon='images/marker_wedding.svg' />
          <Marker position={marker2} icon='images/marker-party.svg' />
        </GoogleMap>
      </LoadScript>
    </MapContainer>
  );
}

export default Map;
