// app/api/sendEmail/route.js
import { sendEmail } from '@/app/utiles/SendEmail';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const reqCredentials = await request.json();
        
        if (!reqCredentials.Email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const result = await sendEmail(reqCredentials);
        
        if (!result) {
            return NextResponse.json(
                { error: "Failed to send email" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in email API:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}