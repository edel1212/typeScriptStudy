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

<hr/>

## OOP(객체지향 프로그래밍) - 추상화 란 ?
- 외부에서 어떤 형태로, 공통적으로 어떻게 이 클래스를 이용하게 할것인가 정하는것
- 💬 쉽게 말해 보여주고싶은것만 보여주게 하는것이다.
- 추상화에는 여러가지 방법이 존재한다.
  - 인터페이스를 통해 구현 
  - 추상 클래스를 사용
  - 접근제어자를 통해 은닉

**- 👉 접근 제어자를 사용한 방식**
```typescript
// TypeScript - 접근제어자를 사용

{
    
    /****************************************************/
    /********** 접근 제어자를 사용하여 은닉하는 방식 ************/
    /****************************************************/
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }

    class CoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        private constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        };

        public static makeInstance(coffeBeans : number){
            return new CoffeMaker(coffeBeans);
        }

        /**
         * 커피콩 채움
         * @param coffeBeans 
         */
        public fillCoffeeBeans(coffeBeans : number){
            if(coffeBeans < 0) throw new Error("잘못된 값입니다.");
            this.coffeBeans += coffeBeans;
        }

        /** 
         *  Validation Chekc 및 샷의 개수만큼 커피콩 소모
         */
        private grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMaker.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMaker.BEANS_GRAMM_PER_SHOT;
        }

        /**
         * 결과 반환
         */
        private extract(shots : number){
            return {                
                shots,
                hasMilik : false
            }
        }
        
        public makeCoffe(shots: number):CoffeCup{
            this.grindBeans(shots);
            return this.extract(shots);
        }   
    }
    
    const coffee = CoffeMaker.makeInstance(100);
    /**
     * ❌ private으로 지정하여 접근 범위를 줄였다
     *    이와같이 내가 원하는 범위내에서 사용하게 끔
     *    하는것이 추상화이다.
     * */
    //coffee.grindBeans(10)  // 불러올 수 없음
    //coffee.extract(10)     // 불러올 수 없음
    coffee.makeCoffe(2);
    
    //__Eof__
}
```

**- 👉 Interface를 사용한 방식**
```typescript
// TypeScript - Interface 사용

{
    /****************************************************/
    /************* Interface를 사용하는 방식 ***************/
    /****************************************************/
  
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }
  
    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    interface CommercialCoffeeMaker{
        makeCoffe(shots: number):CoffeCup;
        fillCoffeeBeans(beabs:number):void;
        clear():void;
    }

    class CoffeMakerImpl implements IcoffeMaker,CommercialCoffeeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        private constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        }
        
        public static makeInstance(coffeBeans : number){
            return new CoffeMakerImpl(coffeBeans);
        }

        public fillCoffeeBeans(coffeBeans : number):void{
            if(coffeBeans < 0) throw new Error("잘못된 값입니다.");
            this.coffeBeans += coffeBeans;
        }

        public clear(): void {
            console.log("clean CofeeMachine");
        }

        private grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT;
        }

        private extract(shots : number){
            return {                
                shots,
                hasMilik : false
            }
        }
        
        public makeCoffe(shots: number):CoffeCup{
            this.grindBeans(shots);
            return this.extract(shots);
        }   
    }
    
    // 👉 타입이 CoffeMakerImpl로 사용
    const makerVerInterface: CoffeMakerImpl = CoffeMakerImpl.makeInstance(10);
    makerVerInterface.fillCoffeeBeans(200);
    makerVerInterface.makeCoffe(2);
    makerVerInterface.clear();

    // 👉 다형성을 사용해서 Interface를 타입으로 사용
    const makerVerPolymore: IcoffeMaker = CoffeMakerImpl.makeInstance(10);
    // makerVerPolymore.fillCoffeeBeans(200);  ❌ 사용 불가능 Interface에 선언되어 있지 않기 때문이다.
    // ✅ makerVerPolymore.makeCoffe(20);   << 에러는 없으나 런타임 에러 커피콩이 업성 ...

    // 👉 다형성 CommercialCoffeeMaker 사용 2개를 impl 시킴
    const makerVerInterface2: CommercialCoffeeMaker = CoffeMakerImpl.makeInstance(10);
    makerVerInterface2.fillCoffeeBeans(200);
    makerVerInterface2.makeCoffe(2);
    makerVerInterface2.clear();



    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    /**********************************************************/
    /************* Interface를 사용하는 방식 (응용) ****************/
    /*********************************************************/

    class AmateureBarista{
        constructor(private coffeMachine : IcoffeMaker){};
        public makeCoffee(){
            // 한가지 메서드 밖에 사용 못함 
            // IcoffeMaker - interface에서 한가지 메서드만 가지고 있기 때문
            const coffee = this.coffeMachine.makeCoffe(20);
            console.log(coffee);
        }
    }

    class ProBarista{
        constructor(private coffeMachine : CommercialCoffeeMaker){};
        public makeCoffee(){            
            // CommercialCoffeeMaker - 추상화한 메서드 사용 가능
            const coffee = this.coffeMachine.makeCoffe(20);
            console.log(coffee);
            this.coffeMachine.fillCoffeeBeans(2000);
            this.coffeMachine.clear();            
        }
    }

    // 아마추어는 커피 생성만 가능
    const amateure = new AmateureBarista(makerVerPolymore); 
    // ✅  amateure.makeCoffee();  커피 콩이 없어서 런타임 에러..

    // 프로는 전부다 가능
    const pro      = new ProBarista(makerVerInterface2);
    pro.makeCoffee();
    //__Eof__
}
```

