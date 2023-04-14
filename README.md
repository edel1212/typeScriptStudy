# TypeScript Study

## 설치
- nodejs를 설치해준다.
  - npm을 사용하여 typesceipt를 설치하기 위함.
- npm을 사용하여 타입스크립트를 설치해준다. [ -g를 사용하여 글로벌하게 설치함. 선택 사항 ]
  - >npm install -g typescript 
- 설치가 완료 확인.
  - 타입스크립트 명령어이다.
    - > tsc
  - 버전 확인
    - > tsc -v
  - node만을 사용하여 typescript 확인
    - ts-node 설치가 필요하다. 
      - > npm install ts-node -g
    - 설치가 완료돠면  js파일로 변환 없이도 console에서 확인이 가능
      - > ts-node 파일명.ts

<hr/>

## 참고 하여 공부하면 좋은 사이트
- https://www.typescriptlang.org/

<hr/>

## Typescript파일 컴파일 방법
- 1 . tsc 파일명.ts
  - 같은 경로에 js파일로 컴파일 해줌 
- 2 . tsc -w 파일명.ts 
  - 변화가 있을경우 감지하여 자동으로 컴파일해 줌\
  
 <hr/>

## Type별 사용 예시
```typescript
// TypeScript 

{
    /** Javascript 에서 사용되는 타입
        Primitive : number,  string, boolean, bigint, symbol, null, undefined
        Object    : function, array ... [ 원시타입을 제외한 모든 타입 ]
    */

    /** 👉 number */
    const num:number = 11000;
    //const num2:number = "Hello~?"; ❌ Error

    /** 👉 string */
    const str:string = "Hello!";

    /** 👉 boolean */
    const bool:boolean = false;

    /**
        💬 undefined 와 null은 개념이 다르다 완전 다르다고 봐도 된다.
          - undefined : 비어있는지 비어있지 않은지 확실하지 않은 상태
          - null      : 확실하게 null인 상태

       👎 두개의 타입은 단독으로 사용하지 않음
    */
    /** 👉 undefined */
    let undefinedVal:undefined;     // 👎
    //undefinedVal = "에러가 납니다.. undefined만 들어갈 수 있음"; ❌ Error
    let age:number | undefined; // 숫자 또는 undefined가 가능하게 끔 사용함
    age = 123;
    age = undefined;
    function find():number | undefined{
        return undefined;
    }

    /** 👉 null */
    let person: null;           // 👎
    //person = "Hello"  ❌ Error
    let person2: string| null;
    person2 = "Hello!";
    person2 = null;

    /** 👉 unknown(👎)   [ 해당 타입도 잘사용하지 않음 어떤것이든 들어감 ] */   
    let notSure : unknown;
    notSure = "Hello";
    notSure = true;
    notSure = 123;

    /** 👉 any(👎) [ unknown과 비슷함 ] */
    let anything : any;
    anything = "Hello";
    anything = 123;
    anything = true;

    /** 👉 void */
    function print() : void{
        console.log("Hello");
    }

    /** 👉 never [ 반환 값 ❌ || new Error() || 끝나지 않음 ] */
    function  throwError(message:string): never{
        //throw new Error(message);
        while(true){};
    }

    /** 👉 object [원시타입을 제외한 모든 타입을 받을 수 있다. 타입이 명확이 저징되어있지 않으므로 사용 비추천👎]  */
    let obj:object;
    function acceptSomeObject(obj:object): void{ };
    acceptSomeObject({name : "yoo"});
    acceptSomeObject({animal : "dog"});
}
```

<hr/>

