# BizLink: Connected Supply-Chain & B2B Discovery Network 🌐⚡

> **Hackathon Prototype** | Powered by **SerpApi** Local Search & Interactive Multi-Tier Supply Network Engine

---

## 💡 1. Executive Summary & Core Philosophy

**BizLink** is a digital business network connecting enterprises with other businesses (B2B) and with their customers (B2C/B2B2C).

Modern local business discovery is fundamentally broken and reliant on word-of-mouth. If a retailer needs a better or cheaper wholesale supplier for LED bulbs or electrical switches within 20 km of Ambala, they usually have to ask around physically or rely on fragmented trade lists. 

BizLink transforms this fragmented reality into a **searchable business ecosystem and dynamic supply-chain graph**:
```
  [ Manufacturer ]
         ↓
 [ Super Wholesaler ]
     ↙        ↘
[ Wholesaler A ]  [ Wholesaler B ]
     ↘        ↙
  [ MY BUSINESS (Retailer) ]
     ↙        ↘
[ Retailer / Contractor ]  [ Local Customer ]
```

### Key Concept: Multi-Role Flexibility
In real trade, a business is rarely just one thing:
- A **wholesaler** is a customer of a super wholesaler, yet a supplier to multiple retailers.
- A **retailer** purchases from wholesalers and sells to both trade contractors and walk-in consumers.
- BizLink models businesses as dynamic nodes with multi-role capabilities rather than rigid e-commerce categories.

---

## 🚀 2. Quick Start & Running Locally

### Prerequisites
- Node.js 18+ (Tested on Node.js v24)
- npm or yarn

