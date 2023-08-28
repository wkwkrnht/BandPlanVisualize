var
windowWidth = document.documentElement.clientWidth, // Constructor of the window width.
windowHeight = document.documentElement.clientHeight, // Constructor of the window height.
displayDirection = '', // Variable for note which direction on the display is wider.
unitWidth = 100,
headerHeight = 0.13 * windowHeight;

const loading = document.getElementById('loading');

function updateDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    windowWidth = document.documentElement.clientWidth, // Constructor of the window width.
    windowHeight = document.documentElement.clientHeight; // Constructor of the window height.

    if(windowWidth > windowHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

function updateUnitIndicator(){
    let
    target = document.getElementById('unit'),
    prefix = parseFloat(target.dataset.unitprefix),
    prefixStr = 'k';

    switch(prefix){
        case 1:
            prefixStr = '';
            break;
        case 1000:
            prefixStr = 'k';
            break;
        case 1000000:
            prefixStr = 'M';
            break;
        case 1000000000:
            prefixStr = 'G';
            break;
        case 0.001:
            prefixStr = 'm';
            break;
        case 0.000001:
            prefixStr = 'μ';
            break;
        case 0.000000001:
            prefixStr = 'n';
            break;
        default:
            prefixStr = 'k';
            break;
    }

    target.innerText = '[' + prefixStr + 'Hz]';
}

function updateBoxSize(){
    const initial = 1000; // This is defined by unit of elemnts from DBs.
    let
    target = document.getElementById('unit'),
    targets = document.getElementsByClassName('box'),
    prefix = parseFloat(target.dataset.unitprefix),
    fontSize = (1 / (prefix / initial));

    loading.style.display = 'block';

    for( var i = 0; i < targets.length; i++ ){ // Set basic values of air bands style. If display is as landscape, height is fixed, width is valuable, position is set from left.
        targets[i].style.fontSize = fontSize + 'px';
    }

    loading.style.display = 'none';
}

function updateUnitInt(symbol){
    const
    amount = 1000,
    max = 1000000000,
    min = 0.000000001;

    let
    target = document.getElementById('unit'),
    prefix = parseFloat(target.dataset.unitprefix);

    if(this.symbol !== undefined){
        symbol = this.symbol;
    }

    if(symbol == '+'){
        prefix = prefix / amount;
    }else if(symbol == '-'){
        prefix = prefix * amount;
    }

    if(prefix > max){
        prefix = max;
    }else if(prefix < min){
        prefix = min;
    }

    target.dataset.unitprefix = prefix;
    updateUnitIndicator();
    updateBoxSize();
}

function moveMainPart(symbol){
    let
    target = document.getElementById('unit'),
    unit = parseFloat(target.dataset.unitprefix);
    unit = unit * unitWidth;

    if(this.symbol !== undefined){
        symbol = this.symbol;
    }

    if(displayDirection == 'landscape' && symbol == '+'){
        window.scrollBy(unit, 0);
    }else if(displayDirection == 'landscape' && symbol == '-'){
        unit = -1 * unit;
        window.scrollBy(unit, 0);
    }else if(displayDirection == 'portrait' && symbol == '+'){
        window.scrollBy(0, unit);
    }else if(displayDirection == 'portrait' && symbol == '-'){
        unit = -1 * unit;
        window.scrollBy(0, unit);
    }
}

function calcAmountOfMove(baseline, unit, times){ // Calculating the DOM will move how much.
    return ((baseline * 0.11) + (times * unit * 1.2));
}

function adjustBoxLocation(){ // Set size and position for each air band boxes.
    let
    targets = document.getElementsByClassName('box'); // List of air band boxes

    loading.style.display = 'block';

    for( var i = 0; i < targets.length; i++ ){ // Set basic values of air bands style. If display is as landscape, height is fixed, width is valuable, position is set from left.
        let
        d1D = targets[i].dataset.down,
        d1U = targets[i].dataset.up,
        number = 0; // Value of counting of colision

        for( var j = 0; j < i; j++ ){ // Count Colision from sizes of the air band box and others.
            let
            d2D = targets[j].dataset.down, // DOM proparty of others.
            d2U = targets[j].dataset.up; // DOM proparty of others.

            if( ((d1D < d2D) && (d2D < d1U))  || ((d1D < d2U) && (d2U < d1U)) ){
                number++;
            }
        }

        targets[i].style.top = calcAmountOfMove(windowHeight, 50, number) + 'px';
    }

    loading.style.display = 'none';
}

function main(){ // Main function.
    updateDisplayDirection();
    updateUnitIndicator();

    loading.style.display = 'block';

    updateBoxSize();
    adjustBoxLocation();

    loading.style.display = 'none';

    const
    e1 = document.getElementById('scaler-up'),
    e2 = document.getElementById('scaler-down'),
    e3 = document.getElementById('move-up'),
    e4 = document.getElementById('move-down');

    e1.addEventListener('click', {symbol: '+', handleEvent: updateUnitInt});
    e1.addEventListener('touchstart', {symbol: '+', handleEvent: updateUnitInt});
    e2.addEventListener('click', {symbol: '-', handleEvent: updateUnitInt});
    e2.addEventListener('touchstart', {symbol: '-', handleEvent: updateUnitInt});
    e3.addEventListener('click', {symbol: '+', handleEvent: moveMainPart});
    e3.addEventListener('touchstart', {symbol: '+', handleEvent: moveMainPart});
    e4.addEventListener('click', {symbol: '-', handleEvent: moveMainPart});
    e4.addEventListener('touchstart', {symbol: '-', handleEvent: moveMainPart});
}

window.addEventListener('resize', updateDisplayDirection()); //
window.addEventListener('load', main()); // Fire main() after loaded whole of the HTML document.