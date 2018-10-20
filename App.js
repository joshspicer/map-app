import React, { Component }  from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import firebase from 'react-native-firebase';



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
   return(
     <View style={styles.container}>
     <MapView
       style={styles.map}
       region={{
         latitude: this.state.latitude || 0,
         longitude: this.state.longitude || 0,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
     <Text>Latitude: {this.state.latitude}</Text>
     <Text>Longitude: {this.state.longitude}</Text>
     {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
     <Text>

     </Text>
   </View>);
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
