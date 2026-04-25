import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { useState, useEffect } from "react"; 
import { useAuth } from "@/contexts/auth-context";
import axios from "axios"
import { FontAwesome5 } from '@expo/vector-icons';

type BlogProps = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/fetchAllBlog");
        setBlogs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-3xl font-bold text-gray-800">BlogSpace</Text>
            <Text className="text-gray-500 mt-1">Discover amazing stories</Text>
          </View>
          <View className="w-12 h-12 bg-lime-100 rounded-full items-center justify-center">
            <FontAwesome5 name="book-open" size={20} color="#84CC16" />
          </View>
        </View>
      </View>

      {/* Blog List */}
      <View className="p-4">
        {loading ? (
          <View className="py-20 items-center">
            <ActivityIndicator size="large" color="#84CC16" />
            <Text className="text-gray-500 mt-4">Loading stories...</Text>
          </View>
        ) : blogs.length === 0 ? (
          <View className="py-20 items-center">
            <FontAwesome5 name="feather-alt" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-4 text-lg">No blogs yet</Text>
          </View>
        ) : (
          blogs.map((blog) => (
            <TouchableOpacity key={blog.id} activeOpacity={0.9}>
              <View className="bg-white rounded-xl shadow-sm mb-5 overflow-hidden">
                {/* Blog Image */}
                {blog.image && (
                  <Image 
                    source={{ uri: `http://127.0.0.1:8000/storage/${blog.image}`}} 
                    className="w-full h-56" 
                    resizeMode="cover"
                  />
                )}
                
                {/* Blog Content */}
                <View className="p-5">
                  {/* Title */}
                  <Text className="text-xl font-bold text-gray-800 mb-2">
                    {blog.title}
                  </Text>
                  
                  {/* Description */}
                  <Text className="text-gray-600 leading-6 mb-3">
                    {blog.description}
                  </Text>
                  
                  {/* Footer */}
                  <View className="flex-row justify-between items-center mt-2 pt-3 border-t border-gray-100">
                    <View className="flex-row items-center gap-2">
                      <View className="w-8 h-8 bg-lime-100 rounded-full items-center justify-center">
                        <FontAwesome5 name="user" size={12} color="#84CC16" />
                      </View>
                      <Text className="text-gray-500 text-sm">Author</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                      <FontAwesome5 name="heart" size={16} color="#9CA3AF" />
                      <FontAwesome5 name="comment" size={16} color="#9CA3AF" />
                      <FontAwesome5 name="share" size={16} color="#9CA3AF" />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}