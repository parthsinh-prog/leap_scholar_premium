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
  openFaqIndex: number | null;
}

const initialState: UIState = {
  region: 'europe',
  countryOrProgram: 'germany',
  isSidebarOpen: false,
  isModalOpen: false,
  openFaqIndex: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<Region>) {
      state.region = action.payload;
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
    setOpenFaqIndex(state, action: PayloadAction<number | null>) {
      state.openFaqIndex = action.payload;
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
  setOpenFaqIndex,
} = uiSlice.actions;

export default uiSlice.reducer; 