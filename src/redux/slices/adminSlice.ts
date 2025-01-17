import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  companyName: string;
  companyAddress: string;
  companyContact: string;
  phoneNumber: string;
  email: string;
}

interface AdminState {
  admins: Admin[];
}

const initialState: AdminState = {
  admins: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin(state, action: PayloadAction<Admin>) {
      state.admins.push(action.payload);
    },
  },
});

export const { addAdmin } = adminSlice.actions;
export default adminSlice.reducer;
