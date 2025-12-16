import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CryptoToCashState {
  currentStep: number;
  conversion: {
    youPayAmount: string;
    youPayCurrency: string;
    youReceiveAmount: string;
    youReceiveCurrency: string;
    youPayFrom: string;
  };
  recipient: {
    bank: string;
    accountNumber: string;
    accountName: string;
    email: string;
    phoneNumber: string;
  };
}

const initialState: CryptoToCashState = {
  currentStep: 1,
  conversion: {
    youPayAmount: "0.00",
    youPayCurrency: "Ethereum",
    youReceiveAmount: "0.00",
    youReceiveCurrency: "Nigerian Naira",
    youPayFrom: "",
  },
  recipient: {
    bank: "",
    accountNumber: "",
    accountName: "",
    email: "",
    phoneNumber: "",
  },
};

const cryptoToCashSlice = createSlice({
  name: "cryptoToCash",
  initialState,
  reducers: {
    //Set current step
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },

    //replace entire conversion object
    setConversion(
      state,
      action: PayloadAction<CryptoToCashState["conversion"]>
    ) {
      state.conversion = action.payload;
    },

    //update one or more recipient fields at once
    setRecipientField(
      state,
      action: PayloadAction<Partial<CryptoToCashState["recipient"]>>
    ) {
      state.recipient = { ...state.recipient, ...action.payload };
    },

    //Reset everything
    resetState() {
      return initialState;
    },
  },
});

export const { setCurrentStep, setConversion, setRecipientField, resetState } =
  cryptoToCashSlice.actions;

export default cryptoToCashSlice.reducer;
