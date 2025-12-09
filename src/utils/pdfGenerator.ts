import jsPDF from 'jspdf';
import QRCode from 'qrcode';

interface TicketData {
  bookingId: string;
  movieTitle: string;
  hallName: string;
  date: string;
  time: string;
  seats: string[];
  price: number;
  paymentDate?: string; 
}

export const generateTicketPDF = async (data: TicketData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --- 1. GENERATE QR CODE ---
  const qrData = JSON.stringify({
    id: data.bookingId,
    movie: data.movieTitle,
    seats: data.seats
  });
  const qrCodeUrl = await QRCode.toDataURL(qrData);

  // --- COLORS ---
  const mkdRed: [number, number, number] = [220, 38, 38]; 
  const richBlack: [number, number, number] = [20, 20, 20];
  const offWhite: [number, number, number] = [245, 245, 245];

  // --- BACKGROUND ---
  doc.setFillColor(...offWhite);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // ================= HEADER =================
  doc.setFillColor(...richBlack);
  doc.rect(0, 0, pageWidth, 50, 'F');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(255, 255, 255);
  doc.text("MKD CINEMAS", pageWidth / 2, 25, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(...mkdRed);
  doc.text("PREMIUM CINEMATIC EXPERIENCE", pageWidth / 2, 33, { align: "center" });

  // ================= TICKET BODY =================
  
  // Movie Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(data.movieTitle.toUpperCase(), 20, 70);

  // Red Line
  doc.setDrawColor(...mkdRed);
  doc.setLineWidth(1.5);
  doc.line(20, 75, 120, 75);

  // --- INFO COLUMNS ---
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);

  let yPos = 90;
  const lineHeight = 9;

  const displayDate = data.paymentDate || new Date().toLocaleString('en-GB', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  });

  const details = [
    { label: "Cinema Hall", value: data.hallName },
    { label: "Show Date", value: data.date },
    { label: "Show Time", value: data.time },
    { label: "Seats", value: data.seats.join(', '), isBold: true },
    { label: "Payment Date", value: displayDate },
    { label: "Payment Mode", value: "ONLINE", isSmall: true },
    { label: "Total Price", value: `LKR ${data.price}.00`, isRed: true },
  ];

  details.forEach(item => {
    // Label
    doc.setFont("helvetica", "bold");
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(item.label.toUpperCase(), 20, yPos);

    // Value Styling
    doc.setFont("helvetica", "bold");
    if (item.isRed) {
        doc.setTextColor(...mkdRed);
        doc.setFontSize(12);
    } else if (item.isSmall) {
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
    } else {
        doc.setTextColor(20, 20, 20);
        doc.setFontSize(10);
    }
    
    // Value Printing
    doc.text(String(item.value), 70, yPos);
    yPos += lineHeight;
  });

  // ================= QR CODE SECTION =================
  const qrSize = 50;
  doc.addImage(qrCodeUrl, 'PNG', pageWidth - 70, 70, qrSize, qrSize);
  
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("Scan to Verify", pageWidth - 45, 70 + qrSize + 5, { align: "center" });
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const bookingRef = data.bookingId ? data.bookingId.slice(-6).toUpperCase() : "------";
  doc.text(`Booking ID: #${bookingRef}`, pageWidth - 45, 70 + qrSize + 12, { align: "center" });

  // ================= FOOTER / TERMS =================
  const termsY = 170;
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(15, termsY, pageWidth - 30, 40);

  doc.setFontSize(9);
  doc.setTextColor(...mkdRed);
  doc.setFont("helvetica", "bold");
  doc.text("IMPORTANT NOTICE", 20, termsY + 8);

  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  
  const notices = [
    "• Please show this QR code at the entrance.",
    "• Tickets are non-refundable and non-transferable.",
    "• Adults Only (A) movies require valid ID proof.",
    "• Outside food/beverages are strictly prohibited."
  ];

  let noticeY = termsY + 16;
  notices.forEach(notice => {
    doc.text(notice, 20, noticeY);
    noticeY += 6;
  });

  // Bottom Branding
  doc.setFillColor(...richBlack);
  doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text("www.mkdcinemas.lk | support@mkdcinemas.lk", pageWidth / 2, pageHeight - 6, { align: "center" });

  // Save File
  const fileNameId = data.bookingId ? data.bookingId.slice(-6) : "TICKET";
  doc.save(`MKD_Ticket_${fileNameId}.pdf`);
};