# BandPlanVisualize

[Generated from this repo](https://wkwkrnht.github.io/BandPlanVisualize/)

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

**Netlify CMS** is a CMS for static site generators. Give non-technical users a simple way to edit and add content to any site built with a static site generator.

## Getting Started

Netlify CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. Use the deploy button below to copy the repository to your account.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/tomrutgers/middleman-starter-netlify-cms&amp;stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. To access the CMS, you’ll need to set up [Netlify identity](https://www.netlify.com/docs/identity/) service to authorize users to log in to the CMS. Make sure to enable [Git Gateway](https://www.netlify.com/docs/git-gateway/).

### Make it work on your machine

## Using docker
```
$ docker-compose build
$ docker-compose run --service-ports web middleman server
```

## Without docker
Be sure to check out the [middleman installation guide](https://middlemanapp.com/basics/install/)
```
$ git clone https://github.com/tomrutgers/middleman-starter-netlify-cms
$ cd middleman-starter-netlify-cms
$ bundle install
$ middleman server
```

### Setting up the CMS
Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

### Trouble?
[![Gitter](https://badges.gitter.im/netlify/netlify.svg)](https://gitter.im/netlify/NetlifyCMS)
