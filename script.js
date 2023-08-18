const
windowWidth = document.documentElement.clientWidth, // Constructor of the window width.
windowHeight = document.documentElement.clientHeight, // Constructor of the window height.
fixedLength = 60, // Constructor of fixed part of box size.
fixedLengthToStyle = fixedLength.toString() + 'px',
headerHeight = 0.13 * windowHeight;

let
displayDirection = '', // Variable for note which direction on the display is wider.
tableAreaSize = 0, // Value to note actual this page size.
reservedDOM = document.createDocumentFragment();

function detectDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    if(windowWidth > windowHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

async function calcAmountOfMove(baseline = 0, unit = 0, times = 0){ // Calculating the DOM will move how much.
    return ((baseline * 0.3) + (times * unit * 1.2));
}

async function getCSV( dir = '' ){ // Get a CSV file and parse into array.
    return await fetch(dir) // Get a CSV file.
    .then(
        response => {
            return response.text(); // Parse into strings.
        }
    )
    .then(
        text => {
            return convertCSVtoArray(text); // Parse into array.
        }
    )
    .catch(
        err => {
            console.log(err); // Error handling.
        }
    );
}

function convertCSVtoArray( text = '' ){ // Parse a CSV file input as strings into array.
    let result = []; // The array to save the result.
    const tmp = text.split('\n'); // Newline is marked as indicator, to split by row.

    for( let i = 0; i < tmp.length; i++ ){ // Kanma is marked as indicator, to split by columun.
        result[i] = tmp[i].split(',');
    }

    return result;
}

function searchColumunByName( array = [], key = ''){ // From 0 row, searching number of columuns by name.
    return array[0].indexOf(key);
}

async function createBox(dataset = '', name = '', up = 0, down = 0){ // Create a box of a air band.
    const width = up - down; // This is width set in style.

    let box = document.createElement('div'); // Create a element of a box.
    box.classList.add('box'); // Class name of air band boxes.
    box.classList.add(dataset); // Class name from data set.
    box.setAttribute('data-down', down); // Set a value to note start-point of a air band.
    box.setAttribute('data-width', width); // Set a value to note width of a air band.
    box.innerText = name;

    reservedDOM.appendChild(box);  // Save a box at List of DOM.
}

async function refreshTableAreaSize( up = 0 ){ // Expand value to note actual this page size.
    up = parseFloat(up);

    if(up > tableAreaSize){
        tableAreaSize = up;
    }
}

async function createBandElements( section = '', dataset = []){ // Allocate this box at the point.
    const length = dataset.length;

    if( section === '3GPP' ){
        const
        ulUpColumun = searchColumunByName(dataset, 'ULup'),
        ulDownColumun = searchColumunByName(dataset, 'ULdown'),
        dlUpColumun = searchColumunByName(dataset, 'DLup'),
        dlDownColumun = searchColumunByName(dataset, 'DLdown'),
        cellularNameColumun = searchColumunByName(dataset, 'Name'),
        modeColumun = searchColumunByName(dataset, 'Mode');

        for( let i = 1; i < length; i++ ){ // Create air band boxes from 3GPP dataset.
            let mode = dataset[i][modeColumun];
            let name = dataset[i][cellularNameColumun];

            if(mode !== 'SUL'){
                const nameD = name + '↓';

                refreshTableAreaSize(dataset[i][dlUpColumun]);

                createBox('3GPP', nameD, dataset[i][dlUpColumun], dataset[i][dlDownColumun]);
            }

            if((mode === 'SUL') || (mode === 'FDD')){
                const nameU = name + '↑';

                refreshTableAreaSize(dataset[i][ulUpColumun]);

                createBox('3GPP', nameU, dataset[i][ulUpColumun], dataset[i][ulDownColumun]);
            }
        }
    }else if( section === 'JP' ){
        const
        jpDownColumun = searchColumunByName(dataset, 'down'),
        jpUpColumun = searchColumunByName(dataset, 'up'),
        jpPurposeColumun = searchColumunByName(dataset, 'Purpose');

        for( let j = 1; j < length; j++ ){ // Create air band boxes from JP dataset.
            refreshTableAreaSize(dataset[j][jpUpColumun]);

            createBox('JP', dataset[j][jpPurposeColumun], dataset[j][jpUpColumun], dataset[j][jpDownColumun]);
        }
    }else if( section === 'ISM' ||  section === 'ETSI' ||  section === 'WiFi' ){
        const
        downColumun = searchColumunByName(dataset, 'Down'),
        upColumun = searchColumunByName(dataset, 'Up'),
        nameColumun = searchColumunByName(dataset, 'Name');

        for( let k = 1; k < length; k++ ){ // Create air band boxes from ISM dataset.
            refreshTableAreaSize(dataset[k][upColumun]);

            createBox(section, dataset[k][nameColumun], dataset[k][upColumun], dataset[k][downColumun]);
        }
    }
}

async function createBandTable(){ // Create Boxes to each air bands from a dataset.
    const
    data1 = await getCSV('/BandPlanVisualize/3GPPBandPlan.csv'), // Loading 3GPP dataset.
    data2 = await getCSV('/BandPlanVisualize/JPBandPlan.csv'), // Loading JP dataset.
    data3 = await getCSV('/BandPlanVisualize/ISMBandPlan.csv'), // Loading ISM dataset.
    data4 = await getCSV('/BandPlanVisualize/ETSIBandPlan.csv'), // Loading ETSI dataset.
    data5 = await getCSV('/BandPlanVisualize/Wi-FiBandPlan.csv'); // Loading Wi-Fi dataset.

    if( data1 !== undefined ){
        createBandElements('3GPP', data1);
    }
    if( data2 !== undefined ){
        createBandElements('JP', data2);
    }
    if( data3 !== undefined ){
        createBandElements('ISM', data3);
    }
    if( data4 !== undefined ){
        createBandElements('ETSI', data4);
    }
    if( data5 !== undefined ){
        createBandElements('WiFi', data5);
    }
}

async function setBoxStyleAtCSS(){ // Set size and position for each air band boxes.
    const targets = document.getElementsByClassName('box'); // List of air band boxes
    const length = targets.length;

    switch(displayDirection){
        case 'landscape':
            for( let i = 0; i < length; i++ ){ // Set basic values of air bands style. If display is as landscape, height is fixed, width is valuable, position is set from left.
                const
                d1P = targets[i].dataset.down,
                d1W = targets[i].dataset.width;
                let
                number = 0, // Value of counting of colision
                topValue = '30vh'; // Initial value of position at direction to fix.

                for( let j = 0; j < length; j++ ){ // Count Colision from sizes of the air band box and others.
                    if( i !== j ){
                        const
                        d2P = targets[j].dataset.down, // DOM proparty of others.
                        d2W = targets[j].dataset.width; // DOM proparty of others.

                        if( ((d1P < d2P) && (d2P < (d1P + d1W)))  || ((d1P < (d2P + d2W)) && ((d2P + d2W) < (d1P + d1W))) ){
                            number++;
                        }
                    }
                }

                if(number !== 0){ // If this is hitting with someone, set the style to adjust the box at fixed direction.
                    topValue = calcAmountOfMove(windowHeight, fixedLength, number);
                    topValue = topValue.toString() + 'px';
                }

                targets[j].style.top = topValue;
                targets[i].style.left = d1P + 'px';
                targets[i].style.height = fixedLengthToStyle;
                targets[i].style.width = d1W + 'px';
            }
            break;
        case 'portrait':
            for( let i = 0; i < length; i++ ){ // Set basic values of air bands style. If display is as portrait, width is fixed, height is valuable, position is set from top.
                const
                d1P = targets[i].dataset.down,
                d1W = targets[i].dataset.width;
                let
                topValue = headerHeight + parseFloat(d1P),
                number = 0, // Count of colision
                leftValue = '30vw'; // Initial value of position at fixed direction.

                for( let j = 0; j < length; j++ ){ // Count Colision from sizes of the air band box and others.
                    if( i !== j ){
                        const
                        d2P = targets[j].dataset.down, // DOM proparty of others.
                        d2W = targets[j].dataset.width; // DOM proparty of others.

                        if( ((d1P < d2P) && (d2P < (d1P + d1W)))  || ((d1P < (d2P + d2W)) && ((d2P + d2W) < (d1P + d1W))) ){
                            number++;
                        }
                    }
                }

                if(number !== 0){ // If this is hitting with someone, set the style to adjust.
                    leftValue = calcAmountOfMove(windowWidth, fixedLength, number);
                    leftValue = leftValue.toString() + 'px';
                }

                targets[i].style.top = topValue + 'px';
                targets[j].style.left = leftValue;
                targets[i].style.height = targets[i].dataset.width + 'px';
                targets[i].style.width = fixedLengthToStyle;
            }
            break;
        default:
            break;
    }
}

async function createRuler(){
    const
    unitOfRuler = 1000, // Unit size of the ruler.
    timesToWrite = tableAreaSize / unitOfRuler,
    unitOfRulerToStyle = unitOfRuler.toString() + 'px';

    switch(displayDirection){ // Allocate this box at the point.
        case 'landscape':
            for( let i = 0; i < timesToWrite; i++ ){
                let
                freq = i * unitOfRuler,
                box = document.createElement('div'); // Create a element of a box.

                box.classList.add('ruler'); // Class name of ruler.
                box.innerText = freq + '[kHz]'; // Insert the label of this.
                box.style.height = fixedLengthToStyle;
                box.style.width = unitOfRulerToStyle;
                box.style.left = freq + 'px';
                box.style.top = '20vh';

                reservedDOM.appendChild(box);  // Save a box at List of DOM.
            }
            break;
        case 'portrait':
            for( let i = 0; i < timesToWrite; i++ ){
                let
                freq = i * unitOfRuler,
                box = document.createElement('div'); // Create a element of a box.

                box.classList.add('ruler'); // Class name of ruler.
                box.innerText = freq + '[kHz]'; // Insert the label of this.
                freq = headerHeight + freq;
                box.style.height = unitOfRulerToStyle;
                box.style.width = fixedLengthToStyle;
                box.style.top = freq + 'px';
                box.style.left = '0';

                reservedDOM.appendChild(box);  // Save a box at List of DOM.
            }
            break;
        default:
            break;
    }
}

function finishCreateElements(){
    //
}

async function main(){ // Main function.
    let parent = document.getElementById('main'); // Search a area to insert a box.

    await createBandTable();

    await createRuler();

    await parent.appendChild(reservedDOM);

    setBoxStyleAtCSS();

    //finishCreateElements();
}

window.addEventListener('resize', detectDisplayDirection()); //
window.addEventListener('load', main()); // Fire main() after loaded whole of the HTML document.