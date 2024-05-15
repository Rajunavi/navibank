import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";


//Generate pending, fulfilled, and rejected action types
export const getCustomers = createAsyncThunk('customers/getCustomers', () => {
    return axiosInstance.get('getAllAccounts').then(response => response.data)
    
})

const initialState = {
    loading: false,
    customers: [],
    error: null,
}


const customerSlice = createSlice({
    name:'customers',
    initialState,
    extraReducers: builder => {
        builder.addCase(getCustomers.pending, state => {
            state.loading = true;
        });
        builder.addCase(getCustomers.fulfilled, (state, action) => {
            state.customers = action.payload?.map((item) => ({
                name: `${item.firstName} ${item.lastName}`,
                email: item.email,
                mobile:item.mobileNo,
                imageUrl:
                  `http://localhost:8086/api/bank/account/profileImage/${item.id}`,
                
              }));
            state.loading = false,
            state.error = null
        });
        builder.addCase(getCustomers.rejected, (state,  action) => {
            state.loading =false,
            state.error = action.payload
        })
    }
});

export default customerSlice.reducer;
// export const {loadCustomers} = customerReducer.actions