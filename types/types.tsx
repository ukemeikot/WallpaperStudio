export interface Category {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  imageName: string;
  color: string;
}

export interface Wallpaper {
  id: string;
  name: string;
  category: string;
  imageName: string;
  tags: string[];
  description: string;
  isFavorite?: boolean; 
}

export interface ActiveWallpaper {
  category: string;
  selectionId: string;
}