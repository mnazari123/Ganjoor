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
import PoetImages from "../assets/pics/PoetImages";

import RelicsHandler from "../dataHandler/RelicsHandler";

const db = SQLite.openDatabase("Ganjoor.db");

function HomeScreen({ route, navigation }) {
  const [textData, setTextData] = useState("");
  const { ItemId } = route.params;

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM GeneralPoetInfo WHERE century = (?)",
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

  const renderFunction = ({ item }) => {
    return (
      <View
        style={{
          // backgroundColor: "#f5f5dc80",
          // marginHorizontal: 2.5,
          borderLeftWidth: 2,
          borderColor: "white",
          flex: 1,
          width: 250,
          borderRadius: 3,
          padding: 10,
        }}
      >
        <View
          style={{
            padding: 60,
            alignSelf: "center",
            backgroundColor: "lightblue",
            borderRadius: 100,
            marginTop: 20,
          }}
        ></View>
        {/* <View style={{ flex: 1, alignSelf: "center" }}> */}
        {/* <Image style={{}} source={{ uri: `${item.photo}` }} /> */}
        {/* The photo link is not working, the above code could be replace after the solution is found for this part*/}
        {/* </View> */}
        {/* <Text>{item.photo}</Text> */}
        <View style={{ flex: 1.5 }}>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 16,
              paddingTop: 25,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ fontSize: 12 }}>{item.bio.substring(0, 215)}...</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#c03f2a",
              width: 60,
              borderRadius: 5,
              paddingBottom: 2,
            }}
            onPress={() => {
              navigation.navigate("Details", {
                itemId: item.id,
                ItemData: textData,
              });
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "#e1dbc6",
                fontSize: 11,
              }}
            >
              بیشتر
            </Text>
          </TouchableOpacity>
        </View>
        {/* {renderRelics()} */}
        <RelicsHandler ItemId={item.id} nav={navigation} />
      </View>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.addButton}>
        <Button
          title="Add"
          color="tomato"
          onPress={() => navigation.navigate("Database")}
        />
      </View>
      <Image style={styles.icon} source={require("../assets/pics/gdap.png")} />
      <Text
        style={{
          padding: 10,
          paddingTop: 20,
          fontSize: 17,
          fontWeight: "bold",
        }}
      >
        لیست شاعران قرن{ItemId}
      </Text>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",

          flex: 1,
        }}
      >
        <View
          style={{
            flex: 0.95,
            borderWidth: 5,
            borderColor: "white",
            borderRadius: 5,
          }}
        >
          {/* <ScrollView
            horizontal={true}
            style={{
              flex: 1,
              flexDirection: "row",
              borderRadius: 3,

              // The scroll should become from right to left
            }}
          > */}
          <FlatList
            horizontal
            data={textData}
            renderItem={renderFunction}
            key={(item) => item.id}
            style={{ alignSelf: "flex-end" }}
          />
          {/* <View
              style={{
                backgroundColor: "aliceblue",
                marginHorizontal: 2.5,
                flex: 1,
                width: 250,
              }}
            ></View> */}
          {/* </ScrollView> */}
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingTop: 70,
  },
  addButton: {
    width: 50,
    height: 50,
    position: "absolute",
    right: 10,
    top: 30,
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});
