import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'; // relative path

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('waitlist')
    .select('email,name,source,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }

  const rows = data ?? [];
  const header = ['email', 'name', 'source', 'created_at'];
  const lines = [
    header.join(','),
    ...rows.map((r) =>
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
  const csv = lines.join('\r\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="waitlist_${Date.now()}.csv"`,
    },
  });
}
