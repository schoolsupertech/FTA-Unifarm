import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/colors";


const dataHistory = [
    {
        id: 1,
        title: "Thanh toán hóa đơn 32F32AFCGDF thành công",
        price: "50.000 đ",
        dateTime: '12:02 01/04/2024'
    },
    {
        id: 2,
        title: "Thanh toán hóa đơn XD23V3SFV thành công nè",
        price: "45.000 đ",
        dateTime: '01:02 01/04/2024'
    }
]

const WalletScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 'auto', backgroundColor: Colors.primaryGreen700 }}>
        <View style={styles.topHeader}>
          <Ionicons name={"wallet-outline"} size={28} color={"white"} />
          <Text style={styles.textHeader}>Ví</Text>
          <Ionicons name={"person-circle-outline"} size={28} color={"white"} />
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "white", fontWeight: "500" }}>
            Số dư ví (đ)
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-between'}}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 40,
              
            }}
          >
            465.000
          </Text>
          <TouchableOpacity style={{paddingVertical: 10,paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 5}}>
            <Text style={{color: Colors.primaryGreen700, fontWeight: 'bold', fontSize: 16}}>Nạp tiền</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, borderTopWidth: 1, borderTopColor: 'white', paddingTop: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center', }}>
          <Ionicons name={"card"} size={20} color={"white"} />
          <Text style={{color: "white",
              fontWeight: "500",
              fontSize: 14,}}>{"  "}Bấm vào đây để rút tiền</Text>
          </View>
          <Ionicons name={"chevron-forward"} size={20} color={"white"} />

          </TouchableOpacity>
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Hoạt động gần đây</Text>
        <FlatList
            data={dataHistory}
            renderItem={({item,index})=>(
                <TouchableOpacity style={{marginTop: 10, flexDirection: 'row', padding: 25, backgroundColor: 'white', borderRadius: 5}}>
                    <Ionicons name="cash" size={40} color={Colors.primaryGreen700}/>
                    <View style={{marginLeft: 10, flex: 1 }}>
                        <Text style={{fontWeight: '600'}}>{item.title}</Text>
                        <Text style={{fontSize: 12, marginTop: 5}}>{item.dateTime}</Text>
                    </View>
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: 'red', alignSelf: 'center'}}>- {item.price}</Text>

                </TouchableOpacity>
            )}
            />
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryGreen700,
    alignItems: "center",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
