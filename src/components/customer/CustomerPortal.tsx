'use client';

import React, { useState } from 'react';
import { useBizLink } from '@/context/BizLinkContext';
import {
  ShoppingBag,
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Heart,
  Phone,
  ArrowRight,
  ExternalLink,
  Clock,
  Tag,
  Building2,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { BusinessProfileModal } from '../modals/BusinessProfileModal';

const CUSTOMER_CATEGORIES = [
  'All Stores',
  'LED & Lighting',
  'Electrical Fittings',
  'Stationery & Books',
  'Hardware & Tools',
  'Home Appliances',
];

export function CustomerPortal() {
  const {
    businesses,
    savedBusinesses,
    toggleSaveBusiness,
    setInspectingBusiness,
    setAppMode,
    showToast,
  } = useBizLink();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Stores');
  const [userLocation, setUserLocation] = useState('Ambala Cantt');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Filter retailers and local services
  const retailBusinesses = businesses.filter(b => {
    const isRetail = b.roles.includes('Retailer') || b.roles.includes('Service Provider');
    if (!isRetail) return false;

    if (showSavedOnly && !savedBusinesses.includes(b.id)) return false;

    if (activeCategory !== 'All Stores') {
      const matchCat = b.categories.some(c =>
        c.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0])
      );
      if (!matchCat) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.location.area.toLowerCase().includes(q) ||
        b.categories.some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Customer Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-subtle">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div
            onClick={() => setAppMode('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
              B
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">BizLink</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Local Customer Discovery
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Discover verified neighborhood stores</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                showSavedOnly
                  ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              Saved ({savedBusinesses.length})
            </button>

            <button
              onClick={() => setAppMode('business_owner')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              Switch to Business Owner
            </button>
          </div>
        </div>
      </header>

      {/* Main Customer Search Banner */}
      <section className="bg-slate-900 text-white py-12 px-6 bg-grid-slate">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Discover Verified Local Stores Near You
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Find stationery shops, electrical repair contractors, hardware outlets, and retail stores in Ambala
          </p>

          {/* Search Box */}
          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 w-full">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products or stores: e.g. LED bulbs, stationery, switches..."
                className="w-full py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2 px-3 w-full sm:w-48">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <input
                type="text"
                value={userLocation}
                onChange={e => setUserLocation(e.target.value)}
                placeholder="Location..."
                className="w-full py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
              />
            </div>

            <button
              onClick={() => {}}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
            >
              Search Stores
            </button>
          </div>

          {/* Preset Quick Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-[11px] text-slate-400">Popular:</span>
            {['LED Bulbs', 'Stationery Shop', 'Electrical Fitting', 'Modular Switches'].map(q => (
              <button
                key={q}
                onClick={() => setSearchQuery(q)}
                className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-8 flex-1 w-full space-y-6">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {CUSTOMER_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Found <strong>{retailBusinesses.length} verified stores</strong> near {userLocation}</span>
          <span className="text-emerald-700 font-medium">● Verified Local Traders</span>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {retailBusinesses.map(biz => {
            const isSaved = savedBusinesses.includes(biz.id);

            return (
              <div
                key={biz.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-subtle hover:shadow-elevation hover:border-emerald-300 transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shrink-0">
                        {biz.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {biz.name}
                          </h4>
                          {biz.verified && (
                            <span title="Verified"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /></span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-500">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>{biz.location.area}, {biz.location.city}</span>
                          {biz.location.distanceKm !== undefined && (
                            <span className="font-semibold text-emerald-700">
                              ({biz.location.distanceKm === 0 ? '0.5' : biz.location.distanceKm} km)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveBusiness(biz.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                      title="Save store"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'}`} />
                    </button>
                  </div>

                  {/* Rating & Status */}
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>{biz.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({biz.reviewCount})</span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Open Now (9 AM - 8 PM)
                    </span>
                  </div>

                  {/* Categories */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {biz.categories.map(cat => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Short description */}
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {biz.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      const phone = biz.phone.replace(/[^0-9]/g, '');
                      window.open(`https://wa.me/${phone}?text=Hello%20${encodeURIComponent(biz.name)},%20I%20saw%20your%20business%20on%20BizLink.`, '_blank');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </button>

                  <button
                    onClick={() => setInspectingBusiness(biz)}
                    className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Store
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Global Profile Modal */}
      <BusinessProfileModal />
    </div>
  );
}
