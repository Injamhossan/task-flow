"use client";

import { useAuth } from "@/components/AuthProvider";
import { Loader2, DollarSign, Calendar, Coins, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaymentHistoryPage() {
  const { user, role, loading } = useAuth();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const downloadInvoice = (payment) => {
    const doc = new jsPDF();
    const isStripe = payment.transactionId?.startsWith('pi_');
    const currency = isStripe ? '$' : 'BDT ';
    const date = new Date(payment.createdAt).toLocaleDateString();
    
    // Top Header Bar
    doc.setFillColor(15, 15, 15);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Brand Logo/Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(191, 255, 0); // Primary color (#bfff00)
    doc.text('TASKFLOW', 14, 26);
    
    // INVOICE Badge
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('I N V O I C E', 165, 26);
    
    // Reset colors for body
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    
    // Biller Info (Left)
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text('TaskFlow Platform', 14, 55);
    doc.setFont("helvetica", "normal");
    doc.text('123 Web Avenue', 14, 60);
    doc.text('Tech District, City 1200', 14, 65);
    doc.text('support@taskflow.com', 14, 70);
    
    // Invoice Metadata (Right)
    doc.text('Invoice Number:', 125, 55);
    doc.setFont("helvetica", "bold");
    doc.text(payment.transactionId.substring(0, 16).toUpperCase(), 165, 55);
    
    doc.setFont("helvetica", "normal");
    doc.text('Date of Issue:', 125, 62);
    doc.text(date, 165, 62);
    
    doc.text('Payment Method:', 125, 69);
    doc.text(isStripe ? 'Stripe (Card)' : 'SSLCommerz', 165, 69);
    
    // Separator line
    doc.setDrawColor(220, 220, 220);
    doc.line(14, 80, 196, 80);
    
    // Customer Info
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text('Billed To:', 14, 90);
    doc.setFont("helvetica", "normal");
    doc.text(user.email, 14, 96);
    
    // Data Table
    autoTable(doc, {
      startY: 110,
      head: [['Description', 'Qty', 'Unit Price', 'Amount']],
      body: [
        [`Purchase of ${payment.coins} Coins Package`, '1', `${currency}${payment.amount}`, `${currency}${payment.amount}`]
      ],
      theme: 'plain',
      headStyles: { 
        fillColor: [248, 248, 248], 
        textColor: [50, 50, 50], 
        fontStyle: 'bold',
        lineWidth: 0.1,
        lineColor: [220, 220, 220],
      },
      bodyStyles: {
        textColor: [40, 40, 40],
        lineWidth: 0.1,
        lineColor: [220, 220, 220],
      },
      styles: { cellPadding: 6 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      }
    });
    
    const finalY = doc.lastAutoTable.finalY || 130;
    
    // Totals Block
    doc.setFontSize(10);
    doc.text('Subtotal:', 140, finalY + 15);
    doc.text(`${currency}${payment.amount}`, 180, finalY + 15, { align: "right" });
    
    doc.text('Tax (0%):', 140, finalY + 22);
    doc.text(`${currency}0.00`, 180, finalY + 22, { align: "right" });
    
    doc.setDrawColor(220, 220, 220);
    doc.line(140, finalY + 28, 196, finalY + 28);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text('Total Paid:', 140, finalY + 36);
    doc.setTextColor(20, 160, 50); // Green color for paid amount
    doc.text(`${currency}${payment.amount}`, 180, finalY + 36, { align: "right" });
    
    // Status Stamp
    doc.setTextColor(20, 160, 50);
    doc.setFontSize(20);
    doc.text('PAID', 14, finalY + 36);
    
    // Footer message
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text('Thank you for completing your transaction with TaskFlow.', 105, 275, null, null, "center");
    doc.text('If you have any questions, please contact support@taskflow.com', 105, 280, null, null, "center");
    
    doc.save(`TaskFlow_Invoice_${payment.transactionId.substring(0, 8)}.pdf`);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      if (user?.email) {
         try {
             const res = await fetch(`/api/payments?email=${user.email}`);
             const data = await res.json();
             setPayments(data);
         } catch (error) {
             console.error("Error fetching payments", error);
         } finally {
             setIsLoading(false);
         }
      }
    };
    fetchPayments();
  }, [user]);

  if (loading || isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>;

  if (role !== "buyer") {
     return <div className="text-red-500 p-8">Access Denied: Only Buyers can access this page.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-inter tracking-tight">Payment History</h1>
        <p className="text-zinc-400 mt-1">Track all your coin purchases.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                    <tr>
                        <th className="px-6 py-4">Transaction ID</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Coins Received</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                    {payments.length > 0 ? (
                        payments.map((payment) => (
                            <tr key={payment._id} className="hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-zinc-500 text-xs">{payment.transactionId}</td>
                                <td className="px-6 py-4 font-bold text-green-500">
                                    {payment.transactionId?.startsWith('pi_') ? `$${payment.amount}` : `৳${payment.amount}`}
                                </td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center gap-1 font-bold text-zinc-300">
                                        {payment.coins}
                                        <Coins size={14} className="text-yellow-500" />
                                     </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => downloadInvoice(payment)}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 hover:text-white text-zinc-300 rounded text-xs transition-colors border border-zinc-700"
                                    >
                                        <Download size={14} />
                                        Invoice
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                No payment history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
