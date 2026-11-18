import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { createMovement } from '../services/api';

export default function MovementModal({ show, handleClose, products, onMovementCompleted }) {
  const [formData, setFormData] = useState({
    productId: '',
    type: 'IN',
    quantity: 1,
    notes: ''
  });

  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!formData.productId) {
      setFeedback({ type: 'danger', message: 'Seleziona un prodotto valido.' });
      return;
    }

    try {
      await createMovement({
        ...formData,
        quantity: Number(formData.quantity)
      });

      setFeedback({ type: 'success', message: 'Movimento registrato con successo!' });
      
      // 1. Chiamiamo la funzione passata da App.jsx per ricaricare prodotti e movimenti
      if (onMovementCompleted) {
        onMovementCompleted();
      }

      // 2. Chiudiamo il modale e resettiamo il form dopo un attimo
      setTimeout(() => {
        setFormData({ productId: '', type: 'IN', quantity: 1, notes: '' });
        setFeedback({ type: '', message: '' });
        handleClose();
      }, 800);

    } catch (err) {
      console.error("Errore durante la registrazione del movimento", err);
      const errorMsg = err.response?.data?.error || "Errore durante il salvataggio del movimento.";
      setFeedback({ type: 'danger', message: errorMsg });
    }
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>🔄 Registra Carico / Scarico</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {feedback.message && (
            <Alert variant={feedback.type} className="py-2">
              {feedback.message}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Seleziona Prodotto *</Form.Label>
            <Form.Select name="productId" value={formData.productId} onChange={handleChange} required>
              <option value="">-- Scegli un articolo --</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>
                  {p.name} (Disponibile: {p.quantity} {p.unit})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo di Movimento *</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleChange}>
              <option value="IN">➕ Carico (Entrata)</option>
              <option value="OUT">➖ Scarico (Uscita)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantità *</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note / Causale</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Es. Rifornimento settimanale, utilizzo in cantiere..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="success" type="submit">
            Conferma Movimento
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
