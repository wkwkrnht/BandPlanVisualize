# BandPlanVisualize

[This website is generated from this repo.](https://wkwkrnht.github.io/BandPlanVisualize/)

This repository for the website visualizing lists of air bands. You can access to the view made from this repository. At this document, air bands means band defined to telecommunication, or frequency ranges allocated by some government.

## Architecture

This is made by 1 HTML file, 1 Vanilla JS script, several CSV datasets. HTML is used for making a view. The script is used for make elements on a view from datasets.

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

# Middleman + Netlify CMS Starter

[![Netlify Status](https://api.netlify.com/api/v1/badges/a6c3d057-a31f-4741-bed1-6d454b6be9ca/deploy-status)](https://app.netlify.com/sites/middleman-netlify-cms/deploys)

This repo contains an **[example website](https://middleman-netlify-cms.netlify.com/)** that is built with [Middleman](https://www.middlemanapp.com/) and [Netlify CMS](https://www.netlifycms.org).

*Designed and developed by [Tom Rutgers](https://www.tomrutgers.nl/)*

*If you want to use the external asset pipeline with ES6, Webpack & Babel have a look at [this repository]( https://github.com/tomrutgers/middleman-webpack-netlify-cms).*

## About the architecture

**Middleman** is a static site generator using all the shortcuts and tools in modern web development. Check out [middlemanapp.com](http://middlemanapp.com/) for detailed tutorials, including a [getting started guide](http://middlemanapp.com/basics/getting-started/).

# 日本語版

[このレポジトリから作られたページはこちら](https://wkwkrnht.github.io/BandPlanVisualize/)

このレポジトリは、各国行政府の周波数割当、標準化団体が定めたチャンネルリスト、各無線網のチャンネルリストなどを図解で一覧するためのサイトをつくるものです。

## データセット形式

ファイル名にユニークな名前を持つCSVファイルをデータセットの単位とします。1行目に項目名を書いてください。1列目にバンド名を書いてください。TDDとFDDが混在する場合は、フィールドを作成し、バンドごとに明記してください。

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
