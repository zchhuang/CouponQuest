import secrets from './secrets';
// import axios from 'axios';

import {OAuth2Client} from 'google-auth-library';

// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

export async function verifyToken(clientId: string, jwtToken: string) {
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: clientId,
    });

    const payload = ticket.getPayload();
    console.log(payload);
    return payload;
}

// export async function listEmails(userEmail: string, jwtToken: string, startDate: Date | null = null) {
//     console.log(userEmail, startDate, jwtToken);
//     try {
//         let nextPageToken = null;
//         const messages = [];
    
//         // Fetch message IDs
//         do {
//           const response: any = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
//             headers: {
//               'Authorization': `${jwtToken}`,
//               'Accept': 'application/json',
//             }
//           })
    
//           nextPageToken = response.data.nextPageToken;
//           messages.push(...response.data.messages);
    
//         } while (nextPageToken);
//         return messages;
    
//       } catch (error) {
//         console.error('Error fetching Gmail messages:', error);
//       }
// }

export async function fetchEmails(jwtToken: string, startDate: Date | null = null) {
    const payload = await verifyToken(secrets.clientId, jwtToken);
    console.log(startDate, payload);
    // console.log(listEmails(jwtToken));
}