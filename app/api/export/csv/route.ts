// app/api/export/csv/route.ts

// ✅ Absolutely prevent static optimization
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .select('email,name,source,created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query failed:', error.message);
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }

    const rows = data ?? [];
    const header = ['email', 'name', 'source', 'created_at'];

    const csvLines = [
      header.join(','),
      ...rows.map((r: any) =>
        [
          r.email,
          r.name ?? '',
          r.source ?? '',
          new Date(r.created_at).toISOString(),
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(',')
      ),
    ];

    const csv = csvLines.join('\r\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="waitlist_${Date.now()}.csv"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: any) {
    console.error('CSV export error:', err);
    return new NextResponse(`Error: ${err?.message || 'Unknown error'}`, {
      status: 500,
    });
  }
}
