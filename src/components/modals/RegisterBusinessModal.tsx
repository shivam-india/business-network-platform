'use client';

import React, { useState } from 'react';
import { useBizLink } from '@/context/BizLinkContext';
import { X, Building2, Check, Sparkles, AlertCircle } from 'lucide-react';
import { BusinessRole } from '@/types';

const AVAILABLE_ROLES: BusinessRole[] = [
  'Manufacturer',
  'Super Wholesaler',
  'Wholesaler',
  'Distributor',
  'Retailer',
  'Service Provider',
];

const AVAILABLE_CATEGORIES = [
  'LED Lighting',
  'Commercial Fixtures',
  'Electrical Components',
  'Switches & Sockets',
  'Wiring & Cables',
  'Home Appliances',
  'Stationery & Paper',
  'Consumer Electronics',
  'Industrial Fasteners',
  'Hardware & Tools',
  'Solar Equipment',
  'Safety & Security',
];

export function RegisterBusinessModal() {
  const { isRegisterModalOpen, setIsRegisterModalOpen, registerNewBusiness, setDashboardView } = useBizLink();

  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    roles: ['Retailer'] as BusinessRole[],
    categories: ['LED Lighting', 'Electrical Components'],
    phone: '',
    email: '',
    address: '',
    city: 'Ambala',
    state: 'Haryana',
    pincode: '133001',
    description: '',
  });

  const [newlyCreatedCode, setNewlyCreatedCode] = useState<string | null>(null);

  if (!isRegisterModalOpen) return null;

  const toggleRole = (role: BusinessRole) => {
    setFormData(prev => {
      const exists = prev.roles.includes(role);
      if (exists) {
        if (prev.roles.length === 1) return prev; // keep at least 1
        return { ...prev, roles: prev.roles.filter(r => r !== role) };
      } else {
        return { ...prev, roles: [...prev.roles, role] };
      }
    });
  };

  const toggleCategory = (cat: string) => {
    setFormData(prev => {
      const exists = prev.categories.includes(cat);
      if (exists) {
        return { ...prev, categories: prev.categories.filter(c => c !== cat) };
      } else {
        return { ...prev, categories: [...prev.categories, cat] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdBiz = registerNewBusiness(formData);
    setNewlyCreatedCode(createdBiz.businessCode);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Register Business on BizLink</h3>
              <p className="text-xs text-slate-300">
                Join the digital supply-chain discovery network
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsRegisterModalOpen(false);
              setNewlyCreatedCode(null);
            }}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {newlyCreatedCode ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Registration Complete!</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Your business has been registered into the active ecosystem.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl inline-block max-w-md w-full text-center">
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                  Assigned BizLink Network ID
                </p>
                <p className="text-2xl font-mono font-black text-indigo-600 mt-1 tracking-wider">
                  {newlyCreatedCode}
                </p>
                <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Prototype Platform Identifier (Demo Sandbox)
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setIsRegisterModalOpen(false);
                    setNewlyCreatedCode(null);
                    setDashboardView('overview');
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Enterprise Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mahavir Electricals & Hardware"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Owner / Managing Partner Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Business Roles (Multi-select) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Business Role(s) in Supply Chain (Select all applicable) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AVAILABLE_ROLES.map(role => {
                    const isSelected = formData.roles.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => toggleRole(role)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{role}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Categories (Multi-select) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Product / Service Categories
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 border border-slate-200 rounded-lg bg-slate-50/50">
                  {AVAILABLE_CATEGORIES.map(cat => {
                    const isSelected = formData.categories.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-medium shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@enterprise.com"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location details */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address & Market Area *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Shop No., Market Complex, Sector / Area"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business Overview & Commercial Scope
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Briefly describe your products, target buyers, and supply capacity..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md transition-all"
                >
                  Complete Registration & Generate ID
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
