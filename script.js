const fixedLength = '60px'; // Constructor of fixed part of box size.
let displayDirection = ''; // Variable for note which direction on the display is wider.

function detectDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    if(window.innerWidth > window.innerHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

async function getCSV( dir = '' ){ // Get a CSV file and parse into array.
    return await fetch(dir) // Get a CSV file.
    .then(
        response => {
            return response.text();
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

function createBox(parent = '', name = '', up = 0, down = 0){ // Create a box of a air band.
    const width = up - down; // This is width set in style.

    parent = document.getElementById(parent); // Search a area to insert a box.
    let box = document.createElement('div'); // Create a element of a box.
    parent.appendChild(box);

    box.setAttribute('class', 'box');
    box.setAttribute('data-down', down); // Set a value to note start-point of a air band.
    box.setAttribute('data-width', width); // Set a value to note width of a air band.
    box.innerText = name;
}

async function createBandTable( section = '' ){ // Create Boxes to each air bands from a dataset.
    switch(section){ // Detect dataset from input.
        case '3GPP':
            const data = await getCSV('/BandPlanVisualize/3GPPBandPlan.csv'), // Loading dataset.
            // Searching number of columun of each elements
            ulUpColumun = searchColumunByName(data, 'ULup'),
            ulDownColumun = searchColumunByName(data, 'ULdown'),
            dlUpColumun = searchColumunByName(data, 'DLup'),
            dlDownColumun = searchColumunByName(data, 'DLdown'),
            nameColumun = searchColumunByName(data, 'Name'),
            modeColumun = searchColumunByName(data, 'Mode');

            for( let i = 1; i < data.length; i++ ){
                let mode = data[i][modeColumun];
                let name = data[i][nameColumun];

                switch(mode){ // Detect a air band contains UL and DL by mode indicator.
                    case 'FDD':
                        const nameU = name + '↑';
                        createBox(section, nameU, data[i][ulUpColumun], data[i][ulDownColumun]);
                        const nameD = name + '↓';
                        createBox(section, nameD, data[i][dlUpColumun], data[i][dlDownColumun]);
                        break;
                    case 'SUL':
                        name = name + '↑';
                        createBox(section, name, data[i][ulUpColumun], data[i][ulDownColumun]);
                        break;
                    case 'TDD':
                        name = name + '↑';
                        name = name + '↓';
                        createBox(section, name, data[i][dlUpColumun], data[i][dlDownColumun]);
                        break;
                    case 'SDL':
                        name = name + '↓';
                        createBox(section, name, data[i][dlUpColumun], data[i][dlDownColumun]);
                        break;
                    default: // Error handling which is missing mode.
                        console.log('Mode has not set.');
                        break;
                }
            }
            break;
        case 'JP':
            break;
        default:
            break;
    }
}

function setBasicBoxStyleAtCSS(){ // Set size and position for each air band boxes.
    const targets = document.getElementsByClassName('box'); // List of air band boxes

    switch(displayDirection){
        case 'landscape': // If display is as landscape, height is fixed, width is valuable, position is set from left.
            for( let i = 0; i < targets.length; i++ ){
                targets[i].style.top = 'calc((100vh - var(--header-height)) / 3)';
                targets[i].style.left = targets[i].dataset.down + 'px';
                targets[i].style.height = fixedLength;
                targets[i].style.width = targets[i].dataset.width + 'px';
            }
            break;
        case 'portrait': // If display is as portrait, width is fixed, height is valuable, position is set from top.
            for( let i = 0; i < targets.length; i++ ){
                targets[i].style.top = targets[i].dataset.down + 'px';
                targets[i].style.left = 'calc(100vw / 3)';
                targets[i].style.height = targets[i].dataset.width + 'px';
                targets[i].style.width = fixedLength;
            }
            break;
        default:
            break;
    }
}

async function tuneingBoxColision(){
    const sources = document.getElementsByClassName('box'); // List of air band boxes
    let targets = [];
    let number = 1;
    let d1, d2;

    for( let i = 0; i < sources.length; i++ ){
        for( let j = 0; j < sources.length; i++ ){
            if( i !== j ){
                d1 = await sources[i].getBoundingClientRect();
                d2 = await sources[j].getBoundingClientRect();

                Promise.all([d1, d2]).then(() => {
                    if(!(d1.top > d2.bottom || d1.right < d2.left || d1.bottom < d2.top || d1.left > d2.right)){
                        targets.push([i, number]);
                        number++;
                    }
                });
            }
        }
    }

    switch(displayDirection){
        case 'landscape': // If display is as landscape, height is fixed, width is valuable, position is set from left.
            for( let i = 0; i < targets.length; i++ ){
                targets[i][0].style.top = targets[i][0].style.top + ((fixedLength * targets[i][1]) / 2) + 'px';
            }
            break;
        case 'portrait': // If display is as portrait, width is fixed, height is valuable, position is set from top.
            for( let i = 0; i < targets.length; i++ ){
                targets[i][0].style.top = targets[i][0].style.top + ((fixedLength * targets[i][1]) / 2) + 'px';
            }
            break;
        default:
            break;
    }
}

async function main(){ // Main function.
    detectDisplayDirection();

    await createBandTable('3GPP');
    await createBandTable('JP');

    setBasicBoxStyleAtCSS();
    tuneingBoxColision();
}

document.onload = main(); // Fire main() after loaded whole of the HTML document.