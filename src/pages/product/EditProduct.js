import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ nom: '', qte: '', uprix: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:1010/api/produit/${id}`)
      .then((res) => {
        const { nom, qte, uprix } = res.data;
        setProduct({ nom, qte, uprix });
      })
      .catch(() => {
        alert('Product not found.');
        navigate('/product');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1010/api/produit/update/${id}`, product);
      alert("Produit mis à jour !");
      navigate('/product');
    } catch {
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <p className="edit-loading">⏳ Chargement...</p>;

  return (
    <div className="edit-product-container">
      <h2>Modifier le Produit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom:</label>
          <input name="nom" value={product.nom} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Quantité:</label>
          <input type="number" name="qte" value={product.qte} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Prix Unitaire:</label>
          <input type="number" name="uprix" value={product.uprix} onChange={handleChange} required />
        </div>
        <button type="submit" className="save-btn">Mettre à jour</button>
      </form>
    </div>
  );
}

export default EditProduct;
