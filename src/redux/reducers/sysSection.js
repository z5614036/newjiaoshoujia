import * as Action from "../Action/action";
let initState = {
    sysSection:null
};

export default function sysSection(state=initState,action){
    if(!state) return {sysSection:null};
    switch (action.type){
        case Action.SYSSECTION:
            return {
                sysSection:action.payload
            };
        default : return state
    }
}
