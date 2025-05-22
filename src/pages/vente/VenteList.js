// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function VenteList() {
//   const [ventes, setVentes] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:1010/api/vente/getAllVente')
//       .then((response) => setVentes(response.data))
//       .catch((error) => console.error('Error fetching ventes:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Ventes Grouped by Date</h2>
//       {ventes.map((vente) => (
//         <div key={vente.id} style={cardStyle}>
//           <h4>Date: {vente.date}</h4>
//           <p><strong>Total Items:</strong> {vente.totalItem}</p>
//           <p><strong>Total Cost:</strong> {vente.coutTotal}</p>
//           <p><strong>Prix Vendu:</strong> {vente.prixVendu}</p>
//           <p><strong>Gain:</strong> {vente.gain}</p>
//           <p><strong>Message:</strong> {vente.message}</p>

//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr style={{ backgroundColor: '#f2f2f2' }}>
//                 <th style={thStyle}>Code Produit</th>
//                 <th style={thStyle}>Nom Produit</th>
//                 <th style={thStyle}>Quantité</th>
//                 <th style={thStyle}>Prix Unitaire</th>
//                 <th style={thStyle}>Prix Vendu</th>
//                 <th style={thStyle}>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vente.nomProdEtPrixT.map((item, idx) => {
//                 const match = item.match(
//                   /CodeProduit: (\d+), Nom produit: ([^,]+), Qte produit: (\d+), Prix unitaire: ([\d.]+), Prix vendu: ([\d.]+), Total: ([\d.]+)/
//                 );

//                 if (!match) {
//                   return (
//                     <tr key={idx}>
//                       <td colSpan={6} style={tdStyle}>⚠️ Format incorrect: {item}</td>
//                     </tr>
//                   );
//                 }

//                 const [, code, name, qty, unitPrice, soldPrice, total] = match;

//                 return (
//                   <tr key={idx}>
//                     <td style={tdStyle}>{code}</td>
//                     <td style={tdStyle}>{name}</td>
//                     <td style={tdStyle}>{qty}</td>
//                     <td style={tdStyle}>{unitPrice}</td>
//                     <td style={tdStyle}>{soldPrice}</td>
//                     <td style={tdStyle}>{total}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }

// const cardStyle = {
//   marginBottom: '3rem',
//   padding: '1rem',
//   border: '1px solid #ccc',
//   borderRadius: '8px'
// };

// const thStyle = {
//   border: '1px solid #ddd',
//   padding: '8px',
//   textAlign: 'left'
// };

// const tdStyle = {
//   border: '1px solid #ddd',
//   padding: '8px'
// };

// export default VenteList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VenteList() {
  const [ventes, setVentes] = useState([]);
  const [filteredVentes, setFilteredVentes] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1010/api/vente/getAllVente')
      .then((response) => {
        setVentes(response.data);
        setFilteredVentes(response.data);
      })
      .catch((error) => console.error('Error fetching ventes:', error));
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = ventes.filter((vente) => {
      const venteDate = new Date(vente.date);
      const matchesDate = dateFilter ? vente.date === dateFilter : true;
      const matchesMonth = monthFilter ? (venteDate.getMonth() + 1).toString().padStart(2, '0') === monthFilter : true;
      const matchesYear = yearFilter ? venteDate.getFullYear().toString() === yearFilter : true;
      return matchesDate && matchesMonth && matchesYear;
    });
    setFilteredVentes(filtered);
  }, [dateFilter, monthFilter, yearFilter, ventes]);

  return (
    <div>
      <h2>Ventes Grouped by Date</h2>

      {/* Filters */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Date (YYYY-MM-DD):{' '}
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </label>
        {' '}
        <label>
          Month:{' '}
          <input type="number" min="1" max="12" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} placeholder="MM" />
        </label>
        {' '}
        <label>
          Year:{' '}
          <input type="number" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} placeholder="YYYY" />
        </label>
        {' '}
        <button onClick={() => {
          setDateFilter('');
          setMonthFilter('');
          setYearFilter('');
        }}>Reset Filters</button>
      </div>

      {/* Display filtered ventes */}
      {filteredVentes.map((vente) => (
        <div key={vente.id} style={cardStyle}>
          <h4>Date: {vente.date}</h4>
          <p><strong>Total Items:</strong> {vente.totalItem}</p>
          <p><strong>Total Cost:</strong> {vente.coutTotal}</p>
          <p><strong>Prix Vendu:</strong> {vente.prixVendu}</p>
          <p><strong>Gain:</strong> {vente.gain}</p>
          <p><strong>Message:</strong> {vente.message}</p>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={thStyle}>Code Produit</th>
                <th style={thStyle}>Nom Produit</th>
                <th style={thStyle}>Quantité</th>
                <th style={thStyle}>Prix Unitaire</th>
                <th style={thStyle}>Prix Vendu</th>
                <th style={thStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {vente.nomProdEtPrixT.map((item, idx) => {
                const match = item.match(
                  /CodeProduit: (\d+), Nom produit: ([^,]+), Qte produit: (\d+), Prix unitaire: ([\d.]+), Prix vendu: ([\d.]+), Total: ([\d.]+)/
                );

                if (!match) {
                  return (
                    <tr key={idx}>
                      <td colSpan={6} style={tdStyle}>⚠️ Format incorrect: {item}</td>
                    </tr>
                  );
                }

                const [, code, name, qty, unitPrice, soldPrice, total] = match;

                return (
                  <tr key={idx}>
                    <td style={tdStyle}>{code}</td>
                    <td style={tdStyle}>{name}</td>
                    <td style={tdStyle}>{qty}</td>
                    <td style={tdStyle}>{unitPrice}</td>
                    <td style={tdStyle}>{soldPrice}</td>
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

const cardStyle = {
  marginBottom: '3rem',
  padding: '1rem',
  border: '1px solid #ccc',
  borderRadius: '8px'
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left'
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px'
};

export default VenteList;
