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