import { useState } from 'react';
import { Laptop, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import { removeDevice } from '../features/security/securitySlice';
import DeviceCard from '../components/devices/DeviceCard';
import ConfirmDialog from '../components/common/ConfirmDialog';

// Devices are mock records stored in Redux and persisted to localStorage.
export default function DeviceManagement() {
  const dispatch = useAppDispatch();
  const devices = useAppSelector((state) => state.security.devices);
  const [selectedId, setSelectedId] = useState(null);
  const selectedDevice = devices.find((device) => device.id === selectedId);
  const confirmRemove = () => { if (selectedId) { dispatch(removeDevice(selectedId)); toast.success('Demo device removed.'); } setSelectedId(null); };
  return <div className="page-stack"><section className="page-intro"><p className="eyebrow">DEVICE ACCESS</p><h2>Device management</h2><p className="muted">Review devices listed for this demo account.</p></section><section className="notice-card"><div className="notice-icon"><ShieldCheck size={20} /></div><div><strong>Keep track of your devices</strong><p>Remove devices you no longer recognize. This demo does not revoke access on a real device.</p></div></section><section className="panel"><div className="panel-heading"><div className="heading-with-icon"><div className="setting-icon blue"><Laptop size={20} /></div><div><h3>Recognized devices</h3><p>{devices.length} device records</p></div></div></div><div className="device-list">{devices.map((device) => <DeviceCard key={device.id} device={device} onRemove={setSelectedId} />)}{devices.length === 0 && <div className="empty-state">No demo devices remain.</div>}</div></section><ConfirmDialog open={Boolean(selectedDevice)} title="Remove device?" message={`Remove ${selectedDevice?.name || 'this device'} from the demo list?`} onCancel={() => setSelectedId(null)} onConfirm={confirmRemove} /></div>;
}
