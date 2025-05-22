import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    nom: '',
    qte: '',
    uprix: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:1010/api/produit/${id}`)
      .then((response) => {
        const { nom, qte, uprix } = response.data;
        setProduct({
          nom: nom || '',
          qte: qte || '',
          uprix: uprix || '',
        });
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        alert('Product not found.');
        navigate('/product');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1010/api/produit/update/${id}`, product);
      alert('Product updated successfully!');
      navigate('/product');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>⏳ Loading product...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <input
            type="text"
            name="nom"
            value={product.nom}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Quantity</label>
          <input
            type="number"
            name="qte"
            value={product.qte}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Unit Price</label>
          <input
            type="number"
            name="uprix"
            value={product.uprix}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button type="submit" style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
