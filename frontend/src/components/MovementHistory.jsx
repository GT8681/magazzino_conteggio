import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';

export default function MovementHistory({ movements, onOpenMovement }) {
  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📋 Storico Movimenti Magazzino</h2>
        <Button variant="success" onClick={onOpenMovement}>
          🔄 Registra Carico / Scarico
        </Button>
      </div>
      
      {movements.length === 0 ? (
        <div className="alert alert-info">Nessun movimento registrato finora.</div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover align="middle">
            <thead className="table-secondary">
              <tr>
                <th>Data / Ora</th>
                <th>Tipo</th>
                <th>Prodotto</th>
                <th>Quantità</th>
                <th>Note / Riferimento</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((m) => (
                <tr key={m._id}>
                  <td>
                    {new Date(m.date).toLocaleDateString('it-IT')} {new Date(m.date).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    {m.type === 'IN' ? (
                      <Badge bg="success">➕ CARICO</Badge>
                    ) : (
                      <Badge bg="danger">➖ SCARICO</Badge>
                    )}
                  </td>
                  <td><strong>{m.product ? m.product.name : 'Prodotto eliminato'}</strong></td>
                  <td className="fw-bold">
                    {m.quantity} {m.product?.unit || ''}
                  </td>
                  <td>{m.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
