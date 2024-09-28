import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import InputtextPhoenix from "../components/InputtextPhoenix";
import TextHeaderPhoenix from "../components/TextHeaderPhoenix";
import i18n from "../assets/translations";
import ButtonPhoenix from "../components/ButtonPhoenix";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "../components/Popup";
import InputTextMultiPhoenix from "../components/InputTextMultiPheonix";

const TaskEdit = () => {
  const params = useLocalSearchParams();
  const [title, setTitle] = useState(params.name + "");
  const [updateTitle, setUpdateTitle] = useState(params.name + "");
  const [description, setDescription] = useState(params.description + "");
  const [updateDescription, setUpdateDescription] = useState(
    params.description + ""
  );
  const [dueDate, setDueDate] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "",
    description: "",
  });
  const taskId = params.id;

  const apiUrl: any =
    process.env.EXPO_PUBLIC_API_URL + "/api/v1/tasks/" + taskId;

  const handleEditTask = async () => {
    if (title.trim() === "") {
      setPopupContent({
        title: "Error",
        description: "The title cannot be empty.",
      });
      setPopupVisible(true);
      return;
    } else if (description.trim() === "") {
      setPopupContent({
        title: "Error",
        description: "The description cannot be empty.",
      });
      setPopupVisible(true);
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updateTitle,
          description: description,
          //due_date: dueDate, // Ensure the due date is sent to the server
        }),
      });

      if (response.ok) {
        console.log("Task updated successfully");
        setTitle(updateTitle);
        setDescription(updateDescription);
        setPopupContent({
          title: "Success",
          description: "This task has been updated successfully.",
        });
        setPopupVisible(true);
        // Reset the input fields after successful creation
      } else {
        const errorData = await response.json();
        console.error("Failed to update task:", errorData);
        setPopupContent({
          title: "Error",
          description: `Failed to update task: ${errorData.message}`,
        });
        setPopupVisible(true);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setPopupContent({
        title: "Error",
        description: `Error updating task: `,
      });
      setPopupVisible(true);
    }
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: "white" }}>
        <Appbar.BackAction
          onPress={() =>
            router.replace({
              pathname: "/taskdetails",
              params: {
                name: title,
                taskDescription: description,
                id: taskId,
              },
            })
          }
        />
      </Appbar.Header>
      <View
        style={{ paddingHorizontal: 16, backgroundColor: "#FFFFFF", flex: 1 }}
      >
        <TextHeaderPhoenix style={{ marginTop: 16 }}>
          Edit Task
        </TextHeaderPhoenix>
        <Text
          style={{
            fontFamily: "poppinsregular",
            fontSize: 14,
            color: "#01044B",
          }}
        >
          {i18n.t("Pending_task_for_today")}
        </Text>
        <View style={{ marginTop: 28 }} />
        <InputtextPhoenix
          placeholder="Title"
          value={updateTitle}
          onChangeText={(text: any) => setUpdateTitle(text)}
        />
        <View style={{ marginTop: 16 }} />

        <InputTextMultiPhoenix
          placeholder="Description"
          value={updateDescription}
          onChangeText={(text: any) => setUpdateDescription(text)}
        />
        {/* <View style={{ marginTop: 16 }} /> */}
        {/* <InputtextPhoenix
          placeholder="Due Date"
          onChangeText={(text: any) => setDueDate(text)}
        /> */}
        <View style={{ marginTop: 16 }} />
        <ButtonPhoenix onPress={handleEditTask}>UPDATE</ButtonPhoenix>
        {popupVisible && (
          <Popup
            title={popupContent.title}
            description={popupContent.description}
            onClose={() => {
              setPopupVisible(false);
              if (popupContent.title == "Success") {
                router.replace({
                  pathname: "/taskdetails",
                  params: {
                    name: title,
                    taskDescription: description,
                    id: taskId,
                  },
                });
              }
            }}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default TaskEdit;
