import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Your OAuth 2.0 credentials
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Scopes for accessing Gmail
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

// Function to get authorization URL
export function getAuthUrl(): string {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return url;
}

// Function to get tokens using authorization code
export async function getTokens(code: string): Promise<void> {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
}

// Function to get the list of emails
export async function getEmails(): Promise<any> {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10, // Adjust the number of emails you want to retrieve
    });

    return response.data.messages;
  } catch (error) {
    console.error('Error retrieving emails:', error);
    throw error;
  }
}
