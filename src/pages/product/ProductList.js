import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:1010/api/produit/getAllProd')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const handleEdit = (id) => navigate(`/product/edit/1/${id}`);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to deactivate this product?")) {
      axios.put(`http://localhost:1010/api/produit/desactiver/${id}`)
        .then(() => {
          alert('Product deactivated.');
          fetchProducts();
        })
        .catch((err) => {
          console.error('Error deactivating product:', err);
          alert('Failed to deactivate product.');
        });
    }
  };

  const handlePrintPDF = () => {
  const doc = new jsPDF();
  doc.text("Liste des Produits", 14, 16);
  autoTable(doc, {
    head: [['Code', 'Nom', 'Quantité', 'Prix Unitaire']],
    body: filteredProducts.map(p => [p.id, p.nom, p.qte, p.uprix]),
    startY: 20,
  });
  doc.save('produits.pdf');
  };


  const filteredProducts = products.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>All Products</h2>
        <div className="product-list-controls">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handlePrintPDF}>🖨️ Export PDF</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5">No products found.</td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.id || index + 1}</td>
                  <td>{product.nom}</td>
                  <td>{product.qte}</td>
                  <td>{product.uprix}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(product.id)}>Modifier</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
