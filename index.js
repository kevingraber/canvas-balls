const canvas = document.getElementById('can');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c short for context
const c = canvas.getContext('2d');

// // x, y, width, height - x & y are relative to the upper left corner
// c.fillStyle = 'rgb(255, 0, 0, 0.1)'
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgb(0, 0, 255, 0.1)'
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgb(0, 255, 0, 0.1)'
// c.fillRect(300, 300, 100, 100);


// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#fa34a3';
// c.stroke();

// // Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for ( let i = 0; i < 100; i++ ) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;

//     const r = Math.random() * 255;
//     const g = Math.random() * 255;
//     const b = Math.random() * 255;

//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI*2, false);
//     c.strokeStyle = `rgb(${r}, ${g}, ${b})`;
//     c.stroke();
// }

const colors = [
    '#EF352E',
    '#F4C53D',
    // '#F4F4F4',
    '#85B3BC',
    '#165059',
];
function getRandomColor() {
    const index = Math.floor(Math.random()*colors.length);
    return colors[index];
}

c.beginPath();
c.arc(200, 200, 30, 0, Math.PI*2, false);
c.strokeStyle = 'blue';
c.stroke();

let x = Math.random() * window.innerWidth;
let y = Math.random() * window.innerHeight;
let dx = (Math.random() - 0.5) * 5;
let dy = (Math.random() - 0.5) * 5;
const radius = 30;

const circ = new Circle(200, 200, dx, dy, radius);

const arr = [];
for ( let i = 0; i < 400; i++ ) {
    let radius = Math.floor((Math.random() * 4) + 1);
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;
    

    const cir = new Circle(x, y, dx, dy, radius);
    arr.push(cir);
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    // circ.draw();

    for ( var i = 0; i < arr.length; i++ ) {
        arr[i].draw();
    }

    // c.beginPath();
    // c.arc(x, y, radius, 0, Math.PI*2, false);
    // c.strokeStyle = 'blue';
    // c.stroke();

    // if(x + radius > window.innerWidth || x - radius < 0) {
    //     dx = dx * -1;
    // }

    // if (y + radius > window.innerHeight || y - radius < 0 ) {
    //     dy = dy * -1;
    // }

    // x += dx;
    // y += dy;
}

const mouse = {
    x: 0,
    y: 0,
 }

animate();



window.addEventListener('mousemove', (event) => {
    const {x, y} = event;
    mouse.x = x;
    mouse.y = y;
});

window.addEventListener('resize', (event) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    const color = getRandomColor();

    this.draw = function() {
        c.beginPath();
        c.arc(this.x,this. y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = color;
        c.stroke();
        c.fillStyle = color;
        c.fill();

        if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = this.dx * -1;
        }
    
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0 ) {
            this.dy = this.dy * -1;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        // console.log(mouse)
        if (
            (mouse.x - this.x < 70) && 
            (mouse.x - this.x > -70) &&
            (mouse.y - this.y < 70) &&
            (mouse.y - this.y > -70)
        ) {
            if (this.radius < 40) {
                this.radius +=1;
            }
        } else if ( this.radius > this.minRadius ) {
            this.radius -=1;
        }
    }
}

