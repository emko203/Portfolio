const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.post('/mail', (req, res) => {
	// console.log(req.body.name);
	const transport = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		auth: {
			type: 'OAuth2',
			user: 'ekarapachovnodemailer@gmail.com',
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			refreshToken: process.env.GOOGLE_REFRESH_TOKEN
		}
	});

	const mailOptions = {
		to: 'ekarapachov@gmail.com',
		from: 'ekarapachovnodemailer@gmail.com',
		subject: req.body.subject,
		text: 'Email: ' + req.body.mail + '\nMessage: ' + req.body.message
	};

	//send email
	transport
		.sendMail(mailOptions)
		.then(() => {
			res.redirect('/');
		})
		.catch((err) => {
			console.log('work');
			console.log(err);
		});
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server listening on port 3000');
});
