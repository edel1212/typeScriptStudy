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