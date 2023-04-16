{
    /**
     * Interface를 사용하여 결합도를 낮추는 방식  👍 좋은 방식이다 
     *  - 앞에서 봤던 Composition 방식을 사용 하면 Class 간의 결합도가 높아진다.
     *    - 따라서 해당 생성메서드애서 사용 하는 Class밖에 사용하지 못한다.
     *    - 확장성이 떨어진다.
     *    - 유지보수가 힘들어진다. - 하나가 바뀌면 연결된 Class를 확인해야함.
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
    
    /////////////////////////////////////////////////////////////

    // 결합도를 낮추기 위한 Milke Interface
    interface MilkeForther{
        makeMilk(coffeeCup : CoffeCup):CoffeCup;
    }

    // 결합도를 낮추기 위한 Suger Interface
    interface SugarProvider{
        makeSugar(coffeeCup : CoffeCup):CoffeCup;
    }

    // 우유를 스팀하는 기능 - MilkeForther 구현
    class CheapMilkSteamer implements MilkeForther{        
        private steamMilk(){
            console.log("Steaming some milk.....");
        }
        public makeMilk(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,
                hasMilik : true,
            }
        }
    }

    // 비싼 우유 스팀 기능을한다 - MilkeForther 구현
    class HighLevelMilkSteamer implements MilkeForther{
        private steamMilk(){
            console.log("고급 우유 스팀한다!!!!!.....");
        }
        public makeMilk(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,
                hasMilik : true,
            }
        }
    }

    // 차가운 우유 스팀 기능을한다 - MilkeForther 구현
    class ColdMilkSteamer implements MilkeForther{
        private steamMilk(){
            console.log("고급 우유 스팀한다!!!!!.....");
        }
        public makeMilk(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,
                hasMilik : true,
            }
        }
    }

    // 설탕을 추가하는 기능 - SugarProvider 구현
    class AutomaticSugarMixer implements SugarProvider{
        private addSugar(){
            console.log("Add Sugar.....");
        }
        public makeSugar(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,
                hasSugar : true,
            }
        }
    }
    
    // 칼로리 설탕을 추가하는 기능 - SugarProvider 구현
    class ZeroSugarMixer implements SugarProvider{
        private addSugar(){
            console.log("Add Zero Sugar.....");
        }
        public makeSugar(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,
                hasSugar : true,
            }
        }
    }

    /////////////////////////////////////////////////////////////

    /**
     * 💬 생성 메서드에서 받은 매개변수의 참조 타입이 Interface로 변경되어
     *    - 결합도가 낮아졌다.
     *    - 따라서 다양한 종류의 유우, 설탕을 넣어줄수 있게 되었다.
     *    - 해당 Class하나만 바꾸면 문제가 될것이 없어졌다.
     */

    class CaffeLateMachine extends CoffeMakerImpl{
        public constructor(coffeBeans : number
                            , private readonly serialNumber : string
                            // ✅ 직접 Class가 아닌 Interface 참조
                            , private milkeSteamer : MilkeForther){
            super(coffeBeans);
        };
        
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent:CoffeCup = super.makeCoffe(shots);        
            return this.milkeSteamer.makeMilk(coffeParent);
        } 
    }

    class SweetCateLateMachine extends CoffeMakerImpl{
        public constructor(private coffeeBeans : number
                            // ✅ 직접 Class가 아닌 Interface 참조
                            ,private automaticSugarMixer : SugarProvider){
            super(coffeeBeans);
        }
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent:CoffeCup = super.makeCoffe(shots);        
            return this.automaticSugarMixer.makeSugar(coffeParent);
        } 
    }

    /**
     * 우유와 설탕이 들어간 라떼
     */
    class SweetCaffeLatteMachine extends CoffeMakerImpl{
        public constructor(coffeeBeans:number
            // ✅ 직접 Class가 아닌 Interface 참조
            , private cheapMilkSteamer:MilkeForther
            , private automaticSugarMixer: SugarProvider){
            super(coffeeBeans);
        }

        public makeCoffe(shots:number):CoffeCup{
            // 1 . 기본 베이스가 될 커피 생성
            const baseCoffee = super.makeCoffe(shots);            
            // 2 . 설탕을 넣는 로직 추가
            const addSugar: CoffeCup = this.automaticSugarMixer.makeSugar(baseCoffee);            
            // 3 . 우유를 스팀하는 로직 추가
            const steamMilk: CoffeCup = this.cheapMilkSteamer.makeMilk(addSugar);
            // 4 . 반환
            return steamMilk;

        }

        // Todo : 09.16
    }    


    //__Eof__
}