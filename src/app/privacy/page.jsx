export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Privacy Policy
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Your privacy is non-negotiable. Here’s how we protect, handle, and use your data at TaskFlow.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-inter">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, update your profile, post a task, or communicate with us. This may include your name, email address, payment information, and any other information you choose to provide.
            </p>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including to process transactions, identify you as a user, and communicate with you about your account and our platform.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>To facilitate payments and task verification.</li>
              <li>To prevent fraud and abuse of our platform.</li>
              <li>To send you technical notices, updates, and support messages.</li>
            </ul>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">3. Data Security</h2>
            <p>
              We prioritize the security of your data. We use commercially reasonable safeguards to help keep the information collected through the Service secure and take reasonable steps (such as requesting a unique password) to verify your identity before granting you access to your account.
            </p>
          </section>

          <section className="space-y-4 pt-8">
             <h2 className="text-2xl font-bold text-white tracking-tight">4. Contact Us</h2>
             <p>
               If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@taskflow.com" className="text-primary hover:underline">privacy@taskflow.com</a>.
             </p>
          </section>
        </div>

      </div>
    </div>
  );
}
