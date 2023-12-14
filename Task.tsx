import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  Avatar,
  Button,
  Checkbox,
  FAB,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Task = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checked, setChecked] = React.useState(false);
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
        //onToggleSnackBar();
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
          // rippleColor="rgba(0, 0, 0, .32)"
          borderless
          style={{ padding: 16, borderRadius: 16 }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                //backgroundColor: "#458989",
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
                }}
              >
                {item.name}
              </Text>

              <View></View>
            </View>
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
              numberOfLines={1}
            >
              {item.description}
            </Text>
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
      <SafeAreaView style={{ padding: 16 }}>
        <StatusBar backgroundColor="#4CAF5000" hidden={false} />
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
            <Avatar.Image size={45} source={require("./assets/icon.png")} />
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
          <Avatar.Icon size={35} icon={"cog"} />
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
            Pending
          </Button>
          <Button
            icon="check-decagram"
            mode="contained"
            buttonColor="#D9D9D9"
            textColor="#414141"
            onPress={() => console.log("Pressed")}
          >
            Completed
          </Button>
        </View>
        <FlatList
          style={{ marginTop: 12 }}
          data={data}
          contentContainerStyle={{ paddingBottom: 0 }}
          renderItem={renderItem}
        />
        <FAB
          icon="pencil-plus-outline"
          style={styles.fab}
          onPress={() => console.log("Fab is Pressed")}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Task;

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
  },
  item: {
    backgroundColor: "#C1D9FD",
    marginBottom: 8,
    borderRadius: 14,
  },
});