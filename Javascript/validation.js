import {
  formTitle,
  formEpisodes,
  formSeasons,
  formReleased,
  formWatchStatus,
} from "./main.js";

function setErrorStatus(element, message) {
  const inputElement = element.parentElement;
  const formError = inputElement.querySelector(".error");

  formError.textContent = message;
  inputElement.classList.add("error");
}

function setValidStatus(element) {
  const inputElement = element.parentElement;
  const formError = inputElement.querySelector(".error");

  inputElement.classList.remove("error");

  formError.textContent = "";
}

function setSelectDisabled() {
  formWatchStatus.value = "Plan-to-watch";
  formWatchStatus.classList.add("select-disabled");
  formWatchStatus.disabled = true;
}

function setSelectDefault() {
  formWatchStatus.classList.remove("select-disabled");
  formWatchStatus.disabled = false;
}

function releaseDateValidation() {
  const releaseDate = formReleased.value.trim();
  const currentDate = new Date().toISOString().slice(0, 10);
  const futureDate = releaseDate > currentDate;

  let isReleaseDateValid = false;

  if (releaseDate === "") {
    setErrorStatus(formReleased, "You need to enter a date!");
    isReleaseDateValid = false;
  } else if (futureDate) {
    setSelectDisabled();
    isReleaseDateValid = true;
    setValidStatus(formReleased);
  } else {
    setSelectDefault();
    isReleaseDateValid = true;
    setValidStatus(formReleased);
  }

  return isReleaseDateValid;
}

function showInputValidation() {
  const title = formTitle.value.trim();
  const episodes = formEpisodes.value.trim();
  const seasons = formSeasons.value.trim();

  let isTitleValid = false;
  let isEpisodesValid = false;
  let isSeasonsValid = false;

  if (title.length < 1) {
    setErrorStatus(formTitle, "You need to enter a show title!");
  } else {
    setValidStatus(formTitle);
    isTitleValid = true;
  }

  if (episodes < 1) {
    setErrorStatus(formEpisodes, "You need at least 1 episode!");
  } else {
    setValidStatus(formEpisodes);
    isEpisodesValid = true;
  }

  if (seasons < 1) {
    setErrorStatus(formSeasons, "You need at least 1 season!");
  } else {
    setValidStatus(formSeasons);
    isSeasonsValid = true;
  }

  return isTitleValid && isEpisodesValid && isSeasonsValid;
}

export {
  setErrorStatus,
  setValidStatus,
  setSelectDisabled,
  setSelectDefault,
  releaseDateValidation,
  showInputValidation,
};
