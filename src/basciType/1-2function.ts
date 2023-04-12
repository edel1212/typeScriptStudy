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

    /***
     * ReadOnly 사용 
     * 💬 주의 사항 
     *    - (strArr : readonly string[]) 같은 경우 이상이 없지만
     *    - (strArr : readonly Array<string>) 의 경우 Error 발생
     *       - ErroMsg : 'readonly' type modifier is only permitted on array and tuple literal types.
     */
    //function readOnlyVer(strArr : readonly Array<string>) : void{  // ☠️ ERROR
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
