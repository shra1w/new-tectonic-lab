// app/utiles/SendEmail.js
"use server"
import nodemailer from 'nodemailer';

export async function sendEmail(data) {
    try {
        // Validate environment variables
        const smtp_email = process.env.SMTP_EMAIL;
        const smtp_password = process.env.SMTP_PASSWORD;
        const email_to = process.env.EMAIL_SEND_TO;
        const email_from = process.env.EMAIL_FROM;
        if (!smtp_email || !smtp_password || !email_to || !email_from) {
            return
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: smtp_email,
                pass: smtp_password,
            },
        });

        // Validate input data
        if (!data.Email || !data.Name) {
            throw new Error("Missing required fields");
        }

        // Configure email
        const mailOptions = {
            from: email_from,
            to: email_to,
            replyTo: data.Email, // Add reply-to field
            subject: "Connection from Techtonic Lab Website",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #333;">Contact Form Submission</h2>
                    <div style="margin: 20px 0;">
                        <p><strong>Name:</strong> ${data.Name}</p>
                        <p><strong>Email:</strong> ${data.Email}</p>
                        <p><strong>Phone No:</strong> ${data.Number || 'Not provided'}</p>
                        <p><strong>Comment:</strong> ${data.Description || 'No comment provided'}</p>
                    </div>
                </div>
            `,
        };

        // Send email
        const result = await transporter.sendMail(mailOptions);
        
        if (!result) {
            throw new Error("Failed to send email");
        }

        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw to be handled by the API route
    }
}