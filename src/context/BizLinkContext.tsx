'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Business,
  BusinessRole,
  SupplyRelationship,
  LedgerTransaction,
  SearchResultResponse,
  SerpApiSearchParams,
} from '@/types';
import { CURRENT_USER_BUSINESS, MOCK_BUSINESSES } from '@/data/mockBusinesses';
import { INITIAL_RELATIONSHIPS } from '@/data/mockRelationships';
import { INITIAL_TRANSACTIONS } from '@/data/mockLedger';

export type ActiveAppMode = 'landing' | 'business_owner' | 'customer';

export type DashboardView =
  | 'overview'
  | 'find_suppliers'
  | 'find_customers'
  | 'products'
  | 'network'
  | 'transactions'
  | 'reviews'
  | 'profile'
  | 'settings';

interface BizLinkContextType {
  appMode: ActiveAppMode;
  setAppMode: (mode: ActiveAppMode) => void;
  dashboardView: DashboardView;
  setDashboardView: (view: DashboardView) => void;
  myBusiness: Business;
  updateMyBusiness: (updated: Partial<Business>) => void;
  businesses: Business[];
  relationships: SupplyRelationship[];
  transactions: LedgerTransaction[];
  savedBusinesses: string[];
  toggleSaveBusiness: (businessId: string) => void;
  
  // Modals & Drawers
  inspectingBusiness: Business | null;
  setInspectingBusiness: (business: Business | null) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  isAddTransactionModalOpen: boolean;
  setIsAddTransactionModalOpen: (open: boolean) => void;
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: (open: boolean) => void;

  // Actions
  addSupplierToNetwork: (supplier: Business, initialVolume?: string) => void;
  addCustomerToNetwork: (customer: Business, initialVolume?: string) => void;
  addTransaction: (tx: Omit<LedgerTransaction, 'id'>) => void;
  settleTransaction: (txId: string) => void;
  registerNewBusiness: (formData: any) => Business;

  // Search Engine State
  isSearching: boolean;
  searchResults: SearchResultResponse | null;
  searchParams: SerpApiSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SerpApiSearchParams>>;
  performBusinessSearch: (customParams?: Partial<SerpApiSearchParams>) => Promise<SearchResultResponse | null>;
  useMockMode: boolean;
  setUseMockMode: (val: boolean) => void;

  // Notifications / Toast
  toastMessage: { title: string; desc: string; type?: 'success' | 'info' | 'warning' } | null;
  showToast: (title: string, desc: string, type?: 'success' | 'info' | 'warning') => void;
}

const BizLinkContext = createContext<BizLinkContextType | undefined>(undefined);

