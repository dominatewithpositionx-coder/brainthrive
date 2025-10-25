import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Dynamic test — you can later connect this to your Supabase user or signup form
export async function GET() {
  try {
    // Load the HTML email template
    let emailHtml = fs.readFileSync(
      path.join(process.cwd(), 'emails', 'BrainThrive-template.html'),
      'utf8'
    );

    // Replace the placeholder {{name}} with a dynamic name
    const userName = 'Wayne'; // Later replace with form input or Supabase value
    emailHtml = emailHtml.replace('{{name}}', userName);

    // Send the email
    const data = await resend.emails.send({
      from: 'BrainThrive <notifications@resend.dev>',
      to: process.env.NOTIFY_EMAIL!,
      subject: `🎮 Welcome to BrainThrive, ${userName}!`,
      html: emailHtml,
    });

    console.log('📬 Email sent successfully:', data);
    return NextResponse.json({
      success: true,
      message: `Test email sent to ${process.env.NOTIFY_EMAIL}`,
    });
  } catch (error: any) {
    console.error('❌ Error sending test email:', error);
    return NextResponse.json(
      { error: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}
