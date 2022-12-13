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

const update = (id, biography) => {
  console.log("Passed Id is: " + id);
  console.log("Passed name is: " + biography);

  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE biography SET name = "${biography}" WHERE id = (?)`,
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
function PoetBiographyEdit(props) {
  const [textData, setTextData] = useState("");
  const [id, setId] = useState("");

  const [biography, setBiography] = useState("");
  const [condition, setCondition] = useState(false);

  const getData = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM biography WHERE id = (?)",
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
                bio: item.biography,
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
    update(id, biography);
    setTextData("");
  };

  const renderData = ({ item }) => {
    if (condition != true) {
      setBiography(item.bio);
    }
    return (
      <View style={styles.PoetScetion}>
        <Text style={{ textAlign: "center" }}>{item.id}</Text>
        <TextInput
          onChangeText={(bio) => setBiography(bio)}
          placeholder="Biography"
          style={styles.input}
          value={biography}
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

export default PoetBiographyEdit;

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
