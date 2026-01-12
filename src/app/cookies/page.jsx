export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Cookie Policy
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            We use cookies to improve your experience. Here's what that means for you.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-inter">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your machine to help the site provide a better user experience. In general, cookies are used to retain user preferences, store information for things like shopping carts, and provide anonymized tracking data to third party applications like Google Analytics.
            </p>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">2. How We Use Cookies</h2>
            <p>
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong className="text-white">Essential Cookies:</strong> vital for the running of the website.</li>
              <li><strong className="text-white">Analytics Cookies:</strong> help us understand how you use our site.</li>
              <li><strong className="text-white">Functionality Cookies:</strong> remember your preferences.</li>
            </ul>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">3. Managing Cookies</h2>
            <p>
              As a rule, cookies will make your browsing experience better. However, you may prefer to disable cookies on this site and on others. The most effective way to do this is to disable cookies in your browser. We suggest consulting the Help section of your browser or taking a look at the About Cookies website which offers guidance for all modern browsers.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
