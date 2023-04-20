/**
 * Exception (예외)
 * - 다른 언어에서는 Exceiption Class가 있지만 javascrip에는 없음
 * - 대신 javascript에는 Error Class가 존재함
 * - try - catch를 사용하면 프로그램이 종료되지 않음
 * - 에러의 큰 종류
 *  - 컴파일에러   : 컴파일시 잡아낼수 있는 에러 
 *  - 런타임 에러  : 컴파일시 잡지 못하고 작동중 생성되는 에러 ☠️굉장히 위험☠️
 * 
 * Error(Exception) Handling : try -> catch -> finally
 */
{
    // file을 읽는 기능을 하는 함수
    function readFile(fileName:string):string{
        if(fileName === 'not exist'){
            throw new  Error(`file not exist! ${fileName}`);
        }
        return 'file content!';
    }

    // fileRead 종료함수    
    function closeFile(fileName:string){}

    // Exception Test   👎 
    const fileName = 'not exist';
    //const readFileContent = readFile(fileName);
    //console.log(readFileContent);
    //closeFile(fileName);


    // Exception Test 👍 
    // - 예외 발샐할 부분만 감싸서 써주는것이 좋다!
    // - finally에 필수로 종료될 로직이 있으면 꼭 작성해주자
    //    - catch에서 return을 해버리면 무시되기 때문임.
    // .. logic ...
    try {        
        const readFileContent = readFile(fileName);
        console.log(readFileContent);        
    } catch (error) {
        console.log(`caught Erro!!`); // caught Erro!!
        console.error(error);         // file not exist! ${fileName}
    } finally{
      closeFile(fileName);
    }
    // .. logic ...
}