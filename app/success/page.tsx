export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">🎉 You're on the list!</h1>
      <p className="text-lg text-gray-700 max-w-xl">
        Thanks for joining the PlayPass waitlist. We'll let you know when early access opens.
      </p>
      <a
        href="/"
        className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
      >
        Back to Home
      </a>
    </main>
  );
}
