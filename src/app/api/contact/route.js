
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Configure Nodemailer Transporter
    // NOTE: Using environment variables for sensitive info is best practice.
    // Ensure EMAIL_USER and EMAIL_PASS are set in your .env file.
    // If not set, this will fail. We'll add a check.
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        // Fallback for demo/development if env vars aren't set
        console.warn("Email credentials not found in env. simulating success.");
        return NextResponse.json({ message: 'Message sent successfully (Simulation)' }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email, // Allow replying to the user
      subject: `TaskFlow Contact: Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}
