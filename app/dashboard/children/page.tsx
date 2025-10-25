'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

type Child = {
  id: string;
  name: string;
  age: number;
  screen_time_limit: number;
  points: number;
  created_at: string;
};

export default function ChildrenPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [limit, setLimit] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 🧠 Fetch children
  async function fetchChildren() {
    const { data, error } = await supabase.from('children').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching children:', error);
    else setChildren(data || []);
  }

  useEffect(() => {
    fetchChildren();
  }, []);

  // ➕ Add new child
  async function addChild(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !age || !limit) return;

    setLoading(true);
    const { error } = await supabase.from('children').insert([
      {
        name,
        age: Number(age),
        screen_time_limit: Number(limit),
      },
    ]);

    if (error) toast.error('Error adding child: ' + error.message);
    else {
      toast.success('Child added successfully!');
      setName('');
      setAge('');
      setLimit('');
      fetchChildren();
    }
    setLoading(false);
  }

  // ✏️ Edit child
  async function updateChild(id: string, updates: Partial<Child>) {
    const { error } = await supabase.from('children').update(updates).eq('id', id);
    if (error) toast.error('Error updating child: ' + error.message);
    else {
      toast.success('Child updated!');
      fetchChildren();
    }
  }

  // ❌ Delete child
  async function deleteChild(id: string) {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    const { error } = await supabase.from('children').delete().eq('id', id);
    if (error) toast.error('Error deleting child: ' + error.message);
    else {
      toast.success('Child deleted.');
      fetchChildren();
    }
  }

  // ➕ Add Minutes (increments limit)
  async function addMinutes(id: string, currentLimit: number) {
    const newLimit = currentLimit + 15;
    const { error } = await supabase.from('children').update({ screen_time_limit: newLimit }).eq('id', id);
    if (error) toast.error('Error adding minutes.');
    else {
      toast.success('Added 15 minutes!');
      fetchChildren();
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Children</h1>

      {/* Add Child Form */}
      <form onSubmit={addChild} className="bg-white p-6 rounded-lg shadow-sm border w-full max-w-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Add a Child</h2>
        <input
          className="border rounded-md px-3 py-2 w-full mb-3"
          placeholder="Child's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border rounded-md px-3 py-2 w-full mb-3"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
        <input
          className="border rounded-md px-3 py-2 w-full mb-3"
          type="number"
          placeholder="Daily Screen Time Limit (minutes)"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          required
        />
        <button type="submit" disabled={loading} className="btn w-full text-center">
          {loading ? 'Adding...' : 'Add Child'}
        </button>
      </form>

      {/* Children List */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Your Children</h2>
        {children.length === 0 ? (
          <p className="text-gray-500">No children added yet.</p>
        ) : (
          <ul className="space-y-3">
            {children.map((child) => (
              <li key={child.id} className="p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{child.name}</p>
                    <p className="text-sm text-gray-600">
                      Age: {child.age} • Limit: {child.screen_time_limit} min/day
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addMinutes(child.id, child.screen_time_limit)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      + Add 15 min
                    </button>
                    <button
                      onClick={() => updateChild(child.id, { screen_time_limit: child.screen_time_limit - 15 })}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      -15 min
                    </button>
                    <button
                      onClick={() => deleteChild(child.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
