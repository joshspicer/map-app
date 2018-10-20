import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView
} from "react-native";

class Event extends Component {

  render() {
    const { title, desc, date } = this.props;
    return(
    <ScrollView style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      <Text style={styles.description}> {desc}</Text>
      <Text style={styles.starttimestyle}> The Event Starts at: {date} </Text>
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
    fontSize: 22,
    margin: 30,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  description: {
    fontSize: 16,
    padding: 15,
    margin: 30,
    alignSelf: "flex-start",
    color: "#D3D3D3"
  },
  starttimestyle: {
    fontSize: 14,
    padding: 10,
    margin: 20,
    alignSelf: "flex-start",
    color: "#32CD32"
  },
  endtimestyle: {
    fontSize: 14,
    padding: 10,
    margin: 20,
    alignSelf: "flex-start",
    color: "#FF0000"
  }
});
export default Event;
