import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/auth-context";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Profile() {
  const { logout, user } = useAuth();

 

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <Text className="text-3xl font-bold text-gray-800">Profile</Text>
        <Text className="text-gray-500 mt-1">Manage your account</Text>
      </View>

      {/* Profile Content */}
      <View className="p-6">
        {/* Profile Image */}
        <View className="items-center mb-8">
          <View className="relative">
            {user?.image ? (
              <Image 
                source={{ uri: `http://127.0.0.1:8000/storage/${user?.image}` }} 
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <View className="w-32 h-32 bg-lime-100 rounded-full items-center justify-center">
                <FontAwesome5 name="user" size={48} color="#84CC16" />
              </View>
            )}
            <View className="absolute bottom-0 right-0 w-8 h-8 bg-lime-500 rounded-full items-center justify-center border-2 border-white">
              <FontAwesome5 name="camera" size={14} color="white" />
            </View>
          </View>
        </View>

        {/* User Info Cards */}
        <View className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 bg-lime-100 rounded-full items-center justify-center mr-3">
              <FontAwesome5 name="user" size={18} color="#84CC16" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm">Full Name</Text>
              <Text className="text-gray-800 font-semibold text-lg">{user?.name || 'Not set'}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-lime-100 rounded-full items-center justify-center mr-3">
              <FontAwesome5 name="envelope" size={16} color="#84CC16" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm">Email Address</Text>
              <Text className="text-gray-800 font-semibold text-lg">{user?.email || 'Not set'}</Text>
            </View>
          </View>
        </View>

        {/* Account Stats */}
        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-white rounded-xl shadow-sm p-4 items-center">
            <FontAwesome5 name="newspaper" size={24} color="#84CC16" />
            <Text className="text-2xl font-bold text-gray-800 mt-2">0</Text>
            <Text className="text-gray-500 text-sm">Blogs Posted</Text>
          </View>
          <View className="flex-1 bg-white rounded-xl shadow-sm p-4 items-center">
            <FontAwesome5 name="heart" size={24} color="#84CC16" />
            <Text className="text-2xl font-bold text-gray-800 mt-2">0</Text>
            <Text className="text-gray-500 text-sm">Total Likes</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={logout}
          className="h-12 rounded-lg bg-red-500 items-center justify-center flex-row gap-2 shadow-sm"
        >
          <FontAwesome5 name="sign-out-alt" size={18} color="white" />
          <Text className="text-white font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}