## Function 사용 예시
```typescript
// TypeScript

{
    /** javascript 👎 */
    /**
    function jsAdd(num1, num2){
        return num1 + num2;
    }
    **/

    /** typescript 👍 */
    function tsAdd(num1 :number, num2 : number): number{
        return num1 + num2;
    }
}

{
    /** javascript 👎 */
    /* function jsFetchNum(id){
        //.. Code...
        return new Promise((resolve, reject)=>{
            resolve(100);
        })
    } */

    /** typescript 👍 */
    //function tsFetchNum(id :string): Promise{   <= ☠️ 내가한 오답 반환 제네레릭이 필요하다.
    function tsFetchNum(id :string): Promise<number>{
        return new Promise((resolve, reject)=>{
            return resolve(100);
        });
    }
}

{
    /** 💬 Parameter ReadOnly */
    const strArr:string[] = ["가","나"];
    // ReadOnly 사용 ❌
    function noReadOnlyVer(strArr : string[]) : void{
        strArr.push("다");
        console.log(strArr);
    }
    noReadOnlyVer(strArr);

    // ReadOnly 사용
    function readOnlyVer(strArr : readonly string[]) : void{
        //strArr.push("다");  // ☠️ Error 발생
        console.log(strArr);
    }
    noReadOnlyVer(strArr);
}

{
    /**
        Javascript, Typescript 둘다 활용 가능한 유용한 기능
    **/
    /** 💬 Optional Parameter */
    // Optional Parameter 사용 ❌
    function printUserNameBadVer(firstName :string, lastName: string): void{
        console.log(firstName);
        console.log(lastName);
    }
    printUserNameBadVer("yoo", "jh");
    //printUserNameBadVer("yoo"); ☠️ parameter 부족으로 Error

    // Optional Parameter 사용 🆗
    function printUserNameGoodVer(firstName :string, lastName?: string): void{
        console.log(firstName);
        console.log(lastName); // 값이 없을 경우 undefined로 출력 된다.
    }
    printUserNameGoodVer("yoo");

    //////////////////////////////////////////////

    /** 💬 Default Parameter */
    function printMessage(msg : string = "디폴트 메세지입니다 !!"): void{
        console.log(msg);
    }
    printMessage();             // 디폴트 메세지입니다 !!
    //printMessage(null);       //Argument of type 'null' is not assignable to parameter of type 'string | undefined'.
    printMessage(undefined);    // 디폴트 메세지입니다 !!
    printMessage("Hello!!");    // Hello!!

    //////////////////////////////////////////////

    /** 💬 Rest Parameter */
    //function getRestParameter(args:...): void{        // ☠️ 내가한 오답...
    function getRestParameter(...args:number[]): void{
        console.log(args);
    }
    getRestParameter(1,2,3,4,5);
}


```

<hr/>

## Array 사용 예시
```typescript
// TypeScript

{
    /** Array */
    const fruits :string[] = ["apple", "banana"];
    const scores :Array<number> = [1,2,3,4,5];

    /** Tuple
     * - 문자열, 숫자 섞어서 받을 수 있음
     */    
    let student : [string, number]; 
    student = ['yoo', 100];
    // index로 접근하는것은 가독성이 좋지 않음 👎
    console.log(student[0]); // yoo
    console.log(student[1]); // 100

    // 아래의 방법을 사용하면 가독성이 좋아짐 👍
    const [name, age] = student;
    console.log(name);
    console.log(age);
}
```

<hr/>

## Alias 사용 예시
```typescript
// TypeScript

{
    /**
     * Type Aliases
     *  - 내가 타입을 지정하여 생성 사용하는 것
     */
    type Text = string;
    const name : Text = "yoo";
    const addr : Text = "Seoul";
    
    type Num = number;
    const age : Num = 2000;

    type Student = {
        name : string;
        age : number;
    }
    const student : Student = { name : "yoo", age : 100};
    console.log(student);

    ///////////////////////////////////////////////////////
    
    /**
     * Literal Types
     *  - 내가 지정한 타입만 사용 가능하게 함
     */
    type yooType = "yoo";
    //const kim : yooType = "kim";  ❌ Error  yoo만 지정 가능
    const yoo : yooType = "yoo";

    type onlyTrue = true;
    //const iWantFalse : onlyTrue = false; ❌ Error  True만 지정 가능

}
```

<hr/>

## Union 사용 예시
**- 👉 Intersection과 반대 개념**
```typescript
// TypeScript

{
    /**
     * Union Types
     *  - OR (또는)으로 생각하면 쉽다.
     */
    type Direction = "left" | "right" | "up" | "down"; // 👉 4개중 하나만 가능 
    function movie(mv : Direction):void{
        console.log(mv);
    }
    movie("up");
    //movie("double up");  ❌ Error

    type TileSize = 1 | 2 | 3;
    //const tile : TileSize = 5;   ❌ Error
    const tile : TileSize = 1;
    
}
```

<hr/>

## IntersectionType 사용 예시  
**- 👉 Union과 반대 개념**
```typescript
// TypeScript

{
    /***
     * Intersection Type : &&(AND)로 생각하면 된다, Union과 반대
     */
    type Student = {
        name : string;
        score : number;
    }

    type Worker = {
        empolyeeId : number;
        work : () => void;
    }

    /** 
     * 👉 person 인자값의 타입은 현재 2개로 지정함 
     *    - 따라서 두가지 타입의 모든 정보에 접근이 가능함
     * */
    function internWork(person : Student & Worker){
        // Worker 정보
        console.log(person.empolyeeId);
        console.log(person.work);
        
        // Student 정보
        console.log(person.name);
        console.log(person.score);
    }

    /**
     * 💬 단 그렇기에 넘기는 파라미터값은 
     *    - 두가지 타입이 갖는 모든 값을 넣어줘야한다!
     * 
     * ☠️ 부족하면 컴파일 Error가 발생한다.
     *   -Error Msg : Argument of type '{ name: string; score: number; }' is not 
     *               assignable to parameter of type 'Student & Worker'.
     *               Type '{ name: string; score: number; }' is missing the following
     *               properties from type 'Worker': empolyeeId, work
     */
    internWork({
        name : "yoo",
        score : 100,
        empolyeeId : 1,
        work : ()=> {}
    });
}
```

