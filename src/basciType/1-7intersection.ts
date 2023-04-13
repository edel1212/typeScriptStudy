{
    /***
     * Intersection Type : &&(AND)로 생각하면 된다, Union과 반대
     */
    type Student = {
        name : string;
        score : number;
    }

    type Worker = {
        empolyeeId : number;
        work : () => void;
    }

    /** 
     * 👉 person 인자값의 타입은 현재 2개로 지정함 
     *    - 따라서 두가지 타입의 모든 정보에 접근이 가능함
     * */
    function internWork(person : Student & Worker){
        // Worker 정보
        console.log(person.empolyeeId);
        console.log(person.work);
        
        // Student 정보
        console.log(person.name);
        console.log(person.score);
    }

    /**
     * 💬 단 그렇기에 넘기는 파라미터값은 
     *    - 두가지 타입이 갖는 모든 값을 넣어줘야한다!
     * 
     * ☠️ 부족하면 컴파일 Error가 발생한다.
     *   -Error Msg : Argument of type '{ name: string; score: number; }' is not 
     *               assignable to parameter of type 'Student & Worker'.
     *               Type '{ name: string; score: number; }' is missing the following
     *               properties from type 'Worker': empolyeeId, work
     */
    internWork({
        name : "yoo",
        score : 100,
        empolyeeId : 1,
        work : ()=> {}
    });
}