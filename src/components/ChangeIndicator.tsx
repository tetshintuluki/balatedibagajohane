import { useEffect, useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { ChangeNotification } from "../types";
import { storage } from "../utils/storage";

interface ChangeIndicatorProps {
  currentAdmin: string;
  onChangesDetected: (changes: ChangeNotification[]) => void;
}

export const ChangeIndicator = ({ currentAdmin, onChangesDetected }: ChangeIndicatorProps) => {
  const [lastChecked, setLastChecked] = useState(Date.now());
  const [pendingChanges, setPendingChanges] = useState<ChangeNotification[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const checkForChanges = async () => {
    setIsChecking(true);
    try {
      const changes = storage.getChangesSince(lastChecked);
      if (changes.length > 0) {
        setPendingChanges(prev => [...prev, ...changes]);
        onChangesDetected(changes);
      }
      setLastChecked(Date.now());
    } catch (error) {
      console.error('Error checking for changes:', error);
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  const applyChanges = () => {
    onChangesDetected(pendingChanges);
    setPendingChanges([]);
  };

  // Auto-check for changes every 5 seconds
  useEffect(() => {
    const interval = setInterval(checkForChanges, 5000);
    return () => clearInterval(interval);
  }, [lastChecked]);

  if (pendingChanges.length === 0) {
    return (
      <div className="flex items-center space-x-2 text-sm text-green-400">
        <CheckCircle className="h-4 w-4" />
        <span>Up to date</span>
        {isChecking && <RefreshCw className="h-3 w-3 animate-spin" />}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 text-yellow-400">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">
          {pendingChanges.length} change{pendingChanges.length !== 1 ? 's' : ''} detected
        </span>
      </div>
      <Button
        onClick={applyChanges}
        size="sm"
        className="bg-yellow-600 hover:bg-yellow-700 text-white"
      >
        <RefreshCw className="h-3 w-3 mr-1" />
        Refresh
      </Button>
    </div>
  );
};