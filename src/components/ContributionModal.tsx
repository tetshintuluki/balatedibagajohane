import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { month: string; amount: number; paid: boolean }) => void;
}

export const ContributionModal = ({
  isOpen,
  onClose,
  onSubmit
}: ContributionModalProps) => {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      month,
      amount: Number(amount),
      paid
    });
    setMonth("");
    setAmount("");
    setPaid(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Add Monthly Contribution</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="month" className="text-gray-300">
              Month <span className="text-red-400">*</span>
            </Label>
            <Input
              id="month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">
              Amount (P) <span className="text-red-400">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="paid"
              checked={paid}
              onCheckedChange={(checked) => setPaid(checked === true)}
              className="border-gray-600 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="paid" className="text-gray-300 cursor-pointer">
              Mark as paid
            </Label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
            >
              Add Contribution
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};