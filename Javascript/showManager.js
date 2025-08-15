import {
  closeDialog,
  form,
  myLibrary,
  formTitle,
  formEpisodes,
  formSeasons,
  formReleased,
  formWatchStatus,
  formGenre,
  Show,
} from "./main.js";

import { displayTvShowText } from "./card.js";

import {
  saveToLocalStorage,
  displayEmptyPageInfo,
  removeEmptyPageInfo,
} from "./utils.js";

import { releaseDateValidation, showInputValidation } from "./validation.js";

function addShowToLibrary(obj) {
  myLibrary.push(obj);

  const showArrayJSON = JSON.stringify(myLibrary);
  localStorage.setItem("showArray", showArrayJSON);
}

function userSubmittedShow(event) {
  if (showInputValidation() && releaseDateValidation()) {
    const formatReleaseDate = new Date(formReleased.value);
    const releaseDateFormatted = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
    }).format(formatReleaseDate);

    const userAddedShow = new Show(
      formTitle.value,
      formEpisodes.value,
      formSeasons.value,
      releaseDateFormatted,
      formWatchStatus.value,
      formGenre.value,
      crypto.randomUUID()
    );

    removeEmptyPageInfo();
    addShowToLibrary(userAddedShow);
    displayTvShowText(userAddedShow);

    event.preventDefault();
    closeDialog();
    form.reset();
  } else {
    showInputValidation();
  }
}

function removeShowData(event) {
  const removeBtnId = event.target.getAttribute("data-attribute");
  const card = event.target.closest(".card");
  const cardId = card.getAttribute("data-attribute");

  const libraryId = myLibrary.findIndex((item) => {
    return removeBtnId === item.id;
  });

  if (removeBtnId === cardId) {
    myLibrary.splice(libraryId, 1);

    saveToLocalStorage(myLibrary);

    card.remove();
  }

  if (myLibrary.length < 1) {
    displayEmptyPageInfo();
  }
}

export { addShowToLibrary, userSubmittedShow, removeShowData };
