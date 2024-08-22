// import secrets from './secrets';
// import { jwtDecode } from "jwt-decode";

import axios from 'axios';

// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']


/**
 * This code was used for working with Google ID Tokens, which come as JWT and must be
 * decoded.  However, ID Tokens cannot be used for API calls, so I shifted away from that. 
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

export async function listEmails(access_token: string, startDate: Date | null = null) {
    console.log(startDate);
    try {
        let nextPageToken = null;
        const messages = [];
    
        // Fetch message IDs
        do {
          const response: any = await axios.get(`https://www.googleapis.com/gmail/v1/users/zhuang9040@gmail.com/messages`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
          })
    
        //   nextPageToken = response.data.nextPageToken;
          nextPageToken = null;
          messages.push(...response.data.messages);
    
        } while (nextPageToken);
        console.log(messages);
        return messages;
    
      } catch (error) {
        console.error('Error fetching Gmail messages:', error);
      }
}

export async function fetchEmails(access_token: string, startDate: Date | null = null) {
    console.log(await listEmails(access_token, startDate));
}