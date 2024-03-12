import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import moment from "moment";
import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import i18n from "../assets/translations/index";
import { LanguageContext, LanguageProvider } from "../LanguageContext";

const CreateTask = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [createDate, setCreateDate] = React.useState(moment());
  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;
  //Translation
  const { language, changeLanguage } = useContext(LanguageContext)!;
  i18n.locale = language;

  const createTask = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: title,
          description: description,
          completed: checked,
          createDate: createDate,
        }),
      });

      if (response.ok) {
        console.log("Task created successfully");
        // Reset the input fields after successful creation
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <View style={{ marginHorizontal: 18 }}>
      <Text
        style={{
          fontFamily: "crimsonprobold",
          fontSize: 28,
          marginTop: 22,
        }}
      >
        {i18n.t("Create_Task")}
      </Text>
      <Text
        style={{
          marginBottom: 26,
          fontFamily: "poppinsregular",
          fontSize: 13,
          color: "#6B6B6B",
        }}
      >
        {i18n.t("SLG_CREATE_TASK")}
      </Text>

      <BottomSheetTextInput
        placeholder={i18n.t("Task_title")}
        value={title}
        onChangeText={(title) => setTitle(title)}
        style={{
          borderRadius: 10,
          paddingHorizontal: 20,
          marginBottom: 8,
          fontFamily: "poppinsregular",
          backgroundColor: "#D3E4FC",
          height: 58,
        }}
      />
      <BottomSheetTextInput
        placeholder={i18n.t("Description")}
        value={description}
        multiline={false}
        onChangeText={(description) => setDescription(description)}
        style={{
          borderRadius: 10,
          paddingHorizontal: 20,
          marginBottom: 8,
          fontFamily: "poppinsregular",
          backgroundColor: "#D3E4FC",
          height: 58,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox.Android
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>{i18n.t("Completed")}?</Text>
      </View>

      <Button
        icon="floppy"
        mode="contained"
        buttonColor="#69CA46"
        onPress={() => {
          console.log(title + " " + description);
          if (title !== "") {
            setTitle("");
            setDescription("");
            setChecked(false);
            createTask();
          }
        }}
        style={{
          marginTop: 8,
          paddingVertical: 4,
          height: 52,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontFamily: "poppinssemibold",
            marginTop: 12,
            borderRadius: 10,
          }}
        >
          {i18n.t("Save_Task")}
        </Text>
      </Button>
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({});
