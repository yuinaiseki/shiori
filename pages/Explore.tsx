// pages/Explore.tsx
import { View } from "react-native";
import Header from "./components/Header"
import Body from "./components/Body"
import { useTheme } from "../assets/themes/themeContext";
import { globalStyles } from "../assets/styles";
import { useState } from "react";

export default function Explore() {
    const [selectedGenre, setSelectedGenre] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedAesthetic, setSelectedAesthetic] = useState<string>('all');
    const { theme } = useTheme();
    const styles = globalStyles(theme);

    return(
        <View style={styles.container}>
            <Header 
                selectedGenre={selectedGenre} 
                onGenreChange={setSelectedGenre}
                onSearch={setSearchQuery}
                selectedAesthetic={selectedAesthetic}
                onAestheticChange={setSelectedAesthetic}
            />
            <Body 
                selectedGenre={selectedGenre} 
                searchQuery={searchQuery}
                selectedAesthetic={selectedAesthetic}
            />
        </View>
    );
}