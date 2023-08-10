let displayDirection = '';

function detectDisplayDirection(){
    if(window.innerWidth > window.innerHeight){
        displayDirection = 'landscape';
    }else{
        displayDirection = 'portrait';
    }
}

/*function getCookieSpecify () {
  return fetch('sample.json')
    .then(response => {
      return response.json();
    })
      .then(data => {
        console.log("1 cookie is " + data['cookie']);
        return data['cookie'];
      })
        .catch(error => {
          console.log(error);
        })
}
(async()=>{
  const cookie = await getCookieSpecify();
  console.log("2 cookie is " + cookie);
})();*/

//CSVファイルを読み込む関数getCSV()の定義
function getCSV( dir = '' ){
    //let csv = [];

    return fetch(dir)
    .then(
        response => {
            return response.text();
        }
    )
    .then(
        text => {
            return convertCSVtoArray(text);
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    );
    //console.log(csv);

    //return csv;
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray( text = '' ){ // 読み込んだCSVデータが文字列として渡される
    let result = []; // 最終的な二次元配列を入れるための配列
    const tmp = text.split('\n'); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for( let i = 0; i < tmp.length; i++ ){
        result[i] = tmp[i].split(',');
    }

    return result;
}

function searchColumunByName( array = [], key = ''){
    console.log(array);

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
    switch(section){
        case '3GPP':
            let data = (async() => {
                const temp = await getCSV('/BandPlanVisualize/3GPPBandPlan.csv');
                console.log(temp);
                return temp;
            })();

            console.log(data.value);
            console.log(data.result);
            console.log(data.response);
            console.log(data.value);

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