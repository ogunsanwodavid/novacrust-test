import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CryptoToCashState {
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
    //replace entire conversion object
    setConversion(
      state,
      action: PayloadAction<CryptoToCashState["conversion"]>
    ) {
      state.conversion = action.payload;
    },

    //update any key in recipient
    setRecipientField(
      state,
      action: PayloadAction<{
        key: keyof CryptoToCashState["recipient"];
        value: string;
      }>
    ) {
      state.recipient[action.payload.key] = action.payload.value;
    },

    //Reset everything
    resetState() {
      return initialState;
    },
  },
});

export const { setConversion, setRecipientField } = cryptoToCashSlice.actions;

export default cryptoToCashSlice.reducer;
