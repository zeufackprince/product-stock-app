import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewAchat() {
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([{ produitId: '', quantite: '' }]);

  useEffect(() => {
    axios.get('http://localhost:1010/api/produit/getAllProd')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([...items, { produitId: '', quantite: '' }]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date,
      items: items.map(item => ({
        quantite: parseInt(item.quantite),
        produit: { id: parseInt(item.produitId) }
      }))
    };

    try {
      await axios.post('http://localhost:1010/api/achat/add', payload);
      alert('Achat added successfully!');
      setDate('');
      setItems([{ produitId: '', quantite: '' }]);
    } catch (err) {
      console.error('Error creating achat:', err);
      alert('Failed to create achat.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>New Achat</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            style={{ padding: '0.5rem', marginLeft: '1rem' }}
          />
        </div>

        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <select
              value={item.produitId}
              onChange={e => handleChange(index, 'produitId', e.target.value)}
              required
              style={{ marginRight: '1rem', padding: '0.5rem' }}
            >
              <option value="">Select Product</option>
              {products.map(prod => (
                <option key={prod.id} value={prod.id}>
                  {prod.nom}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Quantité"
              value={item.quantite}
              onChange={e => handleChange(index, 'quantite', e.target.value)}
              required
              style={{ marginRight: '1rem', padding: '0.5rem' }}
            />

            <button type="button" onClick={() => removeRow(index)} style={{ padding: '0.3rem 0.6rem' }}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addRow} style={{ marginBottom: '1rem' }}>
          + Add Item
        </button>

        <br />

        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Submit Achat
        </button>
      </form>
    </div>
  );
}

export default NewAchat;
