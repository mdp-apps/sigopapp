import { Dimensions } from "react-native";

import { useReqLocation } from "../hooks";

import MapView, { Marker } from "react-native-maps";
import { TARGET_LATITUDE, TARGET_LONGITUDE } from "@/config/constants";

const { width, height } = Dimensions.get("window");

export const PortAreaMap = () => {
  const { location, lastUpdated } = useReqLocation();

  return (
    location && (
      <MapView
        style={{
          width: width,
          height: height * 0.5,
        }}
        initialRegion={{
          latitude: TARGET_LATITUDE,
          longitude: TARGET_LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        mapType="satellite"
      >
        <Marker
          coordinate={{
            latitude: -36.740021,
            longitude: -73.00702,
          }}
          pinColor="#ff8800" /*337AB7*/
          title="Portería Sur"
          description="Entrada peatonal"
        />

        <Marker
          coordinate={{
            latitude: -36.738797,
            longitude: -73.005283,
          }}
          pinColor="#ff8800" /*337AB7*/
          title="Portería Norte"
          description="Entrada camiones"
        />

        <Marker
          coordinate={{
            latitude: -36.738014,
            longitude: -73.005471,
          }}
          pinColor="#1687a7" /*337AB7*/
          title="Romana Norte"
          description="Pesaje de camiones"
        />

        <Marker
          coordinate={{
            latitude: -36.740157,
            longitude: -73.010341,
          }}
          pinColor="#1687a7" /*337AB7*/
          title="Romana Catamutun"
          description="Pesaje de camiones"
        />

        <Marker
          coordinate={{
            latitude: -36.739836,
            longitude: -73.007275,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 1"
        />

        <Marker
          coordinate={{
            latitude: -36.739708,
            longitude: -73.007716,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 2A"
        />

        <Marker
          coordinate={{
            latitude: -36.739144,
            longitude: -73.007662,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 2B"
        />

        <Marker
          coordinate={{
            latitude: -36.738805,
            longitude: -73.007619,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 2C"
        />

        <Marker
          coordinate={{
            latitude: -36.739711,
            longitude: -73.007888,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 3S"
        />

        <Marker
          coordinate={{
            latitude: -36.739019,
            longitude: -73.007851,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 3N"
        />

        <Marker
          coordinate={{
            latitude: -36.740108,
            longitude: -73.00788,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 5"
        />

        <Marker
          coordinate={{
            latitude: -36.740727,
            longitude: -73.008427,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 6"
        />

        <Marker
          coordinate={{
            latitude: -36.738445,
            longitude: -73.007318,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 7"
        />

        <Marker
          coordinate={{
            latitude: -36.738482,
            longitude: -73.008377,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 8"
        />

        <Marker
          coordinate={{
            latitude: -36.73849,
            longitude: -73.008892,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 9"
        />

        <Marker
          coordinate={{
            latitude: -36.738651,
            longitude: -73.006735,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 10"
        />

        <Marker
          coordinate={{
            latitude: -36.73863,
            longitude: -73.006355,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 11"
        />

        <Marker
          coordinate={{
            latitude: -36.739963,
            longitude: -73.009092,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 12"
        />

        <Marker
          coordinate={{
            latitude: -36.73995,
            longitude: -73.009828,
          }}
          pinColor="#88ff00" /*337AB7*/
          title="Bodega 13"
        />

        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Posición actual"
          description={`Actualización: ${
            lastUpdated ? lastUpdated.toLocaleString() : "N/A"
          }`}
        />
      </MapView>
    )
  );
};

