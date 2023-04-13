{
    /***
     * Enum 아래와 같이 사용할수 있으나
     * 👎 비추천함 값을 유지하지 못함
     *    ex ) 
     *         let test: Days;
     *         test = Days.Friday;  // 이상없음
      *        test = 100           // 이상없음
      * 
      * 👍  따라서 같은 기능을하는 Union을 사용해주자!!!
      * 
     */
    enum Days {
        Monday,     //0
        Tuesday,    //1
        Wedensday,  //2
        Thursday,   //3
        Friday,     //4
        Satarday    //5
    }
    console.log(Days.Friday);

    // 값을 지정 - 숫자 [ 자동으로 추론하여 값을 정해줌 ]
    enum DaysVerNum {
        Monday = 1,     //1
        Tuesday,        //2
        Wedensday,      //3
        Thursday,       //4
        Friday,         //5
        Satarday        //6
    }
    console.log(DaysVerNum.Friday);

    // 값을 지정 - 문자열 [ 자동으로 추론하여 값을 정하지 못함 ❌ ]
    enum DaysVerStr {
        Monday      = "Mon",     
        Tuesday     = "Tue",        
        Wedensday   = "Wen",        
        Thursday    = "Thu",       
        Friday      = "Fri",                
        Satarday    = "Sat",                   
    }
    console.log(DaysVerStr.Friday);

}