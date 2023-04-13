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