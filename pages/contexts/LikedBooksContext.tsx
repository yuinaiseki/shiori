import React, { createContext, useContext, useState } from 'react';

interface BookItem {
    id: string;
    uri: string;
    title: string;
    author: string;
}

interface LikedBooksContextType {
    likedBooks: BookItem[];
    toggleLike: (book: BookItem) => void;
    isLiked: (bookId: string) => boolean;
}

const LikedBooksContext = createContext<LikedBooksContextType | undefined>(undefined);

export const LikedBooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [likedBooks, setLikedBooks] = useState<BookItem[]>([]);

    const toggleLike = (book: BookItem) => {
        setLikedBooks((prev) => {
            const exists = prev.find((b) => b.id === book.id);
            if (exists) {
                return prev.filter((b) => b.id !== book.id);
            } else {
                return [...prev, book];
            }
        });
    };

    const isLiked = (bookId: string) => {
        return likedBooks.some((b) => b.id === bookId);
    };

    return (
        <LikedBooksContext.Provider value={{ likedBooks, toggleLike, isLiked }}>
            {children}
        </LikedBooksContext.Provider>
    );
};

export const useLikedBooks = () => {
    const context = useContext(LikedBooksContext);
    if (!context) {
        throw new Error('useLikedBooks must be used within LikedBooksProvider');
    }
    return context;
};