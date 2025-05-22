import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VenteList() {
  const [ventes, setVentes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1010/api/achat/get-all-achat')
      .then((response) => setVentes(response.data))
      .catch((error) => console.error('Error fetching ventes:', error));
  }, []);

  return (
    <div>
      <h2>Ventes Grouped by Date</h2>
      {ventes.map((vente) => (
        <div key={vente.id} style={{ marginBottom: '3rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h4>Date: {vente.date}</h4>
          <p><strong>Total Items:</strong> {vente.totalItem}</p>
          <p><strong>Total Cost:</strong> {vente.coutTotal}</p>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={thStyle}>Code Produit</th>
                <th style={thStyle}>Nom Produit</th>
                <th style={thStyle}>Quantité</th>
                <th style={thStyle}>Prix Unitaire</th>
                <th style={thStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {vente.nomProdEtPrixT.map((item, idx) => {
                // Parse item string (assumes consistent format)
                const match = item.match(/CodeProduit: (\d+), Nom produit: (.*?), Qte produit: (\d+), Prix unitaire: ([\d.]+), Total: ([\d.]+)/);
                if (!match) return null;

                const [, code, name, qty, unitPrice, total] = match;

                return (
                  <tr key={idx}>
                    <td style={tdStyle}>{code}</td>
                    <td style={tdStyle}>{name}</td>
                    <td style={tdStyle}>{qty}</td>
                    <td style={tdStyle}>{unitPrice}</td>
                    <td style={tdStyle}>{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default VenteList;
