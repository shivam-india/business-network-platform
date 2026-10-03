export type BusinessRole =
  | 'Manufacturer'
  | 'Super Wholesaler'
  | 'Wholesaler'
  | 'Distributor'
  | 'Retailer'
  | 'Service Provider';

export interface BusinessLocation {
  address: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  distanceKm?: number;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  unitPrice: number;
  moq: number; // Minimum Order Quantity
  unit: string; // e.g. 'pieces', 'boxes', 'meters', 'kg'
  inStock: boolean;
  leadTimeDays: number;
}

export interface Review {
  id: string;
  authorName: string;
  authorBusiness?: string;
  authorRole?: BusinessRole | 'Customer';
  rating: number;
  date: string;
  comment: string;
  source: 'platform_verified' | 'serpapi_google' | 'b2b_trade';
  isVerifiedBuyer: boolean;
}

export interface Business {
  id: string;
  businessCode: string; // e.g. "BL-AMB-000124"
  name: string;
  ownerName: string;
  roles: BusinessRole[];
  primaryRole: BusinessRole;
  categories: string[];
  description: string;
  location: BusinessLocation;
  rating: number;
  reviewCount: number;
  verified: boolean;
  phone: string;
  email: string;
  website?: string;
  gstNumber?: string;
  establishedYear: number;
  minOrderValue?: number;
  priceLevel?: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  suppliesTo: BusinessRole[];
  purchasesFrom: BusinessRole[];
  products: ProductItem[];
  reviews: Review[];
  totalSuppliersCount: number;
  totalCustomersCount: number;
  trustScore: number; // 0 - 100
  fulfillmentRate: number; // e.g. 98%
  avatarUrl?: string;
  bannerGradient?: string;
  source?: 'serpapi' | 'verified_bizlink' | 'mock_directory';
}

export interface SupplyRelationship {
  id: string;
  sourceId: string; // Supplier ID
  targetId: string; // Buyer ID
  sourceName: string;
  targetName: string;
  sourceRole: BusinessRole;
  targetRole: BusinessRole;
  category: string;
  volumeMonthly: string;
  activeSince: string;
  status: 'active' | 'pending' | 'alternative';
  creditTermDays: number;
}

export interface LedgerTransaction {
  id: string;
  date: string;
  businessId: string;
  businessName: string;
  businessRole: BusinessRole;
  type: 'Credit' | 'Debit'; // Credit: Receivable (money owed to us), Debit: Payable (we owe)
  amount: number;
  status: 'Pending' | 'Settled' | 'Overdue';
  invoiceNumber: string;
  description: string;
  dueDate: string;
  category: string;
}

export interface SerpApiSearchParams {
  query: string;
  location: string;
  radiusKm?: number;
  businessType?: BusinessRole | 'All';
  category?: string;
  forceMock?: boolean;
}

export interface SearchResultResponse {
  results: Business[];
  totalResults: number;
  source: 'serpapi_live' | 'mock_fallback' | 'mock_mode';
  query: string;
  location: string;
  radiusKm: number;
  latencyMs: number;
  serpApiQueryUsed?: string;
}
