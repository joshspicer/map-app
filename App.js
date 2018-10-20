import React, { Component }  from 'react';
import _ from 'lodash';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput, TouchableOpacity,} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    };
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevState.events != this.state.events) {
  //     Marker.redraw();
  //   }
  // }


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
  }

  onCancel() {
    this.setState({isCreateScreen: false})
  }

  openDetails(id) {
    const evt = _.find(this.state.events, function(evt) { return evt.id === id; });
    console.log(evt);
    if (evt) {
      this.setState({selectedEvent: evt});
      this.setState({isDetailedScreen: true});
    }
  }


getAllEvents() {
    // let events = [];
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

      // console.log(events)
      // this.setState({events});
  }


  // async set() {
  //     this.ref.doc("56789").set({
  //       name: "Ukelele Jam Session",
  //       date: "2018-10-21T01:01:29Z",
  //       latitude: "41.3889301",
  //       longitude: "2.1130454",
  //       description: "this is a test 2",
  //       creatorPhone: 54321
  //     });
  //   }


  render() {
    const { latitude, longitude, error, isDetailedScreen, isCreateScreen, events } = this.state;
    const latLng =  {latitude: latitude, longitude: longitude};
    // this.set();

      if (latitude == null || longitude == null || events == []) {
        console.log("loading");
        return <Text>{error ? error : "loading..."}</Text>
      }

      console.log(events)
      // console.log(fakeData)
      // console.log(events[0])

    if (isDetailedScreen) {
      const evtTitle = _.get(this.state, 'selectedEvent.name');
      console.log(evtTitle);
      const evtDesc = _.get(this.state, 'selectedEvent.description');
      console.log(evtDesc);
      const evtDate = _.get(this.state, 'selectedEvent.date');
      console.log(evtDate);
      if (evtTitle && evtDesc && evtDate) {
        return <Event title={evtTitle} desc={evtDesc} date={evtDate} /> ;
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
                style={styles.map}
                region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>

            {events.map((marker,key) => {
              console.log("!!!");
              const coords = {latitude: marker.latitude, longitude: marker.longitude}
               return(
                 <MapView.Marker
                      identifier={marker.id}
                      onPress={e => this.openDetails(e.nativeEvent.id)}
                      key={key}
                      coordinate={coords}
                      title={marker.name}
               />
             )})}

          </MapView>
        </View>
        <View style={styles.buttonRowStyle}>

          <TouchableOpacity onPress={() => this.setState({isCreateScreen: true})}>
          <Icon name="plus" size={70} color="#9a73ef" />
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
