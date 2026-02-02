import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Printer, LogOut } from "lucide-react";
import { TabPanel } from "./TabPanel";
import { Entity, EntityType, MonthlyContribution } from "../types";

interface DashboardProps {
  entities: Record<EntityType, Entity[]>;
  currentAdmin: string;
  onAddEntity: (entityType: EntityType, data: Omit<Entity, "id" | "monthlyContributions">) => void;
  onEditEntity: (entityType: EntityType, id: string, data: Partial<Entity>) => void;
  onDeleteEntity: (entityType: EntityType, id: string) => void;
  onAddContribution: (entityType: EntityType, entityId: string, contribution: Omit<MonthlyContribution, "id">) => void;
  onToggleContributionPayment: (entityType: EntityType, entityId: string, contributionId: string, paid: boolean) => void;
  onDeleteContribution: (entityType: EntityType, entityId: string, contributionId: string) => void;
  onPrint: () => void;
}

export const Dashboard = ({
  entities,
  currentAdmin,
  onAddEntity,
  onEditEntity,
  onDeleteEntity,
  onAddContribution,
  onToggleContributionPayment,
  onDeleteContribution,
  onPrint
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<EntityType>("members");

  const handleAdd = (entityType: EntityType, data: any) => {
    onAddEntity(entityType, data);
  };

  const handleEdit = (entityType: EntityType, id: string, data: any) => {
    onEditEntity(entityType, id, data);
  };

  const handleDelete = (entityType: EntityType, id: string) => {
    onDeleteEntity(entityType, id);
  };

  const handleAddContributionLocal = (entityType: EntityType, entityId: string, contribution: Omit<MonthlyContribution, "id">) => {
    onAddContribution(entityType, entityId, contribution);
  };

  const handleTogglePayment = (entityType: EntityType, entityId: string, contributionId: string, paid: boolean) => {
    onToggleContributionPayment(entityType, entityId, contributionId, paid);
  };

  const handleDeleteContributionLocal = (entityType: EntityType, entityId: string, contributionId: string) => {
    onDeleteContribution(entityType, entityId, contributionId);
  };

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-white">Admin Dashboard</CardTitle>
            <p className="text-gray-400">Welcome, {currentAdmin}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={onPrint}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as EntityType)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 p-1">
          <TabsTrigger
            value="members"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Members
          </TabsTrigger>
          <TabsTrigger
            value="visitors"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Visitors
          </TabsTrigger>
          <TabsTrigger
            value="contributions"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Contributions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <TabPanel
            entityType="members"
            data={entities.members}
            onAdd={(data) => handleAdd("members", data)}
            onEdit={(id, data) => handleEdit("members", id, data)}
            onDelete={(id) => handleDelete("members", id)}
            onAddContribution={(entityId, contribution) => handleAddContributionLocal("members", entityId, contribution)}
            onToggleContributionPayment={(entityId, contributionId, paid) => handleTogglePayment("members", entityId, contributionId, paid)}
            onDeleteContribution={(entityId, contributionId) => handleDeleteContributionLocal("members", entityId, contributionId)}
          />
        </TabsContent>

        <TabsContent value="visitors">
          <TabPanel
            entityType="visitors"
            data={entities.visitors}
            onAdd={(data) => handleAdd("visitors", data)}
            onEdit={(id, data) => handleEdit("visitors", id, data)}
            onDelete={(id) => handleDelete("visitors", id)}
            onAddContribution={(entityId, contribution) => handleAddContributionLocal("visitors", entityId, contribution)}
            onToggleContributionPayment={(entityId, contributionId, paid) => handleTogglePayment("visitors", entityId, contributionId, paid)}
            onDeleteContribution={(entityId, contributionId) => handleDeleteContributionLocal("visitors", entityId, contributionId)}
          />
        </TabsContent>

        <TabsContent value="contributions">
          <TabPanel
            entityType="contributions"
            data={entities.contributions}
            onAdd={(data) => handleAdd("contributions", data)}
            onEdit={(id, data) => handleEdit("contributions", id, data)}
            onDelete={(id) => handleDelete("contributions", id)}
            onAddContribution={(entityId, contribution) => handleAddContributionLocal("contributions", entityId, contribution)}
            onToggleContributionPayment={(entityId, contributionId, paid) => handleTogglePayment("contributions", entityId, contributionId, paid)}
            onDeleteContribution={(entityId, contributionId) => handleDeleteContributionLocal("contributions", entityId, contributionId)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};