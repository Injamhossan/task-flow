
export default function DataDeletion() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Data Deletion
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Steps to request deletion of your data from TaskFlow.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-inter">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">1. Data Deletion Rights</h2>
            <p>
              You have the right to request the deletion of your personal data collected by TaskFlow. We are committed to ensuring your privacy and data protection rights are respected.
            </p>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">2. How to Request Deletion</h2>
            <p>
              To request the deletion of your account and associated data, please follow these steps:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Log in to your TaskFlow account.</li>
              <li>Navigate to your <strong>Dashboard</strong> and go to <strong>Settings</strong>.</li>
              <li>Look for the <strong>Delete Account</strong> option (if available) or contact our support team directly.</li>
              <li>If you cannot access your account, send an email to <a href="mailto:privacy@taskflow.com" className="text-primary hover:underline">privacy@taskflow.com</a> with the subject line <strong>"Data Deletion Request"</strong>.</li>
            </ul>
             <p>
              Please include your username and registered email address in your request to help us locate your data.
            </p>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">3. Data Retention</h2>
            <p>
              Once your deletion request is processed, your personal information will be permanently removed from our active databases. However, we may retain certain information for legal or administrative purposes as required by law.
            </p>
          </section>

          <section className="space-y-4 pt-8">
             <h2 className="text-2xl font-bold text-white tracking-tight">4. Third-Party Data</h2>
             <p>
               If you have linked third-party accounts (e.g., Facebook, Google), please note that you may also need to remove the TaskFlow app from those platforms to stop further data sharing.
             </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong>Facebook:</strong> Go to Settings & Privacy &gt; Settings &gt; Apps and Websites, and remove TaskFlow.</li>
              <li><strong>Google:</strong> Go to your Google Account &gt; Data and Privacy &gt; Third-party apps with account access, and remove TaskFlow.</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
}
