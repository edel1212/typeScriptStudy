{
    const x = {};
    const y = {};
    console.log(x);
    console.log(y);

    /** **************************
     * 둘다 prototype을 가지고있음 [Object]
     * **************************/

    // 👉 선언하지 않은 메서드가 사용 가능하다
    console.log(x.toString());
    console.log(x.valueOf());

    // 👉 같은 Property를 상속 받고있다
    console.log(x.__proto__ === y.__proto__); //true


    ////////////////////////////////////////////

    /** ***********************************
     * 배열도 prototype을 가지고있음
     * 단 위와 다르게 [[Prototype]]:Array 이다.
     * 💬 주요 포인트
     * - Array의 프로토타입을 보면 결과적으로 
     *   [Object]를 상속 받고 있다
     * ***********************************/
    const arr = [];
    console.log(arr); 
    // 👉 마찬가지로 선언하지 않은 메서드가 사용 가능하다
    arr.push(1);
    arr.push(2);
    arr.pop(1);
    console.log(arr); 

    console.clear();


    ////////////////////////////////////////////
    
    // Instance Level에서 메서드 생성
    function CoffeeMachine(beans){
        // Instance memeber level
        this.beans = beans;
        this.makeCoffee = (shots) => {
            console.log("making....");
        }
    }
    
    // Prototype Level에서 메서드 생성
    CoffeeMachine.prototype.makeCoffeeProto = (shots) => {
        console.log("making coffee Proto Level");
    }

    const machine1 = new CoffeeMachine(10);
    const machine2 = new CoffeeMachine(20);
    console.log(machine1);
    console.log(machine2);
    console.log(machine1 === machine2); // false
    console.log(machine1.makeCoffee());
    console.log(machine2.makeCoffeeProto());


    ///////////////////////////////////////////

     /** **************************
     * prototype을 이용한 상속
     * **************************/

    function LatteMachine(milke){
        this.milke = milke;
    }

    LatteMachine.prototype =  Object.create(CoffeeMachine.prototype);
    const latteMachine = new LatteMachine("Milke");
    latteMachine.makeCoffeeProto(); // makeCoffeeProto()가 사용 가능해짐
}