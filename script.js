//CSVファイルを読み込む関数getCSV()の定義
function getCSV( filename = '', array = [] ){
    try{
        let req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
        req.open('get', filename, true); // アクセスするファイルを指定
        req.send(null); // HTTPリクエストの発行
    }catch(err){
        console.log(err);
    }

    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function(){
	    array = convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
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

function searchColumun( array = [], key = ''){
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

function createBandTable(section = '', dir = '' ){
    const data = [];
    const ulUpColumun = 0, ulDownColumun = 0, dlUpColumun = 0, dlDownColumun = 0, nameColumun = 0, modeColumun = 0;

    getCSV(dir, data);

    switch(section){
        case '3GPP':
            ulUpColumun = searchColumun(data, 'ULup');
            ulDownColumun = searchColumun(data, 'ULdown');
            dlUpColumun = searchColumun(data, 'DLup');
            dlDownColumun = searchColumun(data, 'DLdown');
            nameColumun = searchColumun(data, 'Name');
            modeColumun = searchColumun(data, 'Mode');

            for( i = 1; i < data; i++){
                let mode = data[i][modeColumun];
                let name = data[i][nameColumun];

                switch(mode){
                    case 'FDD':
                        name = name + '↑';
                        createBox(section, name, data[i][ulUpColumun], data[i][ulDownColumun]);
                        name = name + '↓';
                        createBox(section', name, data[i][dlUpColumun], data[i][dlDownColumun]);
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

function main(){
    createBandTable('3GPP' , '3GPPBandPlan.csv');
}

document.onload = main();