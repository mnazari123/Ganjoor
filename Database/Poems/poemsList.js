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
      "CREATE TABLE IF NOT EXISTS BookPoemList (id INTEGER PRIMARY KEY AUTOINCREMENT, bookID INTEGER NOT NULL, poemID INTEGER NOT NULL, category TEXT, poem TEXT NOT NULL);",
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

const add = (bookID, poemID, category, poem) => {
  if (bookID === null || bookID === "") {
    console.log("Name is empty");
    return false;
  }
  if (poemID === null || poemID === "") {
    console.log("century is empty");
    return false;
  }
  if (category === null || category === "") {
    console.log("century is empty");
    return false;
  }
  if (poem === null || poem === "") {
    console.log("century is empty");
    return false;
  }
  console.log(
    `Book ID: ${bookID}, Poem ID: ${poemID}, Category: ${category}, Poem: ${poem}`
  );
  //bookID, poemID, category, poem
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO  BookPoemList (bookID, poemID, category, poem) values (?, ?, ?, ?)",
      [bookID, poemID, category, poem],
      (sqlTxn, res) => {
        console.log(`data added successfully`);
      },
      (error) => {
        console.log("Error on adding the data" + error);
      }
    );
  }, null);
};

function PoemsList({ navigation }) {
  const [bookID, setBookID] = useState(null);
  const [poemID, setPoemID] = useState(null);
  const [category, setCategory] = useState("");
  const [poem, setPoem] = useState("");

  const DataEntryHandler = () => {
    add(bookID, poemID, category, poem);
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
            setBookID(id);
          }}
          style={styles.input}
          placeholder="Book ID"
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(pID) => {
            setPoemID(pID);
          }}
          style={styles.input}
          placeholder="Poem ID"
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(cat) => {
            setCategory(cat);
          }}
          style={styles.input}
          placeholder="Alphabet Category"
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(poem) => {
            setPoem(poem);
          }}
          style={styles.input}
          placeholder="Poem"
          showSoftInputOnFocus={false}
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

export default PoemsList;

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
