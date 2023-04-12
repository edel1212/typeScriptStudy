{
    /** Array */
    const fruits :string[] = ["apple", "banana"];
    const scores :Array<number> = [1,2,3,4,5];

    /** Tuple
     * - 문자열, 숫자 섞어서 받을 수 있음
     */    
    let student : [string, number]; 
    student = ['yoo', 100];
    // index로 접근하는것은 가독성이 좋지 않음 👎
    console.log(student[0]); // yoo
    console.log(student[1]); // 100

    // 아래의 방법을 사용하면 가독성이 좋아짐 👍
    const [name, age] = student;
    console.log(name);
    console.log(name);

}