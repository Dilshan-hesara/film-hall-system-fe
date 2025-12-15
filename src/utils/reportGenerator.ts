import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (bookings: any[], month: string) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('MKD Cinemas - Monthly Sales Report', 14, 22);
  
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Report Month: ${month}`, 14, 30);
  doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 36);

  const tableColumn = ["Booking ID", "Customer", "Movie", "Date", "Seats", "Price (LKR)"];
  
  const tableRows: any[] = [];
  let totalIncome = 0;

  bookings.forEach((booking) => {
    const rowData = [
      booking._id.slice(-6).toUpperCase(),
      booking.user?.username || 'Guest',
      booking.movie?.title || 'Unknown',
      new Date(booking.date).toLocaleDateString(),
      booking.seats.length,
      booking.totalPrice.toLocaleString()
    ];
    tableRows.push(rowData);
    totalIncome += booking.totalPrice;
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
    theme: 'grid',
    headStyles: { fillColor: [22, 160, 133] },
    foot: [['', '', '', '', 'TOTAL', `LKR ${totalIncome.toLocaleString()}`]],
    footStyles: { fillColor: [44, 62, 80], fontStyle: 'bold' }
  });

  doc.save(`MKD_Sales_Report_${month.replace(/\s/g, '_')}.pdf`);
};

export const exportToExcel = (bookings: any[], month: string) => {

  const worksheetData = bookings.map((booking) => ({
    "Booking ID": booking._id,
    "Customer Name": booking.user?.username || 'Guest',
    "Customer Email": booking.user?.email || 'N/A',
    "Movie Title": booking.movie?.title,
    "Show Date": new Date(booking.date).toLocaleDateString(),
    "Show Time": booking.time,
    "Seats Count": booking.seats.length,
    "Total Price (LKR)": booking.totalPrice,
    "Status": "Paid"
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

  XLSX.writeFile(workbook, `MKD_Sales_Report_${month.replace(/\s/g, '_')}.xlsx`);
};