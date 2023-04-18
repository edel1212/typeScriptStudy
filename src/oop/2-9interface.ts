{
    /**
     * Interface를 사용하여 결합도를 낮추는 방식  👍 좋은 방식이다 
     *  */
    type CoffeCup = {
        shots : number;
        hasMilik? : boolean;
        hasSugar? : boolean;
    }

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

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

    class NoMilk implements MilkeForther{
        public makeMilk(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,                
            }
        }
    }

    // 설탕을 추가하는 기능 - SugarProvider 구현
    class NormalSugarMixer implements SugarProvider{
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

    class NoSugar implements SugarProvider{ 
        public makeSugar(coffeeCup : CoffeCup):CoffeCup{
            return {
                ...coffeeCup,
                hasSugar : false,
            }
        }
    }

    class CoffeMakerImpl implements IcoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
                         
        public constructor(private coffeBeans : number
                            , private milkeForther:MilkeForther
                            , private sugarProvider:SugarProvider ){
            this.coffeBeans     = coffeBeans;
            this.milkeForther   = milkeForther;
            this.sugarProvider  = sugarProvider;
        }
        
        protected grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT;
        }

        protected extract(shots : number):CoffeCup{
            return {                
                shots
            }
        }
        
        public makeCoffe(shots: number):CoffeCup{
            this.grindBeans(shots);
            const baseCoffee:CoffeCup = this.extract(shots);
            const addSugar: CoffeCup  = this.sugarProvider.makeSugar(baseCoffee);            
            return this.milkeForther.makeMilk(addSugar);
        }   
    }   
    
    // Milke
    const cheapMilkSteamer:MilkeForther     = new CheapMilkSteamer();
    const highLevelMilkSteamer:MilkeForther = new HighLevelMilkSteamer();
    const coldMilkSteamer:MilkeForther      = new ColdMilkSteamer();
    const noMilkSteamer:MilkeForther        = new NoMilk();
    // Sugar
    const normalSugarMixer:SugarProvider    = new NormalSugarMixer();
    const zeroSugarMixer:SugarProvider      = new ZeroSugarMixer();
    const noSugar:SugarProvider             = new NoSugar();

    /**
     * 다양한 조합으로 생성이 가능해짐
     */
    const coffeeMachine1 = new CoffeMakerImpl(200,cheapMilkSteamer,noSugar);
    const coffeeMachine2 = new CoffeMakerImpl(200,highLevelMilkSteamer,zeroSugarMixer);
    console.log(coffeeMachine1);
    console.log(coffeeMachine1.makeCoffe(3));
    console.log(coffeeMachine2);
    console.log(coffeeMachine2.makeCoffe(3));

    //__Eof__
}