<hr/>

## OOP(객체지향 프로그래밍) - 상속이란 ?
- 공통적인 기능을 상속하여 사용할 수 있다(코드의 재사용)
- super를 통해 부모 메서드에 접근 가능
- override를 통해 부모의 메서드를 덮어씌워 구현 할수있다.
- 공통적인 기능을 상속하여 사용할 수 있다(코드의 재사용)
- super를 통해 부모 메서드에 접근 가능
- override를 통해 부모의 메서드를 덮어씌워 구현 할수있다.
- 다형성을 사용 가능


- ✅ 주의사항
  - 부모의 생성자 메서드가 private이면 상속 자체가 불가능하다.
  - public 혹은 protected를 사용해주자.
  - 접근 제어자가 private일 경우 상속 받은 자식도 접근이 불가능하니 접근이 필요할 경우 prtected를 사용해 주자
```typescript
// TypeScript - 상속

{
    type CoffeCup = {...}

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    class CoffeMakerImpl implements IcoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        protected constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        }
        
        public static makeInstance(coffeBeans : number){
            return new CoffeMakerImpl(coffeBeans);
        }

        protected grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT;
        }

        protected extract(shots : number){
            return {                
                shots,
                hasMilik : false
            }
        }
        
        public makeCoffe(shots: number):CoffeCup{
            this.grindBeans(shots);
            return this.extract(shots);
        }   
    }
    
    class CaffeLateMachine extends CoffeMakerImpl{
        //public constructor(private coffeBeans : number){ // ❌ Error 이미 부모에서 private coffeBeans 선언 되어있자나 ..
        public constructor(coffeBeans : number, private readonly serialNumber){
            super(coffeBeans);
        };
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent = super.makeCoffe(shots);
            // 👉 스프레드 문법(Spread Syntax) 사용
            return {...coffeParent,
            hasMilik : true };
        } 
    }

    
    const caffeLateMachine : CaffeLateMachine = new CaffeLateMachine(200, "SSKXOSKWEMXIVO");
    console.log(caffeLateMachine);
    console.log(caffeLateMachine.makeCoffe(3));
    
    //__Eof__
}
```

<hr/>

## OOP(객체지향 프로그래밍) - 다형성이란 ?

```typescript
// TypeScript - 다형성

{
    /**
     * Polymorphism 다형성이란?
     * - 상속을 받은 부모 또는 구현되어 있는 인터페이스의 타입으로 선언이 가능하여 확장 
     *   구현이 가능한것
     *  */
    type CoffeCup = {
        shots : number;
        hasMilik? : boolean;
        hasSugar? : boolean;
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    class CoffeMakerImpl implements IcoffeMaker{
       //... code ...
    }
    
    /**
     * 우유 추가 기능
     *  */ 
    class CaffeLateMachine extends CoffeMakerImpl{
        //public constructor(private coffeBeans : number){ // ❌ Error 이미 부모에서 private coffeBeans 선언 되어있자나 ..
        public constructor(coffeBeans : number, private readonly serialNumber){
            super(coffeBeans);
        };
        private steamMilk():void{
            console.log("Steam Milk")
        }
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent = super.makeCoffe(shots);
            // 👉 스프레드 문법(Spread Syntax) 사용
            return {...coffeParent,
            hasMilik : true };
        } 
    }

    /**
     * 설탕 추가 기능
     *  */ 
    class SweetCateLateMachine extends CoffeMakerImpl{
        /**
          👉 추가적으로 생성 변수가 없을경우 생략이 가능하나
              웬만하면 작성해주자! 가독성이 좋음 
        */
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent = super.makeCoffe(shots);
            return {...coffeParent,                
                hasSugar : true
            };
        } 
    }

    
    /***
     * 다형성 테스트
     *  - 해당 Class의 최고 부모는 CaffeMakerImpl이다
     *  - 해당 최고 부모는 IcoffeMaker를 Implments하고있다
     *  - ✅ 그러므로 IcoffeMaker를 타입으로 선언이 가능하다!!
     */
    const coffeeMachineArr:IcoffeMaker[] = [
        new CoffeMakerImpl(20)
        , new CaffeLateMachine(20, "serialNumber...")
        , new SweetCateLateMachine(20)
    ];
    
    //__Eof__
}
```

<hr/>

## OOP(객체지향 프로그래밍) - (Composition)구성 방식이란 ?  
### - 👎 좋은 방법이 아니다. - Interface와 비교를 위한 예시

