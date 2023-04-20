/**
 * Map
 * - 여기서 말하는 Map은 자료구조가 아닌
 *   [1,2].map(()=>{}) 의 맵이다.
 * - 따라서 값을 바꾸는 용도로 보면된다.
 * 
 * - 사용이유?
 *   - 같은 종류의 타입에서 optional로 사용하고싶을때.
 *   - 연결되어 있는 로직이라 하나만 바꾸면 전부 바뀌게 하고싶을때 사용
 */
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