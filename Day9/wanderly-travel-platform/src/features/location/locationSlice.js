import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: null,
  mapCenter: {
    lat: 31.5204,
    lng: 74.3587,
  },
  zoom: 5,
};

const locationSlice = createSlice({
  name: "location",
  initialState,

  reducers: {
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;

      if (
        typeof action.payload?.lat === "number" &&
        typeof action.payload?.lng === "number"
      ) {
        state.mapCenter = {
          lat: action.payload.lat,
          lng: action.payload.lng,
        };

        state.zoom = 13;
      }
    },

    setMapView(state, action) {
      state.mapCenter = action.payload.center;
      state.zoom = action.payload.zoom;
    },

    clearSelectedLocation(state) {
      state.selectedLocation = null;
    },
  },
});

export const {
  setSelectedLocation,
  setMapView,
  clearSelectedLocation,
} = locationSlice.actions;

export default locationSlice.reducer;