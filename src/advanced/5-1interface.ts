/**
 * Type , Interface 차이
 *  - Interface - 서로간의 계약서, 약속 , 상호작용, 규격을 정하는것 
 *  - Type      - 사용되는 데이터의 담는 형식을 정하는 목적으로 사용하는것이 맞다
 */

{
    type PositonType = {
        x : number;
        y : number;
    }

    interface PositionInterface{
        x : number;
        y : number;
    }

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