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
```typescriopt
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