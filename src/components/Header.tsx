import { Shield, Printer, Bell } from "lucide-react";
import { Button } from "../components/ui/button";
import { ChangeNotification } from "../types";

interface HeaderProps {
  currentAdmin?: string;
  onPrint?: () => void;
  showPrintButton?: boolean;
  onChangeIndicatorClick?: () => void;
  pendingChangesCount?: number;
}

export const Header = ({ 
  currentAdmin, 
  onPrint, 
  showPrintButton, 
  onChangeIndicatorClick, 
  pendingChangesCount = 0 
}: HeaderProps) => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold">Canan Tonota</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentAdmin && (
            <div className="text-sm text-gray-300">
              Logged in as: <span className="font-medium text-blue-400">{currentAdmin}</span>
            </div>
          )}
          
          {pendingChangesCount > 0 && (
            <Button
              onClick={onChangeIndicatorClick}
              size="sm"
              variant="outline"
              className="relative bg-yellow-600 hover:bg-yellow-700 border-yellow-500 text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              {pendingChangesCount}
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
            </Button>
          )}
          
          {showPrintButton && onPrint && (
            <Button
              onClick={onPrint}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};