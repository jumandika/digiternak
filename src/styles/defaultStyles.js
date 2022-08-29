import { StyleSheet } from "react-native";
import themeStyle from "./theme.style";
import fontStyle from "./font.style";

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: fontStyle.NunitoSansRegular,
    fontSize: 16,
    color: themeStyle.BLACK,
  },
  linkText: {
    fontFamily: fontStyle.NunitoSansRegular,
    fontSize: 16,
    color: "#fff",
  },
  baseTextMedium: {
    fontFamily: fontStyle.NunitoSansBlack,
    fontSize: 16,
    color: themeStyle.BLACK,
  },
  baseTextLight: {
    fontFamily: fontStyle.NunitoSansLight,
    fontSize: 16,
    color: themeStyle.BLACK,
  },
  baseTextBold: {
    fontFamily: fontStyle.NunitoSansBold,
    fontSize: 16,
    color: themeStyle.BLACK,
  },
  baseTextExtraBold: {
    fontFamily: fontStyle.NunitoSansExtraBold,
    fontSize: 16,
    color: themeStyle.BLACK,
  },
  baseTextExtra: {
    fontFamily: fontStyle.NunitoSansExtraBold,
    fontSize: 33,
    color: "#FFF",
  },
  buttonContainer: {
    overflow: "hidden",
    height: 65,
    backgroundColor: themeStyle.PRIMARY_COLOR,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { defaultStyles };
