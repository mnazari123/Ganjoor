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

const update = (id, poetId, relic) => {
  console.log("Passed relic is: " + relic);

  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE PoetRelics SET relic = "${relic}", poet_id = ${poetId}  WHERE id = (?)`,
      [id],
      (sqlTxn, res) => {
        console.log("The data is edited successfully");
      },
      (error) => {
        console.log("The was an error " + error);
      }
    );
  });
};
function PoetRelicsEdit({ navigation }) {
  const [textData, setTextData] = useState("");
  const [id, setId] = useState("");

  const [poetId, setPoetId] = useState(null);
  const [relic, setRelic] = useState("");
  const [condition, setCondition] = useState(false);

  const getData = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM PoetRelics WHERE id = (?)",
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
                poet: item.poet_id,
                relic: item.relic,
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
    update(id, poetId, relic);
    setTextData("");
    //navigation.go;
  };
  const renderData = ({ item }) => {
    if (condition != true) {
      setPoetId(item.poet);
      console.log("Poet ID: " + poetId);
      setRelic(item.relic);
    }
    return (
      <View style={styles.PoetScetion}>
        <Text style={{ textAlign: "center" }}>Book Id: {item.id}</Text>
        <Text>Poet ID: {poetId}</Text>
        <TextInput
          onChangeText={(pid) => setPoetId(pid)}
          placeholder="Relic Name"
          style={styles.input}
          value={poetId}
          showSoftInputOnFocus={false}
        />
        <TextInput
          onChangeText={(relic) => setRelic(relic)}
          placeholder="Relic Name"
          style={styles.input}
          value={relic}
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
          placeholder="Please Enter Poet's book ID"
          style={styles.input}
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

export default PoetRelicsEdit;

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
