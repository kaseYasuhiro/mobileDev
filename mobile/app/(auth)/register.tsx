import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";


export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<any>(null);

  const handleRegister = () => {
    register({ name, email, password, password_confirmation, image:image?.file });
  };


  const pickImage = async () => {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access the media library is required.",
        );
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="bg-white shadow-md p-4 w-full gap-4">
        <Text className="text-xl font-bold text-center">for the love of god pls gumana ka</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="h-12 px-4 border"
          placeholder="Enter your name"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="h-12 px-4 border"
          placeholder="Enter your email"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="h-12 px-4 border"
          placeholder="Enter your password"
          secureTextEntry
        />
        <TextInput
          value={password_confirmation}
          onChangeText={setPasswordConfirmation}
          className="h-12 px-4 border"
          placeholder="Confirm your password"
          secureTextEntry
        />

        <View>
                <TouchableOpacity
                  onPress={pickImage}
                  className="h-12 bg-blue-500 items-center justify-center"
                >
                  <Text className="text-white">Browse Image</Text>
                </TouchableOpacity>
              </View>
              {image && (
                <Image
                  className="h-40"
                  source={{
                    uri: image.uri,
                  }}
                />
              )}

        <TouchableOpacity
          onPress={handleRegister}
          className="h-12 rounded-full bg-blue-500 items-center justify-center"
        >
          <Text className="text-white font-bold">Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
