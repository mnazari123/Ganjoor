import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

function PoemsData(props) {
  const n = 0;
  let num = n;

  // const data = (txt) => {
  //   if (txt != "" || txt == null) {
  //     console.log("Pring me");
  //     const data = txt.split(" ");

  //     {
  //       data.map((p, i) => <Text>p</Text>);
  //     }

  //     return <Text>Text</Text>;
  //   } else {
  //     return null;
  //   }
  // };

  const renderData = ({ item }) => {
    if (item.category == props.alpha) {
      const spliterData = item.poem.split("\n");
      num = num + 1;
      return (
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("PoemDisplay", {
                ItemId: item.id,
                ItemData: props.data,
              });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>شعر شماره {num}</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            style={{ flexDirection: "row-reverse", flex: 1 }}
            contentContainerStyle={{}}
          >
            <Text
              style={{ borderBottomColor: "#FFFFFF", borderBottomWidth: 1 }}
            >
              {Object.values(spliterData)[0]} - {Object.values(spliterData)[1]}
            </Text>
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        paddingVertical: 5,
        marginVertical: 5,
      }}
    >
      <FlatList
        data={props.data}
        renderItem={renderData}
        key={(items) => items.id}
      />
    </View>
  );
}

export default PoemsData;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c03f2a",
    paddingHorizontal: 10,
    paddingVertical: 3,
    margin: 3,
    borderRadius: 15,
    marginLeft: 7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
