import { useState } from "react";
import { Plus, Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { MonthlyContribution } from "../types";

interface MonthlyContributionsProps {
  contributions: MonthlyContribution[];
  onAddContribution: (contribution: Omit<MonthlyContribution, 'id'>) => void;
  onTogglePayment: (contributionId: string, paid: boolean) => void;
  onDeleteContribution: (contributionId: string) => void;
  entityName: string;
}

export const MonthlyContributions = ({
  contributions,
  onAddContribution,
  onTogglePayment,
  onDeleteContribution,
  entityName
}: MonthlyContributionsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newContribution, setNewContribution] = useState({
    month: new Date().toISOString().slice(0, 7),
    amount: 0,
    paid: false
  });

  const handleAddContribution = () => {
    if (newContribution.month && newContribution.amount > 0) {
      onAddContribution(newContribution);
      setNewContribution({
        month: new Date().toISOString().slice(0, 7),
        amount: 0,
        paid: false
      });
      setIsAdding(false);
    }
  };

  const totalContributions = contributions.reduce((sum, c) => sum + c.amount, 0);
  const paidContributions = contributions.filter(c => c.paid).reduce((sum, c) => sum + c.amount, 0);
  const pendingContributions = totalContributions - paidContributions;

  return (
    <Card className="bg-gray-800 border-gray-700 mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg">Monthly Contributions</CardTitle>
        <Button
          onClick={() => setIsAdding(true)}
          size="sm"
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contribution
        </Button>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-750 p-4 rounded-lg">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-gray-300">Total</span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">${totalContributions.toFixed(2)}</div>
          </div>
          <div className="bg-gray-750 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-gray-300">Paid</span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">${paidContributions.toFixed(2)}</div>
          </div>
          <div className="bg-gray-750 p-4 rounded-lg">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-gray-300">Pending</span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">${pendingContributions.toFixed(2)}</div>
          </div>
        </div>

        {/* Add Contribution Form */}
        {isAdding && (
          <Card className="bg-gray-750 border-gray-600 mb-4">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-gray-300">Month</Label>
                  <Input
                    type="month"
                    value={newContribution.month}
                    onChange={(e) => setNewContribution(prev => ({
                      ...prev,
                      month: e.target.value
                    }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Amount</Label>
                  <Input
                    type="number"
                    value={newContribution.amount || ''}
                    onChange={(e) => setNewContribution(prev => ({
                      ...prev,
                      amount: parseFloat(e.target.value) || 0
                    }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Status</Label>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={newContribution.paid ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewContribution(prev => ({ ...prev, paid: true }))}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Paid
                    </Button>
                    <Button
                      type="button"
                      variant={!newContribution.paid ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewContribution(prev => ({ ...prev, paid: false }))}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                    >
                      Pending
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={handleAddContribution}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Contribution
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contributions List */}
        {contributions.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No monthly contributions recorded for {entityName}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold text-sm">Month</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold text-sm">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold text-sm">Payment Date</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contributions
                  .sort((a, b) => b.month.localeCompare(a.month))
                  .map((contribution) => (
                    <tr key={contribution.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4 text-white text-sm">
                        {new Date(contribution.month + '-01').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </td>
                      <td className="py-3 px-4 text-white text-sm">
                        ${contribution.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contribution.paid
                              ? 'bg-green-900 text-green-300'
                              : 'bg-yellow-900 text-yellow-300'
                          }`}
                        >
                          {contribution.paid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white text-sm">
                        {contribution.paymentDate
                          ? new Date(contribution.paymentDate).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onTogglePayment(contribution.id, !contribution.paid)}
                            className={
                              contribution.paid
                                ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20'
                                : 'text-green-400 hover:text-green-300 hover:bg-green-900/20'
                            }
                          >
                            {contribution.paid ? 'Mark Pending' : 'Mark Paid'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteContribution(contribution.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};