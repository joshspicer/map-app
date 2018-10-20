import React, { Component }  from 'react';
import _ from 'lodash';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
<<<<<<< HEAD
import MapView from 'react-native-maps';
import firebase from 'react-native-firebase';

=======
import MapView, { Marker } from 'react-native-maps';
>>>>>>> 63ea226ae775fa962f40557ee4929730b5ee9ea4

const fakeData = [
  {name:"Play Football", date: "2018-10-21T01:01:29Z",latitude:41.3899301, longitude:2.1130454,description:"this is a test 1",creatorPhone:123456789},
  {name:"Ukelele Jam Session", date: "2018-10-21T01:01:29Z",latitude:41.3889301, longitude:2.1130454,description:"this is a test 2",creatorPhone:54321}]

class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    // Gets the current location and stores it in state.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
    );
  }


  render() {
    const { latitude, longitude } = this.state;
    const latLng =  {latitude: latitude, longitude: longitude};

    if (latitude != null || longitude != null) {
        return(
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>

            {fakeData.map((marker,key) => {
              const coords = {latitude: marker.latitude, longitude: marker.longitude}
               return(
                 <MapView.Marker
                      coordinate={coords}
                      title={marker.name}
               />
             )})}

          </MapView>
        </View>);
      } else {
        console.log("loading");
        return <Text>loading...</Text>
      }
    }
}

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});
var config = {
    databaseURL: "https://map-app-b4ce8.firebaseio.com/",
    projectId: "map-app",
};
firebase.initializeApp(config);

const {app}= firebase.storage();
console.log(app.name);
export default () => (
   <View style={styles.container}>
     <MapView
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>

   </View>
);
export default App;
