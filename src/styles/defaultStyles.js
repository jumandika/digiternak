import { StyleSheet } from "react-native";
import themeStyle from "./theme.style";
import fontStyle from "./font.style";

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    baseText: {
        fontFamily: fontStyle.MulishRegular,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    linkText: {
        fontFamily: fontStyle.MulishRegular,
        fontSize: 16,
        color: themeStyle.PRIMARY_COLOR
    },
    baseTextMedium: {
        fontFamily: fontStyle.MulishMedium,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    baseTextLight: {
        fontFamily: fontStyle.MulishLight,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    baseTextBold: {
        fontFamily: fontStyle.MulishBold,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    baseTextExtraBold: {
        fontFamily: fontStyle.MulishExtraBold,
        fontSize: 16,
        color: themeStyle.BLACK
    },
    buttonContainer: {
        overflow: 'hidden',
        height: 50,
        backgroundColor: themeStyle.PRIMARY_COLOR,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export {
    defaultStyles,
}