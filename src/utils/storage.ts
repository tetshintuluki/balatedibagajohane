import { Member, Visitor, Contribution, ChangeNotification } from "../types";

// Simple in-memory storage with change tracking
let members: Member[] = [];
let visitors: Visitor[] = [];
let contributions: Contribution[] = [];
let changeHistory: ChangeNotification[] = [];
let lastChangeTimestamp = Date.now();

export const storage = {
  // Members
  getMembers: () => [...members],
  setMembers: (newMembers: Member[]) => {
    members = newMembers;
  },
  
  // Visitors
  getVisitors: () => [...visitors],
  setVisitors: (newVisitors: Visitor[]) => {
    visitors = newVisitors;
  },
  
  // Contributions
  getContributions: () => [...contributions],
  setContributions: (newContributions: Contribution[]) => {
    contributions = newContributions;
  },
  
  // Change tracking
  addChange: (change: ChangeNotification) => {
    changeHistory.push(change);
    lastChangeTimestamp = Date.now();
  },
  
  getChangesSince: (timestamp: number): ChangeNotification[] => {
    return changeHistory.filter(change => change.timestamp > timestamp);
  },
  
  getLastChangeTimestamp: () => lastChangeTimestamp,
  
  // Clear all data (for testing/reset)
  clearAll: () => {
    members = [];
    visitors = [];
    contributions = [];
    changeHistory = [];
    lastChangeTimestamp = Date.now();
  }
};