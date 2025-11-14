// pages/components/Header.tsx
import { Text, View, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { useState } from "react";
import { globalStyles } from '../../assets/styles';
import { Moon, Sun, Search, Filter, X } from 'lucide-react-native';
import { useTheme } from '../../assets/themes/themeContext';
import { AESTHETIC_FILTERS } from '../../utils/colorUtils';

interface HeaderProps {
    selectedGenre: string;
    onGenreChange: (genre: string) => void;
    onSearch: (query: string) => void;
    selectedAesthetic: string;
    onAestheticChange: (aesthetic: string) => void;
}

export default function Header({ 
    selectedGenre, 
    onGenreChange, 
    onSearch,
    selectedAesthetic,
    onAestheticChange 
}: HeaderProps) {
    const [input, setInput] = useState<string>("");
    const [genreModalVisible, setGenreModalVisible] = useState<boolean>(false);
    const [aestheticModalVisible, setAestheticModalVisible] = useState<boolean>(false);
    const { theme, isLight, toggleTheme } = useTheme();
    const styles = globalStyles(theme);

    const handleSearchSubmit = () => {
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

    const genres = [
        { label: 'All Books', value: 'all' },
        { label: 'Fiction', value: 'fiction' },
        { label: 'Mystery', value: 'mystery' },
        { label: 'Romance', value: 'romance' },
        { label: 'Science Fiction', value: 'science+fiction' },
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Biography', value: 'biography' },
        { label: 'History', value: 'history' },
        { label: 'Self-Help', value: 'self-help' },
        { label: 'Poetry', value: 'poetry' },
        { label: 'Thriller', value: 'thriller' },
    ];

    const handleGenreSelect = (value: string) => {
        onGenreChange(value);
        setGenreModalVisible(false);
    };

    const handleAestheticSelect = (value: string) => {
        onAestheticChange(value);
        setAestheticModalVisible(false);
    };
      
    return(
        <View style={styles.header}>
            <View style={styles.sub_heading}>
                <View style={styles.name}><Text style={styles.heading}>Shiori</Text></View>
                <View style={styles.mode}> 
                    <TouchableOpacity onPress={toggleTheme} style={styles.mode_container}> 
                        {isLight ? <Moon size={40} color={theme.text}></Moon>:<Sun size={40} color={theme.text}></Sun>}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <View style={[styles.search, styles.searchInput]}>
                    <Search size={30} style={{margin: 5}}></Search>
                    <TextInput 
                        style={[styles.text, { flex: 1 }]} 
                        value={input} 
                        onChangeText={setInput}
                        onSubmitEditing={handleSearchSubmit}
                        returnKeyType="search"
                        placeholder={"Search books, authors, genres"} 
                        placeholderTextColor={theme.textSecondary}
                    />
                </View>
                <TouchableOpacity 
                    onPress={() => setGenreModalVisible(true)}
                    style={styles.filterButton}
                >
                    <Filter size={30} color={theme.text} />
                </TouchableOpacity>
            </View>

            {/* Aesthetic Filter Chips */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
                contentContainerStyle={{ paddingHorizontal: 10, gap: 8 }}
            >
                {AESTHETIC_FILTERS.map((filter) => (
                    <TouchableOpacity
                        key={filter.value}
                        onPress={() => onAestheticChange(filter.value)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: selectedAesthetic === filter.value 
                                ? theme.text 
                                : theme.bgSecondary,
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 20,
                            marginRight: 8,
                            gap: 8,
                        }}
                    >
                        {filter.value !== 'all' && (
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: filter.color,
                                    borderWidth: 1,
                                    borderColor: selectedAesthetic === filter.value 
                                        ? theme.bg 
                                        : theme.textSecondary + '50',
                                }}
                            />
                        )}
                        <Text
                            style={{
                                color: selectedAesthetic === filter.value 
                                    ? theme.bg 
                                    : theme.textSecondary,
                                fontSize: 14,
                                fontWeight: selectedAesthetic === filter.value ? '600' : '400',
                            }}
                        >
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Genre Filter Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={genreModalVisible}
                onRequestClose={() => setGenreModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Select Genre
                            </Text>
                            <TouchableOpacity onPress={() => setGenreModalVisible(false)}>
                                <X size={30} color={theme.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {genres.map((genre) => (
                                <TouchableOpacity
                                    key={genre.value}
                                    onPress={() => handleGenreSelect(genre.value)}
                                    style={[
                                        styles.genreOption,
                                        selectedGenre === genre.value && styles.genreOptionSelected
                                    ]}
                                >
                                    <Text style={[
                                        styles.genreText,
                                        selectedGenre === genre.value && styles.genreTextSelected
                                    ]}>
                                        {genre.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Aesthetic Filter Modal (Alternative to chips) */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={aestheticModalVisible}
                onRequestClose={() => setAestheticModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Select Aesthetic
                            </Text>
                            <TouchableOpacity onPress={() => setAestheticModalVisible(false)}>
                                <X size={30} color={theme.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {AESTHETIC_FILTERS.map((filter) => (
                                <TouchableOpacity
                                    key={filter.value}
                                    onPress={() => handleAestheticSelect(filter.value)}
                                    style={[
                                        styles.genreOption,
                                        selectedAesthetic === filter.value && styles.genreOptionSelected,
                                        { flexDirection: 'row', alignItems: 'center', gap: 12 }
                                    ]}
                                >
                                    {filter.value !== 'all' && (
                                        <View
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 8,
                                                backgroundColor: filter.color,
                                            }}
                                        />
                                    )}
                                    <Text style={[
                                        styles.genreText,
                                        selectedAesthetic === filter.value && styles.genreTextSelected
                                    ]}>
                                        {filter.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}