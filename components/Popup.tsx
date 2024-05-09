import React from "react";
import { Modal, View, Text, Button, Pressable } from "react-native";

const Popup = ({ visible, onClose, text, showCancelButton }: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <View
          style={{
            width: 375,
            backgroundColor: "#EBEBEB",
            padding: 20,
            borderRadius: 16,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "poppinssemibold",
              fontSize: 16,
            }}
          >
            Deleted Task
          </Text>
          <Text
            style={{ marginTop: 8, fontFamily: "poppinsregular", fontSize: 12 }}
          >
            {text}
          </Text>

          <View
            style={{
              height: 50,
              flexDirection: "row",
              marginTop: 16,
            }}
          >
            <Pressable
              style={{
                flex: 1,
                width: 200,
                backgroundColor: "#A4A4A4",
                borderRadius: 14,
                marginEnd: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "poppinssemibold", color: "#0F0F0F" }}>
                Cencel
              </Text>
            </Pressable>
            {showCancelButton && (
              <Pressable
                style={{
                  flex: 1,
                  width: 200,
                  backgroundColor: "#FF1D1D",
                  borderRadius: 14,
                  marginStart: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={onClose}
              >
                <Text style={{ fontFamily: "poppinssemibold", color: "white" }}>
                  Delete
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
