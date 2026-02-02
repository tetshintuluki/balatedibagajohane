import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { EntityType, Entity } from "../types";

interface CRUDModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: EntityType;
  initialData?: Entity | null;
  onSubmit: (data: any) => void;
  mode: 'add' | 'edit';
}

export const CRUDModal = ({
  isOpen,
  onClose,
  entityType,
  initialData,
  onSubmit,
  mode
}: CRUDModalProps) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form data based on entity type
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        purpose: '',
        amount: '',
        note: ''
      });
    }
  }, [initialData, entityType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert amount to number if it exists
    const processedData = { ...formData };
    if (processedData.amount) {
      processedData.amount = Number(processedData.amount);
    }
    
    onSubmit(processedData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  const getFields = () => {
    switch (entityType) {
      case 'members':
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true }
        ];
      case 'visitors':
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'purpose', label: 'Purpose', type: 'text', required: true }
        ];
      case 'contributions':
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'amount', label: 'Amount', type: 'number', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'note', label: 'Note', type: 'textarea', required: false }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Add' : 'Edit'} {entityType.slice(0, -1)}
          </h2>
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
          {getFields().map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-gray-300">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required={field.required}
                  rows={3}
                />
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required={field.required}
                />
              )}
            </div>
          ))}

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
              className="bg-blue-600 hover:bg-blue-700"
            >
              {mode === 'add' ? 'Add' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};