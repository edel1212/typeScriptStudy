{
    type Positon ={
        x : number;
        y : number;
    }

    type Direction = "up" | "down" | "left" | "right";

    let position :Positon = {
        x : 0,
        y : 0,
    }

    function move(direction : Direction): void{
        switch (direction) {
            case "up":
                position.y++;
                break;
            case "down":
                position.y--;
                break;
            case "left":
                position.x--;
                break;
            case "right":
                position.x++;
                break;
            default:
                break;
        }
    }

    move("up");
    console.log(position);
    move("down");
    console.log(position);
    move("left");
    console.log(position);
    move("right");
    console.log(position);
    
}