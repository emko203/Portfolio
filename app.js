require('dotenv').config();

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
	try {
		const accessToken = await oAuth2Client.getAccessToken();
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAUTH2',
				user: 'ekarapachovmailer@gmail.com',
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken
			}
		});

		const mailOptions = {
			from: 'ekarapachovmailer@gmail.com',
			to: 'ekarapachov@gmail.com',
			subject: 'Hello nodemailer',
			text: 'Test mail'
		};

		const result = transport.sendMail(mailOptions);

		return result;
	} catch (error) {
		return error;
	}
}

sendMail().then((result) => console.log('Email sent', result)).catch((error) => console.log(error.message));
