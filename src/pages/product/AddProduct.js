import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [products, setProducts] = useState([
    { nom: '', qte: '', uprix: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProductRow = () => {
    setProducts([...products, { nom: '', qte: '', uprix: '' }]);
  };

  const removeProductRow = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1010/api/produits/batch', products);
      alert('Produits ajoutés avec succès !');
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout des produits :', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Ajouter des Produits</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index} style={productBoxStyle}>
            <div style={inputGroupStyle}>
              <label>Nom:</label>
              <input
                type="text"
                value={product.nom}
                onChange={(e) => handleChange(index, 'nom', e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label>Quantité:</label>
              <input
                type="number"
                value={product.qte}
                onChange={(e) => handleChange(index, 'qte', e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label>Prix Unitaire:</label>
              <input
                type="number"
                value={product.uprix}
                onChange={(e) => handleChange(index, 'uprix', e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <button type="button" onClick={() => removeProductRow(index)} style={removeBtnStyle}>
              Supprimer
            </button>
          </div>
        ))}
        <div style={{ marginTop: '1rem' }}>
          <button type="button" onClick={addProductRow} style={addBtnStyle}>+ Ajouter un Produit</button>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <button type="submit" style={submitBtnStyle}>Enregistrer les Produits</button>
        </div>
      </form>
    </div>
  );
}

// Inline Styles
const containerStyle = {
  maxWidth: '700px',
  margin: 'auto',
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '2rem'
};

const productBoxStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1rem',
  marginBottom: '1rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fff'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
};

const inputStyle = {
  padding: '0.5rem',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const removeBtnStyle = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer',
  alignSelf: 'center',
  marginTop: '1.5rem'
};

const addBtnStyle = {
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer'
};

const submitBtnStyle = {
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%'
};

export default AddProduct;
