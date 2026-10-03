'use client';

import React from 'react';
import { useBizLink } from '@/context/BizLinkContext';
import {
  Building2,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Network,
  TrendingUp,
  ShoppingBag,
  Star,
  CheckCircle2,
  Compass,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';

export function LandingPage() {
  const { setAppMode, setDashboardView, performBusinessSearch, setIsRegisterModalOpen } = useBizLink();

  const handleLaunchDemo = () => {
    setAppMode('business_owner');
    setDashboardView('find_suppliers');
    performBusinessSearch({
      query: 'LED Bulbs',
      location: 'Ambala',
      radiusKm: 20,
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-100 bg-white/90 backdrop-blur sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
              B
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900">BizLink</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                B2B Network
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAppMode('customer')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-slate-500" />
              Customer Search
            </button>

            <button
              onClick={() => {
                setAppMode('business_owner');
                setDashboardView('overview');
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              Business Owner Portal
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-14 pb-20 px-6 relative overflow-hidden bg-radial-gradient">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold shadow-xs animate-fade-in">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>SerpApi Hackathon Prototype: Connected Supply-Chain Discovery</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Connect the businesses <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
              behind every business.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Discover suppliers, customers and business opportunities through one connected, searchable digital ecosystem.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setAppMode('business_owner');
                setDashboardView('overview');
              }}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/25 hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Network className="w-4 h-4" />
              Explore Business Network
            </button>

            <button
              onClick={handleLaunchDemo}
              className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-indigo-400" />
              Find a Supplier (Demo)
            </button>
          </div>

          {/* 1-Click Central Demo Story Quick Banner */}
          <div className="pt-6">
            <div
              onClick={handleLaunchDemo}
              className="inline-flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-700 cursor-pointer shadow-subtle hover:border-indigo-300 transition-all text-left max-w-xl"
            >
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900">Featured Hackathon Scenario</p>
                <p className="text-slate-500 text-[11px] truncate">
                  "Retailer searching wholesale LED bulbs in Ambala (20 km) & updating supply chain"
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0" />
            </div>
          </div>
        </div>

        {/* Animated Multi-Tier Supply Chain Visualization */}
        <div className="max-w-5xl mx-auto mt-14 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono uppercase font-bold tracking-wider text-slate-200">
                The Dynamic Connected Supply Network
              </span>
            </div>
            <span className="hidden sm:inline text-indigo-400">
              Every business is simultaneously a supplier, buyer, and customer
            </span>
          </div>

          {/* Step Pipeline Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {/* Step 1: Manufacturer */}
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-rose-400 block mb-1">
                  Tier 0
                </span>
                <h4 className="text-sm font-bold text-white">Manufacturer</h4>
                <p className="text-[11px] text-slate-400 mt-1">Raw factories & Opto-semiconductor units</p>
              </div>
              <div className="mt-3 text-[10px] text-rose-300 font-medium bg-rose-950/40 p-1.5 rounded-lg border border-rose-900/40">
                Direct Production
              </div>
            </div>

            {/* Step 2: Super Wholesaler */}
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 block mb-1">
                  Tier 1
                </span>
                <h4 className="text-sm font-bold text-white">Super Wholesaler</h4>
                <p className="text-[11px] text-slate-400 mt-1">Regional depots & mega stockists</p>
              </div>
              <div className="mt-3 text-[10px] text-indigo-300 font-medium bg-indigo-950/40 p-1.5 rounded-lg border border-indigo-900/40">
                State Distribution
              </div>
            </div>

            {/* Step 3: Wholesaler */}
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400 block mb-1">
                  Tier 2
                </span>
                <h4 className="text-sm font-bold text-white">Wholesaler</h4>
                <p className="text-[11px] text-slate-400 mt-1">City stockists & bulk traders</p>
              </div>
              <div className="mt-3 text-[10px] text-blue-300 font-medium bg-blue-950/40 p-1.5 rounded-lg border border-blue-900/40">
                District Trade
              </div>
            </div>

            {/* Step 4: Retailer (YOU) */}
            <div className="bg-gradient-to-b from-indigo-950 to-slate-900 p-4 rounded-2xl border-2 border-indigo-500 text-center shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 block mb-1">
                  Tier 3 • YOU
                </span>
                <h4 className="text-sm font-bold text-white">Local Retailer</h4>
                <p className="text-[11px] text-slate-300 mt-1">Store outlets & contractors</p>
              </div>
              <div className="mt-3 text-[10px] text-amber-300 font-bold bg-amber-500/20 p-1.5 rounded-lg border border-amber-400/40">
                Community Hub
              </div>
            </div>

            {/* Step 5: Local Customer */}
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 block mb-1">
                  Tier 4
                </span>
                <h4 className="text-sm font-bold text-white">Local Customer</h4>
                <p className="text-[11px] text-slate-400 mt-1">End consumers & project sites</p>
              </div>
              <div className="mt-3 text-[10px] text-emerald-300 font-medium bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-900/40">
                End Consumption
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section: Discover, Connect, Grow */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-600">
              Why BizLink
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Transforming Fragmented Word-of-Mouth into a Searchable Business Grid
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Businesses should not have to depend only on who they already know. BizLink gives enterprise owners transparent discovery, GST verified credentials, and real-time network visualization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Discover */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-subtle space-y-4 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Discover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Powered by SerpApi Google Local search. Query exact wholesale line items across specified geographical radii (5 km to 50 km) with transparent MOQ and price levels.
              </p>
            </div>

            {/* Pillar 2: Connect */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-subtle space-y-4 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <LinkIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Connect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly add discovered suppliers and buyers to your business network. Inspect credit terms, verified GSTINs, and aggregate public reviews.
              </p>
            </div>

            {/* Pillar 3: Grow */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-subtle space-y-4 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Grow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maintain automated credit/debit trade ledgers, monitor supply redundancy, and unlock direct factory procurement to maximize business profit margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Entry Portals Section */}
      <section className="py-20 px-6 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Choose Your Platform Experience
            </h2>
            <p className="text-xs text-slate-500">
              Test BizLink as an enterprise business owner or as a local customer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry 1: Business Owner */}
            <div
              onClick={() => {
                setAppMode('business_owner');
                setDashboardView('overview');
              }}
              className="bg-slate-50 hover:bg-slate-100/80 p-8 rounded-3xl border-2 border-indigo-200 hover:border-indigo-500 transition-all cursor-pointer shadow-subtle flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Business Owner Portal
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter the full B2B management dashboard: Supplier discovery via SerpApi, interactive supply chain network graph, debit/credit ledger, and wholesale catalog.
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                <span>Enter Business Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </div>

            {/* Entry 2: Customer */}
            <div
              onClick={() => setAppMode('customer')}
              className="bg-slate-50 hover:bg-slate-100/80 p-8 rounded-3xl border-2 border-slate-200 hover:border-emerald-500 transition-all cursor-pointer shadow-subtle flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Local Customer Search
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Discover local retail stores, stationery shops, hardware suppliers, and electrical service providers near your address with direct contact and reviews.
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                <span>Search Local Businesses</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-400 py-8 px-6 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">BizLink</span>
            <span>• Digital Business & Supply Chain Discovery Network</span>
          </div>
          <p className="text-slate-500">
            Hackathon prototype demonstrating SerpApi external discovery integration
          </p>
        </div>
      </footer>
    </div>
  );
}
