import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name || !email || !password || !password_confirmation || !image) {
      setGeneralError("Please fill in all fields");
      return;
    }
    

    try {
      await register({ name, email, password, password_confirmation, image:image?.file });
      setErrors({});
      setGeneralError(null);
    } catch (err: any) {
      if (err.response?.status === 422) {
        const responseData = err.response.data;

        if (responseData.errors) {
          setErrors(responseData.errors);
          setGeneralError(null);
        } else if (responseData.message) {
          setErrors({});
          setGeneralError(responseData.message);
        }
      }
    } 
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
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
      quality: 0.8,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center justify-center p-6">
        <View className="w-full max-w-sm mt-8">
          {/* Header */}
          <View className="mb-8 items-center">
            <View className="w-20 h-20 bg-lime-500 rounded-full items-center justify-center mb-4">
              <Text className="text-4xl text-white font-bold">B</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-800">Create Account</Text>
            <Text className="text-gray-500 mt-2">Join our community today</Text>
          </View>

          {/* Error Message */}
        {generalError && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-500 text-sm text-center">{generalError}</Text>
          </View>
        )}

          {/* Name Input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="h-12 px-4 border border-gray-200 rounded-lg bg-gray-50"
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
            {errors.name && (
              <Text className="text-red-500 text-xs mt-1">{errors.name[0]}</Text>
            )}
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="h-12 px-4 border border-gray-200 rounded-lg bg-gray-50"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1">{errors.email[0]}</Text>
            )}
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="h-12 px-4 border border-gray-200 rounded-lg bg-gray-50"
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1">{errors.password[0]}</Text>
            )}
          </View>

          {/* Confirm Password Input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Confirm Password</Text>
            <TextInput
              value={password_confirmation}
              onChangeText={setPasswordConfirmation}
              className="h-12 px-4 border border-gray-200 rounded-lg bg-gray-50"
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
          </View>

          {/* Image Picker */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Profile Picture (Optional)</Text>
            <TouchableOpacity
              onPress={pickImage}
              className="h-12 border border-gray-200 rounded-lg bg-gray-50 items-center justify-center flex-row gap-2"
            >
              <FontAwesome5 name="image" size={18} color="#84CC16" />
              <Text className="text-gray-600">Choose Profile Picture</Text>
            </TouchableOpacity>
          </View>

          {/* Image Preview */}
          {image && (
            <View className="mb-6 items-center">
              <Image
                source={{ uri: image.uri }}
                className="w-32 h-32 rounded-full"
              />
              <TouchableOpacity
                onPress={() => setImage(null)}
                className="mt-2"
              >
                <Text className="text-red-500 text-sm">Remove</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            className="h-12 rounded-lg bg-lime-500 items-center justify-center shadow-sm"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Create Account</Text>
            )}
          </TouchableOpacity>

          
        </View>
      </View>
    </ScrollView>
  );
}