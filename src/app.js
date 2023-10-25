document.addEventListener("DOMContentLoaded", () => {
    // Fetch the list of animals and display them
    fetchAnimalList();
});

function fetchAnimalList() {
    fetch("http://localhost:3000/characters")
        .then((response) => response.json())
        .then((data) => {
            const animalList = document.querySelector(".animal-list");
            animalList.innerHTML = ''; // Clear the list

            data.characters.forEach((animal) => {
                const animalName = document.createElement("div");
                animalName.className = "animal-name";
                animalName.innerText = animal.name;

                animalName.addEventListener("click", () => {
                    // Display animal details when clicked
                    fetchAnimalDetails(animal.id);
                });

                animalList.appendChild(animalName);
            });
        })
        .catch((error) => console.error(error));
}

function fetchAnimalDetails(animalId) {
    fetch(`http://localhost:3000/characters/${animalId}`)
        .then((response) => response.json())
        .then((animal) => {
            const animalDetails = document.querySelector(".animal-details");
            animalDetails.innerHTML = ''; 

            const animalName = document.createElement("h2");
            animalName.innerText = animal.name;

            const animalImage = document.createElement("img");
            animalImage.src = animal.image;
            animalImage.alt = animal.name;

            const voteButton = document.createElement("button");
            voteButton.innerText = "Vote";
            voteButton.addEventListener("click", () => {
                animal.votes++;
                animalDetails.querySelector(".vote-count").innerText = `Votes: ${animal.votes}`;
            });

            const voteCount = document.createElement("p");
            voteCount.className = "vote-count";
            voteCount.innerText = `Votes: ${animal.votes}`;

            animalDetails.appendChild(animalName);
            animalDetails.appendChild(animalImage);
            animalDetails.appendChild(voteButton);
            animalDetails.appendChild(voteCount);
        })
        .catch((error) => console.error(error));
}