import * as React from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";

const MyDialog = () => {
  const [visible, setVisible] = React.useState(true);
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">This is simple dialog</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});

export default MyDialog;
