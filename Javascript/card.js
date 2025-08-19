import { bodyContainer, myLibrary } from "./main.js";

import {
  addParagraphElement,
  createButton,
  saveToLocalStorage,
} from "./utils.js";

import { removeShowData } from "./showManager.js";

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
  cardBody.classList.add(`status-${removeSpaceInWatchStatus(cardWatchStatus)}`);
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
      const closestCard = statusSelect.closest(".card");

      removeSpaceInWatchStatus(statusSelect);

      statusSelect.classList.replace(
        selectedStatus,
        removeSpaceInWatchStatus(statusSelect)
      );

      closestCard.classList.replace(
        `status-${selectedStatus}`,
        `status-${removeSpaceInWatchStatus(statusSelect)}`
      );

      selectedStatus = removeSpaceInWatchStatus(statusSelect);

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

function removeSpaceInWatchStatus(element) {
  const removeWhiteSpace = element.value.split(" ");
  return removeWhiteSpace.join("-");
}

function createGenrePill(textContent) {
  const genreBackground = document.createElement("div");
  genreBackground.classList.add("show-genre-bg-colour");

  const genre = addParagraphElement(textContent);
  genre.classList.add("show-genre");
  genreBackground.appendChild(genre);

  return genreBackground;
}

export {
  displayTvShowText,
  createCard,
  createStatusDropDown,
  createStatusDropDownOptions,
  createGenrePill,
};
