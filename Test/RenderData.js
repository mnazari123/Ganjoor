import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const RenderData = async () => {
  //   const { data } = props.td;
  //   if (data == null || data == "") {
  //     console.log("The received data is null");
  //   }
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
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   };
  //   return (
  //     <View style={styles.listArea}>
  //       <Text>{data}</Text>
  //       <Text> Show me some text</Text>
  //       <FlatList data={data} renderItem={renderData} key={(item) => item.id} />
  //     </View>
  //   );
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  return { DATA };
};

export default RenderData;

const styles = StyleSheet.create({});
