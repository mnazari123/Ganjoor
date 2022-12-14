import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";

import * as SQLite from "expo-sqlite";
import RelicsHandler from "../dataHandler/RelicsHandler";

const db = SQLite.openDatabase("Ganjoor.db");

function DetailScreen({ route, navigation }) {
  const { itemId, ItemData } = route.params;

  const renderBioData = ({ item }) => {
    return (
      <View style={styles.PoetScetion}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>
        <Text style={styles.poetName}>{item.bio}</Text>
      </View>
    );
  };

  useEffect(() => {}, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.scrollContainer}></View>
      <Text style={styles.header}> زندگی نامه</Text>
      <View style={styles.listArea}>
        <FlatList
          horizontal
          data={ItemData}
          renderItem={renderBioData}
          key={(item) => item.id}
          style={styles.flatSection}
        />
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{}}
          style={{ paddingHorizontal: 15 }}
        >
          <View style={{ margin: 5 }}>
            <RelicsHandler ItemId={itemId} nav={navigation} />
          </View>
        </ScrollView>
      </View>
      <Text style={{ paddingTop: 20 }}></Text>
    </ScrollView>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  listArea: {
    flexDirection: "column",
    paddinTop: 0,
    flex: 1,
  },
  PoetScetion: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginBottom: 0,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  poetName: {
    alignSelf: "center",
    marginTop: 3,
  },
  poetPicture: {
    width: 100,
    height: 120,
    alignSelf: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 20,
    color: "#c03f2a",
  },
  flatSection: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "#c03f2a",
    paddingHorizontal: 10,
    paddingVertical: 3,
    margin: 3,
    borderRadius: 4,
    minWidth: 70,
    maxWidth: 150,
  },
  buttonText: {
    color: "#e1dbc6",
    fontWeight: "bold",
    alignSelf: "center",
  },
  poetRelic: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 5,
  },
  scrollContainer: {
    padding: 60,
    alignSelf: "center",
    backgroundColor: "lightblue",
    borderRadius: 100,
    marginTop: 40,
  },
});
