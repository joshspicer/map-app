import React, { Component }  from 'react';
import _ from 'lodash';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput, TouchableOpacity,} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      isDetailedScreen: false,
      isCreateScreen: false,
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
    const { latitude, longitude, error, isDetailedScreen, isCreateScreen } = this.state;
    const latLng =  {latitude: latitude, longitude: longitude};

    if (isDetailedScreen) {
      return(
      <TouchableOpacity
          style={styles.container}
          onPress={() => this.setState({isDetailedScreen: false})}>
          <Text>DETAIL SCREEN</Text>
        </TouchableOpacity>
      );
    }

    if (isCreateScreen) {
      return(
      <TouchableOpacity
          style={styles.container}
          onPress={() => this.setState({isCreateScreen: false})}>
          <Text>CREATE SCREEN</Text>
        </TouchableOpacity>
      );
    }

    if (latitude != null || longitude != null) {
        return(
          <View style={styles.container}>
            <View style={styles.mapContainer}>
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
                      key={key}
                      coordinate={coords}
                      title={marker.name}
               />
             )})}

          </MapView>
        </View>
        <View style={styles.buttonRowStyle}>

          <TouchableOpacity onPress={() => this.setState({isCreateScreen: true})}>
          <Icon name="plus" size={70} color="#000" />
        </TouchableOpacity>

        </View>
      </View>);
      } else {
        console.log("loading");
        return <Text>{error ? error : "loading..."}</Text>
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
 mapContainer: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 buttonRowStyle: {
  flex: 1,
  justifyContent: 'flex-end',
  alignSelf: 'center',
  marginBottom: 35,
 },
});

export default App;
