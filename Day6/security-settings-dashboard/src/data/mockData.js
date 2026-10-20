// Static sample data keeps this demo usable without a backend or database.
export const mockProfile = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  role: 'User',
  memberSince: 'October 2025',
};

export const mockDevices = [
  { id: 'device-1', name: 'Windows Desktop', location: 'Gujranwala, Pakistan', lastActive: 'Active now', icon: 'laptop', current: true },
  { id: 'device-2', name: 'iPhone 15', location: 'Lahore, Pakistan', lastActive: '2 hours ago', icon: 'smartphone', current: false },
  { id: 'device-3', name: 'Chrome on MacBook', location: 'Islamabad, Pakistan', lastActive: 'Yesterday', icon: 'laptop', current: false },
];

export const mockActivityLogs = [
  { id: 'log-1', action: 'Successful sign in', device: 'Windows Desktop', date: 'Today, 10:42 AM', status: 'Success', location: 'Gujranwala, Pakistan' },
  { id: 'log-2', action: 'Password settings viewed', device: 'Windows Desktop', date: 'Today, 10:35 AM', status: 'Success', location: 'Gujranwala, Pakistan' },
  { id: 'log-3', action: 'Unsuccessful sign in', device: 'Unknown browser', date: 'Yesterday, 8:12 PM', status: 'Failed', location: 'Unknown location' },
  { id: 'log-4', action: 'New device remembered', device: 'iPhone 15', date: 'Oct 16, 2026, 4:18 PM', status: 'Success', location: 'Lahore, Pakistan' },
  { id: 'log-5', action: 'Two-factor setting updated', device: 'Windows Desktop', date: 'Oct 15, 2026, 11:06 AM', status: 'Success', location: 'Gujranwala, Pakistan' },
];

export const initialSecuritySettings = {
  twoFactorEnabled: true,
  emailNotifications: true,
  loginAlerts: true,
};

export const mockUsers = [
  { id: 'usr-1001', name: 'Alex Morgan', email: 'alex@example.com', role: 'User', status: 'Active' },
  { id: 'usr-1002', name: 'Sam Taylor', email: 'sam@example.com', role: 'User', status: 'Active' },
  { id: 'usr-1003', name: 'Jordan Lee', email: 'jordan@example.com', role: 'Admin', status: 'Active' },
];
