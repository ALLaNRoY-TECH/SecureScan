import Link from "next/link";
import { ShieldAlert, ArrowRight } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="w-full max-w-md text-center">
      <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldAlert className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Access Denied</h1>
      <p className="text-gray-400 mb-8">You do not have the required permissions to view this page. If you believe this is an error, contact your workspace administrator.</p>
      
      <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 w-full bg-white text-jet font-bold py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
        Return to Dashboard <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
