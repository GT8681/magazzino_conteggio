import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { getProducts, getMovements } from './services/api';

import AppNavbar from './components/AppNavbar';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import MovementHistory from './components/MovementHistory';
import ProductForm from './components/ProductForm';
import MovementModal from './components/MovementModal';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products' | 'movements'
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modali globali
  const [showProductModal, setShowProductModal] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState(false);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [prodRes, movRes] = await Promise.all([
        getProducts(),
        getMovements()
      ]);
      setProducts(prodRes.data);
      setMovements(movRes.data);
      setError(null);
    } catch (err) {
      setError("Errore di connessione al server. Verifica che il backend sia avviato.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const lowStockCount = products.filter(p => p.quantity <= p.minStock).length;

  return (
    <div className="bg-light min-vh-100 pb-5">
      <AppNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lowStockCount={lowStockCount} 
      />

      <Container>
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard 
                products={products} 
                movements={movements} 
                onNavigate={setActiveTab}
                onOpenMovement={() => setShowMovementModal(true)}
              />
            )}

            {activeTab === 'products' && (
              <ProductList 
                products={products} 
                onOpenNewProduct={() => setShowProductModal(true)}
                onOpenMovement={() => setShowMovementModal(true)}
                onRefresh={loadAllData}
              />
            )}

            {activeTab === 'movements' && (
              <MovementHistory 
                movements={movements} 
                onOpenMovement={() => setShowMovementModal(true)}
              />
            )}
          </>
        )}
      </Container>

      {/* Modali accessibili ovunque */}
      <ProductForm 
        show={showProductModal} 
        handleClose={() => setShowProductModal(false)} 
        onProductCreated={loadAllData} 
      />

      <MovementModal 
        show={showMovementModal} 
        handleClose={() => setShowMovementModal(false)} 
        products={products} 
        onMovementCompleted={loadAllData} 
      />
    </div>
  );
}

export default App;