- 필요한것들을 하나하나 구성하여 조립하는 것이라 생각하면 좋다.
- 필요한 구성을 나눠서 생성메서드에 넣어 사용하는것은 Dependency Injection 한다.


- ✅ 정보 : TypeScript도 Java와 같이 단일 상속만 가능하다.


- 💬 단점 : 결합도가 높아진다.
  - Class 와 Class간의 연결은 어쩔수 없이 결합도가 높아질 수 밖에 없다.
```typescript

{
   
    type CoffeCup = {
        shots : number;
        hasMilik? : boolean;
        hasSugar? : boolean;
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    class CoffeMakerImpl implements IcoffeMaker{
       // ... code...
    }
    
    /////////////////////////////////////////////////////////////

    /*** 필요한 기능만을 따로 때내어서 class화 시켜버림 */

    // 우유를 스팀하는 기능
    class CheapMilkSteamer{        
        private steamMilk(){
            console.log("Steaming some milk.....");
        }
        public makeMilk(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,
                hasMilik : true,
            }
        }
    }

    // 설탕을 추가하는 기능
    class AutomaticSugarMixer{
        private addSugar(){
            console.log("Add Sugar.....");
        }
        public makeSugar(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,
                hasSugar : true,
            }
        }
    }

    /////////////////////////////////////////////////////////////

    class CaffeLateMachine extends CoffeMakerImpl{
        public constructor(coffeBeans : number
                            , private readonly serialNumber : string
                            // 👉 필요기능을 분리해 놓은 CheapMilkSteamer을 사용
                            , private milkeSteamer : CheapMilkSteamer){
            super(coffeBeans);
        };
        
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent:CoffeCup = super.makeCoffe(shots);        
            return this.milkeSteamer.makeMilk(coffeParent);
        } 
    }

    class SweetCateLateMachine extends CoffeMakerImpl{
        public constructor(private coffeeBeans : number
                            ,private automaticSugarMixer : AutomaticSugarMixer){
            super(coffeeBeans);
        }
        public makeCoffe(shots: number):CoffeCup{
            // 👉 필요기능을 분리해 놓은 AutomaticSugarMixer 사용
            const coffeParent:CoffeCup = super.makeCoffe(shots);        
            return this.automaticSugarMixer.makeSugar(coffeParent);
        } 
    }

    /**
     * 우유와 설탕이 들어간 라떼
     */
    class SweetCaffeLatteMachine extends CoffeMakerImpl{
        public constructor(coffeeBeans:number
            , private cheapMilkSteamer:CheapMilkSteamer
            , private automaticSugarMixer: AutomaticSugarMixer){
            super(coffeeBeans);
        }

        public makeCoffe(shots:number):CoffeCup{
            // 1 . 기본 베이스가 될 커피 생성
            const baseCoffee = super.makeCoffe(shots);
            /**
             * 내가한 방식 👎
             * - 원하는 대로 값은 출력되나 복잡하 로직일 경우
             *   해당 값이 덮어 씌워질 위험이 많은 방식임
             *  */ 
            // return {
            //     ...this.automaticSugarMixer.makeSugar(baseCoffee),
            //     ...this.cheapMilkSteamer.makeMilk(baseCoffee)                
            // }
            
            // 2 . 설탕을 넣는 로직 추가
            const addSugar: CoffeCup = this.automaticSugarMixer.makeSugar(baseCoffee);            
            // 3 . 우유를 스팀하는 로직 추가
            const steamMilk: CoffeCup = this.cheapMilkSteamer.makeMilk(addSugar);
            // 4 . 반환
            return steamMilk;

        }
    }    
    
    const cheapSteamer        = new CheapMilkSteamer();
    const automaticSugarMixer = new AutomaticSugarMixer();
    const sugarAndMilk        = new SweetCaffeLatteMachine(200,cheapSteamer,automaticSugarMixer);
    console.log(sugarAndMilk);
    console.log(sugarAndMilk.makeCoffe(2));

    //__Eof__
}
```

<hr/>

## OOP(객체지향 프로그래밍) - (Composition)구성 방식이란 [Interface 사용]?
### - Class간의 결합도가 낮아짐! 👍

