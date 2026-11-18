import React from 'react';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';

export default function Dashboard({ products, movements, onNavigate, onOpenMovement }) {
  // Calcoli rapidi per le card
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.quantity <= p.minStock);
  const totalMovements = movements.length;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">📊 Panoramica Magazzino</h2>
        <Button variant="success" onClick={onOpenMovement}>
          🔄 Registra Carico / Scarico
        </Button>
      </div>

      {/* KPI Cards */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 border-start border-primary border-4">
            <Card.Body>
              <div className="text-muted small text-uppercase fw-bold">Prodotti a Catalogo</div>
              <div className="display-5 fw-bold text-primary my-2">{totalProducts}</div>
              <Button variant="link" className="p-0 text-decoration-none" onClick={() => onNavigate('products')}>
                Vedi tutto l'inventario →
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className={`border-0 shadow-sm h-100 border-start border-4 ${lowStockProducts.length > 0 ? 'border-danger' : 'border-success'}`}>
            <Card.Body>
              <div className="text-muted small text-uppercase fw-bold">Prodotti Sotto Scorta</div>
              <div className={`display-5 fw-bold my-2 ${lowStockProducts.length > 0 ? 'text-danger' : 'text-success'}`}>
                {lowStockProducts.length}
              </div>
              <span className="text-muted small">
                {lowStockProducts.length > 0 ? 'Articoli da riordinare al più presto' : 'Tutte le scorte sono ok'}
              </span>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 border-start border-dark border-4">
            <Card.Body>
              <div className="text-muted small text-uppercase fw-bold">Movimenti Registrati</div>
              <div className="display-5 fw-bold text-dark my-2">{totalMovements}</div>
              <Button variant="link" className="p-0 text-decoration-none" onClick={() => onNavigate('movements')}>
                Vai allo storico movimenti →
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabella Alert Riordini */}
      {lowStockProducts.length > 0 && (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-danger text-white fw-bold">
            ⚠️ Attenzione: Articoli in esaurimento (Da riordinare)
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive hover className="m-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Prodotto</th>
                  <th>Categoria</th>
                  <th className="text-center">Giacenza Attuale</th>
                  <th className="text-center">Scorta Minima</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map(p => (
                  <tr key={p._id}>
                    <td><strong>{p.name}</strong> {p.brand && <span className="text-muted small">({p.brand})</span>}</td>
                    <td>{p.category}</td>
                    <td className="text-center text-danger fw-bold">{p.quantity} {p.unit}</td>
                    <td className="text-center">{p.minStock} {p.unit}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
