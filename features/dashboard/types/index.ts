export interface DashboardStats {
  totalCreators: number;
  activeCreators: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalRevenue: number;
  revenueGrowth: number;
  totalViews: number;
  viewsGrowth: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface RecentActivity {
  id: string;
  type: 'campaign_created' | 'creator_joined' | 'payment_received' | 'report_generated';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}
