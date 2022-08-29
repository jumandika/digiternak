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

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" translucent={true} />

      <View style={[defaultStyles.container, {}]}>
        <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 42, paddingTop: 94 }]}>Login</Text>
        <Text style={[defaultStyles.baseText, {}]}>Masuk ke akun Anda</Text>
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
          <TextField
            onChangeText={(val) => setPassword(val)}
            value={password}
            label={"Password"}
            placeholder={"Password..."}
            keyboardType="default"
            textType="text"
            textContentType={"password"}
            iconSource={require("../../../assets/password.png")}
            maxLength={13}
            textStyle={{
              flex: 1,
              fontSize: 18,
              padding: 0,
              paddingHorizontal: 10,
            }}
            secureTextEntry={secureTextEntry}
            onPressEye={() => setSecureTextEntry(!secureTextEntry)}
          />
        </View>
        <View style={{ paddingTop: 10 }}>
          <Button onPress={() => props.navigation.push("HomeScreen")} label="Login">
            {isLoading && <Spinner />}
          </Button>
          <Gap height={22} />
          <Text style={[defaultStyles.baseText, { alignSelf: "center" }]}>Atau</Text>
          <Gap height={22} />
          <Button type={"google"} onPress={() => (prevScreen ? submitRegistrationStaff() : submitRegistration())} label="Masuk dengan Akun Google">
            {isLoading && <Spinner />}
          </Button>
        </View>
      </View>
      <View style={[{ flexDirection: "row" }]}>
        <TouchableOpacity onPress={() => props.navigation.navigate("RegistrationScreen")}>
          <Text style={[defaultStyles.baseText, { padding: 5 }]}>Belum punya Akun?</Text>
        </TouchableOpacity>
        <Gap width={70} />
        <TouchableOpacity onPress={() => props.navigation.navigate("LupaScreen")}>
          <Text style={[defaultStyles.baseText, { padding: 5, color: themeStyle.Darkgrey }]}>Lupa Password</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export { LoginScreen };
