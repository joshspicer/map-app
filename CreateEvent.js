import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, TimePickerAndroid, DatePickerAndroid,} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';

class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('Events');

    this.state = {
          name: '',
          description: '',
          phone: '',
          date: '',
          selectedLatLng: null,
       }
  }

   handleName = (text) => {
      this.setState({name: text })
   }
   handleDescription = (text) => {
      this.setState({ description: text })
   }
   handlePhone = (number) => {
      this.setState({ phone: number })
   }


  uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
  }

  chosenCoords() {
    const { selectedLatLng } = this.state;
    if (selectedLatLng) {
      return selectedLatLng;
    } else {
      return null;
    }
  }

  recordUserPress(pos) {
    this.setState({selectedLatLng: pos.coordinate});
  }

  async selectTime() {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
     if (action !== TimePickerAndroid.dismissedAction) {
       // Selected hour (0-23), minute (0-59)
       let dateAndTime = this.state.date + " at " + hour + ":" + minute;
       this.setState({date: dateAndTime  })

     }
   } catch ({code, message}) {
     console.warn('Cannot open time picker', message);
   }
}

async selectDate() {
  try {
  const {action, year, month, day} = await DatePickerAndroid.open({
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
    date: new Date(2020, 4, 25)
  });
  if (action !== DatePickerAndroid.dismissedAction) {
    // Selected year, month (0-11), day
    let theDate = (month+1) + "/" + day + "/" + year;
    this.setState({date: theDate })
    this.selectTime();

  }
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
}



    // Sends this data to firebase
    async sendToFirebase() {

      const { name,description,phone,date,selectedLatLng } = this.state;



      if (!name || !description || !phone || /*!date* ||*/ !selectedLatLng) {
        alert("Please fill out all the fields!");
        return;
      }

      this.ref.doc(this.uuidv4()).set({
        name,
        date,
        latitude: selectedLatLng.latitude,
        longitude:  selectedLatLng.longitude,
        description,
        phone,
      }).then(() => this.props.onCancel())
    }


   render() {
     const { name,description,phone,date,selectedLatLng, } = this.state;

      return (
         <ScrollView style = {styles.container}>
           <View>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Description"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleDescription}/>


             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Phone"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handlePhone}/>

                <TouchableOpacity
                  onPress={() => this.selectDate()}
                style = {styles.timeButton}>
                <Text style ={styles.timeButtonText}> { date || "Select Date and Time" } </Text>
             </TouchableOpacity>
            </View>

                   <View style={styles.mapContainer}>
                     <MapView
                       onPress={(e) => {this.recordUserPress(e.nativeEvent)}}
                       style={styles.map}
                       region={{
                       latitude: selectedLatLng ? selectedLatLng.latitude : this.props.latitude,
                       longitude: selectedLatLng ? selectedLatLng.longitude : this.props.longitude,
                       latitudeDelta: 0.015,
                       longitudeDelta: 0.0121,
                     }}>
                     {this.chosenCoords() ?
                     <MapView.Marker
                          coordinate={this.chosenCoords()}
                          title={"Selected Location"}
                   /> : null}
                     </MapView>
                   </View>


        <View>
            <TouchableOpacity
              onPress={() => {
                this.sendToFirebase();
                }
              }
              style = {styles.submitButton}>
               <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.onCancel()}
            style = {styles.cancelButton}>
            <Text style ={styles.cancelButtonText}> Cancel </Text>
         </TouchableOpacity>
        </View>

      </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   mapContainer: {
     height: 200,
     width: '100%',
     justifyContent: 'flex-end',
     alignItems: 'center',
     alignSelf: 'center',
     margin: 15,
   },
   map: {
     ...StyleSheet.absoluteFillObject,
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 10,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   },
   cancelButton: {
      backgroundColor: 'red',
      padding: 10,
      margin: 10,
      height: 40,
   },
   cancelButtonText:{
      color: 'white'
   },
   timeButtonText: {
     color: 'white'
   },
   timeButton: {
      backgroundColor: 'gray',
      padding: 10,
      margin: 10,
      height: 40,
   },
});

export default CreateEvent;
