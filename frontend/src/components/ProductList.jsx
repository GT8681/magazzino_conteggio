import React, { useState } from 'react';
import { Row, Col, Card, Badge, Button, Modal } from 'react-bootstrap';
import { deleteProduct } from '../services/api';

export default function ProductList({ products, onOpenNewProduct, onOpenMovement, onRefresh }) {
  // Stati per gestire il modale di eliminazione
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete._id);
      if (onRefresh) onRefresh();
      handleCloseDeleteModal();
    } catch (err) {
      console.error("Errore durante l'eliminazione del prodotto", err);
      alert("Errore durante l'eliminazione del prodotto.");
    }
  };

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📦 Catalogo Prodotti</h2>
        <div>
          <Button variant="success" className="me-2" onClick={onOpenMovement}>
            🔄 Carico / Scarico
          </Button>
          <Button variant="primary" onClick={onOpenNewProduct}>
            ➕ Nuovo Prodotto
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info">Nessun prodotto presente in magazzino. Inizia ad aggiungerne uno!</div>
      ) : (
        <Row className="g-4">
          {products.map((product) => {
            const isLow = product.quantity <= product.minStock;
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card className={`h-100 shadow-sm border-0 ${isLow ? 'border-danger border-2' : ''}`}>
                  {/* Sezione Immagine / Icona */}
                  <div className="bg-light text-center p-3 border-bottom d-flex align-items-center justify-content-center" style={{ height: '140px' }}>
                    {product.imageUrl ? (
                      <Card.Img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="text-muted">
                        <span style={{ fontSize: '2.5rem' }}>🧴</span>
                        <div className="small text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Bolnet Magazzino</div>
                      </div>
                    )}
                  </div>
                
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-secondary">{product.category}</span>
                      {isLow ? (
                        <Badge bg="danger">Scorta Bassa</Badge>
                      ) : (
                        <Badge bg="success">Disponibile</Badge>
                      )}
                    </div>

                    <Card.Title className="h6 fw-bold mb-1">{product.name}</Card.Title>
                    {product.brand && <Card.Subtitle className="text-muted small mb-2">{product.brand}</Card.Subtitle>}

                    {/* Giacenza e info */}
                    <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small d-block">Giacenza:</span>
                        <span className={`fw-bold fs-5 ${isLow ? 'text-danger' : 'text-dark'}`}>
                          {product.quantity} <span className="fs-6 fw-normal">{product.unit}</span>
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="text-muted small d-block">Min: {product.minStock}</span>
                        <code className="small">{product.sku || 'No SKU'}</code>
                      </div>

                    </div>
                    <div>

                      <br />
                      <div className="text">
                        <span className="text-muted small d-block">NOTE del Prodeotto :</span>
                        <code className="small">{product.notes || 'No notes'}</code>
                      </div>

                    </div>

                    {/* Pulsante Elimina */}
                    <div className="mt-3 pt-2 border-top text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="w-100"
                        onClick={() => handleOpenDeleteModal(product)}
                      >
                        🗑️ Elimina Prodotto
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Modale di Conferma Eliminazione */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">⚠️ Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare definitivamente il prodotto
          <strong> {productToDelete?.name}</strong> dal magazzino?
          L'azione non può essere annullata.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Elimina Definitivamente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
