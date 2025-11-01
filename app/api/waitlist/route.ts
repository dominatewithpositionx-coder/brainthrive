import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, source, website } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      throw new Error('Missing Supabase environment variables');
    }

    const endpoint = `${SUPABASE_URL}/rest/v1/waitlist`;

    console.log('📡 Sending request to:', endpoint);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        Prefer: 'return=representation',
      },
      // 🧠 Removed `joined_at` since it's not in your Supabase schema
      body: JSON.stringify({
        name: name || null,
        email,
        source: source || 'landing',
        website: website || null,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Supabase insert failed:', errorText);
      return NextResponse.json(
        { error: 'Supabase insert failed', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Supabase insert success:', data);

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('❌ Waitlist API Error:', err);
    return NextResponse.json(
      { message: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}