<hr/>

## Discriminate 사용 예시
```typescript
// TypeScript

{
    /***
    * discriminate(차별하다)란 ?
    *  - 현재 타입 2개(SuccessSate, FailState)를
    *    한개의 타입(LoginSate)으로 합쳐 사용중인데
    *
    *  - 여기서 구분하기 쉽게 각각의 타입에 같은 Key값(result)을 주고
    *    해당 Key의 Value값으로 구분하여 사용이 가능하다/
    */
    // 성공
    type SuccessState = {
      result : "success";
      response : {
        body : string;
      }
    };
    
    //실패
    type FailSate = {
        result : "fail";
        reason : string;
    }
    
    //두개를 하나의 타입으로 만듬
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
```

<hr/>

## Enum 사용 예시
**- 👉 Union을 사용하자**
```typescript
// TypeScript

{
    /***
     * Enum 아래와 같이 사용할수 있으나
     * 👎 비추천함 값을 유지하지 못함
     *    ex ) 
     *         let test: Days;
     *         test = Days.Friday;  // 이상없음
      *        test = 100           // 이상없음
      * 
      * 👍  따라서 같은 기능을하는 Union을 사용해주자!!!
      * 
     */
    enum Days {
        Monday,     //0
        Tuesday,    //1
        Wedensday,  //2
        Thursday,   //3
        Friday,     //4
        Satarday    //5
    }
    console.log(Days.Friday);

    // 값을 지정 - 숫자 [ 자동으로 추론하여 값을 정해줌 ]
    enum DaysVerNum {
        Monday = 1,     //1
        Tuesday,        //2
        Wedensday,      //3
        Thursday,       //4
        Friday,         //5
        Satarday        //6
    }
    console.log(DaysVerNum.Friday);

    // 값을 지정 - 문자열 [ 자동으로 추론하여 값을 정하지 못함 ❌ ]
    enum DaysVerStr {
        Monday      = "Mon",     
        Tuesday     = "Tue",        
        Wedensday   = "Wen",        
        Thursday    = "Thu",       
        Friday      = "Fri",                
        Satarday    = "Sat",                   
    }
    console.log(DaysVerStr.Friday);

}
```

<hr/>

## Assertions 사용 예시
**- 👉 타입을 확신할 경우 지정**
```typescript
// TypeScript

{
    /**
     * Type Assertion 
     * - 반환 대상의 타입을 지정하는것이 가능하다.
     * - 단 별로 좋은 방식은 아니나 사용해야 할때가 있다
     * - 꼭 타입이 확실한 경우에만 사용해주자.
     * 
     * 👉 방법 1 : ? as Type   - "Type as"
     *    방법 2 : <Type> ?    - "<Type>"
     *    방법 3 : ?!          - "!"
     */
    // 해당 code는 javasript code란
    // 가정하에 반환 타입이 무조건 any이다.
    function jsStrFunction(): any{
        return "Hello!!";
    }
    const result = jsStrFunction();             // "Hello!!"
    console.log(result.length);                 // 사용은 가능하나 자동완성이 안됨,
    console.log((result as string).length);     // 형변환으로 가용 가능 
    console.log((<string>result).length);       // 형변환으로 가용 가능

    function findNumbers():number[] | undefined{
        return undefined;
    }
    const numbers = findNumbers();  // 숫자 배열일수도 있고 undefined일수도 있음
    numbers!.push(2);               // 무조건 배열인것을 확신할때 "!"를 사용할 수 있음

}
```

<hr/>

## OOP(객체지향 프로그래밍) - Class 란 ?
**- 👉 절차지향형 방식 예시**
```typescript
// TypeScript - 절차지향 방식 구현

{
    /***
     *  절차지향 방식으로 구현
     */

    // 반환 타입
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }

    // 커피 제작에 필요한양의 커피콩 그람
    const BEANS_GRAMM_PER_SHOT : number = 7;

    // 초기 커피 콩 그람수
    let coffeBeans :number = 0;

    function makeCoffe(shots: number):CoffeCup{

        if(coffeBeans < shots * BEANS_GRAMM_PER_SHOT){
            throw new Error("커피콩의 양이 부족합니다.")
        }

        // 샷의 개수만큼 커피콩 소모
        coffeBeans -= shots * BEANS_GRAMM_PER_SHOT;

        return {
            //shots : shots,  // ⭐️ Key와 Value의 이름이 같을 경우 한개로 생략 가능.
            shots,
            hasMilik : false
        }
    }   

    // 3회 가능하도록 충전 (7*3 = 21)
    coffeBeans = BEANS_GRAMM_PER_SHOT * 3;

    console.log(makeCoffe(2));

}
```

