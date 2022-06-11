function init() {
    const element = document.createElement('canvas');
    // element.style.width = `${window.innerWidth}px`;
    // element.style.height = `${window.innerHeight}px`;
    element.width = window.innerWidth;
    element.height = window.innerHeight;
    document.body.appendChild(element);

    const ctx = element.getContext('2d');

    let axiom = 'FX';
    const iterations = 15;

    for (let i = 0; i < iterations; i++) {
        axiom = rebuildAxiom(axiom);
    }

    drawTree(axiom, ctx);
}

function rebuildAxiom(axiom) {
    lexicon = {
        '+': '+',
        '-': '-',
        'F': 'F',
        'X': 'X+YF+',
        'Y': '-FX-Y'
    }
    let tempAxiom = '';
    for (let i = 0; i < axiom.length; i++) {
        tempAxiom += lexicon[axiom[i]];
    }
    return tempAxiom;
}

let drawLine = (ctx, options, time = 500, fps = 50) => {
    return new Promise(function (resolve) {
        const frameTime = 1000 / fps; // setInterval delay. One frame every 1000 / fps ms
        let steps = time / frameTime; // Number of steps for animation from beginning to end
        const optionDelta = {
            'x': (options.tx - options.x) / steps, // Delta X for every step
            'y': (options.ty - options.y) / steps // Delta Y for every step
        };
        let x = options.x;
        let y = options.y;

        let interval = setInterval(() => {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.lineTo(x += optionDelta.x, y += optionDelta.y);
            // ctx.strokeStyle = `rgb(${Math.floor(x % 256)}, ${Math.floor(y % 256)}, ${Math.floor((x + y) % 256)})`; // Changing line color depending on X and Y every step
            ctx.stroke();
            steps--;
            if (steps <= 0) { // If the steps is over then clear the interval and come back to cycle
                clearInterval(interval);
                resolve();
            }
        }, frameTime);
    })
};

async function drawTree(axiom, ctx) {
    let direction = Math.PI / 2; // To right (90 deg)
    const length = 3; // line length
    let x = window.innerWidth / 3; // Start X coordinate
    let y = window.innerHeight / 4; // Start Y coordinate

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 0; i < axiom.length; i++) {
        if (axiom[i] === '+') { // just turn right or left if + or - respectively
            direction += Math.PI / 2;
        } else if (axiom[i] === '-') {
            direction -= Math.PI / 2;
        } else if (axiom[i] === 'F') {
        		// Call Draw line function and wait until it's done
            await drawLine(ctx, {
                'x': x, // current X
                'tx': x += length * Math.sin(direction), // Target X
                'y': y, // current Y
                'ty': y += length * Math.cos(direction) // Target Y
            }, 1, 1000);
        }
    }

    ctx.closePath();
}

// function drawTree(axiom, ctx) {
//     let direction = Math.PI / 2; // To right (90 deg)
//     const length = 4;
//     let x = window.innerWidth / 3;
//     let y = window.innerHeight / 4;

//     ctx.beginPath();
//     ctx.moveTo(x, y);

//     for (let i = 0; i < axiom.length; i++) {
//         if (axiom[i] === '+') {
//             direction += Math.PI / 2;
//         } else if (axiom[i] === '-') {
//             direction -= Math.PI / 2;
//         } else if (axiom[i] === 'F') {
//             x += length * Math.sin(direction);
//                 y += length * Math.cos(direction);
//                 // console.log(x, y);
//                 ctx.lineTo(x, y);
//         }
//     }

//     ctx.stroke();
//     // ctx.fill();
//     ctx.closePath();
// }

init();