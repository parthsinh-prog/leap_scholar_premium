import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Region = 'europe' | 'usa';
export type EuropeCountry = 'germany' | 'france' | 'rest-of-europe';
export type USProgram = 'ug' | 'mba' | 'ms';
export type CountryOrProgram = EuropeCountry | USProgram;
export type MainSection = 'plans' | 'testimonials' | 'faqs';

interface UIState {
  region: Region;
  countryOrProgram: CountryOrProgram;
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  openFaqIndex: number | null;
  mainSection: MainSection;
}

const initialState: UIState = {
  region: 'europe',
  countryOrProgram: 'germany',
  isSidebarOpen: false,
  isModalOpen: false,
  openFaqIndex: null,
  mainSection: 'plans',
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
    setMainSection(state, action: PayloadAction<MainSection>) {
      state.mainSection = action.payload;
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
  setMainSection,
} = uiSlice.actions;

export default uiSlice.reducer; 