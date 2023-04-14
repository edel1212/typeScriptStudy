{
    class User{
        firstName : string;
        lastName  : string;
        fullName  : string;
        constructor(firstName:string , lastName : string){
            this.firstName = firstName;
            this.lastName  = lastName;
            this.fullName  = this.firstName + this.lastName;
        }
    }    

    const user = new User("yoo","jh");
    console.log(user.fullName);
    user.firstName = "black";
    console.log(user.firstName); // "black"
    // 👉 바뀌지 않고 나옴
    console.log(user.fullName);  // yoojh 
    /**
     * 당연히 fullName의 지정방식은 생성자메서드에서 지정했기때문에
     * fristName을 바꾼다고 변경되지 않는다.
     */
    user.fullName = "이건 바뀐다." // fullName 자체를 바꾸는건 가능
    console.log(user.fullName);


    /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////

    /***
     *  개선 방안 접근제어자 와  getter, settera만으로
     *  맴버 변수에 접근 가능
     */
    class UserVerGetSet{
      
        /***
         * ⭐️ 생성 매서드에 접근 제어자를 쓰면 아래의
         *    맴버변수 선언은 생략이 가능하다.
         *    - ☠️단 접근제어자를 생략하면 Error
         */
        //private firstName : string;
        //private lastName  : string;
        
        get fullName():string{
            return this.firstName + this.lastName;
        }
        
        set setFirstName(firstName:string){
            this.firstName = firstName;            
        }
        set setLastName(lastName:string){
            this.lastName = lastName;            
        }

        //constructor(firstName:string , lastName : string){  ❌ 접근제어자는 필수이다.
        constructor(private firstName:string , private lastName : string){
            this.firstName = firstName;
            this.lastName  = lastName;            
        }
    }

    const userVerGetSet = new UserVerGetSet("유", "정호");
    console.log(userVerGetSet.fullName);
    //userVerGetSet.setFirstName("흑곰"); ❌ set은 메서드처럼 보이지만 사용방식이 다르다
    userVerGetSet.setFirstName = "흑곰";
    console.log(userVerGetSet.fullName);

}