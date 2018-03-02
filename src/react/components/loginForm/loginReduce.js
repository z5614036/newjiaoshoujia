import * as LoginAction from "./action";
const initState = {
    loginRet: -1,
    userInfo: {},
    outMsg:''
};
export default function Login(state = initState, action) {
    if(!state){
        return {
            loginRet: -1,
            userInfo: {},
            outMsg:''
        }
    }
    switch (action.type) {
        case LoginAction.LoginSuccess:
            console.log(action.payload,9999)
            return {
                ...state,
                loginRet: 1,
                userInfo: action.payload
            };
        default:
            return state;
    }
}