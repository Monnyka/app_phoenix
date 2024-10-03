import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { router, useLocalSearchParams } from "expo-router";
import { Checkbox, PaperProvider, TouchableRipple } from "react-native-paper";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";

const project_details = () => {
  const [data, setData]: any = useState([]);
  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setLoading]: any = useState(true);
  const params = useLocalSearchParams();
  const projectID = params.id;

  const getProjectDetails = async () => {
    try {
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (taskId: any) => {
    setData((prevData: any): any => {
      const updatedTasks = prevData.tasks.map((task: any) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { ...prevData, tasks: updatedTasks };
    });
  };

  const updateTask = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(apiUrl + "/api/v1/tasks/" + id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (response.ok) {
        console.log("Task updated successfully");
        // Reset the input fields after successful creation
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error update task:", error);
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
          style={{ padding: 8, borderRadius: 16 }}
        >
          <View>
            {/* Title task item */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                //backgroundColor: "#01044B",
                paddingEnd: 25,
              }}
            >
              <Checkbox.Android
                status={item.completed ? "checked" : "unchecked"}
                color="#01044B"
                onPress={
                  () => {
                    console.log("Item is clicked " + item._id);
                    toggleTaskCompletion(item._id);
                    updateTask(item._id);
                  } // Toggle the checkbox state
                }
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
      {!isLoading ? (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.desciption}>{data.description}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 28, height: 28, marginEnd: 10 }}
              source={require("../assets/ic_calendar.png")}
            />
            <Text style={styles.desciption}>
              Create Date:
              {moment(data.createdAt).format(" DD MMM, YYYY")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 28, height: 28, marginEnd: 10 }}
              source={require("../assets/ic_calendar.png")}
            />
            <Text style={styles.desciption}>
              Due Date:
              {moment(data.dueDate).format(" DD MMM, YYYY")}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#F4F4F4",
              marginTop: 16,
              borderRadius: 16,
              padding: 14,
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <Text style={styles.labelTop}>Project Progress</Text>
            <Text style={styles.desciption}>
              Latest Update: {moment(data.updatedAt).format("DD MMM, YYYY")}
            </Text>
          </View>
          <Text style={styles.label}>Tasks</Text>
          <FlatList
            data={data.tasks}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 50 }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </ScrollView>
      ) : (
        <Loading />
      )}
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
    marginTop: 16,
    marginBottom: 10,
  },
  labelTop: {
    fontFamily: "poppinssemibold",
    fontSize: 14,
    color: "#01044B",
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
