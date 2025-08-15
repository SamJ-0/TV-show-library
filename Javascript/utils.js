import { emptyPageInfo } from "./main.js";

function addParagraphElement(textContent, className) {
  const paragraph = document.createElement("p");
  paragraph.textContent = textContent;
  paragraph.classList.add(className);

  return paragraph;
}

function createButton(textContent, className) {
  const button = document.createElement("button");

  button.textContent = textContent;
  button.classList.add(className);

  return button;
}

function saveToLocalStorage(element) {
  const updatedShowList = JSON.stringify(element);
  localStorage.setItem("showArray", updatedShowList);
}

function displayEmptyPageInfo() {
  emptyPageInfo.classList.remove("empty-page-info-hidden");
}

function removeEmptyPageInfo() {
  emptyPageInfo.classList.add("empty-page-info-hidden");
}

export {
  addParagraphElement,
  createButton,
  saveToLocalStorage,
  displayEmptyPageInfo,
  removeEmptyPageInfo,
};
