import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import TextHeader from "./components/TextHeaderPhoenix";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "./assets/translations/index";
import { LanguageContext, LanguageProvider } from "./LanguageContext";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const Project = () => {
  //Translation
  const [data, setData] = useState([]);
  const { language, changeLanguage } = useContext(LanguageContext)!;
  i18n.locale = language;
  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;

  const getProject = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(apiUrl + "/api/v1/projects", {
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
      setData(json.projects);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.itemProject}
        onPress={() => {
          router.push({
            pathname: "/project_details",
            params: {
              id: item._id,
              name: item.name,
              description: item.description,
              createdAt: item.createdAt,
              dueDate: item.dueDate,
            },
          });
        }}
      >
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={3}>
          {item.description}
        </Text>
        <View
          style={{
            flex: 1,
            marginVertical: 4,
            height: 1,
            backgroundColor: "#4B4A4A20",
          }}
        />
        <Text style={styles.itemTime}>{moment(item.createdAt).fromNow()}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getProject();
  }, []); // Ensures API call happens only once on mount

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#FAFAFA", "#FAFAFA"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        //add edges to remote the unwated padding at the bottom
        edges={["top", "left", "right"]}
        style={{ paddingTop: 16, paddingHorizontal: 0, flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable>
              <Avatar.Image
                size={45}
                source={require("./assets/pikachu.jpg")}
              />
            </Pressable>
            <View
              style={{
                flexDirection: "column",
                marginLeft: 8,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "poppinssemibold",
                  color: "#626262",
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {i18n.t("Welcome_back_Have_a_nice_day")}
              </Text>
              <Text style={{ fontFamily: "poppinssemibold", fontSize: 16 }}>
                Monnyka Pin
              </Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/settings")}>
            <Avatar.Icon size={35} icon={"cog"} />
          </Pressable>
        </View>
        <TextHeader style={{ marginTop: 30, paddingLeft: 16 }}>
          Project
        </TextHeader>
        <View style={styles.container}>
          <FlatList data={data} renderItem={renderItem} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Project;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 12,
    paddingHorizontal: 18,
  },
  itemProject: {
    backgroundColor: "#E6EDFB",
    borderRadius: 14,
    marginBottom: 8,
    padding: 14,
  },
  itemTitle: {
    fontFamily: "poppinsbold",
    fontSize: 14,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  itemDescription: {
    color: "#4B4A4A",
    fontFamily: "poppinsregular",
    fontSize: 13,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  itemTime: {
    color: "#4B4A4A",
    fontFamily: "poppinsregular",
    fontSize: 13,
    textTransform: "capitalize",
    marginTop: 6,
  },
});
