// /context/WallpaperContext.tsx
import React, { createContext, useContext } from 'react';
import { ActiveWallpaper } from '../types/types'; 
import { getWallpaperById } from '../data/wallpapers'; 

// Define the type for the setter function
export type SetWallpaperFunction = (wallpaperId: string, category: string) => void;
export type ToggleFavoriteFunction = (wallpaperId: string) => void; 

// Define the shape of the context data
interface WallpaperContextType {
    onSetWallpaper: SetWallpaperFunction;
    activeWallpaper: ActiveWallpaper | null;
    favoriteIds: string[];
    onToggleFavorite: ToggleFavoriteFunction; 
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

// Custom Hook for easy access to state and setters
export const useWallpaperSetter = () => {
    const context = useContext(WallpaperContext);
    if (context === undefined) {
        throw new Error('useWallpaperSetter must be used within a WallpaperProvider');
    }
    return context; 
};

// The Provider component wraps the app
export const WallpaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State is held here at the top level
    const [activeWallpaper, setActiveWallpaper] = React.useState<ActiveWallpaper | null>(null);
    const [favoriteIds, setFavoriteIds] = React.useState<string[]>(['n1']); // Initialize with a mock favorite ID

    const handleToggleFavorite: ToggleFavoriteFunction = (wallpaperId) => {
        setFavoriteIds(prevIds => {
            if (prevIds.includes(wallpaperId)) {
                return prevIds.filter(id => id !== wallpaperId); // Remove
            } else {
                return [...prevIds, wallpaperId]; // Add
            }
        });
    };
    
    const handleSetWallpaper: SetWallpaperFunction = (wallpaperId, category) => {
        const details = getWallpaperById(wallpaperId);

        setActiveWallpaper({
            category: details ? details.category : category,
            selectionId: wallpaperId,
        });
    };
    
    const contextValue: WallpaperContextType = {
        onSetWallpaper: handleSetWallpaper,
        activeWallpaper: activeWallpaper,
        favoriteIds: favoriteIds,
        onToggleFavorite: handleToggleFavorite,
    };

    return (
        <WallpaperContext.Provider value={contextValue}>
            {children}
        </WallpaperContext.Provider>
    );
};