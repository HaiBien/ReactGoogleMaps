import React from "react";

function ReportOK() {

  function createXlsx() {
    var xl = require('excel4node');
    var wb = new xl.Workbook();

    var ws = wb.addWorksheet('Sheet 1');
    var ws2 = wb.addWorksheet('Sheet 2');

    var style = wb.createStyle({
      font: {
        color: '#ff0800',
        size: 12,
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });
    ws.cell(1, 1)
      .number(100)
      .style(style);
    ws.cell(1, 2)
      .number(200)
      .style(style);
    ws.cell(1, 3)
      .formula('A1 + B1')
      .style(style);
    ws.cell(2, 1)
      .string('string')
      .style(style);
    ws.cell(3, 1)
      .bool(true)
      .style(style)
      .style({font: {size: 14}});

    wb.write('Excel.xlsx');
  }


  return (
    <div className="p-2">
      <button onClick={createXlsx()}>Generate document</button>
    </div>
  );
};
export default ReportOK;