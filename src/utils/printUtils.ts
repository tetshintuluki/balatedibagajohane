export const printDocument = (content: HTMLElement) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Canan Tonota - Report</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            body { margin: 0; }
            .no-print { display: none !important; }
          }
          body { font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
    </html>
  `;

  printWindow.document.write(printContent);
  printWindow.document.close();

  printWindow.onload = () => {
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };
};