```typescript
//TypeScript - Interface 사용

{
    type CoffeCup = {
        // code..
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    class CoffeMakerImpl implements IcoffeMaker{
        // code..
    }
    
    /////////////////////////////////////////////////////////////

    // 결합도를 낮추기 위한 Milke Interface
    interface MilkeForther{
        makeMilk(coffeeCup : CoffeCup):CoffeCup;
    }

    // 결합도를 낮추기 위한 Suger Interface
    interface SugarProvider{
        makeSugar(coffeeCup : CoffeCup):CoffeCup;
    }

    // 우유를 스팀하는 기능 - MilkeForther 구현
    class CheapMilkSteamer implements MilkeForther{        
        public makeMilk(coffeeCup : CoffeCup):CoffeCup{
            // TODO .. Busi Logic
        }
    }

    // 비싼 우유 스팀 기능을한다 - MilkeForther 구현
    class HighLevelMilkSteamer implements MilkeForther{
        public makeMilk(coffeeCup : CoffeCup):CoffeCup{
            // TODO .. Busi Logic
        }
    }

    // 차가운 우유 스팀 기능을한다 - MilkeForther 구현
    class ColdMilkSteamer implements MilkeForther{
        public makeMilk(coffeeCup : CoffeCup):CoffeCup{
            // TODO .. Busi Logic
        }
    }

    // 설탕을 추가하는 기능 - SugarProvider 구현
    class AutomaticSugarMixer implements SugarProvider{
        public makeSugar(coffeeCup : CoffeCup):CoffeCup{
            // TODO .. Busi Logic
        }
    }
    
    // 칼로리 설탕을 추가하는 기능 - SugarProvider 구현
    class ZeroSugarMixer implements SugarProvider{
        public makeSugar(coffeeCup : CoffeCup):CoffeCup{
            // TODO .. Busi Logic
        }
    }

    /////////////////////////////////////////////////////////////

    /**
     * 💬 생성 메서드에서 받은 매개변수의 참조 타입이 Interface로 변경되어
     *    - 결합도가 낮아졌다.
     *    - 따라서 다양한 종류의 유우, 설탕을 넣어줄수 있게 되었다.
     *    - 해당 Class하나만 바꾸면 문제가 될것이 없어졌다.
     */
    class CaffeLateMachine extends CoffeMakerImpl{
        public constructor(coffeBeans : number
                            , private readonly serialNumber : string
                            // ✅ 직접 Class가 아닌 Interface 참조
                            , private milkeSteamer : MilkeForther){
            super(coffeBeans);
        };
        
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent:CoffeCup = super.makeCoffe(shots);        
            return this.milkeSteamer.makeMilk(coffeParent);
        } 
    }

    // Interface를 통해 다영성을 사용하여 여러종류의 Steamer생성
    const cheapMilkSteamer:MilkeForther     = new CheapMilkSteamer();
    const highLevelMilkSteamer:MilkeForther = new HighLevelMilkSteamer();
    const coldlMilkSteamer:MilkeForther     = new ColdMilkSteamer();
    
    const cheapLatteMachin      = new CaffeLateMachine(200 ,"Serial", cheapMilkSteamer);
    const highLevelLatteMachin  = new CaffeLateMachine(200 ,"Serial", highLevelMilkSteamer);
    const coldLatteMachin       = new CaffeLateMachine(200 ,"Serial", coldlMilkSteamer);
    
    //__Eof__
}
```
<br/>
🔽 상단의 코드 개선 - 한가지 생성 class로 처리가능하게

```typescript
// TyepScript - 코드 개선

{
    type CoffeCup = {
        shots : number;
        hasMilik? : boolean;
        hasSugar? : boolean;
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    // 결합도를 낮추기 위한 Milke Interface
    interface MilkeForther{
        makeMilk(coffeeCup : CoffeCup):CoffeCup;
    }

    // 결합도를 낮추기 위한 Suger Interface
    interface SugarProvider{
        makeSugar(coffeeCup : CoffeCup):CoffeCup;
    }

    // 우유를 스팀하는 기능 - MilkeForther 구현
    class CheapMilkSteamer implements MilkeForther{        
       // Code..
    }

    // 비싼 우유 스팀 기능을한다 - MilkeForther 구현
    class HighLevelMilkSteamer implements MilkeForther{
        // Code..
    }

    // 차가운 우유 스팀 기능을한다 - MilkeForther 구현
    class ColdMilkSteamer implements MilkeForther{
        // Code..
    }

    class NoMilk implements MilkeForther{
        // Code..
    }

    // 설탕을 추가하는 기능 - SugarProvider 구현
    class NormalSugarMixer implements SugarProvider{
        // Code..
    }
    
    // 칼로리 설탕을 추가하는 기능 - SugarProvider 구현
    class ZeroSugarMixer implements SugarProvider{
        // Code..
    }

    class NoSugar implements SugarProvider{ 
        // Code..
    }

    class CoffeMakerImpl implements IcoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        
        // 👉 생성자메서드 파라미터로 인터페이스를 받음                 
        public constructor(private coffeBeans : number
                            , private milkeForther:MilkeForther
                            , private sugarProvider:SugarProvider ){
            this.coffeBeans     = coffeBeans;
            this.milkeForther   = milkeForther;
            this.sugarProvider  = sugarProvider;
        }
        
        protected grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT;
        }

        protected extract(shots : number):CoffeCup{
            return {                
                shots
            }
        }
        
        public makeCoffe(shots: number):CoffeCup{
            this.grindBeans(shots);
            /*
            * 👉 다형성 사용으로 값을 추가 하여 Return
            */
            const baseCoffee:CoffeCup = this.extract(shots);
            const addSugar: CoffeCup  = this.sugarProvider.makeSugar(baseCoffee);            
            return this.milkeForther.makeMilk(addSugar);
        }   
    }   
    
    // Milke
    const cheapMilkSteamer:MilkeForther     = new CheapMilkSteamer();
    const highLevelMilkSteamer:MilkeForther = new HighLevelMilkSteamer();
    const coldMilkSteamer:MilkeForther      = new ColdMilkSteamer();
    const noMilkSteamer:MilkeForther        = new NoMilk();
    // Sugar
    const normalSugarMixer:SugarProvider    = new NormalSugarMixer();
    const zeroSugarMixer:SugarProvider      = new ZeroSugarMixer();
    const noSugar:SugarProvider             = new NoSugar();

    /**
     * 다양한 조합으로 생성이 가능해짐
     */
    const coffeeMachine1 = new CoffeMakerImpl(200,cheapMilkSteamer,noSugar);
    const coffeeMachine2 = new CoffeMakerImpl(200,highLevelMilkSteamer,zeroSugarMixer);
    console.log(coffeeMachine1);
    console.log(coffeeMachine1.makeCoffe(3));
    console.log(coffeeMachine2);
    console.log(coffeeMachine2.makeCoffe(3));

    //__Eof__
}
```

