const nodemailer = require('nodemailer');
const pug = require('pug');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `codemax <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                service: 'mailgun',
                auth: {
                    user: process.env.MAILGUN_USER,
                    pass: process.env.MAILGUN_PASS
                }
        });
        }

        return nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
        });
    }

    //Send the actual mail
    async send(template, subject) {
        // 1) Render HTML based on pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });


        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
        }

        // 3) Create a transport and Send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Market Zone Family');
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password rest token (valid for 10mins)');
    }
}

