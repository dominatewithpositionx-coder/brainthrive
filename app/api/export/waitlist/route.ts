import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('waitlist')
    .select('created_at,email,name,source')
    .order('created_at', { ascending: false })

  if (error) {
    return new Response('DB error: ' + error.message, { status: 500 })
  }

  const header = ['created_at', 'email', 'name', 'source']
  const rows = (data ?? []).map((r) =>
    [
      r.created_at,
      r.email,
      (r.name ?? '').replace(/"/g, '""'),
      (r.source ?? '').replace(/"/g, '""'),
    ]
      .map((v) => `"${(v ?? '').toString()}"`)
      .join(',')
  )
  const csv = [header.join(','), ...rows].join('\n')

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="playpass_waitlist.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