<hr/>

## OOP(객체지향 프로그래밍) - 추상 클래스(AbstractClass)란?
- AbstractClass - 추상 클래스
  - 필요한것들을 정의하여 원하는 메서드를 강제할수있다.


- 💬 Interface 와 AbstractClass의 차이점은 ?
  - Interface의 경우 
    - 메서드만 추상화하여 강제 할수있있다.
  - AbstractClass의 경우
    - 일반적인 상속과 같은 기능을 하지만! 필요한 메서드를 강제할수있다.   
    - 단 생성자를 통한 객체생성이 불가능하다.                
    
```typescript
// TypeScript - AbsractClass

{

    type CoffeCup = {
        // code..
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    abstract class CoffeMakerImpl implements IcoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        public constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        }
        
        protected grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT;
        }

        protected abstract extract(shots : number):CoffeCup;
        
         makeCoffe(shots: number):CoffeCup{
            this.grindBeans(shots);
            return this.extract(shots);
        }   
    }
    
    /**
     * 우유 추가 기능 - 추상 클래스를 상속받음
     *  */ 
    class CaffeLateMachine extends CoffeMakerImpl{
        public constructor(coffeBeans : number, private readonly serialNumber){
            super(coffeBeans);
        };
        // 👉 추상 클래스에서 강제되는 메서드임! 구현 안할시 컴파일 Error
        protected extract(shots : number):CoffeCup{
            return{
                shots
                ,hasMilik: true
            }
        }
    }

    /**
     * 설탕 추가 기능 - 추상 클래스를 상속받음
     *  */ 
    class SweetCateLateMachine extends CoffeMakerImpl{
        // 👉 추상 클래스에서 강제되는 메서드임! 구현 안할시 컴파일 Error
        protected extract(shots : number):CoffeCup{
            return{
                shots
                ,hasMilik: true
            }
        }
    }

    const cafefLate:CoffeMakerImpl = new CaffeLateMachine(200,"SerialNumber");
    // 👉 추상 클래스에서 구현된 makeCoffe() 사용!
    console.log(cafefLate.makeCoffe(2));
    
    //__Eof__
}
```

<hr/>

## OOP(객체지향 프로그래밍) - 활용 예제 [ Stack ]

- 알아두면 좋은 내용
  - 내부에서만 사용한다는 의미로 "_"를 앞에 붙여 사용 하기도한다.
    - getter, setter를 위한 방식 알아두기만 하자
  - "===" 가 무조건 좋은게 아니다.                          
    - 좀 더 목적에 맞게끔 사용하는것이 중요하다.
      - ex)                                           
      - null == undefined 👍                          
      - null === undefined 👎
      -  위와 같이  "==" 하나만 써서 두가지를 동시에 체크가 가능하다.

- Stack 구현 코드 간략 설명
  1. 신규값이 추가된다. ****(push)****
  2. 노드를 생성한다. { 값 , 현재 head위치 } **👉 여기서 중요한건 head란 node 전체를 가르키는 것이다.**
  3. 또 다른 값이 추가될 경우
  4. 노드를 생성한다. {값 , 현재 head위치 } **👉 2번에서 생성된 노드가 현재 head이다.**
  5. 출력요청 ****(pop)****
  6. 현재 head값 유무 확인
  7. 있을 경우 현재 head의 value 출력
  8. 현재 head변경 -> 현재 head.next
