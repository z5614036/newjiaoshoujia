/**
 * Created by dell on 2017/11/28.
 */
import * as Action from "./action";
let initState = {
    loading:false,
    TableData:[]
};
export default function Seeing(state=initState,action){
                if(!state) return {  loading:true,
                    data:null};
                    switch (action.type){
                        case Action.SeeingSuccess:
                            return {
                                loading:false,
                                TableData:action.payload
                            };
                        case Action.SEEINGDELETE:
                             var deletesData =  state.TableData.filter((item,index)=>{return item.device_id != action.payload });
                            return {
                                ...state,
                                TableData:deletesData
                            };
                        case Action.SEEINGMASSDELETE:
                            for(var i = 0;i<action.payload.length;i++){
                                for(var j=state.TableData.length-1;j>=0;j--){
                                    if(action.payload[i]==state.TableData[j].device_id){
                                        state.TableData.splice(j,1)
                                    }
                                }
                            }
                            return {
                                ...state,
                                TableData:[...state.TableData]
                            };
                        default: return state
                    }


}