import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Image } from "react-native";
import { HeaderNavbar } from "../../components/HeaderNavbar";
import { defaultStyles } from "../../styles/defaultStyles";
import themeStyle from "../../styles/theme.style";

const Order = ({ navigation }) => {
  const [data, setData] = useState([
    {
      invois: "INV0029",
      date: "20 May 2019 - 08:22 AM",
      profile: require("../../../assets/goat.png"),
      namaProduk: "Domba Tanduk Tipe A",
      harga: "Rp 2.500.098",
      status: "tertunda",
    },
    {
      invois: "INV0029",
      date: "20 May 2019 - 08:22 AM",
      profile: require("../../../assets/goat.png"),
      namaProduk: "Domba Digul 003",
      harga: "Rp 2.200.098",
      status: "selesai",
    },
    {
      invois: "INV0029",
      date: "20 May 2019 - 08:22 AM",
      profile: require("../../../assets/goat.png"),
      namaProduk: "Sapi Bali",
      harga: "Rp 26.310.271",
      status: "dibatalkan",
    },
    {
      invois: "INV0029",
      date: "20 May 2019 - 08:22 AM",
      profile: require("../../../assets/goat.png"),
      namaProduk: "Sapi Bali",
      warna: "Hitam, Merah, Putih",
      harga: "Rp 26.310.271",
      status: "dibatalkan",
    },
  ]);

  const [dataTampil, setDataTampil] = useState(data);

  const [filter, setFilter] = useState([
    { namaFilter: "Produk", tipe: "namaProduk" },
    { namaFilter: "Semua", tipe: "brand,harga,warna" },
    { namaFilter: "Pasar Hewan", tipe: "harga" },
    { namaFilter: "Qurban Berbagi", tipe: "harga" },
  ]);

  function filterData(item) {
    let dataHasilFilter = [...data];

    if (item.tipe == "invois") {
      dataHasilFilter = dataHasilFilter.filter((x) => x.invois == item.namaFilter);
    }

    if (item.tipe == "date") {
      dataHasilFilter = dataHasilFilter.filter((x) => x.date.includes(item.namaFilter));
    }

    setDataTampil(dataHasilFilter);
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderNavbar title="Daftar Pembelian" />
      <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
        <FlatList
          horizontal
          data={filter}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginHorizontal: 5,
                marginTop: 10,
                backgroundColor: "#FFFFFF",
                elevation: 2,
                height: 30,
                paddingHorizontal: 20,
                borderRadius: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => filterData(item)}
            >
              <Text>{item.namaFilter}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={dataTampil}
        renderItem={({ item }) => {
          let bColor = themeStyle.PRIMARY_COLOR;
          if (item.status == "tertunda") bColor = themeStyle.GREY;
          if (item.status == "dibatalkan") bColor = themeStyle.RED_COLOR;
          return (
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 10,
                backgroundColor: "#FFFFFF",
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.05,
                shadowRadius: 10,
              }}
            >
              <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#F1F1F1" }}>
                <Text style={defaultStyles.baseTextBold}>#{item.invois}</Text>
                <Text style={defaultStyles.baseText}>{item.date}</Text>
              </View>
              <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                <Image source={item.profile} style={{ margin: 10, resizeMode: "cover", height: 60, width: 60, borderRadius: 6 }} />
                <View style={{ flex: 1 }}>
                  <Text style={defaultStyles.baseTextBold}>{item.namaProduk}</Text>
                  <Text style={[defaultStyles.baseTextBold, { color: themeStyle.PRIMARY_COLOR }]}>{item.harga}</Text>
                </View>
                <View style={{ alignSelf: "flex-end", alignItems: "center", borderRadius: 4, backgroundColor: bColor, height: 22, width: 90, paddingHorizontal: 10, margin: 10 }}>
                  <Text style={[defaultStyles.baseText, { color: themeStyle.WHITE }]}>{item.status}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export { Order };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
