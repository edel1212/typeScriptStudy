{
    /***
     *  Encapsulation(캡슐화)
     * - public     - 외부 접근 가능
     * - private    - 내부에서만 접근가능
     * - protected  - 상속받은 대상만 접근 가능
     * 접근 방식을 설정 값의 변화를 막는것
     */

    // 반환 타입
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }

    class CoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        // 생성매서드를 막아 외부 생성을 방지
        private constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        };

        // static Method를 통하여 객체 생성
        public static makeInstance(coffeBeans : number){
            return new CoffeMaker(coffeBeans);
        }

        /**
         * coffeBeans변수의 접근제어자가 private 이므로 
         * 내부에서 값을 수정할 수 있게 해줘야한다. 
         */
        public fillCoffeeBeans(coffeBeans : number){
            if(coffeBeans < 0) throw new Error("잘못된 값입니다.");
            this.coffeBeans += coffeBeans;
        }
        
        public makeCoffe(shots: number):CoffeCup{

            if(this.coffeBeans < shots * CoffeMaker.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }

            // 샷의 개수만큼 커피콩 소모
            this.coffeBeans -= shots * CoffeMaker.BEANS_GRAMM_PER_SHOT;

            return {                
                shots,
                hasMilik : false
            }
        }   
    }
    
    //const cunstructorIsPrivate = new CoffeMaker(); ❌ 만들수가 없음 
    const uesdStaticInstance = CoffeMaker.makeInstance(30);
    console.log(uesdStaticInstance);
    // coffeeBeans 외부접근 불가능으로 내부 메서드 fillCoffeeBeans() 사용
    uesdStaticInstance.fillCoffeeBeans(200); 
    console.log(uesdStaticInstance);
}