'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center text-black">
          <h2 className="mb-4 text-4xl font-bold">Something went wrong!</h2>
          <p className="mb-8 text-xl text-gray-600">
            We apologize for the inconvenience. An unexpected error occurred.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-full bg-black px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
