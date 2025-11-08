

import { Wallpaper } from '../types/types';


export const mockWallpapers: Wallpaper[] = [

  {
    id: 'n1',
    name: 'Nature 1',
    category: 'nature',
    imageName: 'nature_1.png', 
    tags: ['Nature', 'Ambiance', 'Flowers'],
    description: 'Discover the pure beauty of \'Natural Essence\'—your gateway to authentic, nature-inspired experiences.',
  },
  {
    id: 'n2',
    name: 'Nature 2',
    category: 'nature',
    imageName: 'nature_2.png',
    tags: ['Forest', 'Mountain', 'Sky'],
    description: 'A serene view of the deep forest and majestic sky, perfect for focus.',
  },
  {
    id: 'n3',
    name: 'Nature 3',
    category: 'nature',
    imageName: 'nature_3.png', 
    tags: ['Autumn', 'Light', 'Woodland'],
    description: 'Golden hour light filtering through the autumn woods, providing warmth and comfort.',
  },
  {
    id: 'n4',
    name: 'Nature 4', 
    category: 'nature',
    imageName: 'nature_4.png',
    tags: ['Ocean', 'Sunset', 'Clouds'],
    description: 'A peaceful ocean sunset scene with vibrant colors over the horizon.',
  },
  {
    id: 'n5', 
    name: 'Nature 5',
    category: 'nature',
    imageName: 'nature_5.png',
    tags: ['Stars', 'Night', 'Sky'],
    description: 'A striking night view of the cosmos and stars, inspiring wonder and calm.',
  },
  {
    id: 'n6', 
    name: 'Nature 6',
    category: 'nature',
    imageName: 'nature_6.png',
    tags: ['Mountain', 'Water', 'Stream'],
    description: 'Waterfalls carving through the ancient mountains, a symbol of persistence and beauty.',
  }]

export const getWallpapersByCategory = (categoryId: string): Wallpaper[] => {
    return mockWallpapers.filter(w => w.category.toLowerCase() === categoryId.toLowerCase());
};

export const getWallpaperById = (id: string): Wallpaper | undefined => {
    return mockWallpapers.find(w => w.id === id);
};

export const getFavoriteWallpapers = (favoriteIds: string[]): Wallpaper[] => {
    return mockWallpapers.filter(w => favoriteIds.includes(w.id));
};

export const getWallpaperImageSource = (imageName: string) => {
    switch (imageName) {
        case 'nature_1.png': return require('../assets/wallpapers/nature_1.png');
        case 'nature_2.png': return require('../assets/wallpapers/nature_2.png');
        case 'nature_3.png': return require('../assets/wallpapers/nature_3.png');
        case 'nature_4.png': return require('../assets/wallpapers/nature_4.png');
        case 'nature_5.png': return require('../assets/wallpapers/nature_5.png');
        case 'nature_6.png': return require('../assets/wallpapers/nature_6.png');
        default: return null; 
    }
};
