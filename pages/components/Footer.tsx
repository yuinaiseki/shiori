import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Appearance, useColorScheme, Button, Pressable, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { globalStyles } from '../../assets/styles';
import { Compass, LayoutGrid, User } from 'lucide-react-native';
import { useTheme } from '../../assets/themes/themeContext';

interface FooterProps {
  activeTab: 'explore' | 'boards' | 'profile';
  setActiveTab: (tab: 'explore' | 'boards' | 'profile') => void;
}

export default function Footer({activeTab, setActiveTab}: FooterProps) {

    const { theme } = useTheme();
    const styles = globalStyles(theme);

    return(
        <View style={styles.footer}>
            <TouchableOpacity style={styles.navButton} onPress={()=>setActiveTab("explore")}>
                <Compass size = {40} color={activeTab == "explore" ? theme.text : theme.textActivated}></Compass><Text style={styles.text}>Explore</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.navButton} onPress={()=>setActiveTab("boards")}>
                <LayoutGrid size = {40} color={activeTab == "boards" ? theme.text : theme.textActivated}></LayoutGrid><Text style={styles.text}>Boards</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.navButton} onPress={()=>setActiveTab("profile")}>
                <User size = {40} color={activeTab == "profile" ? theme.text : theme.textActivated}></User><Text style={styles.text}>Profile</Text >
            </TouchableOpacity>
        </View>
    );
};