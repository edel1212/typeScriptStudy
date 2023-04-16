{
    /**
     * Composition 구성이란?
     * - 필요한것들을 하나하나 구성하여 조립하는 것이라 생각하면 좋다.
     * - 필요한 구성을 나눠서 생성메서드에 넣어 사용하는것은 Dependency Injection 한다.
     * 
     * - ✅ 정보 : TypeScript도 Java와 같이 단일 상속만 가능하다.
     * 
     * - 💬 단점 : 결합도가 높아진다.
     *            - Class 와 Class간의 연결은 어쩔수 없이 결합도가 높아질 수 밖에 없다.
     * 
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

    /*** 필요한 기능만을 따로 때내어서 class화 시켜버림 */

    // 우유를 스팀하는 기능
    class CheapMilkSteamer{        
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

    // 설탕을 추가하는 기능
    class AutomaticSugarMixer{
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

    /////////////////////////////////////////////////////////////

    class CaffeLateMachine extends CoffeMakerImpl{
        public constructor(coffeBeans : number
                            , private readonly serialNumber : string
                            // 👉 필요기능을 분리해 놓은 CheapMilkSteamer을 사용
                            , private milkeSteamer : CheapMilkSteamer){
            super(coffeBeans);
        };
        
        public makeCoffe(shots: number):CoffeCup{
            const coffeParent:CoffeCup = super.makeCoffe(shots);        
            return this.milkeSteamer.makeMilk(coffeParent);
        } 
    }

    class SweetCateLateMachine extends CoffeMakerImpl{
        public constructor(private coffeeBeans : number
                            ,private automaticSugarMixer : AutomaticSugarMixer){
            super(coffeeBeans);
        }
        public makeCoffe(shots: number):CoffeCup{
            // 👉 필요기능을 분리해 놓은 AutomaticSugarMixer 사용
            const coffeParent:CoffeCup = super.makeCoffe(shots);        
            return this.automaticSugarMixer.makeSugar(coffeParent);
        } 
    }

    /**
     * 우유와 설탕이 들어간 라떼
     */
    class SweetCaffeLatteMachine extends CoffeMakerImpl{
        public constructor(coffeeBeans:number
            , private cheapMilkSteamer:CheapMilkSteamer
            , private automaticSugarMixer: AutomaticSugarMixer){
            super(coffeeBeans);
        }

        public makeCoffe(shots:number):CoffeCup{
            // 1 . 기본 베이스가 될 커피 생성
            const baseCoffee = super.makeCoffe(shots);
            /**
             * 내가한 방식 👎
             * - 원하는 대로 값은 출력되나 복잡하 로직일 경우
             *   해당 값이 덮어 씌워질 위험이 많은 방식임
             *  */ 
            // return {
            //     ...this.automaticSugarMixer.makeSugar(baseCoffee),
            //     ...this.cheapMilkSteamer.makeMilk(baseCoffee)                
            // }
            
            // 2 . 설탕을 넣는 로직 추가
            const addSugar: CoffeCup = this.automaticSugarMixer.makeSugar(baseCoffee);            
            // 3 . 우유를 스팀하는 로직 추가
            const steamMilk: CoffeCup = this.cheapMilkSteamer.makeMilk(addSugar);
            // 4 . 반환
            return steamMilk;

        }
    }    
    
    const cheapSteamer = new CheapMilkSteamer();
    const automaticSugarMixer = new AutomaticSugarMixer();
    const ttt = new SweetCaffeLatteMachine(200,cheapSteamer,automaticSugarMixer);
    console.log(ttt);
    console.log(ttt.makeCoffe(2));

    //__Eof__
}