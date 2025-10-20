// app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin'; // relative path

export async function POST(request: Request) {
  try {
    const { email, name, source } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('waitlist').insert({
      email: email.toLowerCase().trim(),
      name: name?.trim() ?? null,
      source: source?.trim() ?? 'site',
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
