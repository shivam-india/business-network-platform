'use client';

import React, { useState } from 'react';
import { useBizLink } from '@/context/BizLinkContext';
import {
  X,
  Building2,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  Globe,
  Package,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Send,
  MessageSquare,
  Share2,
  ExternalLink,
  Tag,
  UserCheck,
} from 'lucide-react';
import { BusinessRole } from '@/types';

export function BusinessProfileModal() {
  const {
    inspectingBusiness,
    setInspectingBusiness,
    myBusiness,
    addSupplierToNetwork,
    addCustomerToNetwork,
    relationships,
    showToast,
  } = useBizLink();

  const [activeTab, setActiveTab] = useState<'about' | 'products' | 'network' | 'reviews'>('about');
  const [inquiryText, setInquiryText] = useState('');
  const [isInquirySent, setIsInquirySent] = useState(false);

  if (!inspectingBusiness) return null;

  const isMyBusiness = inspectingBusiness.id === myBusiness.id;
  const isAlreadySupplier = relationships.some(
    r => r.sourceId === inspectingBusiness.id && r.targetId === myBusiness.id
  );
  const isAlreadyCustomer = relationships.some(
    r => r.sourceId === myBusiness.id && r.targetId === inspectingBusiness.id
  );

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setIsInquirySent(true);
    showToast('Inquiry Dispatched', `Trade inquiry sent to ${inspectingBusiness.name}. Expected response in < 2 hours.`, 'success');
    setTimeout(() => {
      setInquiryText('');
      setIsInquirySent(false);
    }, 2500);
  };

  const getRoleBadgeColor = (role: BusinessRole) => {
    switch (role) {
      case 'Manufacturer':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Super Wholesaler':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Wholesaler':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Distributor':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Retailer':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Service Provider':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header Banner */}
        <div className={`p-6 bg-gradient-to-r ${inspectingBusiness.bannerGradient || 'from-slate-800 to-indigo-900'} text-white relative`}>
          <button
            onClick={() => setInspectingBusiness(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                {inspectingBusiness.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {inspectingBusiness.name}
                  </h2>
                  {inspectingBusiness.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Business
                    </span>
                  )}
                  {inspectingBusiness.source === 'serpapi' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-400/30">
                      SerpApi Google Discovery
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-1 text-sm text-slate-200 flex-wrap">
                  <span className="font-mono text-xs px-2 py-0.5 bg-black/20 rounded">
                    ID: {inspectingBusiness.businessCode}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-300" />
                    {inspectingBusiness.location.area}, {inspectingBusiness.location.city}
                    {inspectingBusiness.location.distanceKm !== undefined && (
                      <span className="text-emerald-300 font-medium">
                        ({inspectingBusiness.location.distanceKm} km away)
                      </span>
                    )}
                  </span>
                  <span>• Est. {inspectingBusiness.establishedYear}</span>
                </div>
              </div>
            </div>

            {/* Rating badge */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20 text-center sm:text-right shrink-0">
              <div className="flex items-center gap-1 text-amber-300 font-bold text-lg justify-center sm:justify-end">
                <Star className="w-5 h-5 fill-amber-300" />
                <span>{inspectingBusiness.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-300 font-normal">/ 5.0</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {inspectingBusiness.reviewCount} total trade reviews
              </p>
            </div>
          </div>

          {/* Role tags & action buttons */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Roles:</span>
              {inspectingBusiness.roles.map(role => (
                <span
                  key={role}
                  className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white text-slate-800 shadow-sm"
                >
                  {role}
                </span>
              ))}
            </div>

            {!isMyBusiness && (
              <div className="flex items-center gap-2">
                {!isAlreadySupplier ? (
                  <button
                    onClick={() => addSupplierToNetwork(inspectingBusiness)}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Add to Suppliers
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected Supplier
                  </span>
                )}

                <button
                  onClick={() => {
                    const phone = inspectingBusiness.phone.replace(/[^0-9]/g, '');
                    window.open(`https://wa.me/${phone}?text=Hello%20${encodeURIComponent(inspectingBusiness.name)},%20I%20saw%20your%20business%20on%20BizLink.`, '_blank');
                  }}
                  className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium text-xs transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Contact
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'about'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Overview & Terms
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            Wholesale Catalog ({inspectingBusiness.products.length})
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'network'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Supply Chain Position
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4" />
            Reviews ({inspectingBusiness.reviews.length})
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Trust Score & Metrics Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Trust Score</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold text-slate-900">{inspectingBusiness.trustScore}</span>
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">GST & Trade Verified</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Fulfillment Rate</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold text-emerald-600">{inspectingBusiness.fulfillmentRate}%</span>
                  </div>
                  <span className="text-[11px] text-slate-500">On-time dispatch rate</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Min Order Value</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold text-slate-900">
                      ₹{(inspectingBusiness.minOrderValue || 5000).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">Flexible credit terms</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Price Band</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold text-indigo-600">{inspectingBusiness.priceLevel || '₹₹'}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Direct wholesale rates</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">About the Business</h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  {inspectingBusiness.description}
                </p>
              </div>

              {/* Categories & Supply Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-600" />
                    Product Categories
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectingBusiness.categories.map(cat => (
                      <span
                        key={cat}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-700"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Eligible Buyer Roles
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectingBusiness.suppliesTo.map(role => (
                      <span
                        key={role}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getRoleBadgeColor(role)}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact & Location Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Contact & Verification Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>Owner / Lead: <strong className="text-slate-800">{inspectingBusiness.ownerName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    <span>GSTIN: <strong className="font-mono text-slate-800">{inspectingBusiness.gstNumber || '06AACFA4421C1ZP'}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>Phone: <strong className="text-slate-800">{inspectingBusiness.phone}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Email: <strong className="text-slate-800">{inspectingBusiness.email}</strong></span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-start gap-2.5 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    {inspectingBusiness.location.address}, {inspectingBusiness.location.city},{' '}
                    {inspectingBusiness.location.state} - {inspectingBusiness.location.pincode}
                  </span>
                </div>
              </div>

              {/* Quick Trade Inquiry Form */}
              {!isMyBusiness && (
                <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-indigo-600" />
                    Send Direct Trade Inquiry
                  </h4>
                  <p className="text-xs text-indigo-700 mb-3">
                    Request bulk quotation, price lists, or sample test batches directly from {inspectingBusiness.name}.
                  </p>
                  <form onSubmit={handleSendInquiry} className="flex gap-2">
                    <input
                      type="text"
                      value={inquiryText}
                      onChange={e => setInquiryText(e.target.value)}
                      placeholder="e.g. Need quotation for 500 pcs 9W LED bulbs delivered to Ambala Cantt..."
                      className="flex-1 px-3.5 py-2 text-xs bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={isInquirySent}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shrink-0"
                    >
                      {isInquirySent ? 'Dispatched!' : 'Send Inquiry'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Wholesale Product Offerings</h4>
                  <p className="text-xs text-slate-500">Standard trade units, MOQs, and lead times</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                  {inspectingBusiness.products.length} Products Listed
                </span>
              </div>

              {inspectingBusiness.products.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Package className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-700">Standard Product Catalog Available on Request</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Contact {inspectingBusiness.name} to receive updated line sheets and bulk wholesale rate cards.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inspectingBusiness.products.map(prod => (
                    <div
                      key={prod.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-subtle transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-sm font-bold text-slate-900">{prod.name}</h5>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                            {prod.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{prod.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-500">Trade Price: </span>
                          <strong className="text-slate-900 font-bold text-sm">
                            ₹{prod.unitPrice.toLocaleString('en-IN')}
                          </strong>
                          <span className="text-slate-500 text-[11px]"> / {prod.unit}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 text-[11px]">MOQ: </span>
                          <strong className="text-slate-800 font-semibold">{prod.moq} {prod.unit}</strong>
                          <div className="text-[10px] text-emerald-600">Lead time: {prod.leadTimeDays} day(s)</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NETWORK */}
          {activeTab === 'network' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Supply Chain Ecosystem Position</h4>
                <p className="text-xs text-slate-500">
                  Visualizing how {inspectingBusiness.name} sits within the regional production and distribution graph
                </p>
              </div>

              {/* Supply chain diagram */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                  <span>UPSTREAM SUPPLIERS</span>
                  <span className="font-semibold text-indigo-400">MULTI-TIER SUPPLY FLOW</span>
                  <span>DOWNSTREAM CLIENTS</span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Upstream Box */}
                  <div className="w-full md:w-1/3 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-400 block mb-1">
                      Tier 1 Upstream
                    </span>
                    <h5 className="text-xs font-bold text-white">Manufacturers & Super Stockists</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Purchases raw units from {inspectingBusiness.purchasesFrom.join(', ') || 'Direct Factory Lines'}
                    </p>
                  </div>

                  <ArrowRight className="w-5 h-5 text-indigo-400 hidden md:block shrink-0" />

                  {/* Current Business Focus Box */}
                  <div className="w-full md:w-1/3 bg-indigo-950/80 p-4 rounded-xl border-2 border-indigo-500 text-center shadow-lg">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-300 block mb-1">
                      Current Node
                    </span>
                    <h5 className="text-sm font-bold text-white">{inspectingBusiness.name}</h5>
                    <div className="flex justify-center gap-1 mt-1.5">
                      {inspectingBusiness.roles.map(r => (
                        <span key={r} className="text-[10px] bg-indigo-600/80 px-2 py-0.5 rounded text-white font-medium">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-indigo-400 hidden md:block shrink-0" />

                  {/* Downstream Box */}
                  <div className="w-full md:w-1/3 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 block mb-1">
                      Downstream Network
                    </span>
                    <h5 className="text-xs font-bold text-white">Retailers & Local Contractors</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Supplies to {inspectingBusiness.suppliesTo.join(', ')} ({inspectingBusiness.totalCustomersCount} active buyers)
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 text-center bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  💡 <strong>BizLink Insight:</strong> Connecting with {inspectingBusiness.name} bridges your business directly to their vetted Tier 1 manufacturing channels.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Trade Ratings & Buyer Reviews</h4>
                  <p className="text-xs text-slate-500">
                    Aggregated from BizLink verified transactions and SerpApi Google Places data
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{inspectingBusiness.rating.toFixed(1)}</span>
                  <span className="text-xs text-slate-500 font-normal">({inspectingBusiness.reviewCount})</span>
                </div>
              </div>

              <div className="space-y-3">
                {inspectingBusiness.reviews.map(rev => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-slate-900">{rev.authorName}</strong>
                          {rev.isVerifiedBuyer && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified Trade Buyer
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          {rev.authorRole || 'Business Partner'} • {rev.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(rev.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/60">
                      <span>Source: {rev.source === 'serpapi_google' ? 'Google Maps / Local via SerpApi' : rev.source === 'platform_verified' ? 'BizLink Verified Platform' : 'B2B Trade Network'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Business Code: <span className="font-mono font-semibold text-slate-700">{inspectingBusiness.businessCode}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setInspectingBusiness(null)}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-200 text-xs font-semibold transition-colors"
            >
              Close
            </button>

            {!isMyBusiness && !isAlreadySupplier && (
              <button
                onClick={() => {
                  addSupplierToNetwork(inspectingBusiness);
                  setInspectingBusiness(null);
                }}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Add to My Supply Chain
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
