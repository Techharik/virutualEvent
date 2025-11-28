import nodemailer from "nodemailer";

export class EmailService {
    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    async sendEventRegistrationEmail(to: string, eventName: string, date: string) {
        await this.transporter.sendMail({
            from: `"Event Team" <${process.env.EMAIL_USER}>`,
            to,
            subject: `Successfully registered for ${eventName}`,
            html: `
                <h2>Registration Successful 🎉</h2>
                <p>You have successfully registered for the event:</p>
                <b>${eventName}</b>
                <br />
                <p>Date: ${date}</p>
                <br />
                <p>Thank you!</p>
            `
        });
    }
}
