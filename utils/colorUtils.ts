// utils/colorUtils.ts

// Simple color extraction from image URL
// This analyzes the URL pattern and book metadata to assign aesthetic categories
export const extractAesthetic = (imageUrl: string, title: string = ''): string[] => {
  const aesthetics: string[] = [];
  
  // Analyze URL and title for patterns
  const combined = (imageUrl + title).toLowerCase();
  
  // Dark/Light detection based on common patterns
  if (combined.includes('dark') || combined.includes('night') || combined.includes('black')) {
    aesthetics.push('Dark');
  }
  if (combined.includes('light') || combined.includes('bright') || combined.includes('white')) {
    aesthetics.push('Light');
  }
  
  // Default categorization based on simple heuristics
  // In a real app, you'd use image analysis libraries
  const hash = imageUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const categories = ['Warm', 'Cool', 'Vibrant', 'Pastel', 'Monochrome', 'Earthy'];
  const index = hash % categories.length;
  
  if (!aesthetics.length || aesthetics.length < 2) {
    aesthetics.push(categories[index]);
    
    // Add a secondary aesthetic
    const secondaryIndex = (hash + 3) % categories.length;
    if (categories[secondaryIndex] !== categories[index]) {
      aesthetics.push(categories[secondaryIndex]);
    }
  }
  
  return aesthetics;
};

// Get dominant color from aesthetic
export const getColorFromAesthetic = (aesthetic: string): string => {
  const colorMap: { [key: string]: string } = {
    'Dark': '#1a1a1a',
    'Light': '#f5f5f5',
    'Warm': '#d4a574',
    'Cool': '#7eb6d4',
    'Vibrant': '#e74c3c',
    'Pastel': '#ffd1dc',
    'Monochrome': '#808080',
    'Earthy': '#8b7355',
  };
  
  return colorMap[aesthetic] || '#808080';
};

// Calculate aesthetic palette from liked books
export const calculateAestheticProfile = (books: any[]): {
  topAesthetics: { name: string; count: number; color: string }[];
  colorPalette: string[];
} => {
  const aestheticCounts: { [key: string]: number } = {};
  
  books.forEach(book => {
    const aesthetics = extractAesthetic(book.uri, book.title);
    aesthetics.forEach(aesthetic => {
      aestheticCounts[aesthetic] = (aestheticCounts[aesthetic] || 0) + 1;
    });
  });
  
  const topAesthetics = Object.entries(aestheticCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      color: getColorFromAesthetic(name),
    }));
  
  const colorPalette = topAesthetics.map(a => a.color);
  
  return { topAesthetics, colorPalette };
};

// Available aesthetic filters
export const AESTHETIC_FILTERS = [
  { label: 'All', value: 'all', color: '#808080' },
  { label: 'Dark', value: 'Dark', color: '#1a1a1a' },
  { label: 'Light', value: 'Light', color: '#f5f5f5' },
  { label: 'Warm', value: 'Warm', color: '#d4a574' },
  { label: 'Cool', value: 'Cool', color: '#7eb6d4' },
  { label: 'Vibrant', value: 'Vibrant', color: '#e74c3c' },
  { label: 'Pastel', value: 'Pastel', color: '#ffd1dc' },
  { label: 'Monochrome', value: 'Monochrome', color: '#808080' },
  { label: 'Earthy', value: 'Earthy', color: '#8b7355' },
];