require('dotenv').config();

const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(subject, text) {
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
			subject,
			text
		};

		const result = transport.sendMail(mailOptions);

		return result;
	} catch (error) {
		return error;
	}
}

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.post('/api/mailer', (req, res) => {
	const { subject, name, email, msg } = req.body;
	const text = 'Email: ' + email + 'Name:' + name + '\nMessage: ' + msg;
	sendMail(subject, text)
		.then((result) => {
			console.log('Email sent');
			res.redirect('/');
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('Server start'));
