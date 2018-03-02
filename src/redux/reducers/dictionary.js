import * as Action from "../Action/action";
let initState = {
        dictionary:null,
        loading:true
};

export default function dictionary(state=initState,action){
                    if(!state) return {dictionary:null,
                        loading:true};
                    switch (action.type){
                        case Action.SYSCODE:
                            return {
                                dictionary:action.payload,
                                loading:false
                            };
                        default : return state
                    }
}
