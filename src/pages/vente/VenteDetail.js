import React from 'react';
import { useParams } from 'react-router-dom';

function VenteDetail() {
  const { id } = useParams();
  return <h2>Vente Detail Page for ID: {id}</h2>;
}

export default VenteDetail;