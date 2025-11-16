// pages/components/Login.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { supabase } from "../../config/supabase";
import { useTheme } from "../../assets/themes/themeContext";
import { globalStyles } from "../../assets/styles";
import { BookOpen, Mail, Lock, LogIn, UserPlus } from "lucide-react-native";

export default function Login() {
  const { theme } = useTheme();
  const styles = globalStyles(theme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Login Error", error.message);
    }

    setLoading(false);
  };

  const signUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Signup Error", error.message);
    } else {
      Alert.alert("Success", "Check your email to confirm your account.");
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.bg }}
    >
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          justifyContent: "center", 
          padding: 24 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* App Icon/Logo */}
        <View style={{ 
          alignItems: 'center', 
          marginBottom: 40 
        }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.text,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}>
            <BookOpen size={40} color={theme.bg} />
          </View>
          
          <Text style={[styles.heading, { 
            fontSize: 32, 
            marginBottom: 8,
            textAlign: 'center'
          }]}>
            Welcome to Shiori!
          </Text>
          
          <Text style={[styles.text, { 
            fontSize: 16, 
            opacity: 0.7,
            textAlign: 'center'
          }]}>
            Discover books by color
          </Text>
        </View>

        {/* Email Input */}
        <View style={{ marginBottom: 16 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.bgSecondary,
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}>
            <Mail size={20} color={theme.textSecondary} style={{ marginRight: 12 }} />
            <TextInput
              placeholder="email@address.com"
              placeholderTextColor={theme.textSecondary}
              style={[styles.text, {
                flex: 1,
                paddingVertical: 16,
                fontSize: 16,
              }]}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.bgSecondary,
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}>
            <Lock size={20} color={theme.textSecondary} style={{ marginRight: 12 }} />
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              style={[styles.text, {
                flex: 1,
                paddingVertical: 16,
                fontSize: 16,
              }]}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: theme.text,
            padding: 18,
            borderRadius: 16,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
            opacity: loading ? 0.6 : 1,
          }}
          onPress={signIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.bg} />
          ) : (
            <>
              <LogIn size={22} color={theme.bg} />
              <Text style={{ 
                color: theme.bg, 
                fontSize: 17, 
                fontWeight: '700' 
              }}>
                Log In
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={{
            backgroundColor: theme.bgSecondary,
            padding: 18,
            borderRadius: 16,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            opacity: loading ? 0.6 : 1,
          }}
          onPress={signUp}
          disabled={loading}
        >
          <UserPlus size={22} color={theme.text} />
          <Text style={[styles.text, { 
            fontSize: 17, 
            fontWeight: '700' 
          }]}>
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text style={[styles.text, {
          textAlign: 'center',
          marginTop: 32,
          fontSize: 13,
          opacity: 0.5,
          lineHeight: 20,
        }]}>
          By continuing, you agree to our{'\n'}Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}