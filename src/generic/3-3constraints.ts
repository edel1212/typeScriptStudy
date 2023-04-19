/**
 * Generic - constraints(제약)
 * - 제네릭에 들어갈 타입을 강제 하는것
 */
{
    interface Employee{
        pay():void;
    }

    class FullTimeEmployee implements Employee{
        pay(): void {
            console.log(`Full Time work....`);
        }
        public workFullTime(){};
    }

    class PartTimeEmployee implements Employee{
        pay(): void {
            console.log(`Part Time work....`);
        }
        public workPartTime(){};
    }

    /** 나쁜 코드 👎
     * 👉 세부적인 타입을 파라미터로 받은후 
     *    리턴을 추상적인걸로 해버렸기 때문임
     * 
     * ex) 아래 코드 예시로
     *      받을때 : FullTimeEmployee - class
     *      보낼때 : Employee         - interface
     * s
     * 그냥 Employee로 바꿔버림으로 
     * 내부 갖고있던 메서드를 잊어버림
     * - workFullTime()
     * - workPartTime(
     */
    function payBad(employee:Employee):Employee{
        employee.pay();
        return employee;
    }

    /** 개선 코드 👍
     * 제네릭을 사용하고 Employee또는 구현한 클래스를 받게 끔 하였음
     */
    function pay<T extends Employee>(employee:T):T{
        employee.pay();
        return employee;
    }

    //////////////////////////////////////////////////////
    const yoo:FullTimeEmployee = new FullTimeEmployee();
    const gom:PartTimeEmployee = new PartTimeEmployee();
    yoo.workFullTime();
    gom.workPartTime();

    const yooAfterPay = payBad(yoo);    
    // yooAfterPay.FullTimeEmployee(); ❌ 불가능함 Interface를 반환해버림 ...

    // 제네릭을 통해 workPartTime()가 사라지지 않았음
    const gomAfterPay = pay(gom);
    gomAfterPay.workPartTime();
    



    //////////////////////////////////////////////////////

    /**
     * 제네릭 K를 keyof T 로 제한을 둬서 
     * 해당 메서드의 반환겂을 T[K]로 지정이 가능하다.
     */
    function getValue<T,K extends keyof T>(obj:T,key:K):T[K]{
        return obj[key];
    }

    const obj = {name : "yoo",age : 20};
    const obj2 = {animal : "dog"};

    getValue(obj,"name");       // yoo
    getValue(obj,"age");        // 20
    getValue(obj2,"animal");    // dog

    
}