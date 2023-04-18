{
    /**
     * AbstractClass - 추상 클래스     
     * - 필요한것들을 정의하여 원하는 메서드를 강제할수있다.
     * 
     * ------------------------------
     * -💬 그렇다며 Interface랑 차이점은 ?
     * 
     * - Interface의 경우
     *    - 메서드만 추상화아여 강제 할수있닫.
     * 
     * - AbstractClass의 경우
     *   - 필요한 꼭 Override로 작성해야하는 부분을 강제할수있음
     *   - 단 생성자를 통한 객체생성이 불가능함
     *   - 나머지는 상속하여 전부 사용이 가능함!
     *  */
    type CoffeCup = {
        shots : number;
        hasMilik? : boolean;
        hasSugar? : boolean;
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    abstract class CoffeMakerImpl implements IcoffeMaker{
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

        protected abstract extract(shots : number):CoffeCup;
        
         makeCoffe(shots: number):CoffeCup{
            this.grindBeans(shots);
            return this.extract(shots);
        }   
    }
    
    /**
     * 우유 추가 기능
     *  */ 
    class CaffeLateMachine extends CoffeMakerImpl{
        public constructor(coffeBeans : number, private readonly serialNumber){
            super(coffeBeans);
        };
        // 👉 추상 클래스에서 강제되는 메서드임! 구현 안할시 컴파일 Error
        protected extract(shots : number):CoffeCup{
            return{
                shots
                ,hasMilik: true
            }
        }
    }

    /**
     * 설탕 추가 기능
     *  */ 
    class SweetCateLateMachine extends CoffeMakerImpl{
        // 👉 추상 클래스에서 강제되는 메서드임! 구현 안할시 컴파일 Error
        protected extract(shots : number):CoffeCup{
            return{
                shots
                ,hasMilik: true
            }
        }
    }

    const cafefLate:CoffeMakerImpl = new CaffeLateMachine(200,"SerialNumber");
    // 👉 추상 클래스에서 구현된 makeCoffe() 사용!
    console.log(cafefLate.makeCoffe(2));
    
    //__Eof__
}