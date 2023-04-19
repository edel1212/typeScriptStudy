{

    interface Stack{
        push(val:string):void;
        pop():string;
    }

    /**
     * 값을 2개씩 갖는다고 생각하면
     * 잊혀질게 없다.
     */
    type StackObj={
        val:string,
        // 처음등장할때는 비여있으니
        next?:StackObj
    }


    class StackImpl implements Stack{

        private _nowNode?:StackObj;

        push(val: string): void {
            const node:StackObj = {
                val,
                next : this._nowNode
            }
            this._nowNode = node;
        }
        pop(): string {
            if(!this._nowNode){
                throw new Error("비어져 있습니다.");
            }
            const nowNode = this._nowNode;
            this._nowNode = this._nowNode.next
            return nowNode.val;            
        }

    }

}