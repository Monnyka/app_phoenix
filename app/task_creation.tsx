import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar, Button } from "react-native-paper";
import { router } from "expo-router";
import InputtextPhoenix from "../components/InputtextPhoenix";
import TextHeaderPhoenix from "../components/TextHeaderPhoenix";
import i18n from "../assets/translations";
import ButtonPhoenix from "../components/ButtonPhoenix";
import AsyncStorage from "@react-native-async-storage/async-storage";

const task_creation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDuedate] = useState("");
  const apiURL = "https://uat.monnyka.top/api/v1/tasks";

  const handleCreateTask = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: title,
          description: description,
        }),
      });

      if (response.ok) {
        console.log("Task created successfully");
        Alert.alert("Success", "Task created successfully.");
        // Reset the input fields after successful creation
        setTitle("");
        setDescription("");
        setDuedate("");
      } else {
        const errorData = await response.json();
        console.error("Failed to create task:", errorData);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: "white" }}>
        <Appbar.BackAction
          onPress={() => {
            router.back();
          }}
        />
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
        <View style={{ marginTop: 28 }}></View>
        <InputtextPhoenix
          placeholder="Title"
          marginTop="20"
          onChangeText={(text: string) => setTitle(text)}
        ></InputtextPhoenix>

        <View style={{ marginTop: 16 }}></View>
        <InputtextPhoenix
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
          onChangeText={(text: string) => setDescription(text)}
        ></InputtextPhoenix>
        <View style={{ marginTop: 16 }}></View>
        <InputtextPhoenix
          placeholder="Due Date"
          onChangeText={(text: string) => setDuedate(text)}
        ></InputtextPhoenix>
        <View style={{ marginTop: 16 }}></View>
        <ButtonPhoenix onPress={handleCreateTask}>SAVE</ButtonPhoenix>
      </View>
    </SafeAreaProvider>
  );
};

export default task_creation;
