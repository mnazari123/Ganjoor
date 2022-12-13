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
  TextInput,
  ShadowPropTypesIOS,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Ganjoor.db");

const update = (id, name, century, photo) => {
  console.log("Passed Id is: " + id);
  console.log("Passed name is: " + name);
  console.log("Passed cnetury is: " + century);
  console.log("Passed photo is: " + photo);
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE GeneralPoetInfo SET name = "${name}", century = "${century}", photo = "${photo}" WHERE id = (?)`,
      [id],
      (sqlTxn, res) => {
        console.log("The data is retrived successfully");
      },
      (error) => {
        console.log("The was an error " + error);
      }
    );
  });
};

function PoetDataEdit(props) {
  const [textData, setTextData] = useState("");
  const [text, setText] = useState("");

  const [name, setName] = useState("");
  const [century, setCentury] = useState("");
  const [photoAddress, setPhotoAddress] = useState("");
  const [condition, setCondition] = useState(false);

  const getData = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM GeneralPoetInfo WHERE id = (?)",
        [id],
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
              });
            }
            console.log(result);
            setTextData(result);
            setCondition(true);
          } else {
            setTextData("");
          }
        },
        (error) => {
          console.log("The was an error " + error);
        }
      );
    });
  };

  const SubmitHandler = (id) => {
    update(id, name, century, photoAddress);
    setTextData("");
  };

  const renderData = ({ item }) => {
    if (condition == false) {
      console.log("Condition is false");
      setName(item.name);
      setCentury(item.century);
      setPhotoAddress(item.photo);
    }
    return (
      <View style={styles.PoetScetion}>
        <TextInput
          onChangeText={(name) => setName(name)}
          placeholder="Please enter poets name"
          style={styles.input}
          value={name}
        />
        <TextInput
          onChangeText={(century) => setCentury(century)}
          placeholder="Please enter poets name"
          style={styles.input}
          value={century}
        />
        <TextInput
          onChangeText={(add) => setPhotoAddress(add)}
          placeholder="Please enter poets picture address"
          style={[styles.input, { textAlign: "left" }]}
          value={photoAddress}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            SubmitHandler(item.id);
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Poet info screen</Text>
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => {
            getData(text);
            setText(null);
            setCondition(false);
          }}
          placeholder="Please Enter Poet's ID"
          style={styles.input}
          value={text}
        />
      </View>
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

export default PoetDataEdit;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "tomato",
    borderRadius: 4,
    borderWidth: 1,
    color: "tomato",
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  button: {
    backgroundColor: "tomato",
    paddingHorizontal: 10,
    paddingVertical: 3,
    margin: 3,
    borderRadius: 4,
    minWidth: 70,
    maxWidth: 150,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
