import { X, Clock, User, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ChangeNotification } from "../types";

interface RecentChangesProps {
  changes: ChangeNotification[];
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const RecentChanges = ({ changes, onClear, isOpen, onClose }: RecentChangesProps) => {
  if (!isOpen || changes.length === 0) return null;

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created': return <Plus className="h-3 w-3 text-green-400" />;
      case 'updated': return <Edit className="h-3 w-3 text-blue-400" />;
      case 'deleted': return <Trash2 className="h-3 w-3 text-red-400" />;
      default: return null;
    }
  };

  const formatEntityType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="fixed top-16 right-4 z-50 max-w-sm">
      <Card className="bg-gray-800 border-gray-700 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-white text-sm flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Recent Changes
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-gray-400 hover:text-white text-xs"
            >
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {changes.slice(-10).reverse().map((change, index) => (
              <div
                key={`${change.id}-${index}`}
                className="flex items-start space-x-2 p-2 rounded-lg bg-gray-750"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getActionIcon(change.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">
                    {change.entityName}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {formatEntityType(change.type)} {change.action}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <User className="h-3 w-3 mr-1" />
                    by {change.admin}
                  </div>
                </div>
                <div className="text-gray-500 text-xs flex-shrink-0">
                  {new Date(change.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};