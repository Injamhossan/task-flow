export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Terms of Service
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            The rules of engagement. By using TaskFlow, you agree to these terms.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-inter">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">1. Acceptance of Terms</h2>
            <p>
              By accessing or using TaskFlow, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">2. User Accounts</h2>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers and symbols) with your account.
            </p>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">3. Tasks and Payments</h2>
            <p>
              Buyers are responsible for providing clear instructions and fair compensation for tasks. Workers are responsible for completing tasks honestly and to the best of their ability. TaskFlow reserves the right to mediate disputes and make final decisions regarding payouts.
            </p>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">4. Prohibited Activities</h2>
            <p>
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
              <li>Violate, or encourage others to violate, any right of a third party, including by infringing or misappropriating any third-party intellectual property right.</li>
              <li>Post, upload, or distribute any content that is unlawful, defamatory, libelous, inaccurate, or that a reasonable person could deem to be objectionable.</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
}
