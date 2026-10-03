'use client';

import React, { useState, useEffect } from 'react';
import { useBizLink } from '@/context/BizLinkContext';
import { Business, BusinessRole } from '@/types';
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  Building2,
  Package,
  Plus,
  CheckCircle2,
  Eye,
  Zap,
  RotateCw,
  Globe,
  Tag,
  ArrowUpDown,
  Layers,
  Sparkles,
  Info,
  Scale,
  X,
  Phone,
} from 'lucide-react';

const QUICK_QUERIES = [
  { label: 'LED Bulbs in Ambala (20 km)', query: 'LED Bulbs', location: 'Ambala', radius: 20, type: 'Wholesaler' as BusinessRole },
  { label: 'Electrical Wholesalers in Chandigarh', query: 'Electrical Components', location: 'Chandigarh', radius: 50, type: 'Wholesaler' as BusinessRole },
  { label: 'Stationery Wholesalers near Ambala', query: 'Stationery', location: 'Ambala', radius: 10, type: 'Wholesaler' as BusinessRole },
  { label: 'Mobile Distributors near Delhi', query: 'Consumer Electronics', location: 'Delhi', radius: 50, type: 'Distributor' as BusinessRole },
];

export function FindSuppliersView() {
  const {
    searchParams,
    setSearchParams,
    performBusinessSearch,
    searchResults,
    isSearching,
    useMockMode,
    setUseMockMode,
    setInspectingBusiness,
    addSupplierToNetwork,
    relationships,
    myBusiness,
    setDashboardView,
  } = useBizLink();

  // Sort & Filter local state
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'trust' | 'moq'>('distance');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');
  const [compareList, setCompareList] = useState<Business[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Run initial search automatically on mount if no results
  useEffect(() => {
    if (!searchResults) {
      performBusinessSearch({
        query: 'LED Bulbs',
        location: 'Ambala',
        radiusKm: 20,
        businessType: 'All',
      });
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performBusinessSearch();
  };

  const handleQuickQuery = (item: typeof QUICK_QUERIES[0]) => {
    setSearchParams({
      query: item.query,
      location: item.location,
      radiusKm: item.radius,
      businessType: item.type,
      category: item.query,
    });
    performBusinessSearch({
      query: item.query,
      location: item.location,
      radiusKm: item.radius,
      businessType: item.type,
      category: item.query,
    });
  };

  const toggleCompare = (b: Business) => {
    setCompareList(prev => {
      const exists = prev.some(item => item.id === b.id);
      if (exists) {
        return prev.filter(item => item.id !== b.id);
      } else {
        if (prev.length >= 3) {
          return [prev[1], prev[2], b];
        }
        return [...prev, b];
      }
    });
  };

  // Filter and sort results
  const displayedResults = (searchResults?.results || []).filter(b => {
    if (selectedRoleFilter !== 'All' && !b.roles.includes(selectedRoleFilter as BusinessRole)) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'distance') {
      return (a.location.distanceKm || 0) - (b.location.distanceKm || 0);
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'trust') {
      return b.trustScore - a.trustScore;
    }
    if (sortBy === 'moq') {
      return (a.minOrderValue || 0) - (b.minOrderValue || 0);
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner for Hackathon Demo */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              SerpApi Discovery Layer
            </span>
            <span className="text-xs text-slate-300">
              Transforming raw Google Local search into verified supply chain nodes
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Find & Connect with B2B Suppliers
          </h2>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            Search wholesale distributors, super stockists, and direct manufacturers within your operational radius. Compare wholesale MOQs, verify GST trust scores, and link them directly into your digital supply-chain network.
          </p>

          {/* Quick preset buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Quick Queries:</span>
            {QUICK_QUERIES.map(item => (
              <button
                key={item.label}
                onClick={() => handleQuickQuery(item)}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white border border-white/10 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative background visual */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-indigo-600/20 to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* Main Search Controls Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Product / Service Input (5 cols) */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                What do you need?
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchParams.query}
                  onChange={e => setSearchParams({ ...searchParams, query: e.target.value })}
                  placeholder="e.g. LED Bulbs, Modular Switches, Copper Wire..."
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                />
              </div>
            </div>

            {/* Location Input (3 cols) */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchParams.location}
                  onChange={e => setSearchParams({ ...searchParams, location: e.target.value })}
                  placeholder="e.g. Ambala, Chandigarh, Delhi..."
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                />
              </div>
            </div>

            {/* Radius Selector (2 cols) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Radius (km)
              </label>
              <select
                value={searchParams.radiusKm || 20}
                onChange={e => setSearchParams({ ...searchParams, radiusKm: Number(e.target.value) })}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
              >
                <option value={5}>5 km (Local)</option>
                <option value={10}>10 km (City)</option>
                <option value={20}>20 km (District)</option>
                <option value={50}>50 km (Regional)</option>
                <option value={100}>100 km (State)</option>
              </select>
            </div>

            {/* Business Type Selector (2 cols) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Role Tier
              </label>
              <select
                value={searchParams.businessType || 'All'}
                onChange={e => setSearchParams({ ...searchParams, businessType: e.target.value as any })}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
              >
                <option value="All">All Business Roles</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Super Wholesaler">Super Wholesaler</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Distributor">Distributor</option>
              </select>
            </div>

            {/* Submit Button (1 col) */}
            <div className="md:col-span-1 flex items-end">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-1 disabled:opacity-50 h-[42px]"
              >
                {isSearching ? (
                  <RotateCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Search Engine Mode & Radius Pills Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Quick Radius:</span>
            {[5, 10, 20, 50].map(r => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setSearchParams(prev => ({ ...prev, radiusKm: r }));
                  performBusinessSearch({ radiusKm: r });
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  searchParams.radiusKm === r
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r} km
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Mock Mode Toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={useMockMode}
                onChange={e => setUseMockMode(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span className="text-[11px] font-medium">Force Mock Mode (Offline Sandbox)</span>
            </label>

            {/* Compare Bar Trigger */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold flex items-center gap-1 shadow-xs transition-colors"
              >
                <Scale className="w-3.5 h-3.5" />
                Compare ({compareList.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Metadata & Transparency Strip */}
      {searchResults && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">
              Found {displayedResults.length} verified suppliers
            </span>
            <span>• Query: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-[11px]">"{searchResults.serpApiQueryUsed}"</code></span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Latency: {searchResults.latencyMs}ms
            </span>
            <span className={`px-2 py-0.5 rounded font-semibold ${
              searchResults.source === 'serpapi_live'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
            }`}>
              {searchResults.source === 'serpapi_live' ? '🟢 Live SerpApi (Google Maps)' : '⚡ Intelligent B2B Engine'}
            </span>
          </div>
        </div>
      )}

      {/* Sorting & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            Filter Role:
          </span>
          {['All', 'Wholesaler', 'Super Wholesaler', 'Manufacturer', 'Distributor'].map(role => (
            <button
              key={role}
              onClick={() => setSelectedRoleFilter(role)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedRoleFilter === role
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="distance">Distance (Nearest First)</option>
            <option value="rating">Rating (Highest First)</option>
            <option value="trust">Trust Score</option>
            <option value="moq">Min Order Value (Lowest First)</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {isSearching ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
          <RotateCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-800">Querying SerpApi Business Search Engine...</p>
          <p className="text-xs text-slate-500">Discovering local wholesale stockists and analyzing supply chain ties</p>
        </div>
      ) : displayedResults.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">No Suppliers Found for Current Filters</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try expanding the search radius (e.g. 50 km) or search for broader keywords like "Electricals" or "Lighting".
          </p>
          <button
            onClick={() => handleQuickQuery(QUICK_QUERIES[0])}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
          >
            Reset to LED Bulbs in Ambala Demo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedResults.map(business => {
            const isAlreadySupplier = relationships.some(
              r => r.sourceId === business.id && r.targetId === myBusiness.id
            );
            const isCompared = compareList.some(item => item.id === business.id);

            return (
              <div
                key={business.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-elevation transition-all p-5 flex flex-col justify-between space-y-4 relative group"
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                        {business.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-base font-bold text-slate-900 leading-tight">
                            {business.name}
                          </h4>
                          {business.verified && (
                            <span title="Verified Business"><ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /></span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 flex-wrap">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            {business.location.area}, {business.location.city}
                          </span>
                          {business.location.distanceKm !== undefined && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-100">
                              {business.location.distanceKm} km away
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Rating & reviews */}
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 justify-end font-bold text-slate-900 text-sm">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{business.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {business.reviewCount} reviews
                      </p>
                    </div>
                  </div>

                  {/* Role badges & Categories */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {business.roles.map(role => (
                      <span
                        key={role}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100"
                      >
                        {role}
                      </span>
                    ))}
                    {business.categories.slice(0, 2).map(cat => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
                    {business.description}
                  </p>
                </div>

                {/* Wholesale Specifications Bar */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Min Order Value</span>
                    <strong className="text-slate-800 font-semibold">
                      ₹{(business.minOrderValue || 5000).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Trust Score</span>
                    <strong className="text-emerald-700 font-semibold">
                      {business.trustScore}/100
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Fulfillment</span>
                    <strong className="text-indigo-700 font-semibold">
                      {business.fulfillmentRate}%
                    </strong>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleCompare(business)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                        isCompared
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      {isCompared ? 'Comparing' : 'Compare'}
                    </button>

                    <button
                      onClick={() => setInspectingBusiness(business)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      Profile
                    </button>
                  </div>

                  {/* Add to Suppliers Button (The Hackathon Hero Action!) */}
                  {!isAlreadySupplier ? (
                    <button
                      onClick={() => {
                        addSupplierToNetwork(business);
                        setDashboardView('network');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Suppliers
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Side-by-side Supplier Comparison Modal / Drawer */}
      {isCompareOpen && compareList.length > 0 && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Compare Supplier Candidates</h3>
                <span className="text-xs text-slate-300">({compareList.length} selected)</span>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 font-bold text-slate-500 w-36">Metric</th>
                    {compareList.map(b => (
                      <th key={b.id} className="p-3 font-bold text-slate-900 text-sm">
                        {b.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Primary Role</td>
                    {compareList.map(b => (
                      <td key={b.id} className="p-3 font-semibold text-indigo-700">
                        {b.primaryRole}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Distance</td>
                    {compareList.map(b => (
                      <td key={b.id} className="p-3 font-bold text-emerald-700">
                        {b.location.distanceKm} km ({b.location.city})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Rating</td>
                    {compareList.map(b => (
                      <td key={b.id} className="p-3 font-semibold text-amber-600">
                        ⭐ {b.rating.toFixed(1)} ({b.reviewCount} reviews)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Min Order (MOQ)</td>
                    {compareList.map(b => (
                      <td key={b.id} className="p-3 font-bold text-slate-900">
                        ₹{(b.minOrderValue || 5000).toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Trust Score</td>
                    {compareList.map(b => (
                      <td key={b.id} className="p-3 font-bold text-emerald-600">
                        {b.trustScore} / 100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Fulfillment Rate</td>
                    {compareList.map(b => (
                      <td key={b.id} className="p-3 font-semibold text-slate-800">
                        {b.fulfillmentRate}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Action</td>
                    {compareList.map(b => (
                      <td key={b.id} className="p-3">
                        <button
                          onClick={() => {
                            addSupplierToNetwork(b);
                            setIsCompareOpen(false);
                            setDashboardView('network');
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
                        >
                          Connect Supplier
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
