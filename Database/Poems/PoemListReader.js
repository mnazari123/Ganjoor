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

const db = SQLite.openDatabase("Ganjoor.db");
//bookID, poemID, category, poem
function PoemListReader({ navigation }) {
  const [textData, setTextData] = useState("");

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM BookPoemList",
        [],
        (sqlTxn, res) => {
          console.log("The data is retrived successfully");
          let len = res.rows.length;

          if (len > 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              result.push({
                id: item.id,
                bookID: item.bookID,
                poemID: item.poemID,
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
  const renderData = ({ item }) => {
    console.log("Data is called");
    return (
      <View style={styles.PoetScetion}>
        <Text>ID: {item.id}</Text>
        <Text>BookID: {item.bookID}</Text>
        <Text>PoemID: {item.poemID}</Text>
        <Text>Category: {item.category}</Text>
        <Text>Poem: {item.poem}</Text>
      </View>
    );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Poet info screen</Text>
      <View style={styles.listArea}>
        <FlatList
          data={textData}
          renderItem={renderData}
          key={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default PoemListReader;

const styles = StyleSheet.create({});
