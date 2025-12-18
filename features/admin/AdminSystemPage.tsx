
import React, { useState } from 'react';
import { Activity, Server, Database, Shield, Terminal, Power, RefreshCw } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { toast } from 'sonner';

const AdminSystemPage: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const resetStore = useDataStore((state) => state.resetStore);
  
  const logs = [
    { time: '10:42:01', level: 'INFO', msg: 'Order #ORD-88392 processed successfully' },
    { time: '10:41:55', level: 'WARN', msg: 'High latency detected on API Gateway' },
    { time: '10:40:22', level: 'INFO', msg: 'User login: u-4522' },
    { time: '10:38:10', level: 'ERROR', msg: 'Payment gateway timeout (Retry 1/3)' },
    { time: '10:35:05', level: 'INFO', msg: 'Scheduled backup completed' },
  ];

  const handleReset = () => {
    if (confirm("Are you sure? This will wipe all orders, users, and changes made during this demo session.")) {
      resetStore();
      toast.success("System reset to factory defaults");
      // Force reload to clear any local component state not in store
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const HealthCard = ({ title, status, ping }: { title: string, status: 'Healthy' | 'Degraded' | 'Down', ping: string }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${status === 'Healthy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          <Activity size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{status} • {ping}</p>
        </div>
      </div>
      <div className={`w-3 h-3 rounded-full ${status === 'Healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Control</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Last updated: Just now</span>
          <Button size="sm" variant="outline" className="gap-2" onClick={() => window.location.reload()}>
            <Activity size={16} /> Refresh
          </Button>
        </div>
      </div>

      {/* Health Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthCard title="API Gateway" status="Healthy" ping="24ms" />
        <HealthCard title="Primary Database" status="Healthy" ping="12ms" />
        <HealthCard title="File Storage" status="Degraded" ping="150ms" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* System Logs */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
          <div className="bg-gray-800 px-6 py-4 flex items-center gap-2 border-b border-gray-700">
            <Terminal size={18} className="text-gray-400" />
            <h3 className="font-bold text-gray-200 text-sm">Live System Logs</h3>
          </div>
          <div className="p-6 font-mono text-sm space-y-3 h-[300px] overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-gray-500">{log.time}</span>
                <span className={`font-bold ${
                  log.level === 'INFO' ? 'text-blue-400' : 
                  log.level === 'WARN' ? 'text-yellow-400' : 'text-red-500'
                }`}>{log.level}</span>
                <span className="text-gray-300">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <Shield className="text-brand-500" />
            <h3 className="font-bold text-gray-900 text-lg">Security & Maintenance</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Maintenance Mode</p>
                <p className="text-sm text-gray-500">Disable access for all non-admin users.</p>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${maintenanceMode ? 'bg-brand-500' : 'bg-gray-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${maintenanceMode ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Force SSL</p>
                <p className="text-sm text-gray-500">Redirect all HTTP requests to HTTPS.</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                 <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-7"></div>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-xl border border-red-100 mt-4 space-y-4">
              <div className="flex items-start gap-3 border-b border-red-100 pb-4">
                 <RefreshCw className="text-red-500 shrink-0 mt-1" size={20} />
                 <div>
                   <h4 className="font-bold text-red-700 text-sm">Factory Reset</h4>
                   <p className="text-xs text-red-600 mb-2">Reset database to initial demo state. All created orders and users will be lost.</p>
                   <Button size="sm" variant="outline" className="bg-white text-red-600 border-red-200 hover:bg-red-50" onClick={handleReset}>Reset Database</Button>
                 </div>
              </div>

              <div className="flex items-start gap-3">
                 <Power className="text-red-500 shrink-0 mt-1" size={20} />
                 <div>
                   <h4 className="font-bold text-red-700 text-sm">Emergency Shutdown</h4>
                   <p className="text-xs text-red-600 mb-2">Stop all active orders and disable the platform immediately.</p>
                   <Button size="sm" className="bg-red-600 hover:bg-red-700 border-none text-white w-full">Initiate Shutdown</Button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemPage;
