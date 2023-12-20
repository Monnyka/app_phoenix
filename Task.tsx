import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Checkbox,
  FAB,
  MD2Colors,
  ProgressBar,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function Task({ onPress }: any) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checked, setChecked] = React.useState(false);

  //navigation instance
  const navigation = useNavigation();

  const getTasks = async () => {
    try {
      const response = await fetch("https://uat.monnyka.top/api/v1/tasks");
      const json = await response.json();
      setData(json.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const request = await fetch(
        "https://uat.monnyka.top/api/v1/tasks/" + id,
        { method: "DELETE" }
      );

      if (request.status === 200) {
        // Remove the deleted item from the data array
        setData((prevData) => prevData.filter((item) => item._id !== id));
      }

      const jsons = await request.json();
      //setMsg(jsons.msg);
      console.log(jsons);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <TouchableRipple
          onPress={() => console.log("Pressed")}
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
                paddingEnd: 30,
              }}
            >
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  console.log("Item is clicked " + item._id);
                  deleteTask(item._id);
                }}
              />
              <Text
                style={{
                  fontFamily: "poppinssemibold",
                  fontSize: 14,
                  textTransform: "capitalize",
                  marginTop: 4,
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
    <LinearGradient
      // Background Linear Gradient
      colors={["#98BEFA", "#2756FF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        //add edges to remote the unwated padding at the bottom
        edges={["top", "left", "right"]}
        style={{ paddingTop: 8, paddingHorizontal: 14, flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable onPress={() => router.push("./profile")}>
              <Avatar.Image size={45} source={require("./assets/icon.png")} />
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
                  fontFamily: "montserratbold",
                  color: "#626262",
                  fontSize: 12,
                }}
              >
                Welcome back, Have a nice day!
              </Text>
              <Text style={{ fontFamily: "montserratbold", fontSize: 16 }}>
                Monnyka Pin
              </Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/settings")}>
            <Avatar.Icon size={35} icon={"cog"} />
          </Pressable>
        </View>
        <Text
          style={{
            marginTop: 30,
            fontFamily: "crimsonprobold",
            fontSize: 36,
            color: "#01044B",
          }}
        >
          Task for today
        </Text>
        <Text
          style={{
            fontFamily: "poppinsregular",
            fontSize: 11,
            color: "#01044B",
          }}
        >
          Manage your pending task
        </Text>

        <View style={{ flexDirection: "row", marginTop: 18 }}>
          <Button
            icon="clock-time-four"
            buttonColor="#69CA46"
            mode="contained"
            onPress={() => console.log("Pressed")}
            style={{ marginRight: 10 }}
          >
            <Text style={{ fontFamily: "poppinsregular" }}>Pending</Text>
          </Button>
          <Button
            icon="check-decagram"
            mode="contained"
            buttonColor="#D9D9D9"
            textColor="#414141"
            onPress={() => console.log("Pressed")}
          >
            <Text style={{ fontFamily: "poppinsregular" }}>Pending</Text>
          </Button>
        </View>
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
              //backgroundColor: "#69CA46",
              marginTop: 20,
              flex: 1,
            }}
          >
            {data ? (
              <FlatList
                style={{ flex: 1 }}
                data={data}
                contentContainerStyle={{ paddingBottom: 88 }}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
              />
            ) : (
              <Text>No data</Text>
            )}
          </View>
        )}
      </SafeAreaView>
      <FAB
        icon="pencil-plus-outline"
        color="#ffff"
        label="Add Task"
        style={styles.fab}
        onPress={onPress}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    height: 56,
    backgroundColor: "#69CA46",
    fontFamily: "poppinsregular",
  },
  item: {
    backgroundColor: "#C1D9FD",
    borderRadius: 14,
  },
});
