import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Ganjoor.db");

function createTable() {
  console.log("creatTable Called");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS GeneralPoetInfo (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, century INTEGER NOT NULL, biography NOT NULL, photo TEXT);",
      [],
      (sqlTxn, res) => {
        console.log("Table created Successfully");
      },
      (error) => {
        console.log("The was an error: " + error);
      }
    );
  });
}

const add = (name, century, photo, poetBio) => {
  if (name === null || name === "") {
    console.log("Name is empty");
    return false;
  }
  if (century === null || century === "") {
    console.log("century is empty");
    return false;
  }
  if (photo === null || photo === "") {
    console.log("photo is empty");
    return false;
  }
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO  GeneralPoetInfo (name, century, photo, biography) values (?, ?, ?, ?)",
      [name, century, photo, poetBio],
      (sqlTxn, res) => {
        console.log(`data added successfully`);
      },
      (error) => {
        console.log("Error on adding the data" + error);
      }
    );
  }, null);
};
function PoetRegestration({ navigation }) {
  const [century, setCentury] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [poetBio, setPoetBio] = useState("");

  const DataEntryHandler = () => {
    add(name, century, picture, poetBio);
    //setName("");
    //setCentury("");
    //setPicture("");
    console.log("Data sent");
    navigation.goBack();
    //navigation.goBack();
  };

  useEffect(() => {
    createTable();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.header}>ثبت شهرت کلی شاعران</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setCentury(text);
          }}
          style={styles.input}
          placeholder="قرن"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setName(text);
          }}
          style={styles.input}
          placeholder="شهرت"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setPicture(text);
          }}
          style={styles.input}
          placeholder="عکس"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setPoetBio(text);
          }}
          style={[styles.input, styles.multilineInput]}
          placeholder="زندگی نامه"
          multiline
          numberOfLines={10}
          placeholderTextColor="tomato"
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            DataEntryHandler();
          }}
        >
          <Text style={styles.buttonText}>ثبت شاعر</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default PoetRegestration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 20,
  },
  input: {
    borderColor: "#EFEFEF",
    borderWidth: 1,
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 10,
    textAlign: "right",
    color: "tomato",
  },
  inputContainer: {
    flexDirection: "row-reverse",
    paddingVertical: 7,
  },
  button: {
    flex: 1,
    backgroundColor: "tomato",
    marginHorizontal: 10,
    padding: 5,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
