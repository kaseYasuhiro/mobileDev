import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState<string | null>(null); 
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setGeneralError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    try {
      await login({ email, password });
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
    <View className="flex-1 bg-white items-center justify-center p-6">
      <View className="w-full max-w-sm">
        {/* Header */}
        <View className="mb-8 items-center">
          <View className="w-20 h-20 bg-lime-500 rounded-full items-center justify-center mb-4">
            <Text className="text-4xl text-white font-bold">B</Text>
          </View>
          <Text className="text-3xl font-bold text-gray-800">Welcome Back</Text>
          <Text className="text-gray-500 mt-2">Sign in to continue</Text>
        </View>

        {/* Error Message */}
        {generalError && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-500 text-sm text-center">{generalError}</Text>
          </View>
        )}

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
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            className="h-12 px-4 border border-gray-200 rounded-lg bg-gray-50"
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
          />
          {errors.password && (
            <Text className="text-red-500 text-xs mt-1">{errors.password[0]}</Text>
          )}
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="h-12 rounded-lg bg-lime-500 items-center justify-center shadow-sm"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Login</Text>
          )}
        </TouchableOpacity>

        
      </View>
    </View>
  );
}