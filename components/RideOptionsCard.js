import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { MyImages } from "../assets/images";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "bolt",
    title: "Bolt",
    multiplier: 0.6,
    image: MyImages.bolt,
  },
  {
    id: "basic",
    title: "Basic",
    multiplier: 0.7,
    image: MyImages.basic,
  },
  {
    id: "electric",
    title: "Electric",
    multiplier: 0.9,
    image: MyImages.electric,
  },
];

const SURGE_CHARGE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(data[0]);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-6 mx-4 rounded-xl ${
              id === selected?.id && "bg-green-100"
            }`}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
              }}
              source={image}
            />
            <View style={tw`ml-6 flex-grow`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text style={tw`text-xs`}>
                {travelTimeInformation?.duration.text} travel time
              </Text>
            </View>
            <Text style={tw`text-xl `}>
              {new Intl.NumberFormat("ee", {
                style: "currency",
                currency: "EUR",
              }).format(
                (travelTimeInformation?.duration.value * multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity style={tw`bg-green-400 py-3 mx-4 mt-2 rounded-xl`}>
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
