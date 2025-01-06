import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Calendar, TrendingUp } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const ProgressBar = ({ value, max = 100, colorClass = "bg-blue-500" }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full transition-all duration-500 ${colorClass}`}
        style={{ width: `${percentage}%` }}
      />
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
      <svg className="transform -rotate-90" width={size} height={size}>
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
          className={`${color} transition-all duration-500`}
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
        <span className={`text-xl font-bold ${color}`}>{progress}%</span>
      </div>
    </div>
  );
};

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
    tempsEcoule: 102.39,
  };

  const pieData = [
    {
      name: "Développer",
      value: profileData.stats.developper,
      color: "#3b82f6",
    },
    { name: "Défendre", value: profileData.stats.defendre, color: "#ef4444" },
    { name: "Maintenir", value: profileData.stats.maintenir, color: "#10b981" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Objectifs Métier 2
              </h1>
              <p className="text-sm text-gray-500">{profileData.territoire}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Colonne de gauche - Progression */}
        <div className="w-1/3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Progression Globale</h3>
            <div className="space-y-8">
              {/* Temps écoulé */}
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={profileData.tempsEcoule}
                  color={
                    profileData.tempsEcoule > 100
                      ? "text-amber-500"
                      : "text-green-500"
                  }
                />
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium">Temps écoulé</div>
                  <div className="text-xs text-gray-500">du mois</div>
                </div>
              </div>

              {/* Avancement DD */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Avancement DD</span>
                  <span className="text-sm font-bold text-blue-500">
                    {profileData.stats.avancementDD}%
                  </span>
                </div>
                <ProgressBar
                  value={profileData.stats.avancementDD}
                  colorClass="bg-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">
                  vs 84.14% équipe
                </div>
              </div>

              {/* Avancement M */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Avancement M</span>
                  <span className="text-sm font-bold text-green-500">
                    {profileData.stats.avancementM}%
                  </span>
                </div>
                <ProgressBar
                  value={profileData.stats.avancementM}
                  colorClass="bg-green-500"
                />
                <div className="text-xs text-gray-500 mt-1">
                  vs 83.11% équipe
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Colonne de droite - Charts & Objectifs */}
        <div className="w-2/3 space-y-6">
          {/* Répartition des activités */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Répartition des activités
            </h3>
            <div className="flex">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className="hover:opacity-80 transition-opacity duration-300"
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 flex items-center">
                <div className="grid grid-cols-1 gap-3 w-full">
                  {pieData.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Objectifs et réalisations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Objectifs et réalisations
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Objectif DD
                    </span>
                    <span className="text-sm font-bold">
                      {profileData.stats.totalDD} /{" "}
                      {profileData.stats.objectifDD}
                    </span>
                  </div>
                  <ProgressBar
                    value={profileData.stats.totalDD}
                    max={profileData.stats.objectifDD}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Objectif M
                    </span>
                    <span className="text-sm font-bold">
                      {profileData.stats.maintenir} /{" "}
                      {profileData.stats.objectifM}
                    </span>
                  </div>
                  <ProgressBar
                    value={profileData.stats.maintenir}
                    max={profileData.stats.objectifM}
                    colorClass="bg-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">
                    Total DD
                  </div>
                  <div className="text-xl font-bold mt-1">
                    {profileData.stats.totalDD}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">
                    Total M
                  </div>
                  <div className="text-xl font-bold mt-1">
                    {profileData.stats.maintenir}
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
