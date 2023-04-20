/**
 * Exception Handling
 * - 기본적으로 에러를 처리 해줄수 있는곳에서 처리해주자
 * - 애매하게 처리 불가능한 곳에서 try - catch를 해버리면 해결 방법이
 *   적어질 뿐만 아니라 좀더 어려워질 가능성이 있음
 */
{
    class NetworkClient{
        public tryConnect():void{
            throw new Error(`no network!!`);
        }
    }

    class UserService{
        constructor(private networkClient:NetworkClient){}

        public login():void{
            this.networkClient.tryConnect();
            // login...
        }
    }

    class App {
        constructor(private userServie:UserService){}
        public run():void{
            try {
                this.userServie.login();    
            } catch (error) {
                console.log("여기서 처리하는 방법이 더 좋은 방법이다.👍");
                // 에러 처리 로직!   
            }            
        }
    }

    

}