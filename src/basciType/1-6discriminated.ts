{
    /***
     * discriminate(차별하다)란 ?
     *  - 현재 타입 2개(SuccessSate, FailState)를 
     *    한개의 타입(LoginSate)으로 합쳐 사용중인데
     * 
     *  - 여기서 구분하기 쉽게 각각의 타입에 같은 Key값(result)을 주고 
     *    해당 Key의 Value값으로 구분하여 사용이 가능하다/
     */
    type SuccessState = {
        result : "success";
        response : {
            body : string;
        }
    };

    type FailSate = {
        result : "fail";
        reason : string;
    }

    type LoginSate = SuccessState | FailSate;

    function login(): LoginSate{
        return {
            result : "success",
            response : {
                body : "Success!!"
            },
        }
    }

    function printLoginState(state : LoginSate){
        console.log(state.result === "success" ? state.response.body : state.reason);
    }

}