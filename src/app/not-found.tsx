import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
            <h2 className="text-4xl font-bold mb-4">404</h2>
            <p className="text-xl mb-8">Page Not Found</p>
            <Link
                href="/"
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
