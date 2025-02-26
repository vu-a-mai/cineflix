'use client';

/**
 * Error Fallback Component
 * Displays a user-friendly error message when an error occurs within the authentication flow
 * 
 * @param {Object} props - Component props
 * @param {Error} props.error - The error object containing the error details
 */
export default function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
        <p className="mt-2 text-gray-600">{error.message}</p>
      </div>
    </div>
  );
}