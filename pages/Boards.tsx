import { useTheme } from "../assets/themes/themeContext";
import { globalStyles } from "../assets/styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLikedBooks } from "../pages/contexts/LikedBooksContext"
import MasonryList from "@react-native-seoul/masonry-list";
import { Heart } from 'lucide-react-native';

export default function Boards() {
    const { theme } = useTheme();
    const styles = globalStyles(theme);
    const { likedBooks, toggleLike } = useLikedBooks();

    const getHeightForBook = (id: string) => {
        const seed = id.split('-')[0];
        const hash = Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0);
        return (hash % 150) + 150;
    };

    const renderItem = ({ item, i }: { item: unknown; i: number }) => {
        const book = item as any;
        return (
            <View style={{ margin: 8, borderRadius: 12, overflow: 'visible', position: 'relative' }}>
                <Image
                    source={{ uri: book.uri }}
                    style={{
                        width: '100%',
                        height: getHeightForBook(book.id),
                        borderRadius: 12,
                    }}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={() => toggleLike(book)}
                    style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 20,
                        padding: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <Heart 
                        size={24}
                        color={theme.textSecondary}
                        fill={theme.textSecondary}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    if (likedBooks.length === 0) {
        return (
            <View style={styles.temp_msg}>
                <Heart size={60} color={theme.textSecondary} />
                <Text style={[styles.text, { marginTop: 16, fontSize: 18 }]}>
                    No liked books yet
                </Text>
                <Text style={[styles.text, { marginTop: 8, opacity: 0.7 }]}>
                    Tap a book on Explore to like it
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, { flex: 1, padding: 20, paddingTop: 40,}]}>
                <Text style={styles.heading}>My Boards</Text>
                <Text style={[styles.text, { marginTop: 8 }]}>
                    {likedBooks.length} book{likedBooks.length !== 1 ? 's' : ''} saved
                </Text>
            </View>
            <View style={styles.body}>
                <MasonryList
                    data={likedBooks}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 80 }}
                />
            </View>
        </View>
    );
}