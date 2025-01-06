import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Target,
  Calendar,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const ProgressBar = ({
  value,
  max = 100,
  colorClass = "bg-blue-500",
  label,
  sublabel,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium">{label}</span>
          <span className="text-gray-500">
            {value}/{max}
          </span>
        </div>
      )}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-25 animate-pulse"></div>
        </div>
      </div>
      {sublabel && <div className="text-xs text-gray-500 mt-1">{sublabel}</div>}
    </div>
  );
};

const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(80, value);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90 transition-transform duration-1000"
        width={size}
        height={size}
      >
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${color} transition-all duration-1000`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-2xl font-bold ${color}`}>{progress}%</span>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <div className="font-medium text-gray-900">{data.name}</div>
        <div className="text-sm text-gray-600 mt-1">
          Valeur: {data.value}
          <div className="text-xs text-gray-500 mt-1">
            {Math.round((data.value / (data.total || 1)) * 100)}% du total
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const StatCard = ({ label, value, trend, trendValue, icon: Icon }) => (
  <Card className="p-4 hover:scale-105 transition-transform cursor-pointer">
    <div className="flex justify-between items-start">
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
      </div>
      <div
        className={`p-2 rounded-lg ${
          trend === "up" ? "bg-green-50" : "bg-red-50"
        }`}
      >
        <Icon
          className={`h-6 w-6 ${
            trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        />
      </div>
    </div>
    {trendValue && (
      <div className="mt-2 flex items-center">
        {trend === "up" ? (
          <ChevronUp className="h-4 w-4 text-green-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-red-500" />
        )}
        <span
          className={`text-sm ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trendValue}% vs période précédente
        </span>
      </div>
    )}
  </Card>
);

export default function ObjectifsMetierView() {
  const navigate = useNavigate();

  const profileData = {
    nomDV: "Agnes Hugain",
    territoire: "FR-AH-BU-PV-VI3-4",
    stats: {
      objectifDD: 337,
      objectifM: 300,
      developper: 209,
      defendre: 102,
      maintenir: 313,
      totalDD: 311,
      avancementDD: 92.28,
      avancementM: 104,
    },
    tempsEcoule: 90.39,
  };

  const pieData = [
    {
      name: "Développer",
      value: profileData.stats.developper,
      color: "#3b82f6",
      total: profileData.stats.totalDD,
    },
    {
      name: "Défendre",
      value: profileData.stats.defendre,
      color: "#ef4444",
      total: profileData.stats.totalDD,
    },
    {
      name: "Maintenir",
      value: profileData.stats.maintenir,
      color: "#10b981",
      total: profileData.stats.totalDD,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header amélioré */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Objectifs Métier 2
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-600 font-medium">
                    {profileData.territoire}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Janvier 2024</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">
              Performance Globale
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {profileData.stats.avancementDD}%
            </div>
          </div>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          label="Total DD"
          value={profileData.stats.totalDD}
          trend="up"
          trendValue="2.3"
          icon={TrendingUp}
        />
        <StatCard
          label="Total M"
          value={profileData.stats.maintenir}
          trend="up"
          trendValue="1.8"
          icon={Target}
        />
        <StatCard
          label="Défendre"
          value={profileData.stats.defendre}
          trend="down"
          trendValue="0.7"
          icon={AlertCircle}
        />
      </div>

      <div className="flex gap-6">
        {/* Colonne de gauche - Progression */}
        <div className="w-1/3">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Progression Globale</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profileData.tempsEcoule > 100
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {profileData.tempsEcoule}% du temps
              </span>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={profileData.tempsEcoule}
                  color={
                    profileData.tempsEcoule > 100
                      ? "text-amber-500"
                      : "text-green-500"
                  }
                />
                <div className="mt-4 text-center">
                  <div className="text-sm font-medium">Avancement Globale</div>
                  <div className="text-xs text-gray-500">du mois en cours</div>
                </div>
              </div>

              <div className="space-y-6">
                <ProgressBar
                  label="Avancement DD"
                  value={profileData.stats.avancementDD}
                  colorClass="bg-blue-500"
                  sublabel="vs 84.14% équipe"
                />

                <ProgressBar
                  label="Avancement M"
                  value={profileData.stats.avancementM}
                  colorClass="bg-green-500"
                  sublabel="vs 83.11% équipe"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Colonne de droite - Charts & Objectifs */}
        <div className="w-2/3 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">
              Répartition des activités
            </h3>
            <div className="flex">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className="hover:opacity-80 cursor-pointer transition-all duration-300"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 flex items-center">
                <div className="grid grid-cols-1 gap-3 w-full">
                  {pieData.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">
              Objectifs et réalisations
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <ProgressBar
                  label="Objectif DD"
                  value={profileData.stats.totalDD}
                  max={profileData.stats.objectifDD}
                  colorClass="bg-blue-500"
                />
                <ProgressBar
                  label="Objectif M"
                  value={profileData.stats.maintenir}
                  max={profileData.stats.objectifM}
                  colorClass="bg-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium text-gray-500">
                    Total DD
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {profileData.stats.totalDD}
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    <ChevronUp className="h-4 w-4 inline" />
                    +2.3% cette semaine
                  </div>
                </div>
                <div className="flex flex-col justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium text-gray-500">
                    Total M
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {profileData.stats.maintenir}
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    <ChevronUp className="h-4 w-4 inline" />
                    +1.8% cette semaine
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
