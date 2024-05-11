import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

const Popup = ({
  visible,
  onClose,
  title,
  message,
  showCancelButton,
  onOkayPress,
  actionButtonTitle,
}: any) => {
  const handleOkayPress = () => {
    onOkayPress(); // Call the onOkayPress function when Okay button is pressed
    onClose(); // Close the pop-up
  };

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
            {title}
          </Text>
          <Text
            style={{ marginTop: 8, fontFamily: "poppinsregular", fontSize: 12 }}
          >
            {message}
          </Text>

          <View
            style={{
              height: 50,
              flexDirection: "row",
              marginTop: 16,
            }}
          >
            {showCancelButton === null || showCancelButton === undefined ? (
              <Pressable
                style={{
                  flex: 1,
                  width: 200,
                  backgroundColor: "#2E414F",
                  borderRadius: 14,
                  marginEnd: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={onClose}
              >
                <Text
                  style={{ fontFamily: "poppinssemibold", color: "#FFFFFF" }}
                >
                  OK
                </Text>
              </Pressable>
            ) : (
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
                onPress={onClose}
              >
                <Text
                  style={{ fontFamily: "poppinssemibold", color: "#0F0F0F" }}
                >
                  Cancel
                </Text>
              </Pressable>
            )}

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
                onPress={handleOkayPress}
              >
                {actionButtonTitle !== undefined ? (
                  <Text
                    style={{ fontFamily: "poppinssemibold", color: "white" }}
                  >
                    {actionButtonTitle}
                  </Text>
                ) : (
                  <Text
                    style={{ fontFamily: "poppinssemibold", color: "white" }}
                  >
                    OK
                  </Text>
                )}
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
