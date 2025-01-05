import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarRange, TrendingUp, Users } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MetricCard = ({ title, value, trend, subtitle, icon: Icon }) => (
  <div className="bg-white p-4 rounded-lg border">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-2 rounded-lg ${trend >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
        <Icon className={`h-5 w-5 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
      </div>
    </div>
    {trend && (
      <div className="mt-2">
        <span className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
        <span className="text-sm text-gray-500 ml-1">vs mois dernier</span>
      </div>
    )}
  </div>
);

export default function SenvelgoView() {
  const navigate = useNavigate();

  const senvelgoData = [
    { month: 'Janvier', withMention: 196, withoutMention: 51, total: 247 },
    { month: 'Février', withMention: 1561, withoutMention: 279, total: 1840 },
    { month: 'Mars', withMention: 1398, withoutMention: 381, total: 1779 },
    { month: 'Avril', withMention: 897, withoutMention: 505, total: 1402 }
  ];

  const correlationData = [
    {
      mois: 'Janvier',
      visites: 10,
      senvelgo: 9,
      ratio: '90.00%',
      commandes: 8
    },
    {
      mois: 'Février',
      visites: 55,
      senvelgo: 50,
      ratio: '90.91%',
      commandes: 29
    },
    {
      mois: 'Mars',
      visites: 67,
      senvelgo: 52,
      ratio: '77.61%',
      commandes: 14
    },
    {
      mois: 'Avril',
      visites: 52,
      senvelgo: 30,
      ratio: '57.69%',
      commandes: 8
    }
  ];

  const territoryData = [
    { territoire: 'FR-AH-BU-PV-VI3-1', cumul: 64, fevrier: 23, mars: 23, avril: 13 },
    { territoire: 'FR-AH-BU-PV-VI3-2', cumul: 46, fevrier: 19, mars: 13, avril: 12 },
    { territoire: 'FR-AH-BU-PV-VI3-3', cumul: 48, fevrier: 16, mars: 14, avril: 10 },
    { territoire: 'FR-AH-BU-PV-VI3-4', cumul: 62, fevrier: 29, mars: 14, avril: 8 }
  ];

  const personalStats = {
    visitesCumul: 570,
    senvelegoCumul: 422,
    ratioCumul: "74.04%"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Suivi Senvelgo</h1>
            <p className="text-sm text-gray-500">Agnes Hugain · FR-AH-BU-PV-VI3-4</p>
          </div>
        </div>
        <select className="border rounded-md px-3 py-1.5 text-sm">
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Visites Cumul"
          value={personalStats.visitesCumul}
          icon={Users}
          trend={8.5}
        />
        <MetricCard
          title="Senvelgo Cumul"
          value={personalStats.senvelegoCumul}
          icon={TrendingUp}
          trend={12.3}
        />
        <MetricCard
          title="Ratio Cumul"
          value={personalStats.ratioCumul}
          icon={CalendarRange}
          trend={-2.1}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique Senvelgo */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Évolution Senvelgo 2024</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={senvelgoData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="withMention" name="Avec mention" fill="#3B82F6" stackId="a" />
                <Bar dataKey="withoutMention" name="Sans mention" fill="#93C5FD" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique de corrélation */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Corrélation Visites / Commandes</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={correlationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="visites"
                  name="Visites"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="senvelgo"
                  name="Senvelgo"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="commandes"
                  name="Commandes"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">Ratio moyen</div>
              <div className="text-lg font-bold text-blue-600">79.05%</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">Total Visites</div>
              <div className="text-lg font-bold text-blue-600">184</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">Total Commandes</div>
              <div className="text-lg font-bold text-yellow-600">59</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des territoires */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Performance par territoire</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Territoire
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cumul
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Février
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mars
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avril
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {territoryData.map((territory, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {territory.territoire}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {territory.cumul}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {territory.fevrier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {territory.mars}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {territory.avril}
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