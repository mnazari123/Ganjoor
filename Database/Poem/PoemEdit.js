import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Ganjoor.db");

const update = (id, poetId, bookId, category, poem) => {
  /*

id: item.id,
                poetId: item.poetId,
                bookID: item.BookID,
                poem: item.poem,
                cat: item.category,
  */

  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE PoemsData SET poetId = ${poetId}, bookID = ${bookId}, category = '${category}', poem = "${poem}" WHERE id = (?)`,
      [id],
      (sqlTxn, res) => {
        console.log("The data is updated successfully");
      },
      (error) => {
        console.log("The was an error " + error);
      }
    );
  });
};
//id ,poemListID, poem
function PoemEdit({ navigation }) {
  const [textData, setTextData] = useState("");
  const [id, setId] = useState("");

  const [poetId, setPoetId] = useState(0);
  const [bookID, setBookID] = useState(0);
  const [poem, setPoem] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState(false);

  const getData = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM PoemsData WHERE id = (?)",
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
                poetId: item.poetId,
                bookID: item.BookID,
                poem: item.poem,
                cat: item.category,
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
    update(id, poetId, bookID, category, poem);
    setTextData("");
  };

  const renderData = ({ item }) => {
    if (condition == false) {
      setPoetId(item.poetId);
      setPoem(item.poem);
      setBookID(item.bookID);
      setCategory(item.cat);
    }
    return (
      <View style={styles.PoetScetion}>
        <Text style={{ textAlign: "center" }}>
          ID: {item.id}, PoetId: {poetId}, bookID: {bookID}, Category:
          {category}
        </Text>
        <TextInput
          onChangeText={(pid) => setPoetId(pid)}
          placeholder="Poem"
          style={styles.input}
          value={`${poetId}`}
          showSoftInputOnFocus={false}
        />
        <TextInput
          onChangeText={(bid) => setBookID(bid)}
          placeholder="Book ID"
          style={styles.input}
          value={`${bookID}`}
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
          onChangeText={(p) => setPoem(p)}
          placeholder="Poem"
          style={styles.input}
          value={poem}
          multiline
          numberOfLines={15}
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
      <Text>Poet info screen</Text>
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={(id) => setId(id)}
          onSubmitEditing={() => {
            getData(id);
            setId(null);
            setCondition(false);
            setTextData("");
          }}
          placeholder="Please Enter Poet's ID"
          style={[styles.input, styles.multilineInput]}
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

export default PoemEdit;

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
  multilineInput: {
    textAlignVertical: "top",
    paddingTop: 8,
  },
});
