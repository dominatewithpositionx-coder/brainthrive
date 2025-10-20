// app/admin/page.tsx
import Link from 'next/link'
import { supabaseAdmin } from '../../lib/supabaseAdmin' // <- relative path
export const dynamic = 'force-dynamic'

type Row = {
  id: string
  email: string
  name: string | null
  source: string | null
  created_at: string
}

export default async function AdminPage() {
  const { data, error } = await supabaseAdmin
    .from('waitlist')
    .select('id,email,name,source,created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <main className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Waitlist</h1>
          <a
            href="/api/export/csv"
            target="_blank"
            className="inline-flex items-center rounded-md bg-black px-3 py-2 text-white hover:opacity-90"
          >
            Download CSV
          </a>
        </div>
        <p className="text-red-600">Error: {error.message}</p>
      </main>
    )
  }

  const rows = (data ?? []) as Row[]

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Waitlist</h1>
        {/* CSV export (protected by your middleware Basic Auth) */}
        <a
          href="/api/export/csv"
          target="_blank"
          className="inline-flex items-center rounded-md bg-black px-3 py-2 text-white hover:opacity-90"
        >
          Download CSV
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Source</th>
              <th className="py-2 pr-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-2 pr-4">{r.email}</td>
                <td className="py-2 pr-4">{r.name ?? '—'}</td>
                <td className="py-2 pr-4">{r.source ?? '—'}</td>
                <td className="py-2 pr-4">
                  {new Date(r.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
