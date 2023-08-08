let displayDirection = '';

function detectDisplayDirection(){
    if(window.innerWidth > window.innerHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

//CSVファイルを読み込む関数getCSV()の定義
function getCSV( dir = '', dist = [] ){

    fetch(dir)
    .then(
        function(response){                        // response
            if (!response.ok) {
                return Promise.reject(new Error('error'));
            }  //  error

            return response.text();                         // ok string utf-8
        }
    )
    .then(
        function(text){
            dist = convertCSVtoArray(text);
            console.log(dist);
        }
    )
    .catch(
        function(err){
            console.error('fetch error', err);  //  error処理
        }
    );
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray( str ){ // 読み込んだCSVデータが文字列として渡される
    let result = []; // 最終的な二次元配列を入れるための配列
    const tmp = str.split('\n'); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for( let i = 0; i < tmp.length; i++ ){
        result[i] = tmp[i].split(',');
    }

    return result;
}

function searchColumunByName( array = [], key = ''){
    return array[0].indexOf(key);
}

function createBox(parent = '', name = '', up = 0, down = 0){
    const width = up - down;

    parent = document.getElementById(parent);
    let box = document.createElement('div');
    parent.appendChild(box);

    box.setAttribute('class', 'band');
    box.setAttribute('class', 'box');
    box.setAttribute('data-down', down);
    box.setAttribute('data-width', width);
    box.innerText = name;
}

function createBandTable(section = '' ){
    let data = [];

    switch(section){
        case '3GPP':
            getCSV('/BandPlanVisualize/3GPPBandPlan.csv', data);

            const ulUpColumun = searchColumunByName(data, 'ULup'),
            ulDownColumun = searchColumunByName(data, 'ULdown'),
            dlUpColumun = searchColumunByName(data, 'DLup'),
            dlDownColumun = searchColumunByName(data, 'DLdown'),
            nameColumun = searchColumunByName(data, 'Name'),
            modeColumun = searchColumunByName(data, 'Mode');

            for( i = 1; i < data; i++){
                let mode = data[i][modeColumun];
                let name = data[i][nameColumun];

                switch(mode){
                    case 'FDD':
                        name = name + '↑';
                        createBox(section, name, data[i][ulUpColumun], data[i][ulDownColumun]);
                        name = name + '↓';
                        createBox(section, name, data[i][dlUpColumun], data[i][dlDownColumun]);
                        break;
                    case 'SUL':
                        name = name + '↑';
                        createBox(section, name, data[i][ulUpColumun], data[i][ulDownColumun]);
                        break;
                    case 'TDD':
                    case 'SDL':
                        name = name + '↓';
                        createBox(section, name, data[i][dlUpColumun], data[i][dlDownColumun]);
                        break;
                    default:
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

function setBoxSizeByCSS(){}

function main(){
    detectDisplayDirection();

    createBandTable('3GPP');

    setBoxSizeByCSS();
}

document.onload = main();