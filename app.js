const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const ClIENT_ID = '886921661383-6v68irl0snb1cncl6236082qbrqjv4kp.apps.googleusercontent.com';
const CLIENT_SECRET = 'xdfgMceGX8Id3VMiGroJUXgj';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
	'1//04l_A1LvzREv3CgYIARAAGAQSNwF-L9IrO-8ozS0vDlVbSKs1XjqxwTddxBEXERfZPM1QxXzeJxTie1xbEXp5O7wxTC-lNDzEly0';

const oAuth2Client = new google.auth.OAuth2(ClIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
	try {
		const accessToken = await oAuth2Client.getAccessToken();
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAUTH2',
				user: 'ekarapachovmailer@gmail.com',
				clientId: ClIENT_ID,
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
