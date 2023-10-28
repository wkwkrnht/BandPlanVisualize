var
windowWidth = document.documentElement.clientWidth, // Constant of the window width.
windowHeight = document.documentElement.clientHeight, // Constant of the window height.
displayDirection = '', // Variable for note which direction on the display is wider.
unitWidth = 100,
headerHeight = 0.06 * windowHeight, // Constant to note height of th view.
loading = document.getElementById('loading'); // Constant of the elemnt to explain loading status.

function updateDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    windowWidth = document.documentElement.clientWidth, // Constructor of the window width.
    windowHeight = document.documentElement.clientHeight; // Constructor of the window height.

    if(windowWidth > windowHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

function updateUnitIndicator(){ // Update unit-prefix of the indicator on the view.
    let
    target = document.getElementById('unit'),
    prefix = parseFloat(target.dataset.unitprefix),
    prefixStr = '';

    switch(prefix){ // From value of prefix, detect specific points, and transfering in the format of SI unit.
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
            prefix = Math.log10(prefix);
            prefixStr = '10<sup>' + prefix + '</sup>';
            break;
    }

    target.innerHTML = '[' + prefixStr + 'Hz]';
}

function updateBoxSize(){ // Update a size of each box by unit scaling.
    loading.style.display = 'block';

    const initial = 1000; // This is defined by unit of elemnts from DBs.
    let
    target = document.getElementById('unit'),
    targets = document.getElementsByClassName('box'),
    prefix = parseFloat(target.dataset.unitprefix), // Pull value of unit-prefix of box for now.
    fontSize = (1 / (prefix / initial)); // Transfer to value at the stylesheet.

    for( var i = 0; i < targets.length; i++ ){ // Set basic values of air bands style. If display is as landscape, height is fixed, width is valuable, position is set from left.
        targets[i].style.fontSize = fontSize + 'px';
    }

    loading.style.display = 'none';
}

function updateUnitInt(symbol){ // Update unit-prefix by input.
    const
    amount = 10, // How times will be changed.
    max = 1000000000, // The maximum limit of unit-prefix.
    min = 0.000000001; // The minimum limit of unit-prefix.

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

function moveMainPart(symbol){ // Scroll for the direction done by input.
    let
    target = document.getElementById('unit'),
    unit = parseFloat(target.dataset.unitprefix);
    unit = unit * unitWidth;

    if(this.symbol !== undefined){
        symbol = this.symbol;
    }else if(event.target !== undefined){
        symbol = event.target.innerText;
    }

    switch(symbol){
        case '→':
            window.scrollBy(unit, 0);
            break;
        case '←':
            unit = -1 * unit;
            window.scrollBy(unit, 0);
            break;
        case '↑':
            window.scrollBy(0, unit);
            break;
        case '↓':
            unit = -1 * unit;
            window.scrollBy(0, unit);
            break;
        default:
            break;
    }
}

function updateVisibillity(target){ // Utillity to change a state of visibillity.
    if(target.dataset.visibillity === 'n'){
        target.dataset.visibillity = 'y';
    }else if(target.dataset.visibillity === 'y'){
        target.dataset.visibillity = 'n';
    }
}

function updateVisibilltyFillterMenu(){ // Toggle to show the menu to control which DB appeared.
    let target = document.getElementById('fillter-popup');

    updateVisibillity(target);
}

function fillterDBs(){ // Toggle to control which DB appeared.
    let
    targetName = event.target.dataset.dbname,
    targets = document.getElementsByClassName(targetName);

    loading.style.display = 'block';

    for( var i = 0; i < targets.length; i++ ){ // Set basic values of air bands style. If display is as landscape, height is fixed, width is valuable, position is set from left.
        updateVisibillity(targets[i]);
    }

    loading.style.display = 'none';
}

function calcAmountOfMove(baseline, unit, times){ // Calculate the DOM will move how much.
    return ((baseline * 0.11) + (times * unit * 1.2));
}

function adjustBoxLocation(){ // Set size and position for each air band boxes.
    let targets = document.getElementsByClassName('box'); // List of air band boxes

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

            if( ((d2D < d1D) && (d1D < d2U))  || ((d2D < d1U) && (d1U < d2U)) ){
                number++;
            }
        }

        targets[i].style.top = calcAmountOfMove(windowHeight, 50, number) + 'px';
    }

    loading.style.display = 'none';
}

function main(){ // Main function.
    loading.style.display = 'block';

    updateDisplayDirection();
    updateUnitIndicator();

    updateBoxSize();
    adjustBoxLocation();


    const
    e1 = document.getElementById('scaler-up'),
    e2 = document.getElementById('scaler-down'),
    e3 = document.getElementById('move-left'),
    e4 = document.getElementById('move-right'),
    e5 = document.getElementById('move-up'),
    e6 = document.getElementById('move-down'),
    e7 = document.getElementById('fillter-menu');
    let e8 = document.querySelectorAll('input[checked]'); //name 属性が categories の input 要素（ラジオボタン）の集まり（静的な NodeList）を取得

    e1.addEventListener('click', {symbol: '+', handleEvent: updateUnitInt});
    e1.addEventListener('touchstart', {symbol: '+', handleEvent: updateUnitInt}, {passive: true});
    e2.addEventListener('click', {symbol: '-', handleEvent: updateUnitInt});
    e2.addEventListener('touchstart', {symbol: '-', handleEvent: updateUnitInt}, {passive: true});
    e3.addEventListener('click', moveMainPart);
    e3.addEventListener('touchstart', moveMainPart, {passive: true});
    e4.addEventListener('click', moveMainPart);
    e4.addEventListener('touchstart', moveMainPart, {passive: true});
    e5.addEventListener('click', moveMainPart);
    e5.addEventListener('touchstart', moveMainPart, {passive: true});
    e6.addEventListener('click', moveMainPart);
    e6.addEventListener('touchstart', moveMainPart, {passive: true});
    e7.addEventListener('click', updateVisibilltyFillterMenu);
    e7.addEventListener('touchstart', updateVisibilltyFillterMenu, {passive: true});

    for( var i = 0; i < e8.length; i++ ){ // A loop to set event lisner on each elments to toggle DB visible state.
        e8[i].addEventListener('change', fillterDBs);
    }

    loading.style.display = 'none';
}

window.addEventListener('resize', updateDisplayDirection());
window.addEventListener('load', main()); // Fire main() after loaded whole of the HTML document.