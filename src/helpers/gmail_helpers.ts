// import secrets from './secrets';
// import { jwtDecode } from "jwt-decode";

import axios from 'axios';
import {formatDate, decodeBase64Url, extractTextFromHtml } from './utils';

// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
const MAX_PAGES = 3;

export async function listEmailIds(access_token: string, startDate: Date | null = null): Promise<string[]> {
    try {
        let nextPageToken = null;
        const messageIds = [];

        const dateFilter = startDate ? `before:${formatDate(startDate)}` : '';
        let i = 0;
        do {
           // eslint-disable-next-line
          const response: Record<string, any> = await axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            params: {
                pageToken: nextPageToken,
                q: dateFilter,
            }
          })
    
          nextPageToken = response.data.nextPageToken;
          const ids = response.data.messages.map((message: { id: string }) => message.id);
          messageIds.push(...ids);
          i++;
        } while (nextPageToken && i < MAX_PAGES);
        return messageIds;
    
      } catch (error) {
        console.error('Error fetching Gmail messages:', error);
        return [];
      }
}

export async function getEmailContent(access_token: string, message_id: string) {
    try {
        // eslint-disable-next-line     
        const response: Record<string, any> = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message_id}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,            
            },
            params: {
                format: 'full'
            }
        });
        const plainTextPart = response.data.payload;
        if (plainTextPart) {
            return extractTextFromHtml(decodeBase64Url(plainTextPart.body.data));
        } else {
            console.log("Issues finding and decoding message: ", message_id);
        }

    } catch (error) {
        console.log('Error fetching Gmail message: ', error);
        return null;
    }
}

export async function fetchEmails(access_token: string, startDate: Date | null = null) {
    const messageIds = await listEmailIds(access_token, startDate);
    for (const id of messageIds) {
        const emailContent = await getEmailContent(access_token, id);
        if (emailContent) {
            console.log(emailContent);
            console.log(emailContent.length);
        }
        break;
    }
}


/**
 * This code was used for working with Google ID Tokens, which come as JWT and must be
 * decoded.  However, ID Tokens cannot be used for API calls, so I shifted away from that. 
 * I archived this code mainly in case I do deal with Google Identity in the future. 
interface DecodedGooglePayload {
    iss: string;           // Issuer of the token
    nbf: number;           // Not Before - Timestamp when the token becomes valid
    aud: string;           // Audience - Client ID for which the token was issued
    sub: string;           // Subject - Unique ID for the user
    email: string;         // Email address of the user
    email_verified: boolean; // Indicates if the email is verified
    azp: string;           // Authorized Party - Client ID authorized to use the token
    name: string;          // Full name of the user
    picture: string;       // URL of the user's profile picture
    given_name: string;    // User's first name
    family_name: string;   // User's last name
    iat: number;           // Issued At - Timestamp when the token was issued
    exp: number;           // Expiration - Timestamp when the token expires
    jti: string;           // JWT ID - Unique identifier for the token
  }

interface GoogleRequestHeader {
    iss: string;
    sub: string;
    aud: string;
    iat: number;
    exp: number;
    email: string;
}

export function decodeJwtToken(token: string): DecodedGooglePayload {
    try {
        // Decode the token
        const decoded = jwtDecode<DecodedGooglePayload>(token);
        return decoded;
    } catch (error) {
        throw new Error(`Failed to decode token: ${(error as Error).message}`);
    }
}

function getGoogleRequestHeader(payload: DecodedGooglePayload): GoogleRequestHeader {
    const { iss, sub, aud, iat, exp, email } = payload;
    
    const header: GoogleRequestHeader = {
      iss,
      sub,
      aud,
      iat,
      exp,
      email,
    };
    
    return header;
  }

*/