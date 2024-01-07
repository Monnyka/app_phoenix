import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Appbar, PaperProvider } from "react-native-paper";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

const taskdetails = () => {
  const params = useLocalSearchParams();
  const taskId = params.id;
  const name = params.name;
  const taskDescription = params.taskDescription;
  const taskCreateDate = params.taskCreateDate;
  const taskDueDate = params.taskDueDate;
  const navigation = useNavigation();
  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;

  const deleteTask = async (id: any) => {
    try {
      const request = await fetch(apiUrl + id, { method: "DELETE" });

      if (request.status === 200) {
        router.back();
      }
      const jsons = await request.json();
      //setMsg(jsons.msg);
      console.log(jsons);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#C1D9FD", "#6889FF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: "#ffffff00" }}>
          <Appbar.BackAction
            onPress={() => {
              router.back();
            }}
          />
          <Appbar.Action icon="pencil" onPress={() => {}} />
          <Appbar.Action icon="delete" onPress={() => deleteTask(taskId)} />
        </Appbar.Header>
        <StatusBar backgroundColor="#4CAF4F00" hidden={false} />
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 16, backgroundColor: "#FFFFFF00" }}>
            <Text
              style={{
                fontFamily: "montserratbold",
                fontSize: 20,
                color: "#01044B",
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                fontFamily: "montserratbold",
                fontSize: 14,
                color: "#01044B",
                marginTop: 25,
              }}
            >
              Description:
            </Text>
            <Text
              style={{
                fontFamily: "poppinsregular",
                fontSize: 14,
                color: "#414141",
              }}
            >
              {taskDescription}
            </Text>

            <Text
              style={{
                fontFamily: "poppinsregular",
                fontSize: 14,
                color: "#414141",
                marginTop: 20,
              }}
            >
              Create Date: {moment(taskCreateDate).format("DD MMM, YYYY")}
            </Text>

            <Text
              style={{
                fontFamily: "poppinsregular",
                fontSize: 14,
                color: "#414141",
              }}
            >
              Due Date: {moment(taskDueDate).format("DD MMM, YYYY")}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Image
              style={{
                width: 220,
                height: 220,
                alignSelf: "center",
                alignContent: "space-around",
              }}
              source={require("../assets/Teamwork_of_company_employees.png")}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default taskdetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
