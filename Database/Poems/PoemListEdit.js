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

const update = (id, bookID, poemID, category, poem) => {
  //   console.log("Passed relic is: " + id);
  //   console.log("Passed relic is: " + bookID);
  //   console.log("Passed relic is: " + poemID);
  //   console.log("Passed relic is: " + category);
  //   console.log("Passed relic is: " + poem);
  //bookID, poemID, category, poem
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE BookPoemList SET bookID = ${bookID}, poemID = ${poemID}, category = "${category}", poem = "${poem}"  WHERE id = (?)`,
      [id],
      (sqlTxn, res) => {
        console.log("The data is edited successfully");
      },
      (error) => {
        console.log("There was an error " + error);
      }
    );
  });
};

function PoemListEdit({ navigation }) {
  const [textData, setTextData] = useState("");
  const [id, setId] = useState("");

  const [bookID, setBookId] = useState(null);
  const [poemID, setPoemID] = useState(null);
  const [category, setCategory] = useState("");
  const [poem, setpoem] = useState("");

  const [condition, setCondition] = useState(false);

  const getData = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM BookPoemList WHERE id = (?)",
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
                bookID: item.bookID,
                poemID: item.poemID,
                category: item.category,
                poem: item.poem,
              });
            }
            //console.log(result);
            setTextData(result);
            setCondition(true);
          }
        },
        (error) => {
          console.log("The was an error " + error);
        }
      );
    });
  };
  const SubmitHandler = (id) => {
    update(id, bookID, poemID, category, poem);
    setTextData("");
    console.log("Yes it happened");
    //navigation.go;
  };
  const renderData = ({ item }) => {
    if (condition != true) {
      setBookId(item.bookID);
      setPoemID(item.poemID);
      setCategory(item.category);
      setpoem(item.poem);
    }
    return (
      <View style={styles.PoetScetion}>
        <Text style={{ textAlign: "center" }}>Book Id: {item.id}</Text>
        <Text>book ID: {bookID}</Text>
        <Text>Poem ID: {poemID}</Text>
        <TextInput
          onChangeText={(pid) => setPoemID(pid)}
          placeholder="PoemID"
          style={styles.input}
          value={poemID}
          showSoftInputOnFocus={false}
        />
        <TextInput
          onChangeText={(cat) => setCategory(cat)}
          placeholder="Category"
          style={styles.input}
          value={category}
          showSoftInputOnFocus={false}
        />
        <TextInput
          onChangeText={(poem) => setpoem(poem)}
          placeholder="Poem Title"
          style={styles.input}
          value={poem}
          showSoftInputOnFocus={false}
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
      <Text>Poet Book Edit</Text>
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={(id) => setId(id)}
          onSubmitEditing={() => {
            getData(id);
            setId(null);
            setCondition(false);
            setTextData("");
          }}
          placeholder="Please Enter Poet's poet ID"
          style={styles.input}
          value={id}
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

export default PoemListEdit;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "tomato",
    borderRadius: 4,
    borderBottomWidth: 1,
    backgroundColor: "white",
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
  multilineInput: {
    textAlignVertical: "top",
    paddingTop: 8,
  },
});
