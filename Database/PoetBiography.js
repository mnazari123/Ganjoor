import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Ganjoor.db");

function createTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS biography (id INTEGER PRIMARY KEY, biography TEXT NOT NULL);",
      [],
      (sqlTxn, res) => {
        console.log("Table created Successfully");
      },
      (error) => {
        console.log("The was an error: " + error);
      }
    );
  });
  console.log("The create method is called");
}

const add = (id, biography) => {
  if (biography === null || biography === "") {
    console.log("biography is empty");
    return false;
  }
  if (id === null || id === "") {
    console.log("id is empty");
    return false;
  }
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO  biography (id, biography) values (?,?)",
      [id, biography],
      (sqlTxn, res) => {
        console.log(`data added successfully`);
      },
      (error) => {
        console.log("Error on adding the data" + error);
      }
    );
  }, null);
};

function PoetBiography({ navigation }) {
  const [id, setId] = useState("");
  const [biography, setBiography] = useState("");

  const DataEntryHandler = () => {
    console.log("THe button is working");
    add(id, biography);
    //console.log("ID: " + id);
    //console.log("Bio: " + biography);
    console.log("Data sent");
    navigation.goBack();
  };

  useEffect(() => {
    createTable();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>ثبت زندگی نامه شاعر</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setId(text);
          }}
          style={styles.input}
          placeholder="نمبر ثبت شاعر"
          placeholderTextColor="tomato"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setBiography(text);
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
          <Text style={styles.buttonText}>ثبت زندگی نامه</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PoetBiography;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 20,
    color: "tomato",
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
  multilineInput: {
    textAlignVertical: "top",
    paddingTop: 8,
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
