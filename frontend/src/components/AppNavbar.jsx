import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

export default function AppNavbar({ activeTab, setActiveTab, lowStockCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand 
          href="#dashboard" 
          onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
          className="fw-bold d-flex align-items-center"
        >
          🚛 Bolnet Magazzino
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              className="px-3"
            >
              📊 Dashboard
            </Nav.Link>
            
            <Nav.Link 
              active={activeTab === 'products'} 
              onClick={() => setActiveTab('products')}
              className="px-3 d-flex align-items-center"
            >
              📦 Prodotti
              {lowStockCount > 0 && (
                <Badge bg="danger" pill className="ms-2">
                  {lowStockCount}
                </Badge>
              )}
            </Nav.Link>
            
            <Nav.Link 
              active={activeTab === 'movements'} 
              onClick={() => setActiveTab('movements')}
              className="px-3"
            >
              🔄 Movimenti
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
