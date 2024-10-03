import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Chip, Menu, PaperProvider } from "react-native-paper";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import i18n from "../assets/translations/index";
import { LanguageContext, LanguageProvider } from "../LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "../components/Popup";

const taskdetails = () => {
  const params = useLocalSearchParams();
  const taskId = params.id;
  const name = params.name;
  const taskDescription = params.taskDescription;
  const taskCreateDate = params.taskCreateDate;
  const taskDueDate = params.taskDueDate;
  let taskStatus = params.taskStatus;
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  //Translation
  const { language, changeLanguage } = useContext(LanguageContext)!;
  i18n.locale = language;

  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;

  const deleteTask = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const request = await fetch(apiUrl + "/api/v1/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (request.status === 200) {
        router.back();
      }
      const jsons = await request.json();
      console.log(jsons);
    } catch (error) {
      console.error(error);
    }
  };

  //POPUP
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  return (
    <PaperProvider>
      <LinearGradient
        // Background Linear Gradient
        colors={["#FAFAFA", "#FAFAFA"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
          <Appbar.Header
            style={{
              backgroundColor: "#ffffff00",
              justifyContent: "space-between",
            }}
          >
            <Appbar.BackAction
              onPress={() => {
                router.back();
              }}
            />

            {/* // <Appbar.Action icon="pencil" onPress={() => {}} /> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Menu
                style={{ paddingTop: 50 }}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Appbar.Action
                    icon="dots-vertical"
                    onPress={() => setVisible(true)}
                  />
                }
              >
                <Menu.Item
                  leadingIcon="file-edit-outline"
                  onPress={() => {
                    closeMenu();
                    router.replace({
                      pathname: "/task_edit",
                      params: {
                        id: taskId,
                        name: name,
                        description: taskDescription,
                      },
                    });
                  }}
                  title="Edit"
                />
                <Menu.Item
                  leadingIcon="delete"
                  onPress={() => {
                    closeMenu();
                    setShowPopupDelete(true);
                  }}
                  title="Delete"
                />
                {/* <Divider /> */}
              </Menu>
            </View>
          </Appbar.Header>
          <StatusBar backgroundColor="#4CAF4F00" hidden={false} />
          <View style={styles.container}>
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "poppinsbold",
                  fontSize: 22,
                  color: "#151823",
                }}
              >
                {name}
              </Text>
              <Text
                style={{
                  fontFamily: "poppinssemibold",
                  fontSize: 14,
                  color: "#01044B",
                  marginTop: 16,
                }}
              >
                {i18n.t("Description")}
              </Text>
              <Text
                style={{
                  fontFamily: "poppinsregular",
                  fontSize: 14,
                  marginTop: 6,
                  color: "#414141",
                }}
              >
                {taskDescription}
              </Text>

              {/* Status Container */}
              <View
                style={{
                  backgroundColor: "#F2F2F2",
                  marginTop: 16,
                  padding: 14,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    fontFamily: "poppinssemibold",
                    fontSize: 14,
                    color: "#959595",
                  }}
                >
                  {i18n.t("Created_Date")}
                </Text>
                <Text
                  style={{
                    fontFamily: "poppinsregular",
                    fontSize: 14,
                    color: "#414141",
                  }}
                >
                  {moment(taskCreateDate).format("DD MMM, YYYY")}
                </Text>
                {taskDueDate ? (
                  <>
                    <Text
                      style={{
                        fontFamily: "poppinssemibold",
                        fontSize: 14,
                        color: "#959595",
                        marginTop: 8,
                      }}
                    >
                      {i18n.t("Due_Date")}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "poppinsregular",
                        fontSize: 14,
                        color: "#414141",
                      }}
                    >
                      {moment(taskDueDate).format("DD MMM, YYYY")}
                    </Text>
                  </>
                ) : null}

                <Text
                  style={{
                    fontFamily: "poppinssemibold",
                    fontSize: 14,
                    color: "#959595",
                    marginTop: 4,
                  }}
                >
                  {i18n.t("Status")}
                </Text>
                <View style={{ flexWrap: "wrap", marginTop: 6 }}>
                  {taskStatus == "true" ? (
                    <Chip style={{ backgroundColor: "#69CA46" }}>
                      <Text style={{ color: "white" }}>
                        {i18n.t("Completed")}
                      </Text>
                    </Chip>
                  ) : (
                    <Chip style={{ backgroundColor: "#2E414F" }}>
                      <Text style={{ color: "white" }}>
                        {i18n.t("Pending")}
                      </Text>
                    </Chip>
                  )}
                </View>
              </View>
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
          <Popup
            title="Delete"
            description="Are you sure you want to delete the task?"
            visible={showPopupDelete}
            actionButtonTitle="Delete"
            showCancelButton={true}
            onOkayPress={() => deleteTask(taskId)}
            onClose={() => setShowPopupDelete(false)}
          />

          {/* <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Icon icon="alert" />
              <Dialog.Title style={{ textAlign: "center" }}>
                {i18n.t("Confirmation")}
              </Dialog.Title>
              <Dialog.Content>
                <Text style={{ textAlign: "center" }}>
                  {i18n.t("MSG_DELETE_TASK")}
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setVisible(false)}>
                  {i18n.t("Cancel")}
                </Button>
                <Button onPress={() => deleteTask(taskId)}>
                  <Text style={{ color: "red" }}>{i18n.t("Delete")}</Text>
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal> */}
        </SafeAreaView>
      </LinearGradient>
    </PaperProvider>
  );
};

export default taskdetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
