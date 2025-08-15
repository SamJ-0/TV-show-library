import { displayTvShowText } from "./card.js";
import { releaseDateValidation, showInputValidation } from "./validation.js";
import { userSubmittedShow } from "./showManager.js";
import { displayEmptyPageInfo, removeEmptyPageInfo } from "./utils.js";

const bodyContainer = document.querySelector(".container");
const modal = document.querySelector(".modal");
const openModal = document.querySelector(".add-show-btn");
const closeModal = document.querySelector(".cancel-add-show-btn");
const closeDialogBtn = document.querySelector(".close-dialog");
const modalSubmitButton = document.querySelector("#submit-add-show-btn");
const emptyPageInfo = document.querySelector(".empty-page-info");
const form = document.querySelector("#add-show-form");

const formTitle = document.querySelector("#title");
const formEpisodes = document.querySelector("#episodes");
const formSeasons = document.querySelector("#seasons");
const formReleased = document.querySelector("#released");
const formWatchStatus = document.querySelector("#watch-status");
const formGenre = document.querySelector("#genre");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", closeDialog);
closeDialogBtn.addEventListener("click", closeDialog);

function closeDialog() {
  modal.close();
}

modalSubmitButton.addEventListener("click", userSubmittedShow);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  showInputValidation();
});

formReleased.addEventListener("change", () => {
  releaseDateValidation();
});

const myLibrary = [];

displayOnPageLoad();

class Show {
  constructor(title, episodes, seasons, releaseDate, watchStatus, genre, id) {
    this.title = title;
    this.episodes = episodes;
    this.seasons = seasons;
    this.releaseDate = releaseDate;
    this.watchStatus = watchStatus;
    this.genre = genre;
    this.id = id;
  }
  info() {
    return `${this.title}, Episodes: ${this.episodes}, Seasons: ${this.seasons}, Released: ${this.releaseDate}, Seen: ${this.watchStatus}`;
  }
}

function displayOnPageLoad() {
  const getFromLocalStorage = localStorage.getItem("showArray");
  const parsedLocalStorageData = JSON.parse(getFromLocalStorage);

  if (parsedLocalStorageData != null && parsedLocalStorageData.length >= 1) {
    removeEmptyPageInfo();
    for (let i = 0; i < parsedLocalStorageData.length; i++) {
      myLibrary.push(parsedLocalStorageData[i]);
      displayTvShowText(parsedLocalStorageData[i]);
    }
  } else if (
    parsedLocalStorageData.length < 1 ||
    parsedLocalStorageData === null ||
    localStorage.length < 1
  ) {
    displayEmptyPageInfo();
  }
}

export {
  closeDialog,
  form,
  bodyContainer,
  myLibrary,
  emptyPageInfo,
  formTitle,
  formEpisodes,
  formSeasons,
  formReleased,
  formWatchStatus,
  formGenre,
  Show,
  displayOnPageLoad,
};
