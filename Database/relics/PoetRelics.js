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
  console.log("creatTable Called");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS PoetRelics (id INTEGER PRIMARY KEY AUTOINCREMENT, poet_id INTEGER NOT NULL, relic TEXT NOT NULL);",
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

const add = (poetId, bookName) => {
  if (poetId === null || poetId === "") {
    console.log("Name is empty");
    return false;
  }
  if (bookName === null || bookName === "") {
    console.log("century is empty");
    return false;
  }
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO  PoetRelics (poet_id, relic) values (?, ?)",
      [poetId, bookName],
      (sqlTxn, res) => {
        console.log(`data added successfully`);
      },
      (error) => {
        console.log("Error on adding the data" + error);
      }
    );
  }, null);
};

function PoetRelics({ navigation }) {
  const [bookName, setBookName] = useState("");
  const [poetID, setPoetID] = useState(null);

  const DataEntryHandler = () => {
    add(poetID, bookName);
    // console.log("ID: " + poetID);
    // console.log("Book Name: " + bookName);
    //console.log("Data sent");
    navigation.goBack();
  };

  useEffect(() => {
    createTable();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>ثبت اثر/کتاب شاعر</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(id) => {
            setPoetID(id);
          }}
          style={styles.input}
          placeholder="شاعر"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(relic) => {
            setBookName(relic);
          }}
          style={styles.input}
          placeholder="اسم کتاب"
        />
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            DataEntryHandler();
          }}
        >
          <Text style={styles.buttonText}>ثبت اثر / کتاب</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PoetRelics;

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