```typescript
// TypeScript - Stack

{
    interface Stack {
        readonly size: number;
        push(value: string): void;
        pop(): string;
      }
      
      type StackNode = {
        readonly value: string;
        readonly next?: StackNode;
      };

    class StackImpl implements Stack{
        
        private _size: number = 0;        

        // ✅ 해드가 처음에는 없을수도 있으니 Optional 체이닝은 필수다!
        private head?:StackNode;

        /***
         * ❌ 내가 하려던 방법..
         * 어떻게 여러개를 사용하지 했었는데
         * 이렇게 맴머 변수로 쓰면 불가능하다 당연히..
         */
        //private _node:StackNode;  👎

        get size(){
            return this._size;
        }
        public push(value: string): void {            
            const node: StackNode = { value, next: this.head };
            this.head = node;
            this._size++;
        }

        pop(): string {
            if (this.head == null) {
              throw new Error('Stack is empty!');
            }
            const node = this.head;
            this.head = node.next;
            this._size--;
            return node.value;
          }    
    }

    const stack:Stack = new StackImpl();
    stack.push("yoo1");
    stack.push("yoo2");
    stack.push("yoo3");
    console.log(stack.pop()); //yoo3
    console.log(stack.pop()); //yoo2
    console.log(stack.pop()); //yoo1
}
```

<hr/>

## OOP(객체지향 프로그래밍) - 활용 예제 [ Queue ]

- 이해가 안 됐던 부분 설명
  1. dequeue()매서드 실행
  2. this.head = this.head.next;
  2. ? this.head.next값을 변경한적이 없는데 바뀌어있음
  3. 👉 이유 ? 프로퍼티 공유 때문임
  4. enqueue(value: string)메서드 실행
  5. this.head는 계속해서 값이 변경됨 
```typescript
// TypeScript - Queue

{   
    interface Queue{
        enqueue(value:string):void;
        dequeue():string;
    }

    type QueueNode = {
        readonly value : string,
        next? : QueueNode         
    }

    class QueueImple implements Queue{

        private head? : QueueNode | undefined;
        // Stack과 다르게 tail이 필요함.
        private tail? : QueueNode | undefined;

        // ⭐️ 추가 시
        enqueue(value: string) {            
            // 1 . 노드 생성 {파라미터값 , 현재 존재하는 head}
            const inputNode = {value, next: this.head};
            // 2 . tail 존재 확인 [ 처음들어올 경우 항상 없고 다음 부터는 항상 있음]
            if(!this.tail){ // 👉 tail이 없을 경우
                // 2 - 1 . head에 초기값 등록 최초의 값임
                this.head = inputNode;
                // 2 - 3 . tail에 값 등록 - 계속 변할 것임
                this.tail = inputNode;
            } else {       // 👉 tail이 있을 경우
                // 2 - 4 . tail.next에 노드 값 변경 
                this.tail.next = inputNode;
                // 2 - 5 . tail 값 변경
                this.tail = inputNode;
            }
        }

        dequeue(): string {            
            if(!this.head) throw new Error("Error!!");
            
            // 현재의 해드를 바라봄 - 최초의 해드
            const removeNode = this.head;

            /**
             * 둘이 같아질 경우는 값이 값이 없을 경우 뿐임
             *  - 이유 ?
             *    - 소모 시 head 값만 변경되기 떄문임
             */
            if(this.head === this.tail)    {
                this.head = undefined;
                this.tail = undefined;
            } else {
                // 바라보는 head 변경
                this.head = this.head.next;
            }

            return removeNode.value;
        }
    }

    const queue:Queue = new QueueImple();
    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("33");
    queue.enqueue("44");
   
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    // console.log(queue.dequeue());
    // console.log(queue.dequeue());
    // console.log(queue.dequeue());

}
```

<hr/>

## OOP(객체지향 프로그래밍) - Generic 이란?

- 타입을 선언하여 사용하여 안전하며 활용성이 올라감.

🔽 확장성 및 안전성
```typescript
// TypeScript - Generic의 확장성

{
    // 숫자만 가능함 한가지 Class 사용만으로
    // 여러가지를 넣고 싶은데..
    function checkNotNullBad(arg:number | null){
        if(arg == null) throw new Error("Error!!!");
        return arg;
    }

    // any사용 -> 원하는 바를 이뤘지만 타입 보장이 힘듬
    function checkNotAnyBad(arg:any | null){
        if(arg == null) throw new Error("Error!!!");
        return arg;
    }   

    // 제네릭을 이용하여 사용하면 가능하다 👍 
    function checkNotNullGood< T >(arg:T | null):T{
        if(arg == null) throw new Error("Error!!!");
        return arg;
    }   

    const genericTest1:number = checkNotNullGood(2);
    //const genericTest2:string = checkNotNullGood("❌ 숫자이기에 Error");
    console.log(genericTest1);
    console.log(checkNotNullGood("asdas"));
}
```

<br/>

🔽 Class에서 사용
```typescript
// TypeScript - Class에 적용

{
    interface Either<L, R> {
        left : ()=> L;
        right : ()=> R;
    }

    class SimpleEither<L, R> implements Either<L, R>{
        constructor(private leftValue : L , private rightVale : R){};

        public left():L{
            return this.leftValue;
        }
        public right():R{
            return this.rightVale;
        }
    }

    ///////////////////////////////////////
    const either:Either<string, number[]> = new SimpleEither("yoo",[1,2,3]);
    const either2:Either<number, number> = new SimpleEither(1,1);
}
```

<br/>

