import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Notification = ({ message, isVisible }) => {
  const [showNotification, setShowNotification] = useState(isVisible);

  useEffect(() => {
    setShowNotification(isVisible);

    // Auto-hide the notification after a few seconds (optional)
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Hide the notification after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!showNotification) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  message: {
    color: "white",
    fontSize: 16,
  },
});

export default Notification;
