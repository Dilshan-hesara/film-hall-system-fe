import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Booking Data Type එක define කරමු
interface TicketData {
  bookingId: string;
  movieTitle: string;
  hallName: string;
  date: string;
  time: string;
  seats: string[];
  price: number;
}

export const generateTicketPDF = (data: TicketData) => {
  const doc = new jsPDF();

  // 1. Header (Brand Name)
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.text("MKD Cinemas", 105, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Movie Ticket Receipt", 105, 30, { align: "center" });

  // 2. Line Divider
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);

  // 3. Ticket Details Table
  autoTable(doc, {
    startY: 45,
    head: [['Description', 'Details']],
    body: [
      ['Booking ID', `#${data.bookingId.slice(-6).toUpperCase()}`],
      ['Movie', data.movieTitle],
      ['Cinema Hall', data.hallName],
      ['Date', data.date],
      ['Time', data.time],
      ['Seats', data.seats.join(', ')],
      ['Total Price', `LKR ${data.price}.00`],
      ['Payment Status', 'PAID'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [220, 38, 38] }, // Red Header
    styles: { fontSize: 12, cellPadding: 3 },
  });

  // 4. Footer Message
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text("Thank you for choosing MKD Cinemas!", 105, finalY, { align: "center" });
  doc.text("Please show this receipt at the entrance.", 105, finalY + 6, { align: "center" });

  // 5. Save PDF
  doc.save(`MKD_Ticket_${data.bookingId.slice(-6)}.pdf`);
};