🔽 Generic에 제약을 거는 방법
```typescript
// TypeScript - 제한을 둠

/**
 * Generic - constraints(제약)
 * - 제네릭에 들어갈 타입을 강제 하는것
 */
{
    interface Employee{
        pay():void;
    }

    class FullTimeEmployee implements Employee{
        pay(): void {
            console.log(`Full Time work....`);
        }
        public workFullTime(){};
    }

    class PartTimeEmployee implements Employee{
        pay(): void {
            console.log(`Part Time work....`);
        }
        public workPartTime(){};
    }

    /** 나쁜 코드 👎
     * 👉 세부적인 타입을 파라미터로 받은후 
     *    리턴을 추상적인걸로 해버렸기 때문임
     * 
     * ex) 아래 코드 예시로
     *      받을때 : FullTimeEmployee - class
     *      보낼때 : Employee         - interface
     * s
     * 그냥 Employee로 바꿔버림으로 
     * 내부 갖고있던 메서드를 잊어버림
     * - workFullTime()
     * - workPartTime(
     */
    function payBad(employee:Employee):Employee{
        employee.pay();
        return employee;
    }

    /** 개선 코드 👍
     * 제네릭을 사용하고 Employee또는 구현한 클래스를 받게 끔 하였음
     */
    function pay<T extends Employee>(employee:T):T{
        employee.pay();
        return employee;
    }

    //////////////////////////////////////////////////////
    const yoo:FullTimeEmployee = new FullTimeEmployee();
    const gom:PartTimeEmployee = new PartTimeEmployee();
    yoo.workFullTime();
    gom.workPartTime();

    const yooAfterPay = payBad(yoo);    
    // yooAfterPay.FullTimeEmployee(); ❌ 불가능함 Interface를 반환해버림 ...

    // 제네릭을 통해 workPartTime()가 사라지지 않았음
    const gomAfterPay = pay(gom);
    gomAfterPay.workPartTime();
    

    //////////////////////////////////////////////////////

    /**
     * 제네릭 K를 keyof T 로 제한을 둬서 
     * 해당 메서드의 반환겂을 T[K]로 지정이 가능하다.
     */
    function getValue<T,K extends keyof T>(obj:T,key:K):T[K]{
        return obj[key];
    }

    const obj = {name : "yoo",age : 20};
    const obj2 = {animal : "dog"};

    getValue(obj,"name");       // yoo
    getValue(obj,"age");        // 20
    getValue(obj2,"animal");    // dog
    
}
```

<hr/>

## Exception 이란?

- 다른 언어에서는 Exceiption Class가 있지만 javascrip에는 없다.
- 대신 javascript에는 Error Class가 존재함
- 예외가 발생할 부분에 try - catch를 사용하면 프로그램이 종료되지 않고 처리가 가능하다.
- 반드시 실행되어야 하는 로직은 finally에서 처리한다.

- 에러의 큰 종류
  - 컴파일에러   : 컴파일시 잡아낼수 있는 에러
  - 런타임 에러  : 컴파일시 잡지 못하고 작동중 생성되는 에러 ☠️굉장히 위험☠️

```typescript
// TypeScript - Exception 처리

{
    // file을 읽는 기능을 하는 함수
    function readFile(fileName:string):string{
        if(fileName === 'not exist'){
            throw new  Error(`file not exist! ${fileName}`);
        }
        return 'file content!';
    }

    // fileRead 종료함수    
    function closeFile(fileName:string){}

    // Exception Test   👎 
    const fileName = 'not exist';
    //const readFileContent = readFile(fileName);
    //console.log(readFileContent);
    //closeFile(fileName);


    // Exception Test 👍 
    // - 예외 발샐할 부분만 감싸서 써주는것이 좋다!
    // - finally에 필수로 종료될 로직이 있으면 꼭 작성해주자
    //    - catch에서 return을 해버리면 무시되기 때문이다.
    // .. logic ...
    try {        
        const readFileContent = readFile(fileName);
        console.log(readFileContent);        
    } catch (error) {
        console.log(`caught Erro!!`); // caught Erro!!
        console.error(error);         // file not exist! ${fileName}
    } finally{
      closeFile(fileName);
    }
    // .. logic ..    
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// TypeScript - 효율적인 Hanlding    

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
```

<hr/>

## Type , Interface 차이

|     종류     | 설명                                  |
|:----------:|:------------------------------------|
| Interface  | 서로간의 계약서, 약속 , 상호작용, 규격을 정하는것       |
|    Type    | 사용되는 데이터의 담는 형식을 정하는 목적으로 사용하는것이 맞다 |

```typescript
// TypeScript - Type, Interface 차이

{
    type PositonType = { x : number; y : number; }

    interface PositionInterface{ x : number; y : number; }

    // 👉 Object 생성 [ 둘가 가능 ]
    const obj1:PositonType = {x : 1, y : 1}
    const obj2:PositionInterface = {x : 1, y : 1, z:1}
   
    // 👉 확장 방법 [ Interface ] -재선언 후 추가
    interface PositionInterface{
        // x : string ❌ 중복일 경우 Error:  'x' was also declared here.
        z : number
    }

    // 👉 확장 방법 [ Type ] - "&" 를 사용하여 새로 생성
    type ZPosition = PositonType & {z : number};
    const obj3:ZPosition = {x : 1, y : 1, z:1}
}
```


