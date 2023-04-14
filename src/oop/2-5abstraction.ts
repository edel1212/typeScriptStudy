{
    /***
     *  💬  abstraction(추상화) ?
     *  - 외부에서 어떤 형태로, 공통적으로 어떻게 이 클래스를 이용하게 할것인가 정하는것
     *    쉽게 말해 보여주고싶은것만 보여주게 하는것이다.
     *      - 여러 방법이 존재함
     *      - 인터페이스를 통해 구현 
     *      - 추상 클래스를 사용
     *      - 접근제어자를 통해 은닉 
     */

    /****************************************************/
    /********** 접근 제어자를 사용하여 은닉하는 방식 ************/
    /****************************************************/
    type CoffeCup = {
        shots : number;
        hasMilik : boolean;
    }

    class CoffeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        private constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        };

        public static makeInstance(coffeBeans : number){
            return new CoffeMaker(coffeBeans);
        }

        /**
         * 커피콩 채움
         * @param coffeBeans 
         */
        public fillCoffeeBeans(coffeBeans : number){
            if(coffeBeans < 0) throw new Error("잘못된 값입니다.");
            this.coffeBeans += coffeBeans;
        }

        /** 
         *  Validation Chekc 및 샷의 개수만큼 커피콩 소모
         */
        private grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMaker.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMaker.BEANS_GRAMM_PER_SHOT;
        }

        /**
         * 결과 반환
         */
        private extract(shots : number){
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
    
    const coffee = CoffeMaker.makeInstance(100);
    /**
     * ❌ private으로 지정하여 접근 범위를 줄였다
     *    이와같이 내가 원하는 범위내에서 사용하게 끔
     *    하는것이 추상화이다.
     * */
    //coffee.grindBeans(10)  
    //coffee.extract(10)  
    coffee.makeCoffe(2);
    

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    /****************************************************/
    /************* Interface를 사용하는 방식 ***************/
    /****************************************************/

    interface IcoffeMaker{
        makeCoffe(shots: number):CoffeCup;
    }

    interface CommercialCoffeeMaker{
        makeCoffe(shots: number):CoffeCup;
        fillCoffeeBeans(beabs:number):void;
        clear():void;
    }

    class CoffeMakerImpl implements IcoffeMaker,CommercialCoffeeMaker{
        private static readonly BEANS_GRAMM_PER_SHOT : number = 7; 
        private coffeBeans :number;                       

        private constructor(coffeBeans : number){
            this.coffeBeans = coffeBeans;
        }
        
        public static makeInstance(coffeBeans : number){
            return new CoffeMakerImpl(coffeBeans);
        }

        public fillCoffeeBeans(coffeBeans : number):void{
            if(coffeBeans < 0) throw new Error("잘못된 값입니다.");
            this.coffeBeans += coffeBeans;
        }

        public clear(): void {
            console.log("clean CofeeMachine");
        }

        private grindBeans(shots:number){
            console.log(`${shots}잔에 필요한 커피콩 갈기`);            
            if(this.coffeBeans < shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT){
                throw new Error("커피콩의 양이 부족합니다.")
            }            
            this.coffeBeans -= shots * CoffeMakerImpl.BEANS_GRAMM_PER_SHOT;
        }

        private extract(shots : number){
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
    
    // 👉 타입이 CoffeMakerImpl로 사용
    const makerVerInterface: CoffeMakerImpl = CoffeMakerImpl.makeInstance(10);
    makerVerInterface.fillCoffeeBeans(200);
    makerVerInterface.makeCoffe(2);
    makerVerInterface.clear();

    // 👉 다형성을 사용해서 Interface를 타입으로 사용
    const makerVerPolymore: IcoffeMaker = CoffeMakerImpl.makeInstance(10);
    // makerVerPolymore.fillCoffeeBeans(200);  ❌ 사용 불가능 Interface에 선언되어 있지 않기 때문이다.
    // ✅ makerVerPolymore.makeCoffe(20);   << 에러는 없으나 런타임 에러 커피콩이 업성 ...

    // 👉 다형성 CommercialCoffeeMaker 사용 2개를 impl 시킴
    const makerVerInterface2: CommercialCoffeeMaker = CoffeMakerImpl.makeInstance(10);
    makerVerInterface2.fillCoffeeBeans(200);
    makerVerInterface2.makeCoffe(2);
    makerVerInterface2.clear();



    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    /**********************************************************/
    /************* Interface를 사용하는 방식 (응용) ****************/
    /*********************************************************/

    class AmateureBarista{
        constructor(private coffeMachine : IcoffeMaker){};
        public makeCoffee(){
            // 한가지 메서드 밖에 사용 못함 
            // IcoffeMaker - interface에서 한가지 메서드만 가지고 있기 때문
            const coffee = this.coffeMachine.makeCoffe(20);
            console.log(coffee);
        }
    }

    class ProBarista{
        constructor(private coffeMachine : CommercialCoffeeMaker){};
        public makeCoffee(){            
            // CommercialCoffeeMaker - 추상화한 메서드 사용 가능
            const coffee = this.coffeMachine.makeCoffe(20);
            console.log(coffee);
            this.coffeMachine.fillCoffeeBeans(2000);
            this.coffeMachine.clear();            
        }
    }

    // 아마추어는 커피 생성만 가능
    const amateure = new AmateureBarista(makerVerPolymore); 
    // ✅  amateure.makeCoffee();  커피 콩이 없어서 런타임 에러..

    // 프로는 전부다 가능
    const pro      = new ProBarista(makerVerInterface2);
    pro.makeCoffee();
    //__Eof__
}