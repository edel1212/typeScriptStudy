{
    type LoadingState = {
        state : "loading"
    }

    type SuccessState = {
        state : "success";
        response : {
            body : string
        }
    }

    type FailState = {
        state : "fail";
        reasone : string
    }

    type ResourceLoadState = LoadingState | SuccessState | FailState;

    function  printLoginState(resourceLoadState : ResourceLoadState):void{
        switch (resourceLoadState.state) {
            case "loading":
                console.log(resourceLoadState.state);
                break;
            case "success":
                console.log(resourceLoadState.response.body);
                break;
            case "fail":
                console.log(resourceLoadState.reasone);
                break;
            default:
                break;
        }
    }

}