import { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { PrintView } from "./components/PrintView";
import { Entity, EntityType, MonthlyContribution } from "./types";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [showPrintView, setShowPrintView] = useState(false);
  const [entities, setEntities] = useState<Record<EntityType, Entity[]>>({
    members: [],
    visitors: [],
    contributions: []
  });

  // Initialize with some sample data
  useEffect(() => {
    const sampleData: Record<EntityType, Entity[]> = {
      members: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+267 123 4567",
          monthlyContributions: []
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+267 987 6543",
          monthlyContributions: []
        }
      ],
      visitors: [
        {
          id: "1",
          name: "Visitor One",
          date: "2024-01-15",
          purpose: "Meeting",
          monthlyContributions: []
        }
      ],
      contributions: [
        {
          id: "1",
          name: "Donation",
          amount: 500,
          date: "2024-01-20",
          note: "Monthly donation",
          monthlyContributions: []
        }
      ]
    };
    setEntities(sampleData);
  }, []);

  const handleLogin = (adminName: string) => {
    setIsLoggedIn(true);
    setCurrentAdmin(adminName);
  };

  const handleAddEntity = (entityType: EntityType, data: Omit<Entity, "id" | "monthlyContributions">) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: [
        ...prev[entityType],
        {
          ...data,
          id: Date.now().toString(),
          monthlyContributions: []
        }
      ]
    }));
  };

  const handleEditEntity = (entityType: EntityType, id: string, data: Partial<Entity>) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: prev[entityType].map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    }));
  };

  const handleDeleteEntity = (entityType: EntityType, id: string) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: prev[entityType].filter(item => item.id !== id)
    }));
  };

  const handleAddContribution = (entityType: EntityType, entityId: string, contribution: Omit<MonthlyContribution, "id">) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: prev[entityType].map(item =>
        item.id === entityId
          ? {
              ...item,
              monthlyContributions: [
                ...item.monthlyContributions,
                {
                  ...contribution,
                  id: Date.now().toString()
                }
              ]
            }
          : item
      )
    }));
  };

  const handleToggleContributionPayment = (entityType: EntityType, entityId: string, contributionId: string, paid: boolean) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: prev[entityType].map(item =>
        item.id === entityId
          ? {
              ...item,
              monthlyContributions: item.monthlyContributions.map(contribution =>
                contribution.id === contributionId
                  ? { ...contribution, paid }
                  : contribution
              )
            }
          : item
      )
    }));
  };

  const handleDeleteContribution = (entityType: EntityType, entityId: string, contributionId: string) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: prev[entityType].map(item =>
        item.id === entityId
          ? {
              ...item,
              monthlyContributions: item.monthlyContributions.filter(
                contribution => contribution.id !== contributionId
              )
            }
          : item
      )
    }));
  };

  if (showPrintView) {
    return (
      <PrintView
        members={entities.members}
        visitors={entities.visitors}
        contributions={entities.contributions}
        currentAdmin={currentAdmin}
        onClose={() => setShowPrintView(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard
          entities={entities}
          currentAdmin={currentAdmin}
          onAddEntity={handleAddEntity}
          onEditEntity={handleEditEntity}
          onDeleteEntity={handleDeleteEntity}
          onAddContribution={handleAddContribution}
          onToggleContributionPayment={handleToggleContributionPayment}
          onDeleteContribution={handleDeleteContribution}
          onPrint={() => setShowPrintView(true)}
        />
      )}
    </div>
  );
}

export default App;