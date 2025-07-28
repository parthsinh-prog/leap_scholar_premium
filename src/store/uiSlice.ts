import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Region = 'europe' | 'usa';
export type EuropeCountry = 'germany' | 'france' | 'rest-of-europe';
export type USProgram = 'ug' | 'mba' | 'ms';
export type CountryOrProgram = EuropeCountry | USProgram;

interface UIState {
  region: Region;
  countryOrProgram: CountryOrProgram;
  isSidebarOpen: boolean;
  isModalOpen: boolean;
}

const initialState: UIState = {
  region: 'europe',
  countryOrProgram: 'germany',
  isSidebarOpen: false,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<Region>) {
      state.region = action.payload;
      // Reset country/program on region change
      state.countryOrProgram = action.payload === 'europe' ? 'germany' : 'ug';
    },
    setCountryOrProgram(state, action: PayloadAction<CountryOrProgram>) {
      state.countryOrProgram = action.payload;
    },
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const {
  setRegion,
  setCountryOrProgram,
  openSidebar,
  closeSidebar,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer; 