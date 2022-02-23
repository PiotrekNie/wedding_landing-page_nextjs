import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styled, { StyledComponent } from "styled-components";
import COLORS from "../colors";

/**
 * Images
 */
// import Icon from "images/marker_wedding.svg";

const MapContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  box-shadow: -34px 34px 46px rgba(${COLORS.gray[800]}, 0.34), -51px 41px 0 ${COLORS.yellow};
`;

const containerStyle: { width: string; height: string } = {
  width: "100%",
  height: "507px",
};

const center: { lat: number; lng: number } = {
  lat: 51.2888875,
  lng: 17.9094308,
};

const styles: google.maps.MapTypeStyle[] | null | undefined = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#e9e9e9",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#00aaff",
      },
      {
        lightness: 80,
      },
    ],
  },
  {
    stylers: [
      {
        hue: "#00aaff",
      },
      {
        saturation: -80,
      },
      {
        gamma: 1,
      },
      {
        lightness: 12,
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
        color: "#ffffff",
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
        color: "#ffffff",
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
        color: "#ffffff",
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
        color: "#ffffff",
      },
      {
        lightness: 16,
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
        color: "#ffffff",
      },
      {
        lightness: 16,
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
        color: "#3e4852",
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
];

// const onLoad = (marker: any) => {
//   console.log("marker: ", marker);
// };

function Map() {
  return (
    <MapContainer>
      <LoadScript googleMapsApiKey='AIzaSyCrvvUQqeJYgEv_lpakC_PAZPKCjbAT57Y'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{ styles }}>
          <Marker position={center} icon='images/marker_wedding.svg' />
          {/* Child components, such as markers, info windows, etc. */}
          {/* <></> */}
        </GoogleMap>
      </LoadScript>
    </MapContainer>
  );
}

export default Map;
