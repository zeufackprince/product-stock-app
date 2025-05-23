import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

function AddProduct() {
  const [products, setProducts] = useState([{ nom: '', qte: '', uprix: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addProductRow = () => {
    setProducts([...products, { nom: '', qte: '', uprix: '' }]);
  };

  const removeProductRow = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1010/api/produits/batch', products);
      alert('Produits ajoutés avec succès !');
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Ajouter des Produits</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index} className="product-row">
            <div className="form-group">
              <label>Nom:</label>
              <input type="text" value={product.nom} onChange={(e) => handleChange(index, 'nom', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Quantité:</label>
              <input type="number" value={product.qte} onChange={(e) => handleChange(index, 'qte', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Prix Unitaire:</label>
              <input type="number" value={product.uprix} onChange={(e) => handleChange(index, 'uprix', e.target.value)} required />
            </div>
            <button type="button" className="remove-btn" onClick={() => removeProductRow(index)}>Supprimer</button>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addProductRow}>+ Ajouter un Produit</button>
        <button type="submit" className="submit-btn">Enregistrer les Produits</button>
      </form>
    </div>
  );
}

export default AddProduct;
