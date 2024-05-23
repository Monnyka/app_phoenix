import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import InputtextPhoenix from "../components/InputtextPhoenix";
import TextHeaderPhoenix from "../components/TextHeaderPhoenix";
import i18n from "../assets/translations";
import ButtonPhoenix from "../components/ButtonPhoenix";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "../components/Popup";

const TaskCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "",
    description: "",
  });

  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL + "/api/v1/tasks";

  const handleCreateTask = async () => {
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
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: title,
          description: description,
          due_date: dueDate, // Ensure the due date is sent to the server
        }),
      });

      if (response.ok) {
        console.log("Task created successfully");
        setPopupContent({
          title: "Success",
          description: "This task has been created successfully.",
        });
        setPopupVisible(true);
        // Reset the input fields after successful creation
        setTitle("");
        setDescription("");
        setDueDate("");
      } else {
        const errorData = await response.json();
        console.error("Failed to create task:", errorData);
        setPopupContent({
          title: "Error",
          description: `Failed to create task: ${errorData.message}`,
        });
        setPopupVisible(true);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setPopupContent({
        title: "Error",
        description: `Error creating task: `,
      });
      setPopupVisible(true);
    }
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: "white" }}>
        <Appbar.BackAction onPress={() => router.back()} />
      </Appbar.Header>
      <View
        style={{ paddingHorizontal: 16, backgroundColor: "#FFFFFF", flex: 1 }}
      >
        <TextHeaderPhoenix style={{ marginTop: 16 }}>
          {i18n.t("Create_Task")}
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
          onChangeText={(text: any) => setTitle(text)}
        />
        <View style={{ marginTop: 16 }} />
        <InputtextPhoenix
          placeholder="Description"
          onChangeText={(text: any) => setDescription(text)}
        />
        {/* <View style={{ marginTop: 16 }} /> */}
        {/* <InputtextPhoenix
          placeholder="Due Date"
          onChangeText={(text: any) => setDueDate(text)}
        /> */}
        <View style={{ marginTop: 16 }} />
        <ButtonPhoenix onPress={handleCreateTask}>SAVE</ButtonPhoenix>
        {popupVisible && (
          <Popup
            title={popupContent.title}
            description={popupContent.description}
            onClose={() => {
              setPopupVisible(false);
            }}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default TaskCreation;
