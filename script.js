const windowWidth = document.documentElement.clientWidth; // Constructor of the window width.
const windowHeight = document.documentElement.clientHeight; // Constructor of the window height.
const fixedLength = 60; // Constructor of fixed part of box size.
let displayDirection = ''; // Variable for note which direction on the display is wider.

function detectDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    if(windowWidth > windowHeight){
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

function createBox(dataset = '', name = '', up = 0, down = 0){ // Create a box of a air band.
    const width = up - down; // This is width set in style.

    parent = document.getElementById('main'); // Search a area to insert a box.
    let box = document.createElement('div'); // Create a element of a box.
    parent.appendChild(box);

    box.classList.add('box');
    box.classList.add('dataset');
    box.setAttribute('data-down', down); // Set a value to note start-point of a air band.
    box.setAttribute('data-width', width); // Set a value to note width of a air band.
    box.innerText = name;
}

async function createBandTable( section = '' ){ // Create Boxes to each air bands from a dataset.
    const
    // Loading 3GPP dataset.
    data1 = await getCSV('/BandPlanVisualize/3GPPBandPlan.csv'),
    // Searching number of columun of each elements
    ulUpColumun = searchColumunByName(data1, 'ULup'),
    ulDownColumun = searchColumunByName(data1, 'ULdown'),
    dlUpColumun = searchColumunByName(data1, 'DLup'),
    dlDownColumun = searchColumunByName(data1, 'DLdown'),
    nameColumun = searchColumunByName(data1, 'Name'),
    modeColumun = searchColumunByName(data1, 'Mode'),

    // Loading JP dataset.
    data2 = await getCSV('/BandPlanVisualize/JPBandPlan.csv'),
    // Searching number of columun of each elements
    downColumun = searchColumunByName(data2, 'down'),
    upColumun = searchColumunByName(data2, 'up'),
    purposeColumun = searchColumunByName(data2, 'Purpose');

    for( let i = 1; i < data1.length; i++ ){
        let mode = data1[i][modeColumun];
        let name = data1[i][nameColumun];

        switch(mode){ // Detect a air band contains UL and DL by mode indicator.
            case 'FDD':
                const nameU = name + '↑';
                createBox(section, nameU, data1[i][ulUpColumun], data1[i][ulDownColumun]);
                const nameD = name + '↓';
                createBox(section, nameD, data1[i][dlUpColumun], data1[i][dlDownColumun]);
                break;
            case 'SUL':
                name = name + '↑';
                createBox(section, name, data1[i][ulUpColumun], data1[i][ulDownColumun]);
                break;
            case 'TDD':
                name = name + '↑' + '↓';
                createBox(section, name, data1[i][dlUpColumun], data1[i][dlDownColumun]);
                break;
            case 'SDL':
                name = name + '↓';
                createBox(section, name, data1[i][dlUpColumun], data1[i][dlDownColumun]);
                break;
            default: // Error handling which is missing mode.
                console.log('Mode has not set.');
                break;
        }
    }

    const

    for( let i = 1; i < data2.length; i++ ){
        let mode = data2[i][modeColumun];
        let name = data2[i][purposeColumun];

        createBox(section, name, data2[i][upColumun], data2[i][downColumun]);
    }
}

function setBoxStyleAtCSS(){ // Set size and position for each air band boxes.
    const targets = document.getElementsByClassName('box'); // List of air band boxes
    let colides = [];

    switch(displayDirection){
        case 'landscape': // If display is as landscape, height is fixed, width is valuable, position is set from left.
            for( let i = 0; i < targets.length; i++ ){
                targets[i].style.left = targets[i].dataset.down + 'px';
                targets[i].style.height = fixedLength + 'px';
                targets[i].style.width = targets[i].dataset.width + 'px';
            }

            for( let j = 0; j < targets.length; j++ ){
                let number = 0;
                let topValue = '30vh';

                for( let k = 0; k < targets.length; k++ ){
                    if( j !== k ){
                        let d1 = targets[j].getBoundingClientRect();
                        let d2 = targets[k].getBoundingClientRect();

                        if((d1.right > d2.left && d1.left < d2.left) || (d1.right > d2.right && d1.left < d2.right)){
                            number++;
                        }
                    }
                }

                if(number !== 0){
                    topValue = ((windowHeight * 0.3) + (fixedLength * number * 1.2));
                    topValue = topValue.toString() + 'px';
                }

                targets[j].style.top = topValue;
            }
            break;
        case 'portrait': // If display is as portrait, width is fixed, height is valuable, position is set from top.
            for( let i = 0; i < targets.length; i++ ){
                targets[i].style.top = targets[i].dataset.down + 'px';
                targets[i].style.height = targets[i].dataset.width + 'px';
                targets[i].style.width = fixedLength + 'px';
            }
            for( let j = 0; j < targets.length; j++ ){
                let number = 0;
                let leftValue = '30vw';

                for( let k = 0; k < targets.length; k++ ){
                    if( j !== k ){
                        let d1 = targets[j].getBoundingClientRect();
                        let d2 = targets[k].getBoundingClientRect();

                        if((d1.top > d2.top && d1.bottom < d2.top) || (d1.top > d2.bottom && d1.bottom < d2.bottom)){
                            number++;
                        }
                    }
                }

                if(number !== 0){
                    leftValue = ((windowWidth * 0.3) + (fixedLength * number * 1.2));
                    leftValue = leftValue.toString() + 'px';
                }

                targets[j].style.left = leftValue;
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

    setBoxStyleAtCSS();
}

document.onload = main(); // Fire main() after loaded whole of the HTML document.