**- 👉 객체지향형 방식 예시**
```typescript
// TypeScript - 객체지향 방식 사용

{
    /***
     *  Class를 사용
     */

    // 반환 타입
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }

    /***
     *  💬 Class로 변환하면서 변경된 점
     *  - 1 . let, const, funciton을 사용하지 않는다.
     *  - 2 . Class내 맴버 변수에 접근할 때에는 this.변수명을 사용해주자.
     *  - 3 . 생성자를 통해 인스턴스 생성시 값일 지정할수 있다.
     *        - 내가 생성 하지 않을 경우 default생성자가 만들어짐
     *          - constructor(){}
     *  -  4 . 맴버변수의 값을 변화시키지 않고 싶다면 private로 설정해주자
     *  -  5 . static을 사용하면 Class Level로 해당 변수를 사용할수있다.
     *        - 같은 Class에서는 해당 값을 공유함
     *        - 불필요한 메모리 낭비를 막을 수있음
     *        - ✅ Class Level로 변경 되었기에 해당값은 this.변수명 접근 불가능 ❌
     *            : this.BEANS_GRAMM_PER_SHOT ==>> CoffeMaker.BEANS_GRAMM_PER_SHOT
     *            - Class.맴버 변수명으로 전달 받아야한다.
     */
    class CoffeMaker{
        // 커피 제작에 필요한양의 커피콩 그람
        private static BEANS_GRAMM_PER_SHOT : number = 7; // ⭐️ Class Level

        // 초기 커피 콩 그람수
        coffeBeans :number = 0;                           // ⭐️ Instance(Object) Level

        // 생성자를 통한 coffeBean 추가
        constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        };

        static makeCoffeMachineVerStatic(coffeBean : number){
            return new CoffeMaker(coffeBean);
        }

        makeCoffe(shots: number):CoffeCup{

            if(this.coffeBeans < shots * CoffeMaker.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }

            // 샷의 개수만큼 커피콩 소모
            this.coffeBeans -= shots * CoffeMaker.BEANS_GRAMM_PER_SHOT;

            return {
                //shots : shots,  // ⭐️ Key와 Value의 이름이 같을 경우 한개로 생략 가능.
                shots,
                hasMilik : false
            }
        }   

        
    }

    // 인스턴스 생성
    const coffeMaker = new CoffeMaker(32);
    console.log(coffeMaker);
    console.log(coffeMaker.makeCoffe(2));

    // static 메서드를 사요한 인스턴스 생성
    const cofferMakerVerStatic = CoffeMaker.makeCoffeMachineVerStatic(50);
    console.log(cofferMakerVerStatic);
    console.log(cofferMakerVerStatic.makeCoffe(2));

}
```

<hr/>

## OOP(객체지향 프로그래밍) - 캡슐화 란 ?
```typescript
// TypeScript - 캡슐화

{
    /***
     *  Encapsulation(캡슐화)
     * - public     - 외부 접근 가능
     * - private    - 내부에서만 접근가능
     * - protected  - 상속받은 대상만 접근 가능
     * 접근 방식을 설정 값의 변화를 막는것
     */

    // 반환 타입
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }

    class CoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        // 생성매서드를 막아 외부 생성을 방지
        private constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        };

        // static Method를 통하여 객체 생성
        public static makeInstance(coffeBeans : number){
            return new CoffeMaker(coffeBeans);
        }

        /**
         * coffeBeans변수의 접근제어자가 private 이므로 
         * 내부에서 값을 수정할 수 있게 해줘야한다. 
         */
        public fillCoffeeBeans(coffeBeans : number){
            if(coffeBeans < 0) throw new Error("잘못된 값입니다.");
            this.coffeBeans += coffeBeans;
        }
        
        public makeCoffe(shots: number):CoffeCup{

            if(this.coffeBeans < shots * CoffeMaker.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }

            // 샷의 개수만큼 커피콩 소모
            this.coffeBeans -= shots * CoffeMaker.BEANS_GRAMM_PER_SHOT;

            return {                
                shots,
                hasMilik : false
            }
        }   
    }
    
    //const cunstructorIsPrivate = new CoffeMaker(); ❌ 만들수가 없음 
    const uesdStaticInstance = CoffeMaker.makeInstance(30);
    console.log(uesdStaticInstance);
    // coffeeBeans 외부접근 불가능으로 내부 메서드 fillCoffeeBeans() 사용
    uesdStaticInstance.fillCoffeeBeans(200); 
    console.log(uesdStaticInstance);
}
```

<hr/>

## OOP(객체지향 프로그래밍) - getter, setter ?
```typescript
// TypeScript - getter, setter

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
```