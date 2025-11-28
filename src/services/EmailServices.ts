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

    async sendEventRegistrationEmail(to: string, eventName: string, date: Date, time: string) {
        await this.transporter.sendMail({
            from: `"Event Team" <${process.env.EMAIL_USER}>`,
            to,
            subject: `Successfully registered for ${eventName}`,
            html: `
                <h2>Registration Successful 🎉</h2>
                <img src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?cs=srgb&dl=pexels-teddy-2263436.jpg&fm=jpg" alt="EventImage" width="400" height="400" />
                <p>You have successfully registered for the event:</p>
                <b>${eventName}</b>
                <br />
                <p>Date:  ${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()} at ${time} </p>
               < br />
        <p>Thank you! </p>
            `
        });
    }
}
