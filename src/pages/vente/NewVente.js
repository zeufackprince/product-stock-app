import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './NewVente.css';

function NewVente() {
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([{ produitId: '', quantite: '', prix: '' }]);

  useEffect(() => {
    axios.get('http://localhost:1010/api/produit/getAllProd')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([...items, { produitId: '', quantite: '', prix: '' }]);
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
        prix: parseFloat(item.prix),
        produit: { id: parseInt(item.produitId) }
      }))
    };

    try {
      await axios.post('http://127.0.0.1:1010/api/vente/newVente', payload);
      alert('Vente enregistrée avec succès !');
      generatePDF();
      setDate('');
      setItems([{ produitId: '', quantite: '', prix: '' }]);
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de l’enregistrement.');
    }
  };

  const generatePDF = () => {
  const doc = new jsPDF();

  const venteId = Math.floor(Math.random() * 10000); // à remplacer par un vrai ID si disponible
  const totalGlobal = items.reduce((sum, item) => {
    return sum + (parseFloat(item.prix) * parseInt(item.quantite));
  }, 0);

  doc.setFontSize(14);
  doc.text(`Facture No: ${venteId}`, 150, 20);
  doc.text(`Date: ${date}`, 14, 30);
  doc.text(`Mr. ___________________ doit`, 14, 40);

  autoTable(doc, {
    startY: 50,
    head: [['Qté', 'Désignation', 'P.U', 'P.T']],
    body: items.map(item => {
      const produit = products.find(p => p.id === parseInt(item.produitId));
      const nom = produit?.nom || 'Inconnu';
      const qty = parseInt(item.quantite);
      const pu = parseFloat(item.prix).toFixed(2);
      const pt = (qty * pu).toFixed(2);
      return [qty, nom, pu, pt];
    }),
    styles: {
      halign: 'center',
    },
    headStyles: {
      fillColor: [255, 0, 102],
    },
  });

  const afterTableY = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(12);
  doc.text(`Total: ${totalGlobal.toFixed(2)} FCFA`, 160, afterTableY);
  doc.setFontSize(10);
  doc.text("Les marchandises vendues ne sont ni reprises ni échangées.", 14, afterTableY + 10);
  doc.text("Arrêter la présente facture à la somme de _____________________________", 14, afterTableY + 20);
  doc.text("Le vendeur", 160, afterTableY + 30);

  doc.save(`Facture_${venteId}.pdf`);
};


  return (
    <div className="new-vente">
      <h2>Nouvelle Vente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-date">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        {items.map((item, index) => (
          <div key={index} className="vente-item">
            <select
              value={item.produitId}
              onChange={(e) => handleChange(index, 'produitId', e.target.value)}
              required
            >
              <option value="">Sélectionner un produit</option>
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
              onChange={(e) => handleChange(index, 'quantite', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Prix"
              value={item.prix}
              onChange={(e) => handleChange(index, 'prix', e.target.value)}
              required
            />
            <button type="button" onClick={() => removeRow(index)}>Supprimer</button>
          </div>
        ))}

        <button type="button" onClick={addRow} className="add-btn">+ Ajouter un article</button>
        <button type="submit" className="submit-btn">Enregistrer</button>
      </form>
    </div>
  );
}

export default NewVente;
