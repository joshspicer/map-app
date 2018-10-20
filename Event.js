import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView,
  BackHandler,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


class Event extends Component {

  componentDidMount() {
   this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
     this.props.onCancel(); // works best when the goBack is async
     return true;
   });
 }

 componentWillUnmount() {
   this.backHandler.remove();
 }

  render() {
    const { title, desc, date, onCancel } = this.props;
    return(
    <ScrollView style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      <Text style={styles.description}> {desc}</Text>
      <Text style={styles.dateStyle}> The Event Starts at: {date} </Text>
      <Text onPress={() => this.props.onCancel()}> Go back </Text>
    </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  title: {
    fontSize: 36,
    margin: 20,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  description: {
    fontSize: 24,
    margin: 20,
    alignSelf: "flex-start",
  },
  dateStyle: {
    fontSize: 18,
    margin: 20,
    alignSelf: "flex-start",
    color: "#32CD32"
  },
});
export default Event;
