# Skybnb - Calendar Service Component

<h1 align="center"> Skybnb </h1> <br>
<p align="center">
  <a href="https://gitpoint.co/">
    <img alt="GitPoint" title="SkyBnb" src="public/dist/logo.png" width="250">
  </a>
</p>

<p align="center">
  Reservation Service Component, built with React
</p>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Feedback](#feedback)
- [Contributors](#contributors)
- [Build Process](#build-process)
- [Backers](#backers-)
- [Sponsors](#sponsors-)
- [Acknowledgments](#acknowledgments)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Open Source, feature-rich calendar component made for making reservations and picking out dates. Made from scratch using React and some light back end using Node.js. 

## Features

A few of the things you can do with Skybnb:

* Stateful rendering of full calendar
* Animation for Slide In and Slide Out of Months
* Full functionality rendering of dates, accurate real-time and current months.
* RESTful API in place for inserting, reading, updating reservations to database (MongoDB)

<p align="center">
  <img src = "http://i.imgur.com/IkSnFRL.png" width=400>
</p>

<p align="center">
  <img src = "http://i.imgur.com/0iorG20.png" width=400>
</p>

## Feedback

Feel free to send us feedback via [email](alerterb@gmail.com) or [file an issue](https://github.com/albthere/issues/new). Feature requests are always welcome. If you wish to contribute, please take a quick look at the [guidelines](./CONTRIBUTING.md)!

# Contributors

This project follows the [all-contributors](https://github.com/albthere) specification.

## Build Process

- Follow the [React Guide](https://reactjs.org/docs/getting-started.html) for getting started building a web app project with React code. 

```sh
npm install -g webpack
```
installs webpack bundle, when ran in root directory

```sh
npm install
```
installs npm, ran in root directory

```sh
npm run build
```
creates webpack bundle, output is in dist folder

```sh
npm run seed-data
```
seed data to work with to simulate future reservations from db

```sh
npm run server-dev
```
runs node.js server to run app
