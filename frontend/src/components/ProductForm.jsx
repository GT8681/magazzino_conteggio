import React, { useState } from 'react';
import { Form, Button, Modal, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { createProduct } from '../services/api';

export default function ProductForm({ show, handleClose, onProductCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    sku: '',
    category: 'Detergenti',
    unit: 'pz',
    quantity: 0,
    minStock: 2,
    imageUrl: '',
    notes: ''
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Funzione per caricare l'immagine su Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'bolnet_preset'); // <-- Inserisci il tuo preset Cloudinary
    
    try {
      setUploading(true);
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/db4uicads/image/upload', // <-- Inserisci il tuo cloud name
        data
      );
      setFormData(prev => ({ ...prev, imageUrl: res.data.secure_url }));
    } catch (err) {
      console.error("Errore durante l'upload dell'immagine", err);
      alert("Errore nel caricamento dell'immagine su Cloudinary.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      onProductCreated();
      handleClose();
      // Reset completo del form
      setFormData({
        name: '',
        brand: '',
        sku: '',
        category: 'Detergenti',
        unit: 'pz',
        quantity: 0,
        minStock: 2,
        imageUrl: '',
        notes: ''
      });
    } catch (err) {
      console.error("Errore salvataggio prodotto", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>➕ Nuovo Prodotto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nome Prodotto *</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="es. Kiter, Kemika" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Detergenti">Detergenti</option>
                  <option value="Attrezzature">Attrezzature</option>
                  <option value="Dischi/Pad">Dischi/Pad</option>
                  <option value="DPI">DPI</option>
                  <option value="Varie">Varie</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>SKU / Codice</Form.Label>
                <Form.Control type="text" name="sku" value={formData.sku} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Unità di Misura</Form.Label>
                <Form.Select name="unit" value={formData.unit} onChange={handleChange}>
                  <option value="pz">pz</option>
                  <option value="Tanica">Tanica</option>
                  <option value="Flacone">Flacone</option>
                  <option value="Kg">Kg</option>
                  <option value="Litri">Litri</option>
                  <option value="Conf">Conf</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Giacenza Iniziale</Form.Label>
                <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Scorta Minima (Alert)</Form.Label>
                <Form.Control type="number" name="minStock" value={formData.minStock} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Foto Prodotto</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} accept="image/*" />
            {uploading && <div className="text-primary small mt-1"><Spinner animation="border" size="sm" /> Caricamento in corso su Cloudinary...</div>}
            {formData.imageUrl && !uploading && (
              <div className="text-success small mt-1">✓ Immagine caricata correttamente!</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control as="textarea" rows={2} name="notes" value={formData.notes} onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annulla</Button>
          <Button variant="primary" type="submit" disabled={uploading}>Salva Prodotto</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
