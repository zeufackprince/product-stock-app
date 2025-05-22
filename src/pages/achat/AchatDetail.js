import React from 'react';
import { useParams } from 'react-router-dom';

function AchatDetail() {
  const { id } = useParams();
  return <h2>Achat Detail Page for ID: {id}</h2>;
}

export default AchatDetail;