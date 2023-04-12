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