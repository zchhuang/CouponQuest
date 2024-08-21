import { google } from 'googleapis';
import secrets from './secrets';

// import { OAuth2Client } from 'google-auth-library';

const oauth2Client = new google.auth.OAuth2(
  secrets.CLIENT_ID,
  secrets.CLIENT_SECRET,
  secrets.REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

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
