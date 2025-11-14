import { View, Image, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../assets/styles';
import { useTheme } from '../../assets/themes/themeContext';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MasonryList from "@react-native-seoul/masonry-list";
import { Heart } from 'lucide-react-native';
import { useLikedBooks } from '../contexts/LikedBooksContext';
import { extractAesthetic } from '../../utils/colorUtils';

interface BookItem {
    id: string;
    uri: string;
    title: string;
    author: string;
    aesthetics?: string[];
}

interface BodyProps {
    selectedGenre: string;
    searchQuery: string;
    selectedAesthetic: string;
}

export default function Body({ selectedGenre, searchQuery, selectedAesthetic }: BodyProps) {
    const { theme } = useTheme();
    const styles = globalStyles(theme);
    const [books, setBooks] = useState<BookItem[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const { toggleLike, isLiked } = useLikedBooks();

    useEffect(() => {
        setBooks([]);
        setPage(0);
        fetchiTunesBooks(0, searchQuery);
    }, [selectedGenre, searchQuery]);

    const fetchiTunesBooks = (
        currentPage: number,
        query: string = '',
        reshuffle: boolean = false
    ) => {
        if (loading) return;
        setLoading(true);
        const spinnerTimeout = setTimeout(() => setShowSpinner(true), 400);

        const genreId = getITunesGenreId(selectedGenre);
        const searchTerm =
            query ||
            getRandomSearchTerm(selectedGenre)[
                Math.floor(Math.random() * getRandomSearchTerm(selectedGenre).length)
            ];

        axios.get(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
                searchTerm
            )}&entity=ebook&limit=50&genreId=${genreId}`
        ).then((response) => {
            const results = response.data.results
                .filter((book: any) => book.artworkUrl100)
                .map((book: any) => {
                    const bookData = {
                        id: `${book.trackId}-${currentPage}-${Math.random()}`,
                        uri: book.artworkUrl100.replace('100x100', '600x600'),
                        title: book.trackName,
                        author: book.artistName,
                    };
                    
                    // Extract aesthetics for each book
                    return {
                        ...bookData,
                        aesthetics: extractAesthetic(bookData.uri, bookData.title),
                    };
                });

            const newBooks = results.sort(() => Math.random() - 0.5).slice(0, 20);

            setBooks((prev) => {
                const combined = currentPage === 0 ? newBooks : [...prev, ...newBooks];
                return reshuffle ? combined.sort(() => Math.random() - 0.5) : combined;
            });
        }).catch((error) => {
            console.error('Error fetching books:', error);
        }).finally(() => {
            clearTimeout(spinnerTimeout);
            setLoading(false);
            setShowSpinner(false);
            setRefreshing(false);
        });
    };

    const handleLoadMore = () => {
        if (!loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchiTunesBooks(nextPage, searchQuery, false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchiTunesBooks(0, searchQuery, true);
    }, [searchQuery, selectedGenre]);

    const getITunesGenreId = (genre: string): string => {
        const genreIds: { [key: string]: string } = {
            all: '',
            fiction: '9007',
            mystery: '9019',
            romance: '9022',
            'science+fiction': '9024',
            fantasy: '9005',
            biography: '9002',
            history: '9014',
            'self-help': '10017',
            poetry: '9020',
            thriller: '9027',
        };
        return genreIds[genre] || '';
    };

    const getRandomSearchTerm = (genre: string): string[] => {
        const searchTerms: { [key: string]: string[] } = {
            all: ['bestseller', 'popular', 'classic', 'award winning', 'new york times'],
            fiction: ['literary fiction', 'contemporary fiction', 'classic fiction', 'bestseller fiction'],
            mystery: ['mystery thriller', 'detective', 'crime fiction', 'whodunit'],
            romance: ['romance novel', 'love story', 'romantic fiction', 'contemporary romance'],
            'science+fiction': ['science fiction', 'sci-fi', 'space opera', 'dystopian'],
            fantasy: ['fantasy novel', 'epic fantasy', 'urban fantasy', 'magical'],
            biography: ['biography', 'memoir', 'autobiography', 'life story'],
            history: ['history', 'historical', 'world history', 'historical narrative'],
            'self-help': ['self help', 'personal development', 'motivation', 'mindfulness'],
            poetry: ['poetry', 'poems', 'verse', 'contemporary poetry'],
            thriller: ['thriller', 'suspense', 'psychological thriller', 'action'],
        };
        return searchTerms[genre] || searchTerms.all;
    };

    const getHeightForBook = (id: string) => {
        const seed = id.split('-')[0];
        const hash = Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0);
        return (hash % 150) + 150;
    };

    const handleBookPress = (book: BookItem) => {
        if (selectedBook === book.id) {
            setSelectedBook(null);
        } else {
            setSelectedBook(book.id);
        }
    };

    const handleLike = (book: BookItem) => {
        toggleLike(book);
    };

    // Filter books by aesthetic
    const filteredBooks = selectedAesthetic === 'all' 
        ? books 
        : books.filter(book => book.aesthetics?.includes(selectedAesthetic));

    const renderItem = ({ item, i }: { item: unknown; i: number }) => {
        const book = item as BookItem;
        const isSelected = selectedBook === book.id;
        const liked = isLiked(book.id);

        return (
            <TouchableOpacity 
                onPress={() => handleBookPress(book)}
                style={{ margin: 8, borderRadius: 12, overflow: 'visible', position: 'relative' }}
            >
                <Image
                    source={{ uri: book.uri }}
                    style={{
                        width: '100%',
                        height: getHeightForBook(book.id),
                        borderRadius: 12,
                    }}
                    resizeMode="cover"
                />
                {isSelected && (
                    <TouchableOpacity
                        onPress={() => handleLike(book)}
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
                            color={liked ? theme.text : theme.text} 
                            fill={liked ? theme.text : 'none'}
                        />
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.body}>
            <MasonryList
                data={filteredBooks}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 80 }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[theme.accent]}
                            tintColor={theme.accent}
                        />
                    ) as any
                }
            />

            {showSpinner && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                    }}
                >
                    <ActivityIndicator size="small" color={theme.text} />
                </View>
            )}
        </View>
    );
}