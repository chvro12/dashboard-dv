import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Filter,
  Search,
  Clock,
  CheckCircle,
  Building2,
  Target,
  PieChart,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardContent, Progress } from "./shared/Card";

const mockVisitsData = [
  {
    callName: "C018433615",
    frId: "FR100916247",
    status: "Submitted",
    name: "CLINIQUE VETERINAIRE DE L ABBAYE",
    type: "Face-to-Face",
    date: "2024-01-06",
  },
  {
    callName: "C018434006",
    frId: "FR100916247",
    status: "Submitted",
    name: "CLINIQUE VETERINAIRE DE L ABBAYE",
    type: "Face-to-Face",
    date: "2024-01-06",
  },
  {
    callName: "C019150890",
    frId: "FR100916247",
    status: "Submitted",
    name: "CLINIQUE VETERINAIRE DE L ABBAYE",
    type: "Face-to-Face",
    date: "2024-01-05",
  },
  {
    callName: "C018506290",
    frId: "FR100916405",
    status: "Submitted",
    name: "CV DU CEDRE-WV-6918-4519",
    type: "Face-to-Face",
    date: "2024-01-05",
  },
  {
    callName: "C019576715",
    frId: "FR100916405",
    status: "Planned",
    name: "CAB. VET. CHANET",
    type: "Meeting/Event",
    date: "2024-01-10",
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Submitted: "bg-green-100 text-green-800",
    Planned: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

export default function VisitesView() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header reste identique */}
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
                  Mes Visites
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
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  selectedPeriod === "week"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPeriod("week")}
              >
                Cette semaine
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  selectedPeriod === "month"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPeriod("month")}
              >
                Ce mois
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Overview avec les nouvelles métriques */}
      <div className="mx-auto px-6 py-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                Visites du Jour
              </div>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">3</div>
              <div className="mt-2 text-sm text-gray-600">Sur 5 planifiées</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                Répartition des Visites
              </div>
              <PieChart className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">80%</div>
              <div className="mt-2 text-xs text-gray-600">
                Face-to-Face vs Meeting
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                Objectif de Visites
              </div>
              <Target className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">85%</div>
              <Progress value={85} colorClass="bg-green-500" />
              <div className="mt-2 text-xs text-gray-600">
                17 sur 20 visites prévues
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                Taux de Complétion
              </div>
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">92%</div>
              <div className="mt-2 text-xs text-gray-600">
                Visites réalisées sans report
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et Recherche */}
        <div className="mt-6 bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une visite..."
                className="w-full h-10 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <select className="h-10 px-3 text-sm border rounded-lg">
                <option>Tous les statuts</option>
                <option>Submitted</option>
                <option>Planned</option>
                <option>Cancelled</option>
              </select>
              <select className="h-10 px-3 text-sm border rounded-lg">
                <option>Tous les types</option>
                <option>Face-to-Face</option>
                <option>Meeting/Event</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Plus de filtres
              </button>
            </div>
          </div>
        </div>

        {/* Table des visites mise à jour */}
        <div className="mt-6 bg-white rounded-lg border shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Call Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    FR ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Clinique
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockVisitsData
                  .filter(
                    (visit) =>
                      visit.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      visit.callName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((visit, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {visit.callName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visit.frId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={visit.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {visit.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visit.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visit.date}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
