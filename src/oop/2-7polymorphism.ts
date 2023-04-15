{
    /**
     * Polymorphism 다형성이란?
     * - 상속을 받은 부모 또는 구현되어 있는 인터페이스의 타입으로 선언이 가능하여 확장 
     *   구현이 가능한것
     *  */
    type CoffeCup = {
        shots : number;
        hasMilik? : boolean;
        hasSugar? : boolean;
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    class CoffeMakerImpl implements IcoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        public constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
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
    
    /**
     * 우유 추가 기능
     *  */ 
    class CaffeLateMachine extends CoffeMakerImpl{
        //public constructor(private coffeBeans : number){ // ❌ Error 이미 부모에서 private coffeBeans 선언 되어있자나 ..
        public constructor(coffeBeans : number, private readonly serialNumber){
            super(coffeBeans);
        };
        private steamMilk():void{
            console.log("Steam Milk")
        }
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent = super.makeCoffe(shots);
            // 👉 스프레드 문법(Spread Syntax) 사용
            return {...coffeParent,
            hasMilik : true };
        } 
    }

    /**
     * 설탕 추가 기능
     *  */ 
    class SweetCateLateMachine extends CoffeMakerImpl{
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent = super.makeCoffe(shots);
            return {...coffeParent,                
                hasSugar : true
            };
        } 
    }

    
    /***
     * 다형성 테스트
     *  - 해당 Class의 최고 부모는 CaffeMakerImpl이다
     *  - 해당 최고 부모는 IcoffeMaker를 Implments하고있다
     *  - ✅ 그러므로 IcoffeMaker를 타입으로 선언이 가능하다!!
     */
    const coffeeMachineArr:IcoffeMaker[] = [
        new CoffeMakerImpl(20)
        , new CaffeLateMachine(20, "serialNumber...")
        , new SweetCateLateMachine(20)
    ];
    
    //__Eof__
}