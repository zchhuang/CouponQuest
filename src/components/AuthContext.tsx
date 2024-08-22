import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import secrets from '../helpers/secrets'
import {isChromeExtension} from '../helpers/utils'

interface AuthContextProps {
  accessToken: string | null;
  login: () => void;
  handleCallback: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    // const storedRefreshToken = localStorage.getItem('refresh_token');
    setAccessToken(storedToken);
    // setRefreshToken(storedRefreshToken);
  }, []);

  const login = () => {
    const clientId = secrets.clientId;
    const redirectUri = secrets.redirectUri;
    const scope = 'https://www.googleapis.com/auth/gmail.readonly';
    const responseType = 'code';
    const accessType = 'offline';
  
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=${accessType}`;
  
    if (isChromeExtension()) {
        chrome.tabs.create({ url: authUrl });
    } else {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=${accessType}`;
    }
  };

    const handleCallback = async () => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');
    
        if (code) {
          try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
              code,
              client_id: secrets.clientId,
              client_secret: secrets.clientSecret,
              redirect_uri: secrets.redirectUri,
              grant_type: 'authorization_code',
            });
    
            setAccessToken(response.data.access_token);
            // setRefreshToken(response.data.refresh_token);
    
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
          } catch (error) {
            console.error('Error exchanging authorization code:', error);
          }
        }
      };
    

  return (
    <AuthContext.Provider value={{ accessToken, login, handleCallback }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
