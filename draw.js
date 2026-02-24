
let prevX = null;
let prevY = null;
let isDrawing = false;


function drawLine(x, y) {
    if (prevX !== null && prevY !== null) {
        const line = document.createElement('div');
        line.className = 'line';

        
        const dx = x - prevX;
        const dy = y - prevY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      
        line.style.width = `${length}px`;
        line.style.height = '1px';
        line.style.position = 'absolute';
        line.style.left = `${prevX}px`;
        line.style.top = `${prevY}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0';
        line.style.backgroundColor = 'black'; 

        
        document.body.appendChild(line);
    }

  
    prevX = x;
    prevY = y;
}


document.addEventListener('mousemove', (event) => {
    drawLine(event.clientX, event.clientY);
});


document.addEventListener('touchstart', (event) => {
    if (event.target.tagName === 'A') {
        return; 
    }

    event.preventDefault(); 
    isDrawing = true;
    const touch = event.touches[0];
    prevX = touch.clientX;
    prevY = touch.clientY;
});

document.addEventListener('touchmove', (event) => {
    if (isDrawing) {
        event.preventDefault();
        const touch = event.touches[0];
        drawLine(touch.clientX, touch.clientY);
    }
});

document.addEventListener('touchend', () => {
    isDrawing = false;
    prevX = null;
    prevY = null;
});