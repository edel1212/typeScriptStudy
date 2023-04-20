/**
 * Type을 정의 해 놓고 
 * Json의 value를 사용하는것 처럼 해당 
 * 타입을 가져다 쓸수 있다.
 */
{
    type Person = {
        name : string;
        age : number;
        gender : "male" | "female"
    }

    type StringType = Person['name'];  // string

    type NumberType = Person['age']    // number

    type GenderType = Person['gender'] // 'male' or 'female'

    // 내부에서도 사용가능
    type Pet = {
        name   : Person['name'];    // string
        gender : Person['gender'];  // 'male' or 'female'
    }

}