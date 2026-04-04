import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-8 shadow-xl">
          <h1 className="text-xl font-semibold text-white mb-2">Mentoring Platform</h1>
          <p className="text-slate-400 mb-6">
            Sign in to manage availability, view recommendations, or book mentoring calls.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
          >
            Sign in with Email
          </Link>
        </div>
      </div>
    </div>
  );
}

