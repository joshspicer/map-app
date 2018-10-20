import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
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
          latitude: null,
          longitude: null,
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

  handleDate = (date) => {
       this.setState({ date: date })
  }

  isDisabled() {
    const { name,description,creatorPhone,date, latitude, longitude } = this.state;
    return (name == '') && (description == '') && !latitude && !longitude;
  }

  uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



    // Sends this data to firebase
    async sendToFirebase(name,description,creatorPhone,date) {

      this.ref.doc(this.uuidv4()).set({
        name,
        date: "2018-10-21T01:01:29Z",
        latitude: 41.3889301,
        longitude: 2.1170454,
        description,
        creatorPhone
      }).then(() => this.props.onCancel())
    }


   render() {
     const { name,description,creatorPhone,date } = this.state;

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
               onChangeText = {this.handleDesciption}/>


             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Phone"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handlePhone}/>

                <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = "date"
                   placeholderTextColor = "#9a73ef"
                   autoCapitalize = "none"
                   onChangeText = {this.handleDate}/>
            </View>

                   <View style={styles.mapContainer}>
                     <MapView
                       style={styles.map}
                       region={{
                       latitude: this.props.latitude,
                       longitude: this.props.longitude,
                       latitudeDelta: 0.015,
                       longitudeDelta: 0.0121,
                     }}/>
                   </View>


        <View>
            <TouchableOpacity
              disabled={this.isDisabled()}
              onPress={() => {
                this.sendToFirebase(name,description,creatorPhone,date);
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
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   mapContainer: {
     ...StyleSheet.absoluteFillObject,
     height: 400,
     width: 400,
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   },
   cancelButton: {
      backgroundColor: 'red',
      padding: 10,
      margin: 15,
      height: 40,
   },
   cancelButtonText:{
      color: 'white'
   }
});

export default CreateEvent;
