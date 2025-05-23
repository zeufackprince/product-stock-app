import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './VenteList.css';

function VenteList() {
  const [ventes, setVentes] = useState([]);
  const [filteredVentes, setFilteredVentes] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1010/api/vente/getAllVente')
      .then((response) => {
        const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setVentes(sorted);
        setFilteredVentes(sorted);
      })
      .catch((error) => console.error('Error fetching ventes:', error));
  }, []);

  useEffect(() => {
    const filtered = ventes.filter((vente) => {
      const venteDate = new Date(vente.date);
      const matchDate = dateFilter ? vente.date === dateFilter : true;
      const matchMonth = monthFilter ? (venteDate.getMonth() + 1).toString().padStart(2, '0') === monthFilter : true;
      const matchYear = yearFilter ? venteDate.getFullYear().toString() === yearFilter : true;
      return matchDate && matchMonth && matchYear;
    });
    setFilteredVentes(filtered);
  }, [dateFilter, monthFilter, yearFilter, ventes]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des Ventes", 14, 16);
    filteredVentes.forEach((vente, i) => {
      const parsedData = vente.nomProdEtPrixT.map(item => {
        const match = item.match(/CodeProduit: (\d+), Nom produit: ([^,]+), Qte produit: (\d+), Prix unitaire: ([\d.]+), Prix vendu: ([\d.]+), Total: ([\d.]+)/);
        return match ? [match[1], match[2], match[3], match[4], match[5], match[6]] : ['-', '-', '-', '-', '-', '-'];
      });
      autoTable(doc, {
        head: [['Code', 'Nom', 'Qte', 'Prix U', 'Prix V', 'Total']],
        body: parsedData,
        startY: i === 0 ? 20 : doc.autoTable.previous.finalY + 10,
        margin: { left: 14 },
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] },
      });
    });
    doc.save("ventes.pdf");
  };

  return (
    <div className="vente-list">
      <h2>Liste des Ventes</h2>
      <div className="filters">
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        <input type="number" placeholder="MM" min="1" max="12" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} />
        <input type="number" placeholder="YYYY" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} />
        <button onClick={() => { setDateFilter(''); setMonthFilter(''); setYearFilter(''); }}>Réinitialiser</button>
        <button onClick={exportPDF}>🖨️ Export PDF</button>
      </div>

      {filteredVentes.map((vente) => {
        let totalGlobal = 0;

        return (
          <div key={vente.id} className="vente-card">
            <h4>Date: {vente.date}</h4>
            <p><strong>Total Items:</strong> {vente.totalItem}</p>
            {/* <p><strong>Total Cost:</strong> {vente.coutTotal}</p>
            <p><strong>Prix Vendu:</strong> {vente.prixVendu}</p> */}
            <p><strong>Gain:</strong> {vente.gain}</p>
            {/* <p><strong>Message:</strong> {vente.message}</p> */}

            <table className="vente-table">
              <thead>
                <tr>
                  <th>Code Produit</th>
                  <th>Nom Produit</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Prix Vendu</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {vente.nomProdEtPrixT.map((item, idx) => {
                  const match = item.match(/CodeProduit: (\d+), Nom produit: ([^,]+), Qte produit: (\d+), Prix unitaire: ([\d.]+), Prix vendu: ([\d.]+), Total: ([\d.]+)/);
                  if (!match) {
                    return <tr key={idx}><td colSpan="6">⚠️ Format incorrect: {item}</td></tr>;
                  }
                  const [, code, name, qty, unitPrice, soldPrice, total] = match;
                  totalGlobal += parseFloat(total);
                  return (
                    <tr key={idx}>
                      <td>{code}</td>
                      <td>{name}</td>
                      <td>{qty}</td>
                      <td>{unitPrice}</td>
                      <td>{soldPrice}</td>
                      <td>{total}</td>
                    </tr>
                  );
                })}
                <tr className="total-row">
                  <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Cost</td>
                  <td style={{ fontWeight: 'bold' }}>{totalGlobal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default VenteList;
