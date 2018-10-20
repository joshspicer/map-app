import React, { Component }  from 'react';
import _ from 'lodash';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput, TouchableOpacity, BackHandler} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Event from './Event';
import CreateEvent from './CreateEvent';
import firebase from 'react-native-firebase';


class App extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('Events');

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      isDetailedScreen: false,
      isCreateScreen: false,
      events: [],
      selectedEvent: null,
      needReload: false,
    };
  }

  componentDidMount() {
    // Gets the current location and stores it in state.
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message })
    );

    this.getAllEvents();


    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  onCancel(evt) {
    this.setState({isCreateScreen: false});
    this.setState({isDetailedScreen: false});
    if (evt) {
      this.setState({events: this.state.events.concat([evt])});
    }
  }

  openDetails() {
    if (this.state.selectedEvent) {
      this.setState({isDetailedScreen: true});
    }
  }

  storeDetails(id) {
    const evt = _.find(this.state.events, function(evt) { return evt.id === id; });
    this.setState({selectedEvent: evt});
  }


getAllEvents() {
    this.ref.get()
        .then(out => {
          console.log(out);
          _.map(out._docs, doc  => {
            const { name, date, latitude, longitude, creatorPhone, description} = _.get(doc, '_data');
            const id = _.get(doc,'_ref._documentPath._parts[1]');
            const tmp = {id,name, date, latitude, longitude, creatorPhone, description};
            this.setState({events: this.state.events.concat([tmp])});

          })
        })
      .catch(err => console.log(err));
  }




  render() {
    const { latitude, longitude, error, isDetailedScreen, isCreateScreen, events, needReload } = this.state;
    const latLng =  {latitude: latitude, longitude: longitude};
    // this.set();

      if (latitude == null || longitude == null || events == []) {
        console.log("loading");
        return <Text>{error ? error : "loading..."}</Text>
      }

      if (needReload) {
        this.setState({needReload: false});
        this.getAllEvents();

      }

    if (isDetailedScreen) {
      const evtTitle = _.get(this.state, 'selectedEvent.name');
      const evtDesc = _.get(this.state, 'selectedEvent.description');
      const evtDate = _.get(this.state, 'selectedEvent.date');
      if (evtTitle && evtDesc && evtDate) {
        return <Event
          onCancel={() => this.onCancel()}
          title={evtTitle} desc={evtDesc} date={evtDate} /> ;
      }
    }

    if (isCreateScreen) {
      return <CreateEvent
                onCancel={() => this.onCancel()}
                latitude={this.state.latitude}
                longitude={this.state.longitude} /> ;
    }

      return(
          <View style={styles.container}>
            <View style={styles.mapContainer}>
              <MapView
                showsUserLocation={true}
                style={styles.map}
                region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>

            {events.map((marker,key) => {
              const coords = {latitude: marker.latitude, longitude: marker.longitude}
               return(
                 <MapView.Marker
                      identifier={marker.id}
                      onPress={e => this.storeDetails(e.nativeEvent.id)}
                      onCalloutPress={() => this.openDetails()}
                      key={key}
                      coordinate={coords}
                      title={marker.name} >
                  </MapView.Marker>
             )})}
           </MapView>
           </View>

        <View style={styles.buttonRowStyle}>

          <TouchableOpacity onPress={() => this.setState({isCreateScreen: true})}>
          <Icon name="add-location" size={70} color="#9a73ef" />
        </TouchableOpacity>

        </View>
      </View>);
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
   height: '100%',
   width: '100%',
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
 plainView: {
   width: 60,
 },
});

export default App;
