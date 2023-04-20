/**
 * 이미 TypeScript에서는 타입을 자동으로 바꿔주는 유용한
 * 클래스들이 만들어져있다.
 */
{   
    // 👉 1 . ReadOnly Class - 읽기 전용으로 변경해줌
    type Person = {
        name : string;
        age : number;
    }

    type PersonReadOnly = Readonly<Person>;

    const personReadOnly:PersonReadOnly = {
        name : 'yoo',
        age : 20
    }
    // ❌ personReadOnly.name = '변경되지가 않는다 ReadOnly로 변경되었음';
}

{
    // 👉 2 . Partial Class - 부분 값 변환
    type Person = {
        name : string;
        age : number;
    }   
    const person:Person = {name : 'yoo', age : 20};

    // 나이를 변경
    function updateAge(p:Person, updateAage:Partial<Person>){
        return {...p,...updateAage};
    }

    const changeInfo:Person = updateAge(person, {age:10});
    console.log(changeInfo);    //{ name: 'yoo', age: 10 }
}

{
    // 👉 3 . Pick Class - 원하는 것만 골라서 타입 재생성
    type Person = {
        name : string;
        age : number;
        gender : 'male' | 'female';
    }   
    
    // Pick< 대상 , 원하는 키를 작성 >
    type PersonOnlyAgeAndGender = Pick<Person, 'age' | 'gender'>;

    // name 작성 추가 시 Error
    const ageAndGender:PersonOnlyAgeAndGender = {
        age : 20,
        gender : "female"
    }
}

{
    // 👉 4 . Omit Class - 원하는 것만 골라서 제외 하는것
    type Person = {
        name : string;
        age : number;
        gender : 'male' | 'female';
    }   
    
    // Pick< 대상 , 원하는 키를 작성 >
    type PersonOnlyName = Omit<Person, 'age' | 'gender'>;

    // age, gender 작성 추가 시 Error
    const onlyName:PersonOnlyName = { name : 'name만  작성 가능하다' };
}