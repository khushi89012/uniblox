// Admin.js

import { useState, useEffect } from 'react';
import { generateDiscount, getReport } from '../api/api';
import './styles/Admin.css'; // Import the CSS file

const Admin = () => {
  const [report, setReport] = useState(null);

  const handleGenerateDiscount = async () => {
    try {
      const response = await generateDiscount();
      alert(`New discount code generated: ${response.data.code}`);
    } catch (error) {
      console.error('Error generating discount', error);
      alert('Failed to generate discount code.');
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport();
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report', error);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Admin Dashboard</h2>
      <div className="button-container">
        <button className="generate-button" onClick={handleGenerateDiscount}>
          Generate Discount Code
        </button>
      </div>
      <div className="report-container">
        <div className="report-card">
          <h3>Sales Report</h3>
          {report ? (
            <div className="report-details">
              <p>Total Items Sold: <span>{report.total_items_sold}</span></p>
              <p>Total Revenue: <span>${report.total_revenue}</span></p>
              <p>Total Discount Given: <span>${report.total_discount_given}</span></p>
              <p>Discount Codes: <span>{report.discount_codes.join(', ')}</span></p>
            </div>
          ) : (
            <p>Loading report...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
