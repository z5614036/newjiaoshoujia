/**
 * Created by dell on 2017/11/30.
 */
import * as Action from "../Action/action";
let initState = {
    sysOrg:null
};

export default function sysOrg(state=initState,action){
    if(!state) return {sysSection:null};
    switch (action.type){
        case Action.SYSORG:
            return {
                sysOrg:action.payload
                   };
        default : return state
    }
}