### Installation
```bash
# 1. Clone or navigate to the repository
cd bizlink-network

# 2. Install dependencies
npm install

# 3. Configure environment variables (Optional for live SerpApi)
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 3. SerpApi Configuration & Backend Security

BizLink isolates all SerpApi calls within a secure backend API endpoint (`/api/search-businesses` & `src/services/serpapiService.ts`). The API key is **never exposed in client-side JavaScript**.

### Setting Up Your SerpApi Key
In `.env.local`:
```env
SERPAPI_KEY=your_actual_serpapi_key_here
```

### Zero-Config Mock Fallback
- If `SERPAPI_KEY` is not provided, BizLink automatically runs in **Realistic Mock Mode**.
- The offline engine serves hyper-realistic, geo-accurate wholesale supplier data for **Ambala, Chandigarh, Delhi, Ludhiana, and Gurugram**.
- You can also force mock mode anytime using the toggle on the search page or Settings dashboard.

---

## 🔍 4. How the Business Search Engine Works

1. **Query Formulation**: When a retailer enters a search (e.g. Product: `LED Bulbs`, Location: `Ambala`, Radius: `20 km`, Role: `Wholesaler`):
   - The backend constructs an optimized Google Maps query: `"wholesaler LED Bulbs in Ambala"`.
2. **SerpApi Proxying**: The server calls the `google_maps` engine endpoint with country and locale parameters (`gl=in`, `hl=en`).
3. **Structured Transformation**:
   - Extracts business name, GPS coordinates, place type, ratings, review counts, phone, and address.
   - Derives supply-chain tier (Manufacturer, Super Wholesaler, Wholesaler, Distributor).
   - Generates wholesale trade line items with minimum order quantities (MOQ), estimated wholesale unit rates, and delivery lead times.
4. **Interactive Discovery**:
   - Retailers can filter by radius (5 km, 10 km, 20 km, 50 km), sort by distance/rating/MOQ, and compare up to 3 suppliers side-by-side.

---

## 🕸️ 5. How the Interactive Supply-Chain Network Works

BizLink features a real-time, interactive multi-tier supply chain visualizer (`src/components/network/SupplyChainGraph.tsx`):
- **Tier 0**: Raw Manufacturers & Opto-electronics plants (e.g., *Surya Apex Opto-Electronics Ltd.*).
- **Tier 1**: Regional Super Wholesalers (e.g., *North India Distribution Co.*).
- **Tier 2**: Wholesale Stockists (e.g., *Ambala LED Wholesalers*, *Ludhiana Wire & Cable*, *Chandigarh Modular Switches*).
- **Tier 3 (Center)**: **MY BUSINESS** (*Sharma Electronics & Hardware*, Ambala Cantt) with glowing focal node.
- **Tier 4**: Downstream Retail Outlets & Installation Contractors (*Verma Electrical Works*, *Gupta Mega Store*).
- **Tier 5**: Local Consumers & Site Clients.

### Dynamic Topology Updates
When you discover a supplier (e.g., *Ambala LED Wholesalers & Lighting Hub*) and click **"Add to Suppliers"**:
1. The new supplier node is instantly connected upstream to your business.
2. The interactive SVG pipeline draws animated flow pulses demonstrating the new active procurement channel.
3. Your business's supplier count and supply redundancy score update immediately.

---

## 🌟 6. The Central Hackathon Demo Flow

To experience the core showcase:
1. **Open BizLink Landing Page**: Notice the SaaS hero section and live supply chain preview.
2. **Click "Explore Business Network"**: Enter the Business Owner dashboard for *Sharma Electronics & Hardware* in Ambala Cantt.
3. **Inspect Dashboard Metrics**: View Connected Suppliers (4), Active Buyers (142), Pending Receivables (₹1,45,000), and Payables (₹82,000).
4. **Navigate to "Find Suppliers"**:
   - Query: `LED Bulbs`
   - Location: `Ambala`
   - Radius: `20 km`
   - Role: `Wholesaler`
5. **Review Discovered Cards**: Inspect *Ambala LED Wholesalers & Lighting Hub* (3.2 km away, 4.8★, 142 reviews, MOQ 2 cartons @ ₹4,200).
6. **Open Business Profile**: View wholesale line items, GST verification, and reviews.
7. **Click "Add to Suppliers"**: Watch the supplier get linked into your network.
8. **View "My Network"**: See the updated interactive topological graph with animated supply links!
9. **Switch to "Customer Mode"**: Test the consumer search experience for local stores ("Stationery shop near me").

---

## 📁 7. Codebase Architecture

```
bizlink-network/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── search-businesses/
│   │   │       └── route.ts          # Server API Route (SerpApi proxy & mock handler)
│   │   ├── globals.css               # Design system tokens, glassmorphism & flow animations
│   │   ├── layout.tsx                # App shell & context providers
│   │   └── page.tsx                  # App mode router (Landing, Business, Customer)
│   ├── components/
│   │   ├── customer/
│   │   │   └── CustomerPortal.tsx    # Customer discovery & local store search
│   │   ├── dashboard/
│   │   │   ├── BusinessPortal.tsx    # Business owner main shell
│   │   │   ├── DashboardHeader.tsx   # Topbar & live status indicators
│   │   │   ├── Sidebar.tsx           # Sidebar navigation
│   │   │   └── views/
│   │   │       ├── OverviewView.tsx       # Core metric cards & quick actions
│   │   │       ├── FindSuppliersView.tsx  # Hero SerpApi search & comparison
│   │   │       ├── FindCustomersView.tsx  # Downstream buyer discovery
│   │   │       ├── ProductsView.tsx       # Catalog & wholesale MOQ manager
│   │   │       ├── LedgerView.tsx         # Debit/credit ledger & trade books
│   │   │       ├── ReviewsView.tsx        # Reputation & trust score breakdown
│   │   │       ├── BusinessProfileView.tsx# Enterprise profile & GST settings
│   │   │       └── SettingsView.tsx       # SerpApi configuration & test console
│   │   ├── modals/
│   │   │   ├── BusinessProfileModal.tsx   # Detailed modal with catalog & reviews
│   │   │   ├── RegisterBusinessModal.tsx  # Business registration (BL-AMB-XXXXXX)
│   │   │   └── AddTransactionModal.tsx    # Ledger entry creator
│   │   ├── network/
│   │   │   └── SupplyChainGraph.tsx       # Interactive multi-tier SVG/Canvas graph
│   │   └── ui/
│   │       └── ToastContainer.tsx         # Global feedback alerts
│   ├── context/
│   │   └── BizLinkContext.tsx        # Central React state & simulation engine
│   ├── data/
│   │   ├── mockBusinesses.ts         # Rich mock dataset (Ambala, Chd, Delhi)
│   │   ├── mockLedger.ts             # Prepopulated debit/credit transactions
│   │   └── mockRelationships.ts      # Multi-tier topological edges
│   ├── services/
│   │   └── serpapiService.ts         # SerpApi abstraction & fallback engine
│   └── types/
│       └── index.ts                  # Domain models & TypeScript definitions
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛡️ License
Built for Hackathon Demonstration. Enterprise SaaS prototype demonstrating connected B2B ecosystems and SerpApi discovery integration.
