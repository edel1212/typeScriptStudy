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