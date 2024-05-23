import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Checkbox,
  TouchableRipple,
} from "react-native-paper";
import LottieView from "lottie-react-native";
import { router, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompleteTask = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const navigation = useNavigation();

  // const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;
  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;
  console.log(apiUrl);

  const getTasks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(apiUrl + "/api/v1/tasks?completed=true", {
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
      setData(json.tasks); // Update the component state with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Handle error appropriately, e.g., show a message to the user
    } finally {
      setLoading(false);
    }
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
          completed: false,
        }),
      });

      if (response.ok) {
        console.log("Task updated successfully");
        getTasks();
        // Reset the input fields after successful creation
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error update task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  //Using the react-navigation library
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTasks();
    });
    // Clean up the listener when the component is unmounted
    return unsubscribe;
  }, [navigator]);

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
                taskCreateDate: item.createDate,
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
                paddingEnd: 30,
              }}
            >
              <Checkbox.Android
                status={checked ? "unchecked" : "checked"}
                color="#000000"
                onPress={() => {
                  console.log("Item is clicked " + item._id);
                  updateTask(item._id);
                }}
              />
              <Text
                style={{
                  fontFamily: "poppinssemibold",
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

  return (
    <View>
      <FlatList
        style={{ marginTop: 6 }}
        data={data}
        contentContainerStyle={{ paddingBottom: 88 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={getTasks}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <LottieView
              style={{
                flex: 1,
                width: 250,
              }}
              source={require("../assets/Animation - 1703491775913.json")}
              autoPlay
              loop={false}
            />
            <Text
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
                fontFamily: "poppinssemibold",
                color: "white",
              }}
            >
              There is no pending task for today.
            </Text>
          </View>
        }
      />

      {isLoading ? (
        <View
          style={{
            marginTop: 20,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={"#69CA46"}
          />
          <Text style={{ fontFamily: "poppinsregular", fontSize: 18 }}>
            LOADING DATA
          </Text>
        </View>
      ) : (
        <View
          style={{
            marginTop: 16,
            flex: 1,
          }}
        ></View>
      )}
    </View>
  );
};

export default CompleteTask;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  item: {
    backgroundColor: "#E6EDFB",
    borderRadius: 14,
  },
});
