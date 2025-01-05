import { useNavigate } from "react-router-dom";
import { Building2, Calendar, Target, AlertTriangle, TrendingUp, Users, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardContent, Progress } from "./shared/Card";

const mockVisitData = [
  { month: "Jan", visits: 65 },
  { month: "Feb", visits: 75 },
  { month: "Mar", visits: 85 },
  { month: "Apr", visits: 45 }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Vétérinaire</h1>
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-600 font-medium">Agnes Hugain</span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 font-medium">Territoire: FR-AH-BU-PV-VI3-4</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">Dernière mise à jour: Aujourd'hui 14:30</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Statut: Actif
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Performance: 92%
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card onClick={() => navigate("/interactions")}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="text-sm font-medium text-gray-500">Intéraction par Comptes</div>
            <Building2 className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">120</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="text-sm font-medium text-gray-500">Visites</div>
            <Calendar className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">45</div>
            <div className="mt-4">
              <Progress value={56} />
            </div>
            <p className="text-sm text-gray-600 mt-2">56% de l'objectif</p>
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/objectifs")}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="text-sm font-medium text-gray-500">Objectif Métier 2</div>
            <Target className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">80</div>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="text-sm font-medium text-red-600">Visites Prioritaires</div>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">12</div>
            <p className="text-sm text-red-500 mt-2">Nécessitent attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">Progression des Visites</div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockVisitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/senvelgo")}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="text-lg font-semibold">Performance Senvelgo</div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Visites</span>
                  <span className="text-sm font-medium text-gray-700">75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Commandes</span>
                  <span className="text-sm font-medium text-gray-700">62%</span>
                </div>
                <Progress value={62} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Objectifs</span>
                  <span className="text-sm font-medium text-gray-700">89%</span>
                </div>
                <Progress value={89} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Planifier une visite
        </button>
        <button
          onClick={() => navigate("/interactions")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Voir toutes les cliniques
        </button>
      </div>
    </div>
  );
}