<hr/>

## 다양한 Type 선언 방식

🔽 Index를 사용한 Type선언
- Json의 value를 사용하는것 처럼 원하는 타입을 가져다 쓸수 있다.
- 
```typescript
// TypeScript - Index를 사용한 타입 선언

{
    type Person = {
        name : string;
        age : number;
        gender : "male" | "female"
    }

    type StringType = Person['name'];  // string

    type NumberType = Person['age']    // number

    type GenderType = Person['gender'] // 'male' or 'female'

    // 내부에서도 사용가능
    type Pet = {
        name   : Person['name'];    // string
        gender : Person['gender'];  // 'male' or 'female'
    }
}
```

<br/>

🔽 Map 방식을 사용한 Type선언
- 여기서 말하는 Map은 자료구조가 아닌 배열에서 사용되는 map()을 의미한다.  
   ex) [1,2].map(()=>{})
- 값을 바꾸는 용도로 보면된다.


- 사용이유?
  - 옵션을 넣고싶을 경우
  - 해탕 타입의 값을 완전히 바꾸싶은 경우
  - 상위 타입의 내용을 바꾸면 하위도 같이 바뀌게 하고 싶은경우
```typescript
// TypeScript - Map방식을 사용한 타입 선언

{
    type Person = {
        name : string,
        age : number,
        gender : "male" | "female"
    }

    /**
     * 아래와 같이만들수도 있지만 
     * 만약 gender가 필요없어지면 
     * Person도 변경해야하고 OptionalPersone도 
     * 변경해야 하기에 이래저래 번거로워진다.
     */
    type OptionalPerson = {
        name? : string,
        age? : number,
        gender? : "male" | "female"
    }

    // Optional Type
    type UsedMapPerson<T> = {
        [P in keyof T]? : T[P]; // 반복문 문법 in 사용
    }

    // ReadOnly Type
    type UsedMapPersonVerReadonly<T> = {
        readonly [P in keyof T] : T[P]; // 반복문 문법 in 사용         
    }

    // 타입 자체를 완전 변환도 가능
    type Proxy<T> = {
        get():T;
        set(value : T):void;
    }
    type Proxify<T> = {
        [P in keyof T]: Proxy<T[P]>; // map처럼 활용 가능하다
    }

    ////////////////////////////////////////////////////
    // 사용 방법 : 해당 Type을 Generic에 추가해주면 된다.

    // 값이 없어도 에러 없다
    const useMap:UsedMapPerson<Person> = {}; 

    // 값 변경이 불가능
    const useMapVerReadonly:UsedMapPersonVerReadonly<Person> = {
        name : 'yoo',
        age : 20,
        gender : 'female'
    }; 
    // ❌ useMapVerReadonly.name = 'gim'  // Error : ReadOnly이기 때문이다.
}
```

<br/>

🔽 다양한 Util Class를 사용한 Type선언
```typescript
// TypeScript - ReadOnly Class

{   
    // 👉 1 . ReadOnly Class - 읽기 전용으로 변경해줌
    type Person = {
        name : string;
        age : number;
    }

    type PersonReadOnly = Readonly<Person>;

    const personReadOnly:PersonReadOnly = {
        name : 'yoo',
        age : 20
    }
    // ❌ personReadOnly.name = '변경되지가 않는다 ReadOnly로 변경되었음';
}


// TypeScript - Partial Class

{
    // 👉 2 . Partial Class - 부분 값 변환
    type Person = {
        name : string;
        age : number;
    }   
    const person:Person = {name : 'yoo', age : 20};

    // 나이를 변경
    function updateAge(p:Person, updateAage:Partial<Person>){
        return {...p,...updateAage};
    }

    const changeInfo:Person = updateAge(person, {age:10});
    console.log(changeInfo);    //{ name: 'yoo', age: 10 }
}


// TypeScript - Pick Class

{
    // 👉 3 . Pick Class - 원하는 것만 골라서 타입 재생성
    type Person = {
        name : string;
        age : number;
        gender : 'male' | 'female';
    }   
    
    // Pick< 대상 , 원하는 키를 작성 >
    type PersonOnlyAgeAndGender = Pick<Person, 'age' | 'gender'>;

    // name 작성 추가 시 Error
    const ageAndGender:PersonOnlyAgeAndGender = {
        age : 20,
        gender : "female"
    }
}


// TypeScript - Omit Class

{
    // 👉 4 . Omit Class - 원하는 것만 골라서 제외 하는것
    type Person = {
        name : string;
        age : number;
        gender : 'male' | 'female';
    }   
    
    // Pick< 대상 , 원하는 키를 작성 >
    type PersonOnlyName = Omit<Person, 'age' | 'gender'>;

    // age, gender 작성 추가 시 Error
    const onlyName:PersonOnlyName = { name : 'name만  작성 가능하다' };
}
```
