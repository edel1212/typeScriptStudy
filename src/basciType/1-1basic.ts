{
    /** Javascript
        Primitive : number,  string, boolean, bigint, symbol, null, undefined
        Object    : function, array ... [ 원시타입을 제외한 모든 타입 ]
    */

    // 👉 number
    const num:number = 11000;
    //const num2:number = "Hello~?"; ❌ Error

    // 👉 string
    const str:string = "Hello!";

    // 👉 boolean
    const bool:boolean = false;

    /**
        💬 undefined 와 null은 개념이 다르다 완전 다르다고 봐도 된다.
          - undefined : 비어있는지 비어있지 않은지 확실하지 않은 상태
          - null      : 확실하게 null인 상태

       👎 두개의 타입은 단독으로 사용하지 않음
    */
    // 👉 undefined
    let undefinedVal:undefined;     // 👎
    //undefinedVal = "에러가 납니다.. undefined만 들어갈 수 있음"; ❌ Error
    let age:number | undefined; // 숫자 또는 undefined가 가능하게 끔 사용함
    age = 123;
    age = undefined;
    function find():number | undefined{
        return undefined;
    }

    // 👉 null
    let person: null;           // 👎
    //person = "Hello"  ❌ Error
    let person2: string| null;
    person2 = "Hello!";
    person2 = null;

    // 👉 unknown(👎)   [ 해당 타입도 잘사용하지 않음 어떤것이든 들어감 ]
    let notSure : unknown;
    notSure = "Hello";
    notSure = true;
    notSure = 123;

    // 👉 any(👎) [ unknown과 비슷함 ]
    let anything : any;
    anything = "Hello";
    anything = 123;
    anything = true;

    // 👉 void
    function print() : void{
        console.log("Hello");
    }

    // 👉 never [ 반환 값 ❌ || new Error() || 끝나지 않음 ]
    function  throwError(message:string): never{
        //throw new Error(message);
        while(true){};
    }

    // 👉 object [원시타입을 제외한 모든 타입을 받을 수 있다. 타입이 명확이 저징되어있지 않으므로 사용 비추천👎]
    let obj:object;
    function acceptSomeObject(obj:object): void{ };
    acceptSomeObject({name : "yoo"});
    acceptSomeObject({animal : "dog"});

}