export function BizLinkProvider({ children }: { children: React.ReactNode }) {
  const [appMode, setAppMode] = useState<ActiveAppMode>('landing');
  const [dashboardView, setDashboardView] = useState<DashboardView>('overview');
  
  const [myBusiness, setMyBusiness] = useState<Business>(CURRENT_USER_BUSINESS);
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [relationships, setRelationships] = useState<SupplyRelationship[]>(INITIAL_RELATIONSHIPS);
  const [transactions, setTransactions] = useState<LedgerTransaction[]>(INITIAL_TRANSACTIONS);
  const [savedBusinesses, setSavedBusinesses] = useState<string[]>(['biz_ambala_led_hub']);
  
  const [inspectingBusiness, setInspectingBusiness] = useState<Business | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // Search state
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultResponse | null>(null);
  const [useMockMode, setUseMockMode] = useState(false);
  const [searchParams, setSearchParams] = useState<SerpApiSearchParams>({
    query: 'LED Bulbs',
    location: 'Ambala',
    radiusKm: 20,
    businessType: 'All',
    category: 'LED Lighting',
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type?: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const updateMyBusiness = (updated: Partial<Business>) => {
    setMyBusiness(prev => {
      const next = { ...prev, ...updated };
      setBusinesses(bList => bList.map(b => b.id === prev.id ? next : b));
      return next;
    });
    showToast('Profile Updated', 'Your business profile has been updated successfully.');
  };

  const toggleSaveBusiness = (businessId: string) => {
    setSavedBusinesses(prev => {
      const isSaved = prev.includes(businessId);
      if (isSaved) {
        showToast('Removed from Saved', 'Business removed from your favourites list.', 'info');
        return prev.filter(id => id !== businessId);
      } else {
        showToast('Saved to Favourites', 'Business saved to your favourites list.', 'success');
        return [...prev, businessId];
      }
    });
  };

  // Add Supplier to Network (The Hero Flow Action)
  const addSupplierToNetwork = (supplier: Business, initialVolume = '₹40,000 / month') => {
    // 1. Ensure supplier is in businesses array
    setBusinesses(prev => {
      const exists = prev.find(b => b.id === supplier.id);
      if (!exists) return [...prev, supplier];
      return prev;
    });

    // 2. Check if relationship already exists
    const alreadyConnected = relationships.some(
      r => r.sourceId === supplier.id && r.targetId === myBusiness.id
    );

    if (alreadyConnected) {
      showToast('Already Connected', `${supplier.name} is already in your supply chain network!`, 'info');
      return;
    }

    const newRel: SupplyRelationship = {
      id: `rel_${Date.now()}`,
      sourceId: supplier.id,
      targetId: myBusiness.id,
      sourceName: supplier.name,
      targetName: myBusiness.name,
      sourceRole: supplier.primaryRole,
      targetRole: myBusiness.primaryRole,
      category: supplier.categories[0] || 'LED Lighting',
      volumeMonthly: initialVolume,
      activeSince: 'Just now',
      status: 'active',
      creditTermDays: 14,
    };

    setRelationships(prev => [newRel, ...prev]);

    // 3. Update myBusiness totalSuppliersCount
    setMyBusiness(prev => ({
      ...prev,
      totalSuppliersCount: prev.totalSuppliersCount + 1,
    }));

    showToast(
      'Supplier Added to Network!',
      `Connected ${supplier.name} (${supplier.primaryRole}) to your business. Supply-chain graph updated!`,
      'success'
    );
  };

  // Add Customer to Network
  const addCustomerToNetwork = (customer: Business, initialVolume = '₹25,000 / month') => {
    setBusinesses(prev => {
      const exists = prev.find(b => b.id === customer.id);
      if (!exists) return [...prev, customer];
      return prev;
    });

    const alreadyConnected = relationships.some(
      r => r.sourceId === myBusiness.id && r.targetId === customer.id
    );

    if (alreadyConnected) {
      showToast('Already Connected', `${customer.name} is already registered as your buyer.`, 'info');
      return;
    }

    const newRel: SupplyRelationship = {
      id: `rel_${Date.now()}`,
      sourceId: myBusiness.id,
      targetId: customer.id,
      sourceName: myBusiness.name,
      targetName: customer.name,
      sourceRole: myBusiness.primaryRole,
      targetRole: customer.primaryRole,
      category: customer.categories[0] || 'Retail Supply',
      volumeMonthly: initialVolume,
      activeSince: 'Just now',
      status: 'active',
      creditTermDays: 7,
    };

    setRelationships(prev => [newRel, ...prev]);

    setMyBusiness(prev => ({
      ...prev,
      totalCustomersCount: prev.totalCustomersCount + 1,
    }));

    showToast('Customer Added!', `Added ${customer.name} to your client portfolio.`, 'success');
  };

  // Ledger actions
  const addTransaction = (tx: Omit<LedgerTransaction, 'id'>) => {
    const newTx: LedgerTransaction = {
      ...tx,
      id: `tx_${Date.now()}`,
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast('Transaction Logged', `Recorded ${newTx.type} of ₹${newTx.amount.toLocaleString('en-IN')} with ${newTx.businessName}.`);
  };

  const settleTransaction = (txId: string) => {
    setTransactions(prev =>
      prev.map(t => (t.id === txId ? { ...t, status: 'Settled' } : t))
    );
    showToast('Ledger Updated', 'Transaction has been marked as Settled.');
  };

  // Register new business
  const registerNewBusiness = (formData: any): Business => {
    const city = formData.city || 'Ambala';
    const cityPrefix = city.substring(0, 3).toUpperCase();
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const newCode = `BL-${cityPrefix}-${randomDigits}`;

    const newBiz: Business = {
      id: `biz_reg_${Date.now()}`,
      businessCode: newCode,
      name: formData.name || 'New Enterprise',
      ownerName: formData.ownerName || 'Business Owner',
      roles: formData.roles?.length ? formData.roles : ['Retailer'],
      primaryRole: formData.roles?.[0] || 'Retailer',
      categories: formData.categories?.length ? formData.categories : ['General Trade'],
      description: formData.description || 'Verified enterprise registered on BizLink Network.',
      location: {
        address: formData.address || 'Commercial Market',
        area: formData.area || city,
        city: city,
        state: formData.state || 'Haryana',
        pincode: formData.pincode || '133001',
        lat: 30.36,
        lng: 76.84,
        distanceKm: 0,
      },
      rating: 5.0,
      reviewCount: 1,
      verified: true,
      phone: formData.phone || '+91 98000 00000',
      email: formData.email || 'contact@business.com',
      gstNumber: formData.gstNumber || `06AACXX${randomDigits.toString().substring(0, 4)}A1Z5`,
      establishedYear: new Date().getFullYear(),
      minOrderValue: 1000,
      priceLevel: '₹₹',
      suppliesTo: ['Retailer', 'Service Provider'],
      purchasesFrom: ['Wholesaler', 'Super Wholesaler'],
      products: [],
      reviews: [],
      totalSuppliersCount: 0,
      totalCustomersCount: 0,
      trustScore: 90,
      fulfillmentRate: 98.0,
      source: 'verified_bizlink',
    };

    setBusinesses(prev => [newBiz, ...prev]);
    setMyBusiness(newBiz);
    showToast(
      'Registration Complete!',
      `Business ID ${newCode} generated for ${newBiz.name}. Welcome to BizLink Network!`,
      'success'
    );
    return newBiz;
  };

  // Business Search Execution via Backend API Route
  const performBusinessSearch = async (customParams?: Partial<SerpApiSearchParams>): Promise<SearchResultResponse | null> => {
    setIsSearching(true);
    const mergedParams: SerpApiSearchParams = {
      ...searchParams,
      ...customParams,
      forceMock: useMockMode || (customParams?.forceMock ?? false),
    };

    try {
      const res = await fetch('/api/search-businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mergedParams),
      });

      if (!res.ok) {
        throw new Error(`Search request failed: ${res.statusText}`);
      }

      const data = (await res.json()) as SearchResultResponse;
      setSearchResults(data);

      // Also register any new businesses into the in-memory businesses directory
      if (data.results && data.results.length > 0) {
        setBusinesses(prev => {
          const map = new Map(prev.map(b => [b.id, b]));
          data.results.forEach(b => {
            if (!map.has(b.id)) {
              map.set(b.id, b);
            }
          });
          return Array.from(map.values());
        });
      }

      return data;
    } catch (error) {
      console.error('[Search Error]', error);
      showToast('Search Notice', 'Using realistic local database discovery.', 'info');
      return null;
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <BizLinkContext.Provider
      value={{
        appMode,
        setAppMode,
        dashboardView,
        setDashboardView,
        myBusiness,
        updateMyBusiness,
        businesses,
        relationships,
        transactions,
        savedBusinesses,
        toggleSaveBusiness,
        inspectingBusiness,
        setInspectingBusiness,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        isAddTransactionModalOpen,
        setIsAddTransactionModalOpen,
        isAddProductModalOpen,
        setIsAddProductModalOpen,
        addSupplierToNetwork,
        addCustomerToNetwork,
        addTransaction,
        settleTransaction,
        registerNewBusiness,
        isSearching,
        searchResults,
        searchParams,
        setSearchParams,
        performBusinessSearch,
        useMockMode,
        setUseMockMode,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </BizLinkContext.Provider>
  );
}

export function useBizLink() {
  const context = useContext(BizLinkContext);
  if (!context) {
    throw new Error('useBizLink must be used within a BizLinkProvider');
  }
  return context;
}
