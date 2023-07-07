import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import SummaryTableComponent from './SummaryTableComponent';

const QuotationTableComponent = () => {

    // quotation table data array
  const [rows, setRows] = useState([
    { id: 1, description: '', rate: '', qty: '', value: 0 },
    { id: 2, description: '', rate: '', qty: '', value: 0 },
    { id: 3, description: '', rate: '', qty: '', value: 0 },
    { id: 4, description: '', rate: '', qty: '', value: 0 },
    { id: 5, description: '', rate: '', qty: '', value: 0 },
  ]);

 //tatal Qty/SqFt
 const totalQty = rows.reduce((sum, row) => sum + row.qty,0);
 //total value in RS
  const totalValue = rows.reduce((sum, row) => sum + row.rate * row.qty, 0);

//summary table data
  const grandTotal = rows.reduce((sum, row) => sum + row.rate * row.qty, 0);
  const advancedTotal = grandTotal * 0.8;
  const balancedTotal = grandTotal - advancedTotal;

  //insert description to array
  const handleDescriptionCellChange = (event, rowId, field) => {
    const value = event.target.value;

    //update description cell
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, description: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  //insert rate and qty to array
  const handleCellChange = (event, rowId, field) => {
    const value = event.target.value;

    if (!Number.isInteger(Number(value)) || Number(value) < 1) {
      return;
    }

    //update quotation data array
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, [field]: Number(value) };
      }
      return row;
    });

    setRows(updatedRows);
  };

  //add new row to the table
  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, description: '', rate: '', qty: '', value: 0 };
    setRows([...rows, newRow]);
  };

  

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>No</th>
            <th>Description</th>
            <th>Rate Rs</th>
            <th>Qty/SqFt</th>
            <th>Value in Rs</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <input
                  type="text"
                  value={row.description}
                  onChange={(event) => handleDescriptionCellChange(event, row.id, 'description')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(event) => handleCellChange(event, row.id, 'rate')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(event) => handleCellChange(event, row.id, 'qty')}
                />
              </td>
              <td>{row.rate * row.qty}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td>{totalQty}</td>
            <td>{totalValue}</td>
          </tr>
        </tfoot>
      </Table>
      <Button id='button' variant="primary" onClick={handleAddRow} style={{ width: '200px' }}>
        + Add New Line
      </Button>

      {/* summary table */}
      <div style={{ marginTop:'20px' }}>
      <SummaryTableComponent grand={grandTotal} advanced={advancedTotal} balanced={balancedTotal} />
      </div>
    </div>
  );
};

export default QuotationTableComponent;
