import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Ganjoor.db");

function PoemDisplay({ route, navigation }) {
  const { ItemId, ItemData } = route.params;
  var keys = Object.keys(ItemData);
  var len = keys.length;

  const [next, setNext] = useState(true);
  const [prev, setPrev] = useState(true);

  const prevButton = () => {
    if (prev) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PoemDisplay", {
              ItemId: ItemId - 1,
              ItemData: ItemData,
            })
          }
          enabled={false}
          style={{
            backgroundColor: "#c03f2a",
            paddingVertical: 5,
            paddingHorizontal: 10,
            alignItems: "center",
            borderRadius: 7,
          }}
        >
          <Text style={{ color: "#e1dbc6" }}>قبلی</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  const nextButton = () => {
    if (next) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PoemDisplay", {
              ItemId: ItemId + 1,
              ItemData: ItemData,
            })
          }
          style={{
            backgroundColor: "#c03f2a",
            paddingVertical: 5,
            paddingHorizontal: 10,
            alignItems: "center",
            borderRadius: 7,
          }}
        >
          <Text style={{ color: "#e1dbc6" }}>بعدی</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const renderData = ({ item }) => {
    if (item.id == ItemId) {
      var index = ItemData.indexOf(item);
      if (index == len - 1) {
        setNext(false);
      } else {
        setNext(true);
      }
      if (index == 0) {
        setPrev(false);
      } else {
        setPrev(true);
      }
      return (
        <View style={styles.PoetScetion}>
          <Text style={styles.poetName}>{item.poem}</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  useEffect(() => {}, []);
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          padding: 60,
          alignSelf: "center",
          backgroundColor: "lightblue",
          borderRadius: 100,
          marginTop: 40,
        }}
      ></View>
      <Text style={styles.header}> شعر</Text>
      <View
        style={[
          styles.listArea,
          {
            justifyContent: "flex-start",
          },
        ]}
      >
        <FlatList
          horizontal
          data={ItemData}
          renderItem={renderData}
          key={(item) => item.id}
          style={[styles.flatSection]}
          contentContainerStyle={{
            marginTop: 5,
            justifyContent: "flex-end",
          }}
        />
      </View>
      <View
        style={{
          paddingBottom: 50,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <View>{prevButton()}</View>
        <View>{nextButton()}</View>
      </View>
    </ScrollView>
  );
}

export default PoemDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "white",
  },
  listArea: {
    flexDirection: "row",
    backgroundColor: "#FEFEFE",
  },
  PoetScetion: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
    paddingTop: 20,
    color: "tomato",
  },
  flatSection: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    margin: 10,
  },
});
