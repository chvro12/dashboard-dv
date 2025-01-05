import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Target, Users, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

const MetricCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }) => (
  <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-green-50' : trend === 'down' ? 'bg-red-50' : 'bg-gray-50'}`}>
        <Icon className={`h-5 w-5 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`} />
      </div>
    </div>
    {trendValue && (
      <div className="mt-2 text-sm">
        <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}%
        </span>
        <span className="text-gray-500 ml-1">vs mois dernier</span>
      </div>
    )}
  </div>
);

const SegmentationPill = ({ type, count }) => {
  const styles = {
    'Observe': 'bg-blue-50 text-blue-700 ring-blue-600/20',
    'Maintain': 'bg-green-50 text-green-700 ring-green-600/20',
    'Build': 'bg-purple-50 text-purple-700 ring-purple-600/20',
    'Defend': 'bg-red-50 text-red-700 ring-red-600/20'
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[type] || 'bg-gray-50 text-gray-700 ring-gray-600/20'}`}>
        {type}
      </span>
      <span className="text-sm text-gray-500">{count}</span>
    </div>
  );
};

export default function InteractionsView() {
  const navigate = useNavigate();
  const metrics = {
    totalInteractions: 42,
    objectifAtteint: "78%",
    visitesPlanifiees: 12,
    comptesActifs: 28
  };

  const segmentationStats = {
    'Observe': 15,
    'Maintain': 8,
    'Build': 3,
    'Defend': 2
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header amélioré */}
      <div className="bg-white border-b">
        <div className="mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Interactions par compte</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-medium text-gray-700">Agnes Hugain</span>
                  <span className="text-sm text-gray-500">·</span>
                  <span className="text-sm text-gray-500">FR-AH-BU-PV-VI3-4</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Période : </span>
              <select className="text-sm border rounded-md px-3 py-1.5">
                <option>Janvier 2024</option>
                <option>Février 2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="mx-auto px-6 py-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Interactions"
            value={metrics.totalInteractions}
            icon={Users}
            trend="up"
            trendValue="12"
          />
          <MetricCard
            title="Objectif Atteint"
            value={metrics.objectifAtteint}
            icon={Target}
            trend="up"
            trendValue="5"
          />
          <MetricCard
            title="Visites Planifiées"
            value={metrics.visitesPlanifiees}
            icon={Calendar}
            subtitle="Pour les 7 prochains jours"
          />
          <MetricCard
            title="Comptes Actifs"
            value={metrics.comptesActifs}
            icon={TrendingUp}
            trend="down"
            trendValue="3"
          />
        </div>

        {/* Segmentation Summary */}
        <div className="mt-6 bg-white rounded-lg border p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Répartition par Segmentation</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(segmentationStats).map(([type, count]) => (
              <SegmentationPill key={type} type={type} count={count} />
            ))}
          </div>
        </div>
      </div>

      {/* Filtres et Recherche */}
      <div className="mx-auto px-6 py-3 w-full">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Rechercher un compte..."
                className="w-full h-10 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <select className="h-10 px-3 text-sm border rounded-lg">
                <option>Tous les types</option>
                <option>Face/Face</option>
                <option>Réunion</option>
                <option>Veeva</option>
              </select>
              <select className="h-10 px-3 text-sm border rounded-lg">
                <option>Toutes les segmentations</option>
                <option>Observe</option>
                <option>Maintain</option>
                <option>Build</option>
                <option>Defend</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Plus de filtres
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert pour les comptes critiques */}
      <div className="mx-auto px-6 py-2 w-full">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-amber-500 mr-3" />
          <div>
            <p className="text-sm text-amber-700">
              <span className="font-medium">3 comptes</span> n'ont pas été visités depuis plus de 2 mois
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}