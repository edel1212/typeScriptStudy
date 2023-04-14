{
    /***
     *  Class를 사용
     */

    // 반환 타입
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }

    /***
     *  💬 Class로 변환하면서 변경된 점
     *  - 1 . let, const, funciton을 사용하지 않는다.
     *  - 2 . Class내 맴버 변수에 접근할 때에는 this.변수명을 사용해주자.
     *  - 3 . 생성자를 통해 인스턴스 생성시 값일 지정할수 있다.
     *        - 내가 생성 하지 않을 경우 default생성자가 만들어짐
     *          - constructor(){}
     *  -  4 . 맴버변수의 값을 변화시키지 않고 싶다면 private로 설정해주자
     *  -  5 . static을 사용하면 Class Level로 해당 변수를 사용할수있다.
     *        - 같은 Class에서는 해당 값을 공유함
     *        - 불필요한 메모리 낭비를 막을 수있음
     *        - ✅ Class Level로 변경 되었기에 해당값은 this.변수명 접근 불가능 ❌
     *            : this.BEANS_GRAMM_PER_SHOT ==>> CoffeMaker.BEANS_GRAMM_PER_SHOT
     *            - Class.맴버 변수명으로 전달 받아야한다.
     */
    class CoffeMaker{
        // 커피 제작에 필요한양의 커피콩 그람
        private static BEANS_GRAMM_PER_SHOT : number = 7; // ⭐️ Class Level

        // 초기 커피 콩 그람수
        coffeBeans :number = 0;                           // ⭐️ Instance(Object) Level

        // 생성자를 통한 coffeBean 추가
        constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        };

        static makeCoffeMachineVerStatic(coffeBean : number){
            return new CoffeMaker(coffeBean);
        }

        makeCoffe(shots: number):CoffeCup{

            if(this.coffeBeans < shots * CoffeMaker.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }

            // 샷의 개수만큼 커피콩 소모
            this.coffeBeans -= shots * CoffeMaker.BEANS_GRAMM_PER_SHOT;

            return {
                //shots : shots,  // ⭐️ Key와 Value의 이름이 같을 경우 한개로 생략 가능.
                shots,
                hasMilik : false
            }
        }   

        
    }

    // 인스턴스 생성
    const coffeMaker = new CoffeMaker(32);
    console.log(coffeMaker);
    console.log(coffeMaker.makeCoffe(2));

    // static 메서드를 사요한 인스턴스 생성
    const cofferMakerVerStatic = CoffeMaker.makeCoffeMachineVerStatic(50);
    console.log(cofferMakerVerStatic);
    console.log(cofferMakerVerStatic.makeCoffe(2));

}