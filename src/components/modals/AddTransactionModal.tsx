'use client';

import React, { useState } from 'react';
import { useBizLink } from '@/context/BizLinkContext';
import { X, Receipt, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { BusinessRole } from '@/types';

export function AddTransactionModal() {
  const {
    isAddTransactionModalOpen,
    setIsAddTransactionModalOpen,
    businesses,
    addTransaction,
  } = useBizLink();

  const [txType, setTxType] = useState<'Credit' | 'Debit'>('Credit');
  const [selectedBizId, setSelectedBizId] = useState(businesses[1]?.id || '');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  const [category, setCategory] = useState('Trade Restock');

  if (!isAddTransactionModalOpen) return null;

  const selectedBiz = businesses.find(b => b.id === selectedBizId) || businesses[1] || businesses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    addTransaction({
      date: new Date().toISOString().split('T')[0],
      businessId: selectedBiz.id,
      businessName: selectedBiz.name,
      businessRole: selectedBiz.primaryRole,
      type: txType,
      amount: Number(amount),
      status: 'Pending',
      invoiceNumber: invoiceNumber || `INV-${Date.now().toString().substring(6)}`,
      description: description || `${txType === 'Credit' ? 'Receivable order' : 'Payable restock invoice'} with ${selectedBiz.name}`,
      dueDate: dueDate,
      category: category,
    });

    setIsAddTransactionModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Record Ledger Transaction</h3>
              <p className="text-xs text-slate-300">Maintain business credits and debits</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddTransactionModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Type Toggle: Credit (Receivable) vs Debit (Payable) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Transaction Flow Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTxType('Credit')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  txType === 'Credit'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Credit (Receivable)</p>
                  <p className="text-[11px] text-slate-500">Money owed to your business</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTxType('Debit')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  txType === 'Debit'
                    ? 'bg-rose-50 border-rose-300 text-rose-900 ring-2 ring-rose-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Debit (Payable)</p>
                  <p className="text-[11px] text-slate-500">Money you owe to supplier</p>
                </div>
              </button>
            </div>
          </div>

          {/* Business Counterparty */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Counterparty Business
            </label>
            <select
              value={selectedBizId}
              onChange={e => setSelectedBizId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            >
              {businesses.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.primaryRole} - {b.location.city})
                </option>
              ))}
            </select>
          </div>

          {/* Amount & Invoice */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (₹) *</label>
              <input
                type="number"
                required
                min="1"
                step="any"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 25000"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice / Reference No.</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={e => setInvoiceNumber(e.target.value)}
                placeholder="INV-2026-001"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Due Date & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Trade Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="Inventory Restock">Inventory Restock</option>
                <option value="Wholesale Dispatch">Wholesale Dispatch</option>
                <option value="Commercial Order">Commercial Order</option>
                <option value="Consignment Advance">Consignment Advance</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Particulars / Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. 50 packs 9W LED Bulbs & 20 modular gang boxes..."
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddTransactionModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md transition-all"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
