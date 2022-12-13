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

function PoetDataReader({ navigation }) {
  const [textData, setTextData] = useState("");

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM GeneralPoetInfo",
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
                name: item.name,
                century: item.century,
                photo: item.photo,
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
    console.log("Data is called");
    const picSource = "../assets/pics/" + item.photo;
    return (
      <View style={styles.PoetScetion}>
        <TouchableOpacity
          onPress={console.log("The button is pressed" + item.id)}
        >
          {/* <image source={require(`../assets/pics/roodaki.gif`)} /> */}
          {/* <Image
            style={styles.poetPicture}
            source={require(picSource)}
            resizeMode="contain"
          /> */}
          <Text style={styles.poetName}>{item.name}</Text>
          <Text>{item.century}</Text>
          <Text>{item.photo}</Text>
          <Text>{item.bio.substring(0, 200)}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>لیست شاعران</Text>
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

export default PoetDataReader;
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
    borderBottomWidth: 1,
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
