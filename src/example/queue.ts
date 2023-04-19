{   
    /**
     * head는 고정이다.
     */
    interface Queue{
        enqueue(value:string):void;
        dequeue():string;
    }

    type QueueNode = {
        readonly value : string,
        next? : QueueNode         
    }

    class QueueImple implements Queue{

        private head? : QueueNode | undefined;
        // Stack과 다르게 tail이 필요함.
        private tail? : QueueNode | undefined;

        // ⭐️ 추가 시
        enqueue(value: string) {            
            // 1 . 노드 생성 {파라미터값 , 현재 존재하는 head}
            const inputNode = {value, next: this.head};
            // 2 . tail 존재 확인 [ 처음들어올 경우 항상 없고 다음 부터는 항상 있음]
            if(!this.tail){ // 👉 tail이 없을 경우
                // 2 - 1 . head에 초기값 등록 최초의 값임
                this.head = inputNode;
                // 2 - 3 . tail에 값 등록 - 계속 변할 것임
                this.tail = inputNode;
            } else {       // 👉 tail이 있을 경우
                // 2 - 4 . tail.next에 노드 값 변경 근데 왜 ?? this.haed.next에도 들어가 ???
                this.tail.next = inputNode;
                // 2 - 5 . tail 값 변경
                this.tail = inputNode;
            }
        }

        dequeue(): string {            
            if(!this.head) throw new Error("Error!!");
            
            // 현재의 해드를 바라봄 - 최초의 해드
            const removeNode = this.head;

            /**
             * 둘이 같아질 경우는 값이 값이 없을 경우 뿐임
             *  - 이유 ?
             *    - 소모 시 head 값만 변경되기 떄문임
             */
            if(this.head === this.tail)    {
                this.head = undefined;
                this.tail = undefined;
            } else {
                // 바라보는 head 변경
                this.head = this.head.next;
            }

            return removeNode.value;
        }
    }

    const queue:Queue = new QueueImple();
    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("3");
    queue.enqueue("4");
    queue.enqueue("5");
   
    // console.log(queue.dequeue());
    // console.log(queue.dequeue());
    // console.log(queue.dequeue());
    // console.log(queue.dequeue());
    // console.log(queue.dequeue());
    
   

}