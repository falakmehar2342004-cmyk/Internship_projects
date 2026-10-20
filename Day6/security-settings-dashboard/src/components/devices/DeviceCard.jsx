import { Laptop, Smartphone, MapPin, Clock, Trash2 } from 'lucide-react';
import Button from '../common/Button';

// Render one known device; the current device cannot be removed from this demo UI.
export default function DeviceCard({ device, onRemove }) {
  const DeviceIcon = device.icon === 'smartphone' ? Smartphone : Laptop;
  return <article className="device-card"><div className="device-icon"><DeviceIcon size={23} /></div><div className="device-copy"><div className="device-title"><strong>{device.name}</strong>{device.current && <span className="status-pill success">Current device</span>}</div><p><MapPin size={14} /> {device.location}</p><p><Clock size={14} /> {device.lastActive}</p></div>{!device.current && <Button variant="ghost" onClick={() => onRemove(device.id)}><Trash2 size={16} /> Remove</Button>}</article>;
}
