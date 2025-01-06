import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  Target,
  Users,
  TrendingUp,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Composant pour les cartes métriques
const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
}) => (
  <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div
        className={`p-2 rounded-lg ${
          trend === "up"
            ? "bg-green-50"
            : trend === "down"
            ? "bg-red-50"
            : "bg-gray-50"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            trend === "up"
              ? "text-green-500"
              : trend === "down"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        />
      </div>
    </div>
    {trendValue && (
      <div className="mt-2 text-sm">
        <span className={trend === "up" ? "text-green-600" : "text-red-600"}>
          {trend === "up" ? "↑" : "↓"} {trendValue}%
        </span>
        <span className="text-gray-500 ml-1">vs mois dernier</span>
      </div>
    )}
  </div>
);

// Composant pour les pastilles de segmentation interactives
const SegmentationPill = ({ type, count, isSelected, onClick }) => {
  const styles = {
    Maintain: "bg-green-50 text-green-700 ring-green-600/20",
    Build: "bg-purple-50 text-purple-700 ring-purple-600/20",
    Defend: "bg-red-50 text-red-700 ring-red-600/20",
    Observe: "bg-blue-50 text-blue-700 ring-blue-600/20",
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-2 cursor-pointer transform transition-all ${
        isSelected ? "scale-105" : ""
      }`}
    >
      <div className="flex items-center">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[type]}`}
        >
          {type}
          <span className="ml-2">{count}</span>
          {isSelected ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )}
        </span>
      </div>
    </div>
  );
};

// Composant pour le tableau des comptes
const AccountsTable = ({ accounts }) => (
  <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
            ALT_ID2
          </th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Nom
          </th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Objectif
          </th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Face/Face
          </th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Total
          </th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Delta
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {accounts.map((account) => (
          <tr key={account.id} className="hover:bg-gray-50">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
              {account.id}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
              {account.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {account.objective}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {account.faceToFace}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {account.total}
            </td>
            <td
              className={`whitespace-nowrap px-3 py-4 text-sm ${
                account.delta >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {account.delta}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function InteractionsView() {
  const navigate = useNavigate();
  const [selectedSegment, setSelectedSegment] = useState(null);

  const metrics = {
    totalInteractions: 42,
    objectifAtteint: "78%",
    visitesPlanifiees: 12,
    comptesActifs: 28,
  };

  // Données de segmentation avec les comptes réels
  const segmentationData = {
    Maintain: {
      count: 8,
      accounts: [
        {
          id: "100926778",
          name: "CLIN. VET. EXPANSIA",
          objective: 6.0,
          faceToFace: 6,
          total: 10,
          delta: 4.0,
        },
        {
          id: "100928240",
          name: "CAB. VET. SARTILLY",
          objective: 5.0,
          faceToFace: 11,
          total: 13,
          delta: 8.0,
        },
        {
          id: "100929259",
          name: "CLIN. VET. GOSSELIN-BARRE",
          objective: 5.0,
          faceToFace: 8,
          total: 10,
          delta: 5.0,
        },
      ],
    },
    Build: {
      count: 3,
      accounts: [
        {
          id: "101053388",
          name: "VETRINAIREA",
          objective: 7.0,
          faceToFace: 7,
          total: 11,
          delta: 4.0,
        },
        {
          id: "100932745",
          name: "CLIN. VET. DU CENTRE",
          objective: 7.0,
          faceToFace: 5,
          total: 7,
          delta: 0.0,
        },
        {
          id: "100921617",
          name: "CLIN. VET. OCEANE",
          objective: 8.0,
          faceToFace: 7,
          total: 9,
          delta: 1.0,
        },
      ],
    },
    Defend: {
      count: 2,
      accounts: [
        {
          id: "100930354",
          name: "CLIN. VET. LA DETOURBE",
          objective: 8.0,
          faceToFace: 8,
          total: 12,
          delta: 4.0,
        },
        {
          id: "100924183",
          name: "CLIN. VET. DES MARAIS",
          objective: 8.0,
          faceToFace: 12,
          total: 14,
          delta: 6.0,
        },
      ],
    },
    Observe: {
      count: 15,
      accounts: [
        {
          id: "100921551",
          name: "CLINIQUE VETRINAIRE LA DIVETTE",
          objective: 8.0,
          faceToFace: 14,
          total: 18,
          delta: 10.0,
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
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
                <h1 className="text-xl font-semibold text-gray-900">
                  Interactions par compte
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-medium text-gray-700">
                    Agnes Hugain
                  </span>
                  <span className="text-sm text-gray-500">·</span>
                  <span className="text-sm text-gray-500">
                    FR-AH-BU-PV-VI3-4
                  </span>
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

        {/* Segmentation avec détails */}
        <div className="mt-6 bg-white rounded-lg border p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Répartition par Segmentation
          </h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(segmentationData).map(([type, data]) => (
              <SegmentationPill
                key={type}
                type={type}
                count={data.count}
                isSelected={selectedSegment === type}
                onClick={() =>
                  setSelectedSegment(selectedSegment === type ? null : type)
                }
              />
            ))}
          </div>

          {/* Liste des comptes pour le segment sélectionné */}
          {selectedSegment && segmentationData[selectedSegment] && (
            <AccountsTable
              accounts={segmentationData[selectedSegment].accounts}
            />
          )}
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
              <span className="font-medium">3 comptes</span> n'ont pas été
              visités depuis plus de 2 mois
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
