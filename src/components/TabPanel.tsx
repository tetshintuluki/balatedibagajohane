import { useState } from "react";
import { Plus, Edit, Trash2, CreditCard } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CRUDModal } from "./CRUDModal";
import { ContributionModal } from "./ContributionModal";
import { Entity, EntityType, MonthlyContribution } from "../types";

interface TabPanelProps {
  entityType: EntityType;
  data: Entity[];
  onAdd: (data: any) => void;
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  onAddContribution: (entityId: string, contribution: Omit<MonthlyContribution, 'id'>) => void;
  onToggleContributionPayment: (entityId: string, contributionId: string, paid: boolean) => void;
  onDeleteContribution: (entityId: string, contributionId: string) => void;
}

export const TabPanel = ({
  entityType,
  data,
  onAdd,
  onEdit,
  onDelete,
  onAddContribution,
  onToggleContributionPayment,
  onDeleteContribution
}: TabPanelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Entity | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string>("");

  const handleSubmit = (formData: any) => {
    if (editingItem) {
      onEdit(editingItem.id, formData);
    } else {
      onAdd(formData);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleAddContributionSubmit = (contributionData: Omit<MonthlyContribution, 'id'>) => {
    onAddContribution(selectedEntityId, contributionData);
    setIsContributionModalOpen(false);
  };

  const formatCurrency = (amount: number) => `BWP ${amount.toFixed(2)}`;

  const getTotalContributions = (contributions: MonthlyContribution[]) => {
    return contributions.reduce((sum, c) => sum + c.amount, 0);
  };

  const getPaidContributions = (contributions: MonthlyContribution[]) => {
    return contributions.filter(c => c.paid).reduce((sum, c) => sum + c.amount, 0);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white capitalize">
          {entityType} ({data.length})
        </h2>
        <Button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {entityType.slice(0, -1)}
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <p className="text-gray-400">No {entityType} found. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {data.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-lg">{item.name}</CardTitle>
                  <div className="flex space-x-2">
                    {(entityType === 'members' || entityType === 'visitors') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEntityId(item.id);
                          setIsContributionModalOpen(true);
                        }}
                        className="text-green-400 border-green-600 hover:bg-green-900"
                      >
                        <CreditCard className="h-3 w-3 mr-1" />
                        Contributions
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingItem(item);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-400 border-blue-600 hover:bg-blue-900"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                          onDelete(item.id);
                        }
                      }}
                      className="text-red-400 border-red-600 hover:bg-red-900"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    {entityType === 'members' && (
                      <>
                        <p className="text-gray-300"><strong>Email:</strong> {(item as any).email}</p>
                        <p className="text-gray-300"><strong>Phone:</strong> {(item as any).phone}</p>
                      </>
                    )}
                    {entityType === 'visitors' && (
                      <>
                        <p className="text-gray-300"><strong>Date:</strong> {new Date((item as any).date).toLocaleDateString()}</p>
                        <p className="text-gray-300"><strong>Purpose:</strong> {(item as any).purpose}</p>
                      </>
                    )}
                    {entityType === 'contributions' && (
                      <>
                        <p className="text-gray-300"><strong>Amount:</strong> {formatCurrency((item as any).amount)}</p>
                        <p className="text-gray-300"><strong>Date:</strong> {new Date((item as any).date).toLocaleDateString()}</p>
                        <p className="text-gray-300"><strong>Note:</strong> {(item as any).note || 'No note'}</p>
                      </>
                    )}
                  </div>
                  
                  {(entityType === 'members' || entityType === 'visitors') && (
                    <div>
                      <div className="bg-gray-750 p-3 rounded-lg">
                        <h4 className="font-semibold text-white mb-2">Monthly Contributions</h4>
                        {item.monthlyContributions.length === 0 ? (
                          <p className="text-gray-400 text-sm">No contributions yet</p>
                        ) : (
                          <div className="space-y-1">
                            {item.monthlyContributions.map((contribution) => (
                              <div key={contribution.id} className="flex justify-between items-center text-xs">
                                <span className="text-gray-300">
                                  {new Date(contribution.month + '-01').toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long'
                                  })}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className={contribution.paid ? 'text-green-400' : 'text-yellow-400'}>
                                    {formatCurrency(contribution.amount)} ({contribution.paid ? 'Paid' : 'Pending'})
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onToggleContributionPayment(item.id, contribution.id, !contribution.paid)}
                                    className="h-6 w-6 p-0 text-xs"
                                  >
                                    {contribution.paid ? '❌' : '✅'}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      if (confirm('Are you sure you want to delete this contribution?')) {
                                        onDeleteContribution(item.id, contribution.id);
                                      }
                                    }}
                                    className="h-6 w-6 p-0 text-red-400"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <div className="border-t pt-1 mt-1 text-xs">
                              <div className="flex justify-between">
                                <span>Total: {formatCurrency(getTotalContributions(item.monthlyContributions))}</span>
                                <span className="text-green-400">Paid: {formatCurrency(getPaidContributions(item.monthlyContributions))}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CRUDModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        entityType={entityType}
        initialData={editingItem}
        onSubmit={handleSubmit}
        mode={editingItem ? 'edit' : 'add'}
      />

      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        onSubmit={handleAddContributionSubmit}
      />
    </div>
  );
};