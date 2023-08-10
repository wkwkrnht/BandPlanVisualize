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
async function getCSV( dir = '' ){
    return await fetch(dir)
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
    return array[0].indexOf(key);
}

function createBox(parent = '', name = '', up = 0, down = 0){
    const width = up - down;

    parent = document.getElementById(parent);
    let box = document.createElement('div');
    parent.appendChild(box);

    box.setAttribute('class', 'box');
    box.setAttribute('data-down', down);
    box.setAttribute('data-width', width);
    box.innerText = name;
}

async function createBandTable(section = '' ){
    switch(section){
        case '3GPP':
            const data = await getCSV('/BandPlanVisualize/3GPPBandPlan.csv'),
            ulUpColumun = searchColumunByName(data, 'ULup'),
            ulDownColumun = searchColumunByName(data, 'ULdown'),
            dlUpColumun = searchColumunByName(data, 'DLup'),
            dlDownColumun = searchColumunByName(data, 'DLdown'),
            nameColumun = searchColumunByName(data, 'Name'),
            modeColumun = searchColumunByName(data, 'Mode');

            for( i = 1; i < data.length; i++ ){
                let mode = data[i][modeColumun];
                let name = data[i][nameColumun];

                switch(mode){
                    case 'FDD':
                        const nameu = name + '↑';
                        createBox(section, nameU, data[i][ulUpColumun], data[i][ulDownColumun]);
                        const named = name + '↓';
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

function setBoxSizeByCSS(){
    const targets = document.getElementsByClassName('box');

    switch(displayDirection){
        case 'landscape':
            for( i = 1; i < targets.length; i++ ){
                targets[i].style.left = targets[i].dataset.down;
                targets[i].style.width = targets[i].dataset.width;
                targets[i].style.height = '20%';
            }
            break;
        case 'portrait':
            for( i = 1; i < targets.length; i++ ){
                targets[i].style.top = targets[i].dataset.down;
                targets[i].style.height = targets[i].dataset.width;
                targets[i].style.width = '20%';
            }
            break;
        default:
            break;
    }

}

async function main(){
    detectDisplayDirection();

    await createBandTable('3GPP');
    await createBandTable('JP');

    setBoxSizeByCSS();
}

document.onload = main();