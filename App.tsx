import { View } from 'react-native';
import { useState } from "react";

import { globalStyles } from './assets/styles';
import { ThemeProvider, useTheme } from './assets/themes/themeContext';
import { LikedBooksProvider } from './pages/contexts/LikedBooksContext';
import { ProfileProvider } from './pages/contexts/ProfileContext';

import Footer from "./pages/components/Footer"
import Explore from './pages/Explore';
import Boards from './pages/Boards';
import Profile from './pages/Profile';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'explore' | 'boards' | 'profile'>('explore');
  const { theme } = useTheme();
  const styles = globalStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        {activeTab === "explore" && <Explore />}
        {activeTab === "boards" && <Boards />}
        {activeTab === "profile" && <Profile />}
      </View>
      <View style={{flex: 2}}>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <LikedBooksProvider>
          <AppContent />
        </LikedBooksProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}