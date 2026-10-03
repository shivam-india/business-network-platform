'use client';

import React, { useState } from 'react';
import { useBizLink } from '@/context/BizLinkContext';
import {
  Receipt,
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Search,
  Download,
  ShieldCheck,
} from 'lucide-react';

export function LedgerView() {
  const {
    transactions,
    settleTransaction,
    setIsAddTransactionModalOpen,
  } = useBizLink();

  const [filterType, setFilterType] = useState<'All' | 'Credit' | 'Debit'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Settled'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Computations
  const totalReceivables = transactions
    .filter(t => t.type === 'Credit' && t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPayables = transactions
    .filter(t => t.type === 'Debit' && t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSettled = transactions
    .filter(t => t.status === 'Settled')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalReceivables - totalPayables;

  // Filter transactions
  const filtered = transactions.filter(t => {
    if (filterType !== 'All' && t.type !== filterType) return false;
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.businessName.toLowerCase().includes(q) ||
        t.invoiceNumber.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              B2B Trade Ledger & Credit Book
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor receivables from retail contractors and payables to wholesale suppliers
          </p>
        </div>

        <button
          onClick={() => setIsAddTransactionModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Record New Entry
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Receivables (Credits)
          </span>
          <div className="text-xl font-bold text-emerald-600 mt-2 flex items-center gap-1">
            <ArrowDownRight className="w-5 h-5" />
            ₹{totalReceivables.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Pending payments from buyers</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Payables (Debits)
          </span>
          <div className="text-xl font-bold text-rose-600 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-5 h-5" />
            ₹{totalPayables.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Owed to wholesale distributors</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Net Working Balance
          </span>
          <div className={`text-xl font-bold mt-2 ${netBalance >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
            ₹{netBalance.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Receivables minus payables</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Settled Trade Volume
          </span>
          <div className="text-xl font-bold text-indigo-600 mt-2 flex items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            ₹{totalSettled.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Completed trade settlements</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search partner or invoice..."
              className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none w-56"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['All', 'Credit', 'Debit'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filterType === type
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'All' ? 'All Types' : type === 'Credit' ? 'Credits (Receivable)' : 'Debits (Payable)'}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['All', 'Pending', 'Settled'] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filterStatus === st
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <span className="text-slate-500 font-medium">
          Showing {filtered.length} of {transactions.length} entries
        </span>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Date</th>
                <th className="p-4">Business Counterparty</th>
                <th className="p-4">Role</th>
                <th className="p-4">Flow Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Invoice Ref</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 text-slate-600 font-mono font-medium">{tx.date}</td>
                  <td className="p-4">
                    <strong className="text-slate-900 font-bold text-sm block">{tx.businessName}</strong>
                    <span className="text-[11px] text-slate-500">{tx.description}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {tx.businessRole}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        tx.type === 'Credit'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {tx.type === 'Credit' ? (
                        <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      {tx.type} ({tx.type === 'Credit' ? 'Receivable' : 'Payable'})
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 text-sm">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-slate-600 font-mono">{tx.dueDate}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'Settled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-500">{tx.invoiceNumber}</td>
                  <td className="p-4 text-right">
                    {tx.status === 'Pending' && (
                      <button
                        onClick={() => settleTransaction(tx.id)}
                        className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-semibold transition-all"
                      >
                        Mark Settled
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
