{
    /**
     * Inheritance 상속이란?
     * - 공통적인 기능을 상속하여 사용할 수 있다(코드의 재사용)
     * - super를 통해 부모 메서드에 접근 가능
     * - override를 통해 부모의 메서드를 덮어씌워 구현 할수있다.
     * - 다형성을 사용 가능
     * 
     * ✅ 주의사항
     *  - 부모의 생성자 메서드가 private이면 상속 자체가 불가능하다.
     *    - public 혹은 protected를 사용해주자.
     *  - 접근 제어자가 private일 경우 상속 받은 자식도 접근이 불가능하니
     *     접근이 필요할 경우 prtected를 사용해 주자
     *  */
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    class CoffeMakerImpl implements IcoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        protected constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        }
        
        public static makeInstance(coffeBeans : number){
            return new CoffeMakerImpl(coffeBeans);
        }

        protected grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT;
        }

        protected extract(shots : number){
            return {                
                shots,
                hasMilik : false
            }
        }
        
        public makeCoffe(shots: number):CoffeCup{
            this.grindBeans(shots);
            return this.extract(shots);
        }   
    }
    
    class CaffeLateMachine extends CoffeMakerImpl{
        //public constructor(private coffeBeans : number){ // ❌ Error 이미 부모에서 private coffeBeans 선언 되어있자나 ..
        public constructor(coffeBeans : number, private readonly serialNumber){
            super(coffeBeans);
        };
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent = super.makeCoffe(shots);
            // 👉 스프레드 문법(Spread Syntax) 사용
            return {...coffeParent,
            hasMilik : true };
        } 
    }

    
    const caffeLateMachine : CaffeLateMachine = new CaffeLateMachine(200, "SSKXOSKWEMXIVO");
    console.log(caffeLateMachine);
    console.log(caffeLateMachine.makeCoffe(3));
    
    //__Eof__
}