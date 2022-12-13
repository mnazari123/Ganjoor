import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

function DataScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}> شاعر </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetRegistration");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ثبت</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetDataEdit");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ویرایش</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetDataReader");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>خوانش</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}> زندگی نامه </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetBiography");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ثبت</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetBioEdit");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ویرایش</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetBioReader");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>خوانش</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}> آثار </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetRelic");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ثبت</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetRelicsEdit");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ویرایش</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoetRelicsReader");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>خوانش</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}> لیست اشعار </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoemList");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ثبت</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoemListEdit");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ویرایش</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoemListReader");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>خوانش</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}> شعر </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoemInput");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ثبت</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoemEdit");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>ویرایش</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoemReader");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>خوانش</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default DataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginHorizontal: 10,
    marginVertical: 3,
  },
  title: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "tomato",
    paddingHorizontal: 10,
    paddingVertical: 3,
    margin: 3,
    borderRadius: 4,
    minWidth: 70,
    maxWidth: 150,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  subContainer: {
    flex: 1,
    borderWidth: 2,
    margin: 10,
    borderRadius: 5,
    borderColor: "white",
  },
});
