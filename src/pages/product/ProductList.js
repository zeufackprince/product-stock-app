import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:1010/api/produit/getAllProd')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  const handleEdit = (id) => {
    navigate(`/product/edit/1/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to deactivate this product?")) {
      axios.put(`http://localhost:1010/api/produit/desactiver/${id}`)
        .then(() => {
          alert('Product deactivated.');
          fetchProducts();
        })
        .catch((error) => {
          console.error('Error deactivating product:', error);
          alert('Failed to deactivate product.');
        });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>All Products</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#3498db', color: 'white' }}>
          <tr>
            <th style={{ padding: '0.75rem' }}>Code</th>
            <th style={{ padding: '0.75rem' }}>Name</th>
            <th style={{ padding: '0.75rem' }}>Quantity</th>
            <th style={{ padding: '0.75rem' }}>Unit Price</th>
            <th style={{ padding: '0.75rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>No products found.</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.75rem' }}>{product.id || index + 1}</td>
                <td style={{ padding: '0.75rem' }}>{product.nom}</td>
                <td style={{ padding: '0.75rem' }}>{product.qte}</td>
                <td style={{ padding: '0.75rem' }}>{product.uprix}</td>
                <td style={{ padding: '0.75rem' }}>
                  <button
                    onClick={() => handleEdit(product.id)}
                    style={{
                      marginRight: '10px',
                      padding: '6px 12px',
                      backgroundColor: '#2ecc71',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#e74c3c',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
