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
} from "react-native";
import * as SQLite from "expo-sqlite";
import PoemsData from "../dataHandler/poemDataHandler";

const db = SQLite.openDatabase("Ganjoor.db");

const alphabet = [];

function PoemListData({ route, navigation }) {
  const { ItemId } = route.params;
  const [textData, setTextData] = useState("");
  const [alphOrder, setAlphaOrder] = useState("الف");

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM PoemsData WHERE bookID = (?)",
        [ItemId],
        (sqlTxn, res) => {
          console.log("The data is retrived successfully");
          let len = res.rows.length;

          if (len > 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              result.push({
                id: item.id,
                bookID: item.BookID,
                poemID: item.poetId,
                category: item.category,
                poem: item.poem,
              });
            }
            //console.log(result);
            setTextData(result);
          }
        },
        (error) => {
          console.log("The was an error " + error);
        }
      );
    });
  };

  const orderData = () => {
    return (
      <PoemsData alpha={alphOrder} data={textData} navigation={navigation} />
    );
  };

  const renderData = ({ item }) => {
    if (alphabet.includes(item.category) == false) {
      alphabet.push(item.category);
    }
  };

  const orderHandler = (alpha) => {
    setAlphaOrder(alpha);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 60,
          alignSelf: "center",
          backgroundColor: "lightblue",
          borderRadius: 100,
          marginTop: 40,
        }}
      ></View>
      <Text style={styles.header}>لیست شعرهای این مجموعه</Text>
      <View>
        <FlatList
          data={textData}
          renderItem={renderData}
          key={(item) => item.id}
        />
      </View>
      <View style={styles.PoetScetion}>
        {alphabet.map((d, index) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => orderHandler(d)}
          >
            <Text key={index} style={{ color: "white" }}>
              {d}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {orderData()}
    </View>
  );
}

export default PoemListData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  listArea: {
    flexDirection: "row",
    paddinTop: 0,
    flex: 1,
  },
  PoetScetion: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginBottom: 0,
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    backgroundColor: "white",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#c03f2a",
    paddingHorizontal: 10,
    paddingVertical: 3,
    margin: 3,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 20,
    color: "#c03f2a",
    marginBottom: 5,
  },
});
