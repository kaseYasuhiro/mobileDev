import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import axios from "@/api/axios";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Create() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null); 
  const [errors, setErrors] = useState<any>({});

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
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleCreateBlog = async () => {
    if (!title || !description || !image) {
      setGeneralError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
       axios.post(
        "/create/blog",
        { title, image: image?.file, description },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <Text className="text-3xl font-bold text-gray-800">Create Blog</Text>
        <Text className="text-gray-500 mt-1">Share your story with the world</Text>
      </View>

      {/* Error Message */}
        {generalError && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-500 text-sm text-center">{generalError}</Text>
          </View>
        )}

      {/* Form */}
      <View className="p-6">
        {/* Title Input */}
        <View className="mb-5">
          <Text className="text-gray-700 font-medium mb-2">Blog Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="h-12 px-4 border border-gray-200 rounded-lg bg-white"
            placeholder="Enter an attention-grabbing title"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Description Input */}
        <View className="mb-5">
          <Text className="text-gray-700 font-medium mb-2">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            className="h-32 px-4 py-3 border border-gray-200 rounded-lg bg-white"
            placeholder="Write your blog content here..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Image Picker */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Blog Image</Text>
          <TouchableOpacity
            onPress={pickImage}
            className="h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 items-center justify-center"
          >
            <View className="items-center gap-2">
              <View className="w-12 h-12 bg-lime-100 rounded-full items-center justify-center">
                <FontAwesome5 name="cloud-upload-alt" size={20} color="#84CC16" />
              </View>
              <Text className="text-gray-600 font-medium">Tap to browse image</Text>
              <Text className="text-gray-400 text-sm">PNG, JPG up to 5MB</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Image Preview */}
        {image && (
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Preview</Text>
            <View className="relative">
              <Image
                source={{ uri: image.uri }}
                className="w-full h-48 rounded-lg"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => setImage(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full items-center justify-center shadow-sm"
              >
                <FontAwesome5 name="times" size={14} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Create Button */}
        <TouchableOpacity
          onPress={handleCreateBlog}
          disabled={loading}
          className="h-12 rounded-lg bg-lime-500 items-center justify-center flex-row gap-2 shadow-sm"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <FontAwesome5 name="pen-fancy" size={18} color="white" />
              <Text className="text-white font-bold text-lg">Publish Blog</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}