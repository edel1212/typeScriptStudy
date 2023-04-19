
{
    interface Stack<T> {
        readonly size: number;
        push(value: T): void;
        pop(): T;
      }
      
      type StackNode<T> = {
        readonly value: T;
        readonly next?: StackNode<T>;
      };

    class StackImpl<T> implements Stack<T>{
        // 내부에서만 사용한다는 의미로 "_"를 사용하면된다.
        private _size: number = 0;        

        // ✅ 해드가 처음에는 없을수도 있으니 Optional 체이닝은 필수다!
        private head?:StackNode<T>;

        /***
         * ❌ 내가 하려던 방법..
         * 어떻게 여러개를 사용하지 했었는데
         * 이렇게 맴머 변수로 쓰면 불가능하다 당연히..
         */
        //private _node:StackNode;  👎

        get size(){
            return this._size;
        }
        public push(value: T): void {            
            const node: StackNode<T> = { value, next: this.head };
            this.head = node;
            this._size++;
        }
        /**
         * 💬 주의 사항
         * "===" 가 무조건 좋은게 아니다.
         * 좀 더 목적에 맞게끔 사용하는것이 중요하다.
         * 
         * ex)
         *  null == undefined 👍
         *  null === undefined 👎
         *  > 위와 같이  "==" 하나만 써서 두가지를 동시에 체크가 가능하다.
         */
        pop(): T {
            if (this.head == null) {
              throw new Error('Stack is empty!');
            }
            const node = this.head;
            this.head = node.next;
            this._size--;
            return node.value;
          }    
    }

    const stack:Stack<string> = new StackImpl();
    stack.push("yoo1");
    stack.push("yoo2");
    stack.push("yoo3");
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.pop());

    const stackNum:Stack<number> = new StackImpl();
    stackNum.push(1);
    stackNum.push(2);
    stackNum.push(3);
    console.log(stackNum.pop());
    console.log(stackNum.pop());
    console.log(stackNum.pop());

}