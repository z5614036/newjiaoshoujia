
import * as Action from "../Action/action";
let initState = {
    sysArea:null
};

export default function sysArea(state=initState,action){
    if(!state) return {sysArea:null};
    switch (action.type){
        case Action.SYSAREA:
            return {
                sysArea:action.payload
            };
        default : return state
    }
}
