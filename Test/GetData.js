import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Ganjoor.db");

function GetData(props) {
  const [textData, setTextData] = useState("");

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM poetData",
        [],
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
            //console.log(result);
            setTextData(result);
          }
        },
        (error) => {
          console.log("The was an error " + error);
        }
      );
    });
  };
  useEffect(() => {
    getData();
  }, []);
  //   const renderData = ({ item }) => {
  //     return (
  //       <View style={styles.PoetScetion}>
  //         <TouchableOpacity onPress={() => console.log(item.id)}>
  //           {/* <image source={require(`../assets/pics/roodaki.gif`)} /> */}
  //           {/* <Image
  //             style={styles.poetPicture}
  //             source={{ uri: item.photo }}
  //             resizeMode="contain"
  //           /> */}
  //           <Text style={styles.poetName}>{item.name}</Text>
  //           <Text>There is no object</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   };
  //   return (
  //     <View style={styles.listArea}>
  //       <Text> Show me some text</Text>
  //       <FlatList
  //         data={textData}
  //         renderItem={renderData}
  //         key={(item) => item.id}
  //       />
  //     </View>
  //   );
  return { textData };
}

export default GetData;

const styles = StyleSheet.create({});
