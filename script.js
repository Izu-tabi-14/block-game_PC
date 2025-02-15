const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');


canvas.width =  400;
canvas.height = 400;

canvas.setAttribute('style','display: block;margin: auto;background-color: #ddd;');


document.body.appendChild(canvas);



const life = {
    number: 0,

    update: function() {
        if(ball.y + ball.height > canvas.height){
            this.number -= 1;
            console.log(this.number);
            if(this.number === 0){
                alert('GAME OVER')
                init();
            }
        }
    }
}


const paddle = {
    x: null,
    y: null,
    width: 100,
    height: 15,
    speed: 0,
    
    update: function() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();

        if(this.x+this.width > canvas.width) this.x = 400 - this.width - 3;
        if(this.x < 0) this.x = 3;
        
        this.x += this.speed;
    }
}

const ball = {
    x: null,
    y: null,
    width: 5,
    height: 5,
    speed: 4,
    dx: null,
    dy: null,



    update: function(){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill(); 

        if(this.x < 0 || this.x+this.width > canvas.width) this.dx *= -1;
        if(this.y < 0 || this.y+this.height > canvas.height) this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;
    }
}
const block = {
    width: null,
    height: 20,
    data: [],

    update: function() {
        this.data.forEach(brick => {
            ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            ctx.stroke();
        })

    }
}
const level = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
]

const init = () => {
    life.number = 5;
    paddle.x = canvas.width / 2 - paddle.width / 2;
    paddle.y = canvas.height - paddle.height;

    ball.x = paddle.x;
    ball.y = paddle.y + ball.height;


    block.width = canvas.width / level[0].length;
    for(let i=0; i<level.length; i++){
        for(let j=0; j<level[i].length; j++){
            if(level[i][j]){
                block.data.push({
                    x: block.width*j,
                    y: block.height*i,
                    width: block.width, 
                    height: block.height
                })
            }
        }
    }

}

const collide = (obj1, obj2) => {

    return obj1.x < obj2.x + obj2.width && 
           obj2.x < obj1.x + obj1.width && 
           obj1.y < obj2.y + obj2.height && 
           obj2.y < obj1.y + obj1.height

}
const loop = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.update();
    ball.update();
    block.update();
    life.update();
    
    if(collide(ball, paddle)){
        ball.dy *= -1;
        ball.y = paddle.y - ball.height;
    }


    block.data.forEach((brick, index) => {
        if(collide(ball, brick)){
            ball.dy *= -1;
            block.data.splice(index, 1); 
        }
    })

    if(block.data.length === 0){
        alert('congratulations!!');
        init();
    }


    document.getElementById('js-life').innerHTML = `❤️：${life.number}`;
    window.requestAnimationFrame(loop);
}


init();
loop();


document.addEventListener('keydown', e => {

    if(e.key === 'ArrowLeft') paddle.speed = -6;
    if(e.key === 'ArrowRight') paddle.speed = 6;
    if(e.key === ' ') {

        console.log(ball.speed);
        ball.dx = ball.speed;
        ball.dy = ball.speed;
    
    }
});


document.addEventListener('keyup', e => paddle.speed = 0);

