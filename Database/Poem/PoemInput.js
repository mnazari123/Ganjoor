import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Ganjoor.db");

function createTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS PoemsData (id INTEGER PRIMARY KEY AUTOINCREMENT, poetId INTEGER NOT NULL, BookID INTEGER NOT NULL, category TEXT, poem TEXT NOT NULL);",
      [],
      (sqlTxn, res) => {
        console.log("Table created Successfully");
      },
      (error) => {
        console.log("There was an error: " + error);
      }
    );
  });
  console.log("The create method is called");
}

const add = (poetId, pbID, category, poem) => {
  if (poetId === null || poetId === "") {
    console.log("biography is empty");
    return false;
  }
  if (poem === null || poem === "") {
    console.log("id is empty");
    return false;
  }
  if (pbID === null || pbID === "") {
    console.log("id is empty");
    return false;
  }
  if (category === null || category === "") {
    console.log("century is empty");
    return false;
  }

  console.log(
    `ID: ${poetId}, Book: ${pbID}, category: ${category} Poem: ${poem}`
  );
  // console.log(`ID: ${poemListID}, and the poem is: ${poem} `);
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO  PoemsData (poetId, BookID, category, poem) VALUES (?,?,?,?)",
      [poetId, pbID, category, poem],
      (sqlTxn, res) => {
        console.log(`Poem added successfully`);
      },
      (error) => {
        console.log("Error on adding the data" + error);
      }
    );
  }, null);
};

function PoemInput({ navigation }) {
  const [poemListID, setPoemListID] = useState("");
  const [peomBookID, setPoemBookID] = useState("");
  const [poem, setPoem] = useState("");
  const [category, setCategory] = useState("");

  const DataEntryHandler = () => {
    console.log("THe button is working");
    add(poemListID, peomBookID, category, poem);
    //console.log("ID: " + id);
    //console.log("Bio: " + biography);
    console.log("Data sent");
    navigation.goBack();
  };

  useEffect(() => {
    createTable();
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ margin: 20 }}></View>
      <Text style={styles.header}>ثبت شعر</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(id) => {
            setPoemListID(id);
          }}
          style={styles.input}
          placeholder="نمبر ثبت شاعر"
          placeholderTextColor="tomato"
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(bookid) => {
            setPoemBookID(bookid);
          }}
          style={styles.input}
          placeholder="نمبر ثبت کتاب شعر"
          placeholderTextColor="tomato"
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(cat) => {
            setCategory(cat);
          }}
          style={styles.input}
          placeholder="کتکوری شعر"
          placeholderTextColor="tomato"
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setPoem(text);
          }}
          style={[styles.input, styles.multilineInput]}
          placeholder="شعر"
          multiline
          numberOfLines={10}
          placeholderTextColor="tomato"
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
          <Text style={styles.buttonText}>ثبت شعر</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default PoemInput;

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
