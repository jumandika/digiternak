import React from "react";
import { Text, StyleSheet, TouchableNativeFeedback, View, Image } from "react-native";
import { defaultStyles } from "../styles/defaultStyles";
import themeStyle from "../styles/theme.style";

const Button = ({ type, children, onPress, label, style, fontStyle, disabled }) => {
  if (type == "secondary") {
    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(0,0,0,0.05)")} onPress={onPress}>
        <View style={[defaultStyles.buttonContainer, { borderWidth: 1.6, borderColor: themeStyle.PRIMARY_COLOR, backgroundColor: "#FFF", ...style }]}>
          {children ? children : <Text style={[defaultStyles.baseTextBold, { fontSize: 22, color: themeStyle.PRIMARY_COLOR, ...fontStyle }]}>{label}</Text>}
        </View>
      </TouchableNativeFeedback>
    );
  }
  if (type == "google") {
    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(0,0,0,0.05)")} onPress={onPress}>
        <View style={[defaultStyles.buttonContainer, { backgroundColor: "#FFF", ...style }]}>
          {children ? (
            children
          ) : (
            <View style={styles.text}>
              <Image source={require("../../assets/google-logo.png")} style={{ height: 20, width: 20, marginRight: 20 }} />
              <Text style={[defaultStyles.baseTextBold, { fontSize: 18, color: themeStyle.GREY, ...fontStyle }]}>{label}</Text>
            </View>
          )}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(0,0,0,0.05)")} onPress={onPress}>
      <View
        style={[
          defaultStyles.buttonContainer,
          {
            backgroundColor: disabled ? "#E9E9E9" : themeStyle.PRIMARY_COLOR,
            justifyContent: "center",
            alignItems: "center",
            ...style,
          },
        ]}
      >
        {children ? children : <Text style={[defaultStyles.baseTextBold, { fontSize: 22, color: "#FFF", ...fontStyle }]}>{label}</Text>}
      </View>
    </TouchableNativeFeedback>
  );
};

export { Button };

const styles = StyleSheet.create({
  text: { flexDirection: "row", alignItems: "center" },
});
