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

const dbCon = SQLite.openDatabase("Ganjoor.db");

function PoetRelicsReader({ navigation }) {
  const [textData, setTextData] = useState("");

  const getData = () => {
    dbCon.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM PoetRelics",
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
                poet: item.poet_id,
                relic: item.relic,
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
        <Text>{item.id}</Text>
        <Text>Poet: {item.poet}</Text>
        <Text>{item.relic}</Text>
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

export default PoetRelicsReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  listArea: {
    flexDirection: "row",
    backgroundColor: "#DFDFDF",
    paddinTop: 0,
  },
  PoetScetion: {
    paddingVertical: 5,
    paddingHorizontal: 0,
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
});
