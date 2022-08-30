import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, ToastAndroid, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Spinner } from "../../components/Spinner";
import { TextField } from "../../components/TextField";
import { phoneLogin } from "../../service/Apis";
import RNBootSplash from "react-native-bootsplash";
import { defaultStyles } from "../../styles/defaultStyles";
import themeStyle from "../../styles/theme.style";
import { Gap } from "../../components/Gap";

const LupaScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  const submitLogin = async () => {
    if (!phoneNumber) return;
    setIsLoading(true);
    let bodyLogin = {
      phone: phoneNumber.replace(/^0+/, ""),
    };
    const responseLogin = await phoneLogin(bodyLogin);
    console.log("responseLogin", responseLogin);
    if (responseLogin.status == true) {
      setIsLoading(false);
      props.navigation.navigate("OTPScreen", { userID: responseLogin.data.users_id, otp: responseLogin.data.tokens });
    } else {
      setIsLoading(false);
      ToastAndroid.show(responseLogin.message, ToastAndroid.BOTTOM);
    }
  };

  return (
    <Screen type={"fixed"} style={{ padding: 25 }}>
      <StatusBar backgroundColor={themeStyle.SECONDARY_COLOR}  barStyle="light-content" translucent={true} />

      <View style={[defaultStyles.container, {}]}>
        <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 42, paddingTop: 94 }]}>Lupa Password</Text>
        <Text style={[defaultStyles.baseText, {}]}>Masukkan e-mail untuk reset password</Text>
        <View style={{ paddingTop: 40 }}>
          <TextField
            onChangeText={(val) => setPhoneNumber(val)}
            value={phoneNumber}
            label={"Nomor Handphone"}
            placeholder={"E-mail..."}
            keyboardType="numeric"
            textType="text"
            iconSource={require("../../../assets/email.png")}
            maxLength={13}
            textStyle={{
              flex: 1,
              fontSize: 18,
              padding: 0,
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View style={{ paddingTop: 10 }}>
          <Button onPress={() => props.navigation.push("LoginScreen")} label="Reset Password">
            {isLoading && <Spinner />}
          </Button>
          <Gap height={22} />
          <Text style={[defaultStyles.baseText, { alignSelf: "center" }]}>Atau</Text>
          <Gap height={22} />
          <Button type={"secondary"} onPress={() => props.navigation.push("RegistrationScreen")} label="Buat Akun Baru">
            {isLoading && <Spinner />}
          </Button>
        </View>

        <View style={[{ flexDirection: "row", justifyContent: "center", paddingTop: 20 }]}></View>
      </View>
      <View style={[{ flexDirection: "row", justifyContent: "center" }]}></View>
    </Screen>
  );
};

export { LupaScreen };
