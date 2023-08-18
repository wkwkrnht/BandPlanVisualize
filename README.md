# BandPlanVisualize

This repository for the website visualizing lists of air bands. You can access to the view made from this repository. At this document, air bands means band defined to telecommunication, or frequency ranges allocated by some government.

## Netlify setBoxStyleAtCSS

[![Netlify Status](https://api.netlify.com/api/v1/badges/c5d38408-5451-4db5-ae23-d8902ec99fe4/deploy-status)](https://app.netlify.com/sites/bandplanvisualize/deploys)

[![Netlify Status](https://api.netlify.com/api/v1/badges/f32e0cfc-f82c-4fe7-8eea-d2df2f95f8d4/deploy-status)](https://app.netlify.com/sites/beta-bpv/deploys)

## Architecture

This is made by 1 HTML file, 1 Vanilla JS script, several CSV datasets. HTML is used for making a view. The script is used for make elements on a view from datasets.

## Support list

At this segment, we show the list of dataset supporting right now.

* ISM
* ETSI
* Wi-Fi
* 3GPP
* Japan

If you want to be expand this list, send request for this repository, or make dataset and make pull-request for this repository. Anyway, on this process, we write script and add dataset of it. It takes few days.

## Dataset

At this segment, we describe of dataset. These are CSV files. First row is for defining property of data. Data must be included name of the band, and the range of frequency by this format, that is "up" and "down". Frequency range is used for calculating width and position of a view.