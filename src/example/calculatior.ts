{

    type CalcOjb = {
        type : "add" | "substract" | "multiply" | "divide" | "remainder";  
        num1 : number;
        num2 : number;
    }

    function calculate(calcOjb : CalcOjb):number{
        switch (calcOjb.type) {
            case "add":
                return calcOjb.num1 + calcOjb.num2
            case "substract":
                return calcOjb.num1 - calcOjb.num2
            case "multiply":
                return calcOjb.num1 * calcOjb.num2
            case "divide":
                return calcOjb.num1 / calcOjb.num2    
            case "remainder":
                return calcOjb.num1 % calcOjb.num2                    
            default:
                return 0;
        }
    }

    console.log(calculate({type: "add", num1 : 1, num2 : 3}));
    console.log(calculate({type: "substract", num1 : 3, num2 : 1}));
    console.log(calculate({type: "multiply", num1 : 4, num2 : 2}));
    console.log(calculate({type: "divide", num1 : 4, num2 : 2}));
    console.log(calculate({type: "remainder", num1 : 5, num2 : 2}));

}