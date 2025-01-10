import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoContextType {
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <VideoContext.Provider value={{ videoUrl, setVideoUrl }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
