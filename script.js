const windowWidth = document.documentElement.clientWidth; // Constructor of the window width.
const windowHeight = document.documentElement.clientHeight; // Constructor of the window height.
const fixedLength = 60; // Constructor of fixed part of box size.
let displayDirection = ''; // Variable for note which direction on the display is wider.
let tableAreaSize = 0; // Value to note actual this page size.

function detectDisplayDirection(){ // For set styles on elements, detect which direction on the display is wider.
    if(windowWidth > windowHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

function calcAmountOfMove(baseline = 0, unit = 0, times = 0){ // Calculating the DOM will move how much.
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

function createBox(dataset = '', name = '', up = 0, down = 0){ // Create a box of a air band.
    const width = up - down; // This is width set in style.

    let parent = document.getElementById('main'); // Search a area to insert a box.
    let box = document.createElement('div'); // Create a element of a box.
    parent.appendChild(box);

    box.classList.add('box'); // Class name of air band boxes.
    box.classList.add(dataset); // Class name from data set.
    box.setAttribute('data-down', down); // Set a value to note start-point of a air band.
    box.setAttribute('data-width', width); // Set a value to note width of a air band.
    box.innerText = name;
}

async function refreshTableAreaSize(up = 0){ // Expand value to note actual this page size.
    if(up > tableAreaSize){
        console.log('before');
        console.log(tableAreaSize);
        tableAreaSize = up;
        console.log('after');
        console.log(tableAreaSize);
    }
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
    jpDownColumun = searchColumunByName(data2, 'down'),
    jpUpColumun = searchColumunByName(data2, 'up'),
    jpPurposeColumun = searchColumunByName(data2, 'Purpose'),

    // Loading ISM dataset.
    data3 = await getCSV('/BandPlanVisualize/ISMBandPlan.csv'),
    // Searching number of columun of each elements
    ismDownColumun = searchColumunByName(data3, 'Down'),
    ismUpColumun = searchColumunByName(data3, 'Up'),
    ismNameColumun = searchColumunByName(data3, 'Name'),

    // Loading ETSI dataset.
    data4 = await getCSV('/BandPlanVisualize/ETSIBandPlan.csv'),
    // Searching number of columun of each elements
    etsiDownColumun = searchColumunByName(data4, 'Down'),
    etsiUpColumun = searchColumunByName(data4, 'Up'),
    etsiNameColumun = searchColumunByName(data4, 'Name'),

    // Loading Wi-Fi dataset.
    data5 = await getCSV('/BandPlanVisualize/Wi-FiBandPlan.csv'),
    // Searching number of columun of each elements
    wifiDownColumun = searchColumunByName(data5, 'Down'),
    wifiUpColumun = searchColumunByName(data5, 'Up'),
    wifiNameColumun = searchColumunByName(data5, 'Name');

    for( let i = 1; i < data1.length; i++ ){ // Create air band boxes from 3GPP dataset.
        let mode = data1[i][modeColumun];
        let name = data1[i][nameColumun];

        if(mode !== 'SUL'){
            const nameD = name + '↓';
            createBox('3GPP', nameD, data1[i][dlUpColumun], data1[i][dlDownColumun]);

            await refreshTableAreaSize(data1[i][dlUpColumun]);
        }

        if((mode === 'SUL') || (mode === 'FDD')){
            const nameU = name + '↑';
            createBox('3GPP', nameU, data1[i][ulUpColumun], data1[i][ulDownColumun]);

            await refreshTableAreaSize(data1[i][ulUpColumun]);
        }
    }

    for( let j = 1; j < data2.length; j++ ){ // Create air band boxes from JP dataset.
        createBox('JP', data2[j][jpPurposeColumun], data2[j][jpUpColumun], data2[j][jpDownColumun]);

        await refreshTableAreaSize(data2[j][jpUpColumun]);
    }

    for( let k = 1; k < data3.length; k++ ){ // Create air band boxes from ISM dataset.
        createBox('ISM', data3[k][ismNameColumun], data3[k][ismUpColumun], data3[k][ismDownColumun]);

        await refreshTableAreaSize(data3[k][ismUpColumun]);
    }

    for( let l = 1; l < data4.length; l++ ){ // Create air band boxes from ETSI dataset.
        createBox('ETSI', data4[l][etsiNameColumun], data4[l][etsiUpColumun], data4[l][etsiDownColumun]);

        await refreshTableAreaSize(data4[l][etsiUpColumun]);
    }

    for( let m = 1; m < data5.length; m++ ){ // Create air band boxes from JP dataset.
        createBox('WiFi', data5[m][wifiNameColumun], data5[m][wifiUpColumun], data5[m][wifiDownColumun]);

        await refreshTableAreaSize(data5[m][wifiUpColumun]);
    }
}

function setBoxStyleAtCSS(){ // Set size and position for each air band boxes.
    const targets = document.getElementsByClassName('box'); // List of air band boxes
    let colides = [];

    switch(displayDirection){
        case 'landscape':
            for( let i = 0; i < targets.length; i++ ){ // Set basic values of air bands style. If display is as landscape, height is fixed, width is valuable, position is set from left.
                targets[i].style.left = targets[i].dataset.down + 'px';
                targets[i].style.height = fixedLength + 'px';
                targets[i].style.width = targets[i].dataset.width + 'px';
            }

            for( let j = 0; j < targets.length; j++ ){ // Adjust air bands by moving on the direction to fix.
                let number = 0; // Valu of counting of colision
                let topValue = '30vh'; // Initial value of position at direction to fix.

                for( let k = 0; k < targets.length; k++ ){ // Count Colision from sizes of the air band box and others.
                    if( j !== k ){
                        let d1 = targets[j].getBoundingClientRect(); // DOM proparty of the air band.
                        let d2 = targets[k].getBoundingClientRect(); // DOM proparty of others.

                        if((d1.right > d2.left && d1.left < d2.left) || (d1.right > d2.right && d1.left < d2.right)){
                            number++;
                        }
                    }
                }

                if(number !== 0){ // If this is hitting with someone, set the style to adjust.
                    topValue = calcAmountOfMove(windowHeight, fixedLength, number);
                    topValue = topValue.toString() + 'px';
                }

                targets[j].style.top = topValue;
            }
            break;
        case 'portrait':
            for( let i = 0; i < targets.length; i++ ){ // Set basic values of air bands style. If display is as portrait, width is fixed, height is valuable, position is set from top.
                targets[i].style.top = targets[i].dataset.down + 'px';
                targets[i].style.height = targets[i].dataset.width + 'px';
                targets[i].style.width = fixedLength + 'px';
            }

            for( let j = 0; j < targets.length; j++ ){ // Adjust air bands by moving on the direction to fix.
                let number = 0; // Count of colision
                let leftValue = '30vw'; // Initial value of position at fixed direction.

                for( let k = 0; k < targets.length; k++ ){ // Count Colision from sizes of the air band box and others.
                    if( j !== k ){
                        let d1 = targets[j].getBoundingClientRect(); // DOM proparty of the air band.
                        let d2 = targets[k].getBoundingClientRect(); // DOM proparty of others.

                        if((d1.top > d2.top && d1.bottom < d2.top) || (d1.top > d2.bottom && d1.bottom < d2.bottom)){
                            number++;
                        }
                    }
                }

                if(number !== 0){ // If this is hitting with someone, set the style to adjust.
                    leftValue = calcAmountOfMove(windowWidth, fixedLength, number);
                    leftValue = leftValue.toString() + 'px';
                }

                targets[j].style.left = leftValue;
            }
            break;
        default:
            break;
    }
}

function createRuler(){
    let parent = document.getElementById('main'); // Search a area to insert the ruler.
    const unitOfRuler = 1000; // Unit size of the ruler.
    const timesToWrite = tableAreaSize / unitOfRuler;

    for( let i = 0; i < timesToWrite; i++ ){
        let freq = i * unitOfRuler;
        let box = document.createElement('div'); // Create a element of a box.
        parent.appendChild(box);

        box.classList.add('ruler'); // Class name of ruler.
        box.innerText = freq + '[MHz]'; // Insert the label of this.

        switch(displayDirection){ // Allocate this box at the point.
            case 'landscape':
                box.style.height = fixedLength + 'px';
                box.style.width = '1000px';
                box.style.left = freq + 'px';
                box.style.top = '20vh';
                break;
            case 'portrait':
                box.style.height = '1000px';
                box.style.width = fixedLength + 'px';
                box.style.top = freq + 'px';
                box.style.left = '0';
                break;
            default:
                break;
        }
    }
}

async function main(){ // Main function.
    await detectDisplayDirection();

    await createBandTable();

    await setBoxStyleAtCSS();

    await createRuler();
}

document.onload = main(); // Fire main() after loaded whole of the HTML document.