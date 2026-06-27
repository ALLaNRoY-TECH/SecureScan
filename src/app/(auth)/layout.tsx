export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-jet">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        {children}
      </div>
      <div className="hidden lg:flex w-1/2 relative bg-dark border-l border-white/5 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="relative z-10 text-center max-w-lg p-12">
          <div className="w-16 h-16 rounded-2xl bg-neon/10 border border-neon/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-3xl font-bold text-neon">S</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Secure Your Infrastructure</h2>
          <p className="text-gray-400 text-lg">Join thousands of security teams already using ScureScan to find vulnerabilities before they become breaches.</p>
        </div>
      </div>
    </div>
  );
}
