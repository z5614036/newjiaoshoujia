import * as Action from "../Action/action";
let initState = {
    vendor:null
};

export default function sysSection(state=initState,action){
    if(!state) return {vendor:null};
    switch (action.type){
        case Action.VENDOR:
            return {
                vendor:action.payload
            };
        default : return state
    }
}
