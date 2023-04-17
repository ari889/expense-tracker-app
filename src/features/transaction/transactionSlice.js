import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {}
}

// async thunk
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransactions();
    return transactions;
});
export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
});
export const changeTransactions = createAsyncThunk('transaction/changeTransaction', async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
});
export const removeTransactions = createAsyncThunk('transaction/removeTransaction', async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
});

// create slice
const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state, action) => {
            state.editing = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = action.payload;
        }).addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
            state.transactions = [];
        });
        builder.addCase(createTransaction.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(createTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions.push(action.payload);
        }).addCase(createTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        });
        builder.addCase(changeTransactions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(changeTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;

            const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id);
            state.transactions[indexToUpdate] = action.payload;
        }).addCase(changeTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        });
        builder.addCase(removeTransactions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(removeTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = state.transactions.filter(t => t.id !== action.meta?.arg);
        }).addCase(removeTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        });
    }
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;