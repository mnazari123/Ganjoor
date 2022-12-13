import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

function CenturyList({ navigation }) {
  const PressHandler = (id) => {
    console.log("print the id: " + id);
    navigation.navigate("Home", { ItemId: id });
  };

  return (
    <ScrollView>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#c03f2a"
        translucent={true}
      />
      <View style={styles.conatainer}>
        <View style={styles.separator}></View>
        <Image
          source={require("../assets/pics/gdap.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>دسته بندی بر اساس قرن</Text>
        <View style={styles.category}></View>
      </View>

      <View style={styles.category}>
        <TouchableOpacity
          onPress={() => PressHandler(3)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن سوم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(4)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن چهارم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(5)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن پنجم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(6)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن ششم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(7)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن هفتم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(8)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن هشتم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(9)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن نهم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(10)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن دهم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(11)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن یازدهم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(12)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن دوازهم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(13)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن سیزدهم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => PressHandler(14)}
          style={styles.itemCont}
        >
          <Text style={styles.itemText}>قرن چهاردهم</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
    </ScrollView>
  );
}

export default CenturyList;

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginTop: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    paddingTop: 30,
  },
  itemCont: {
    backgroundColor: "#c03f2a",
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  itemText: {
    color: "#e1dbc6",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 4,
    alignSelf: "center",
  },
  category: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  separator: {
    padding: 20,
  },
});

//rgba(192,63,42,255)
