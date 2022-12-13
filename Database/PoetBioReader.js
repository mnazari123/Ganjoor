import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Ganjoor.db");

function PoetBioReader({ navigation }) {
  const [textData, setTextData] = useState("");

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM biography",
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
                bio: item.biography,
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
    return (
      <View style={styles.PoetScetion}>
        <Text style={{ textAlign: "center", backgroundColor: "#EDEDED" }}>
          {item.id}
        </Text>
        <Text style={styles.poetName}>{item.bio}</Text>
      </View>
    );
  };

  useEffect(() => {
    console.log("The mothod is called");
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Biography</Text>
      <View style={styles.listArea}>
        <FlatList
          data={textData}
          renderItem={renderData}
          key={(item) => item.id}
          style={styles.flatSection}
        />
      </View>
    </View>
  );
}

export default PoetBioReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  listArea: {
    flexDirection: "row",
    backgroundColor: "#FEFEFE",
    paddinTop: 0,
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
    padding: 20,
    color: "tomato",
  },
  flatSection: {
    flex: 1,
    marginBottom: 60,
    margin: 10,
  },
});
