// ==UserScript==
// @name         Loads Counter
// @namespace    http://tampermonkey.net/
// @version      2024-05-06
// @description  Count all loads on FW
// @author       You
// @match        https://erp.gologity.com/freight-watch/dispatch
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gologity.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const p = new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      const loadListAvailible = document.querySelector("tr.ng-star-inserted ");
      if (loadListAvailible !== null) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });

  p.then(() => {
    createColoredLoadsCounter();
    setInterval(countRedLoads, 1000);
    setInterval(countPinkLoads, 1000);
    setInterval(countYellowLoads, 1000);
    setInterval(countGreenLoads, 1000);
    setInterval(countWhiteLoads, 1000);
  });

  function createColoredLoadsCounter() {
    const elementAfterLoadsCounter = document.querySelector(
      ".toggle-buttons-wrapper"
    );
    const searchField = document.querySelector(".search-wrapper");
    const line = document.querySelector(".m-b-2");

    const coloredCounter = document.createElement("div");
    coloredCounter.classList.add("colored__loads__counter");
    line.insertBefore(coloredCounter, elementAfterLoadsCounter);

    const needTocheck = document.createElement("div");
    needTocheck.classList.add("need__to__check");
    coloredCounter.append(needTocheck);

    const whiteLoads = document.createElement("div");
    whiteLoads.classList.add("white__loads");
    needTocheck.append(whiteLoads);

    const whileLine = document.createElement("div");
    whileLine.classList.add("white__line");
    whileLine.textContent = "Need to check";
    needTocheck.append(whileLine);

    const eta = document.createElement("div");
    eta.classList.add("eta");
    coloredCounter.append(eta);
    const pinkLoads = document.createElement("div");
    pinkLoads.classList.add("pink__loads");
    eta.append(pinkLoads);

    const onSite = document.createElement("div");
    onSite.classList.add("on__site");
    coloredCounter.append(onSite);
    const yellowLoads = document.createElement("div");
    yellowLoads.classList.add("yellow__loads");
    onSite.append(yellowLoads);

    const inTransit = document.createElement("div");
    inTransit.classList.add("in__transit");
    coloredCounter.append(inTransit);
    const greenLoads = document.createElement("div");
    greenLoads.classList.add("green__loads");
    inTransit.append(greenLoads);

    const noAnswer = document.createElement("div");
    noAnswer.classList.add("no__answer");
    coloredCounter.append(noAnswer);
    const redLoads = document.createElement("div");
    redLoads.classList.add("red__loads");
    noAnswer.append(redLoads);

    const pinkLine = document.createElement("div");
    pinkLine.classList.add("pink__line");
    pinkLine.textContent = "ETA";
    eta.append(pinkLine);

    const yellowLine = document.createElement("div");
    yellowLine.classList.add("yellow__line");
    yellowLine.textContent = "On site";
    onSite.append(yellowLine);

    const greenLine = document.createElement("div");
    greenLine.classList.add("green__line");
    greenLine.textContent = "In transit";
    inTransit.append(greenLine);

    const redLine = document.createElement("div");
    redLine.classList.add("red__line");
    redLine.textContent = "N/A";
    noAnswer.append(redLine);

    const total = document.createElement("div");
    total.classList.add("total");
    coloredCounter.append(total);

    const totalLoads = document.createElement("div");
    totalLoads.classList.add("total__loads");
    total.append(totalLoads);

    const totalLine = document.createElement("div");
    totalLine.classList.add("total__line");
    totalLine.textContent = "Total";
    total.append(totalLine);
  }

  function countRedLoads() {
    const redLoads = document.getElementsByClassName("red ng-star-inserted");
    const redLoadsNumber = redLoads.length;
    const numberOfRedLoads = document.querySelector(".red__loads");
    numberOfRedLoads.textContent = redLoadsNumber;
    return redLoadsNumber;
  }
  function countPinkLoads() {
    const pinkLoads = document.getElementsByClassName("pink ng-star-inserted");
    const pinkLoadsNumber = pinkLoads.length;
    const numberOfPinkLoads = document.querySelector(".pink__loads");
    numberOfPinkLoads.textContent = pinkLoadsNumber;
    return pinkLoadsNumber;
  }

  function countYellowLoads() {
    const yellowLoads = document.getElementsByClassName(
      "orange ng-star-inserted"
    );
    const yellowLoadsNumber = yellowLoads.length;
    let numberOfYellowLoads = document.querySelector(".yellow__loads");
    numberOfYellowLoads.textContent = yellowLoadsNumber;
    return yellowLoadsNumber;
  }
  function countGreenLoads() {
    const greenLoads = document.getElementsByClassName(
      "green ng-star-inserted"
    );
    const greenLoadsNumber = greenLoads.length;
    const numberOfGreenLoads = document.querySelector(".green__loads");
    numberOfGreenLoads.textContent = greenLoadsNumber;
    return greenLoadsNumber;
  }
  function countWhiteLoads() {
    const trElements = document.querySelectorAll("tr");
    const trCount = trElements.length - 1;
    const numberOfTotalLoads = document.querySelector(".total__loads");
    numberOfTotalLoads.textContent = trCount;
    const whiteLoadsNumber =
      trCount -
      (countRedLoads() +
        countPinkLoads() +
        countYellowLoads() +
        countGreenLoads());
    const numberOfWhiteLoads = document.querySelector(".white__loads");
    numberOfWhiteLoads.textContent = whiteLoadsNumber;
    return whiteLoadsNumber;
  }
})();
