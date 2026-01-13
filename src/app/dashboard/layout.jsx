
import Sidebar from "@/components/Dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar Area */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
