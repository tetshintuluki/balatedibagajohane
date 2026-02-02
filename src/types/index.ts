export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  monthlyContributions: MonthlyContribution[];
  lastUpdated: number; // timestamp
  updatedBy: string;   // admin who made the change
}

export interface Visitor {
  id: string;
  name: string;
  date: string;
  purpose: string;
  monthlyContributions: MonthlyContribution[];
  lastUpdated: number;
  updatedBy: string;
}

export interface Contribution {
  id: string;
  name: string;
  amount: number;
  date: string;
  note: string;
  lastUpdated: number;
  updatedBy: string;
}

export interface MonthlyContribution {
  id: string;
  month: string;
  amount: number;
  paid: boolean;
  paymentDate?: string;
  lastUpdated: number;
  updatedBy: string;
}

export interface ChangeNotification {
  id: string;
  type: 'members' | 'visitors' | 'contributions' | 'monthly_contributions';
  action: 'created' | 'updated' | 'deleted';
  entityId: string;
  entityName: string;
  admin: string;
  timestamp: number;
}

export type EntityType = 'members' | 'visitors' | 'contributions';
export type Entity = Member | Visitor | Contribution;