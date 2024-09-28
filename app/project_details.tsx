import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { router, useLocalSearchParams } from "expo-router";
import { Checkbox, PaperProvider, TouchableRipple } from "react-native-paper";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";

const project_details = () => {
  const [data, setData]: any = useState([]);
  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;
  const [checked, setChecked] = React.useState(false);
  const params = useLocalSearchParams();
  const projectID = params.id;

  const getProjectDetails = async () => {
    try {
      console.log("called");
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(apiUrl + "/api/v1/projects/" + projectID, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch tasks: ${response.status} ${response.statusText}`
        );
      }
      const json = await response.json();
      setData(json.project);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <TouchableRipple
          onPress={() => {
            router.push({
              pathname: "/taskdetails",
              params: {
                id: item._id,
                name: item.name,
                taskDescription: item.description,
                taskCreateDate: item.createdAt,
                taskDueDate: item.dueDate,
                taskStatus: item.completed,
              },
            });
          }}
          borderless
          style={{ padding: 16, borderRadius: 16 }}
        >
          <View>
            {/* Title task item */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                //backgroundColor: "#458989",
                paddingEnd: 25,
              }}
            >
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  console.log("Item is clicked " + item._id);
                }}
              />
              <Text
                style={{
                  fontFamily: "poppinsbold",
                  fontSize: 14,
                  textTransform: "capitalize",
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </View>
            {item.description ? (
              <Text
                style={{
                  marginStart: 8,
                  marginBottom: 8,
                  marginEnd: 5,
                  color: "#4B4A4A",
                  fontFamily: "poppinsregular",
                  fontSize: 13,
                  textTransform: "capitalize",
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            ) : null}
          </View>
        </TouchableRipple>
      </View>
    );
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  useEffect(() => {
    console.log(data); // Logs data only when it's updated
  }, [data]); // This will trigger whenever data changes

  return (
    <PaperProvider>
      <AppBar />
      <View style={styles.container}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.desciption}>{data.description}</Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Image
            style={{ width: 30, height: 30, marginEnd: 14 }}
            source={require("../assets/icon.png")}
          />
          <Text style={styles.desciption}>
            {moment(data.createdAt).format("DD MMM, YYYY")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Image
            style={{ width: 30, height: 30, marginEnd: 14 }}
            source={require("../assets/icon.png")}
          />
          <Text style={styles.desciption}>
            {moment(data.dueDate).format("DD MMM, YYYY")}
          </Text>
        </View>
        <Text style={styles.label}>Tasks</Text>
        <FlatList
          data={data.tasks}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      </View>
    </PaperProvider>
  );
};

export default project_details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  title: { fontFamily: "poppinsbold", fontSize: 22, color: "#151823" },
  label: {
    fontFamily: "poppinssemibold",
    fontSize: 14,
    color: "#01044B",
    marginTop: 20,
    marginBottom: 10,
  },
  desciption: {
    fontFamily: "poppinsregular",
    fontSize: 14,
    color: "#414141",
  },
  item: {
    backgroundColor: "#E6EDFB",
    borderRadius: 14,
  },
});
