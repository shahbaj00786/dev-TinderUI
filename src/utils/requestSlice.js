import  {createSlice} from "@reduxjs/toolkit"

const requestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state, action)=>action.payload,
        removeRequests:(state, action) =>{
            const newArray=state.filter(req=> req._id !== action.payload)
            return newArray
        }
    }
})


export const {addRequest, removeRequests}=requestSlice.actions
export default requestSlice.reducer