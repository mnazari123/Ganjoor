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

function RelicsHandler(props) {
  const [textData, setTextData] = useState("");

  const getData = () => {
    dbCon.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM PoetRelics WHERE poet_id = (?)",
        [props.ItemId],
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
      <TouchableOpacity
        onPress={() => {
          props.nav.navigate("PoemListData", { ItemId: item.id });
        }}
        style={{
          backgroundColor: "#c03f2a",
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical: 1,
          margin: 5,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "#e1dbc6",
            fontSize: 13,
          }}
        >
          {item.relic}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: -10,
      }}
    >
      <Text style={{ fontSize: 15, paddingHorizontal: 10, fontWeight: "bold" }}>
        آثار{" "}
      </Text>
      <FlatList
        data={textData}
        renderItem={renderData}
        numColumns={2}
        key={(item) => item.id}
        style={{
          //flexWrap: "wrap",
          flexDirection: "row-reverse",
        }}
        contentContainerStyle={{ alignItems: "flex-end" }}
      />
    </View>
  );
}

export default RelicsHandler;

const styles = StyleSheet.create({});
