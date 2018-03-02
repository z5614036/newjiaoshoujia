import * as Action from "../Action/action";
let initState = {
    sysRoad:null
};

export default function sysRoad(state=initState,action){
    if(!state) return {sysRoad:null,
    };
    switch (action.type){
        case Action.SYSROAD:
            return {
                sysRoad:action.payload
            };
        default : return state
    }
}
