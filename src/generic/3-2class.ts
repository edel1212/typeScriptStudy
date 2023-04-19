{
    interface Either<L, R> {
        left : ()=> L;
        right : ()=> R;
    }

    class SimpleEither<L, R> implements Either<L, R>{
        constructor(private leftValue : L , private rightVale : R){};

        public left():L{
            return this.leftValue;
        }
        public right():R{
            return this.rightVale;
        }
    }

    ///////////////////////////////////////
    const either:Either<string, number[]> = new SimpleEither("yoo",[1,2,3]);
    const either2:Either<number, number> = new SimpleEither(1,1);


}