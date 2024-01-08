# BandPlanVisualize

[This website is generated from this repo.](https://wkwkrnht.github.io/BandPlanVisualize/)

This repository for the website visualizing lists of air bands. You can access to the view made from this repository. At this document, air bands means band defined to telecommunication, or frequency ranges allocated by some government.

## About the architecture

This repository is by middleman. Middleman parse and generate the page from datasets. A dataset is CSV file about Airbands (Name, Bandwidth...). 

**Middleman** is a static site generator using all the shortcuts and tools in modern web development. Check out [middlemanapp.com](http://middlemanapp.com/) for detailed tutorials, including a [getting started guide](http://middlemanapp.com/basics/getting-started/).



## Support list

At this segment, we show the list of dataset supporting right now.

* ISM
* ETSI
* ISDB-T
* BS of Japan
* Bluetooth
* Wi-Fi
* DECT
* 3GPP
* Japan

If you want to be expand this list, send request for this repository, or make dataset and make pull-request for this repository. Anyway, on this process, we write script and add dataset of it. It takes few days.

## Dataset

At this segment, we describe of dataset. These are CSV files. First row is for defining property of data. Data must be included name of the band, and the range of frequency by this format, that is "up" and "down". Frequency range is used for calculating width and position at the view. Name is located to 1st column of each rows.



# 日本語版

[このレポジトリから作られたページはこちら](https://wkwkrnht.github.io/BandPlanVisualize/)

このレポジトリは、各国行政府の周波数割当、標準化団体が定めたチャンネルリスト、各無線網のチャンネルリストなどを図解で一覧するためのサイトをつくるものです。

## 対応済データセット一覧

dataフォルダ配下のcsvファイルを読み込んで、以下の情報を描画しています。追加・修正等は、プルリクエストまたはイシューの登録をお願いいたします。

* ISM
* ETSI
* ISDB-T
* 日本の放送衛星
* Bluetooth
* Wi-Fi
* DECT
* 3GPP
* 総務省

## 新規データセットの作成と登録

プルリクエストの作成において、新規データセットと、読み込みスクリプトをコードベースに追加する必要があります。この章では、それらを順に説明します。

### 新規データセットの作成

ファイル名にユニークな名前を持つCSVファイルをデータセットの単位とします。1行目に項目名を書いてください。1列目にバンド名を書いてください。TDDとFDDが混在する場合は、フィールドを作成し、バンドごとに明記してください。このデータセットを、dataフォルダ配下に追加してください。

### 新規データセットのい読み込みスクリプトを追加する

データセットの読み込みは、config.rbファイル内のwrite_elements関数にて行います。記述例を、通常版、FDDとTDDが混在する場合の順に示します。このスクリプトを追加したバージョンを添付してください。

```ruby:config.rb
CSV.foreach('./data/{データセット名}.csv', headers: true) do |row|
    array[i] = ['{データセット名}', row[0], row['down'], row['up'], 0]
    i += 1
end
```

```ruby:config.rb
CSV.foreach('./data/{データセット名}.csv', headers: true) do |row|
    dataset = '{データセット名}'
    mode = row['Mode']

    case mode
    when 'FDD'
        name0 = row[0] + '↑'
        name1 = row[0] + '↓'
        array[i] = [dataset, name0, row['ULdown'], row['ULup'], 0]
        i += 1
        array[i] = [dataset, name1, row['DLdown'], row['DLup'], 0]
        i += 1
    when 'TDD'
        name = row[0] + '↑↓'
        array[i] = [dataset, name, row['DLdown'], row['DLup'], 0]
        i += 1
    when 'SUL'
        name = row[0] + '↑'
        array[i] = [dataset, name, row['ULdown'], row['ULup'], 0]
        i += 1
    when 'SDL'
        name = row[0] + '↓'
        array[i] = [dataset, name, row['DLdown'], row['DLup'], 0]
        i += 1
    end
end
```
