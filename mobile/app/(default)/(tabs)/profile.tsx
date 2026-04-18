import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function Profile() {
  const [image, setImage] = useState<any>(null);
  const { logout } = useAuth();
  const { user } = useAuth();

  return (
    <View>

      <View className="">
        <Text>Name: {user?.name}</Text>
        <Text>Email: {user?.email}</Text>
        <Image source={{ uri: `http://127.0.0.1:8000/storage/${user?.image}` }} className="w-100 h-80 mb-10 rounded-md"></Image>
      </View>


      <TouchableOpacity
        onPress={logout}
        className="h-12 rounded-full bg-blue-500 items-center justify-center"
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
