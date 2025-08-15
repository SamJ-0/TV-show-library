import {
  addParagraphElement,
  createButton,
  saveToLocalStorage,
} from "./utils.js";

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

function displayEmptyPageInfo() {
  emptyPageInfo.classList.remove("empty-page-info-hidden");
}

function removeEmptyPageInfo() {
  emptyPageInfo.classList.add("empty-page-info-hidden");
}

function addShowToLibrary(obj) {
  myLibrary.push(obj);

  const showArrayJSON = JSON.stringify(myLibrary);
  localStorage.setItem("showArray", showArrayJSON);
}

function displayTvShowText(obj) {
  const removeBtn = createButton("X", "remove-btn");
  const title = addParagraphElement(`${obj.title}`, "show-title");
  const episodes = addParagraphElement(
    `Episodes: ${obj.episodes}`,
    "card-text"
  );
  const seasons = addParagraphElement(`Seasons: ${obj.seasons}`, "card-text");
  const releaseDate = addParagraphElement(
    `Released: ${obj.releaseDate}`,
    "card-text"
  );
  const watchStatus = createStatusDropDown(
    obj.id,
    obj.watchStatus,
    "Watching",
    "Seen",
    "Plan to watch",
    "Dropped"
  );
  const genre = createGenrePill(`${obj.genre}`);

  createCard(
    title,
    episodes,
    seasons,
    releaseDate,
    watchStatus,
    genre,
    obj.id,
    removeBtn
  );
}

function createCard(
  cardTitle,
  cardEpisodes,
  cardSeasons,
  cardReleaseDate,
  cardWatchStatus,
  cardGenre,
  cardId,
  removeButton
) {
  const cardBody = document.createElement("div");
  cardBody.classList.add("card");
  cardBody.setAttribute("data-attribute", cardId);
  removeButton.setAttribute("data-attribute", cardId);

  removeButton.addEventListener("click", removeShowData);

  const cardGradient = document.createElement("div");
  cardGradient.classList.add("card-gradient");
  cardBody.appendChild(cardGradient);

  const statusLabel = document.createElement("label");
  statusLabel.setAttribute("for", cardId);
  statusLabel.textContent = "Status: ";

  cardBody.appendChild(removeButton);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardEpisodes);
  cardBody.appendChild(cardSeasons);
  cardBody.appendChild(cardReleaseDate);
  cardBody.appendChild(statusLabel);
  cardBody.appendChild(cardWatchStatus);
  cardBody.appendChild(cardGenre);

  return bodyContainer.appendChild(cardBody);
}

// function addParagraphElement(textContent, className) {
//   const paragraph = document.createElement("p");
//   paragraph.textContent = textContent;
//   paragraph.classList.add(className);

//   return paragraph;
// }

function createStatusDropDown(
  statusFor,
  selectedStatus,
  watching,
  seen,
  planToWatch,
  dropped
) {
  const statusSelect = document.createElement("select");

  statusSelect.setAttribute("name", statusFor);
  statusSelect.setAttribute("id", statusFor);
  statusSelect.classList.add(selectedStatus);
  statusSelect.classList.add("card-watch-status");

  const statusOptions = [watching, seen, planToWatch, dropped];
  const splitStatus = selectedStatus.split("-");
  const joinedStatus = splitStatus.join(" ");

  statusOptions.forEach((element) => {
    if (joinedStatus != element) {
      statusSelect.appendChild(createStatusDropDownOptions(element));
    } else {
      statusSelect
        .appendChild(createStatusDropDownOptions(element))
        .setAttribute("selected", true);
    }
  });

  statusSelect.addEventListener("change", () => {
    if (statusSelect.value != selectedStatus) {
      const removeWhiteSpace = statusSelect.value.split(" ");
      const statusWithHyphen = removeWhiteSpace.join("-");

      statusSelect.classList.replace(selectedStatus, statusWithHyphen);

      selectedStatus = statusWithHyphen;

      const isIdInLibrary = myLibrary.findIndex((item) => {
        return statusSelect.id === item.id;
      });

      myLibrary[isIdInLibrary].watchStatus = selectedStatus;

      saveToLocalStorage(myLibrary);
    }
  });

  return statusSelect;
}

function createStatusDropDownOptions(textContent) {
  const statusOption = document.createElement("option");

  statusOption.value = textContent;
  statusOption.textContent = textContent;

  return statusOption;
}

function createGenrePill(textContent) {
  const genreBackground = document.createElement("div");
  genreBackground.classList.add("show-genre-bg-colour");

  const genre = addParagraphElement(textContent);
  genre.classList.add("show-genre");
  genreBackground.appendChild(genre);

  return genreBackground;
}

// function createButton(textContent, className) {
//   const button = document.createElement("button");

//   button.textContent = textContent;
//   button.classList.add(className);

//   return button;
// }

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
  } else {
    setSelectDefault();
    isReleaseDateValid = true;
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

// function saveToLocalStorage(element) {
//   const updatedShowList = JSON.stringify(element);
//   localStorage.setItem("showArray", updatedShowList);
// }
