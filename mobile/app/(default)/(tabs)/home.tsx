import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useState, useEffect } from "react"; 
import { useAuth } from "@/contexts/auth-context";
import axios from "axios"

type BlogProps = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image: string

}

export default function Home() {
  const [blog, setBlogs] = useState<BlogProps[]>([]);
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
        setLoading(false)
      }
      
    };
    getBlogs();
  }, []);

  return (
    <ScrollView>
      {loading ? (<Text className="text-center text-lg">Loading...</Text>) : (
        blog.map((blogs) => (
          <View
            key={blogs.user_id}
            className="bg-cyan-300 rounded-xl shadow-md mb-6 overflow-hidden"
          >
            <View className="p-5">
              <Image source={{ uri: `http://127.0.0.1:8000/storage/${blogs.image}`}} className="w-full h-60 rounded-md" resizeMode="cover"/>
            </View>

            <View className="p-4">
              <Text className="text-xl font-bold mb-1">
                {blogs.title}
              </Text>

              <Text className="mb-2">
                {blogs.description}
              </Text>

            </View>
          </View>
        ))
      )}

    </ScrollView>
  );
}
