import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import GetData from "./GetData";
import RenderData from "./RenderData";

//const db = SQLite.openDatabase("Ganjoor.db");
function Home({ navigation }) {
  const data = <GetData />;
  if (data == null || data == "") {
    console.log("Null Data");
  } else {
    console.log("The data is received");
  }
  const renderData = ({ item }) => {
    if (item == "" || item == null) {
      console.log("The item is empty");
    }
    return (
      <View style={styles.PoetScetion}>
        <TouchableOpacity onPress={() => console.log(item.id)}>
          {/* <image source={require(`../assets/pics/roodaki.gif`)} /> */}
          {/* <Image
            style={styles.poetPicture}
            source={{ uri: item.photo }}
            resizeMode="contain"
          /> */}
          <Text style={styles.poetName}>{item.name}</Text>
          <Text>There is no object</Text>
        </TouchableOpacity>
      </View>
    );
  };

  {
    /* <FlatList data={data} renderItem={renderData} key={(item) => item.id} /> */
  }
  const myData = <RenderData />;
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingTop: 70,
    backgroundColor: "white",
  },
  listArea: {
    flexDirection: "row",
    paddinTop: 0,
    paddingTop: 20,
  },
  PoetScetion: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "tomato",
  },
  poetName: {
    alignSelf: "center",
    marginTop: 3,
    fontSize: 14,
    color: "#454545",
    fontWeight: "bold",
  },
  poetPicture: {
    width: 100,
    height: 120,
    alignSelf: "center",
  },
  addButton: {
    width: 50,
    height: 50,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  icon: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
});
