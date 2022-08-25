import { StyleSheet } from "react-native";
import themeStyle from "./theme.style";
import fontStyle from "./font.style";

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    baseText: {
        fontFamily: fontStyle.NunitoSansRegular,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    linkText: {
        fontFamily: fontStyle.NunitoSansRegular,
        fontSize: 16,
        color: themeStyle.PRIMARY_COLOR
    },
    baseTextMedium: {
        fontFamily: fontStyle.NunitoSansMedium,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    baseTextLight: {
        fontFamily: fontStyle.NunitoSansLight,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    baseTextBold: {
        fontFamily: fontStyle.NunitoSansBold,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    baseTextExtraBold: {
        fontFamily: fontStyle.NunitoSansExtraBold,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    buttonContainer: {
        overflow: 'hidden',
        height: 60,
        backgroundColor: themeStyle.PRIMARY_COLOR,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export {
    defaultStyles,
}