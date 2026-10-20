import { createSlice } from '@reduxjs/toolkit';
import { initialSecuritySettings, mockDevices } from '../../data/mockData';

// Load non-sensitive preferences from localStorage, falling back to demo defaults.
const savedSettings = (() => {
  try { return JSON.parse(localStorage.getItem('security-settings') || 'null'); }
  catch { return null; }
})();

const securitySlice = createSlice({
  name: 'security',
  initialState: {
    settings: { ...initialSecuritySettings, ...(savedSettings || {}) },
    devices: (() => {
      try { return JSON.parse(localStorage.getItem('security-devices') || 'null') || mockDevices; }
      catch { return mockDevices; }
    })(),
  },
  reducers: {
    // Update a single security preference and persist it for the next visit.
    updateSetting(state, action) {
      const { key, value } = action.payload;
      state.settings[key] = value;
      localStorage.setItem('security-settings', JSON.stringify(state.settings));
    },
    // Remove a demo device and persist the updated list locally.
    removeDevice(state, action) {
      state.devices = state.devices.filter((device) => device.id !== action.payload);
      localStorage.setItem('security-devices', JSON.stringify(state.devices));
    },
  },
});

export const { updateSetting, removeDevice } = securitySlice.actions;
export default securitySlice.reducer;
