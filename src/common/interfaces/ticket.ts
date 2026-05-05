export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reporter: string;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
}
