import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// 🧠 Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✉️ Initialize Resend (email service)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, source } = await req.json();

    // 🧩 Basic validation
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 🧠 Insert subscriber into Supabase
    const { error } = await supabase.from('waitlist').insert([
      {
        name,
        email,
        source: source || 'brainthrive-landing',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    // 🧾 Load BrainThrive branded HTML email
    const templatePath = path.join(process.cwd(), 'emails', 'brainthrive-welcome.html');
    let emailHtml = fs.readFileSync(templatePath, 'utf8');

    // 🧩 Personalize message
    const parentName = name?.trim() || 'Parent';
    emailHtml = emailHtml.replace(/{{name}}/g, parentName);

    // ✅ Validate Resend key
    if (!process.env.RESEND_API_KEY) {
      console.error('🚨 Missing RESEND_API_KEY in .env.local');
      return NextResponse.json(
        { error: 'Email service not configured properly.' },
        { status: 500 }
      );
    }

    // 📬 Define email recipient
    const sendTo =
      process.env.NODE_ENV === 'production'
        ? email // ✅ Real email in production
        : 'dominatewithpositionx@gmail.com'; // 👈 Sandbox testing email

    // ✉️ Send email via Resend
    const result = await resend.emails.send({
      from: 'BrainThrive <notifications@resend.dev>',
      to: sendTo,
      subject: `🧠 Welcome to BrainThrive, ${parentName}!`,
      html: emailHtml,
    });

    console.log('📬 Resend response:', result);

    // ✅ Return success JSON
    return NextResponse.json({
      success: true,
      message: `You’re on the list, ${parentName}! Check your inbox for your BrainThrive welcome email.`,
    });
  } catch (error: any) {
    console.error('❌ Waitlist API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
