"use strict";

const counters = {};

function pageLoadCheck() {
  const loadListAvailible = document.querySelector("tr.ng-star-inserted");
  if (loadListAvailible !== null) {
    return true;
  }
}

function createLoadsCounter() {
  const container = document.querySelector(".m-b-2");
  const buttonsWrapper = document.querySelector(".toggle-buttons-wrapper");

  const counter = document.createElement("div");
  counter.classList.add("loads-counter");

  container.insertBefore(counter, buttonsWrapper);

  counters.needToCheck = createCounterItem("need-to-check", "Need to check");
  counters.eta = createCounterItem("eta", "ETA");
  counters.onSite = createCounterItem("on-site", "On site");
  counters.inTransit = createCounterItem("in-transit", "In transit");
  counters.noAnswer = createCounterItem("no-answer", "N/A");
  counters.total = createCounterItem("total", "Total");

  counter.append(
    counters.needToCheck.element,
    counters.eta.element,
    counters.onSite.element,
    counters.inTransit.element,
    counters.noAnswer.element,
    counters.total.element
  );
}

function createCounterItem(modifier, labelText) {
  const item = document.createElement("div");
  item.classList.add("loads-counter__item", `loads-counter__item--${modifier}`);

  const count = document.createElement("div");
  count.classList.add("loads-counter__count");

  const label = document.createElement("div");
  label.classList.add("loads-counter__label");
  label.textContent = labelText;

  item.append(count, label);

  return { element: item, countEl: count };
}

function countNoAnswer() {
  const elems = document.getElementsByClassName("red ng-star-inserted");
  const count = elems.length;
  counters.noAnswer.countEl.textContent = count;
  return count;
}

function countEta() {
  const elems = document.getElementsByClassName("pink ng-star-inserted");
  const count = elems.length;
  counters.eta.countEl.textContent = count;
  return count;
}

function countOnSite() {
  const elems = document.getElementsByClassName("orange ng-star-inserted");
  const count = elems.length;
  counters.onSite.countEl.textContent = count;
  return count;
}

function countInTransit() {
  const elems = document.getElementsByClassName("green ng-star-inserted");
  const count = elems.length;
  counters.inTransit.countEl.textContent = count;
  return count;
}

function countTotal() {
  const trElements = document.querySelectorAll("tr");
  const totalCount = trElements.length - 1;
  counters.total.countEl.textContent = totalCount;
  return totalCount;
}

function countNeedToCheck() {
  const totalCount = countTotal();
  const sumColored =
    countNoAnswer() + countEta() + countOnSite() + countInTransit();
  const needToCheckCount = totalCount - sumColored;
  counters.needToCheck.countEl.textContent = needToCheckCount;
  return needToCheckCount;
}

const pageLoadingCheck = new Promise((resolve, reject) => {
  let interval = setInterval(() => {
    if (pageLoadCheck()) {
      clearInterval(interval);
      resolve();
    }
  }, 1000);
});

pageLoadingCheck.then(() => {
  createLoadsCounter();
  setInterval(countNoAnswer, 1000);
  setInterval(countEta, 1000);
  setInterval(countOnSite, 1000);
  setInterval(countInTransit, 1000);
  setInterval(countNeedToCheck, 1000);
  setInterval(countTotal, 1000);
});
