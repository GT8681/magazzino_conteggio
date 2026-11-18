# 📦 Bolnet Magazzino

**Bolnet Magazzino** è una web application Full-Stack sviluppata per la gestione efficiente del magazzino, il tracciamento delle giacenze e la registrazione dei movimenti di carico/scarico di prodotti, attrezzature e materiali.

Il progetto nasce per rispondere a reali esigenze operative aziendali (come il tracciamento dei prodotti per le squadre di pulizia e manutenzione), offrendo un'interfaccia moderna, fluida e intuitiva.

---

## 🚀 Tecnologie Utilizzate

### Frontend
* **React** (con Vite)
* **React-Bootstrap** & **Bootstrap 5** (per un design responsive e modale)
* **Axios** (per le chiamate API HTTP)

### Backend
* **Node.js**
* **Express.js**

### Database & Servizi
* **MongoDB** & **Mongoose** (Database NoSQL e modellazione dati)
* **Cloudinary** (Hosting e gestione in cloud delle immagini dei prodotti)

---

## ✨ Funzionalità Principali

* **Catalogazione Prodotti**: Inserimento, modifica ed eliminazione di articoli con gestione di SKU, categorie, unità di misura, soglie di scorta minima e immagini dedicate caricate su Cloudinary.
* **Gestione Movimenti (Carico/Scarico)**: Registrazione rapida di operazioni di tipo `IN` (Carico) e `OUT` (Scarico) tramite comodi modali interattivi.
* **Aggiornamento in Tempo Reale**: Sincronizzazione automatica delle giacenze di magazzino subito dopo ogni movimento registrato.
* **Dashboard & Storico**: Panoramica generale dello stato del magazzino, conteggio dei prodotti in esaurimento e cronologia completa di tutti i movimenti effettuati.
* **Interfaccia UI/UX Curata**: Feedback visivi immediati con modali Bootstrap personalizzati al posto dei classici alert di sistema.

---

## 🛠️ Installazione e Avvio Locale

Assicurati di avere installato **Node.js** sul tuo computer prima di procedere.

### 1. Cliona la repository
```bash
git clone [https://github.com/GT8681/bolnet-magazzino.git](https://github.com/GT8681/bolnet-magazzino.git)
cd bolnet-magazzino
