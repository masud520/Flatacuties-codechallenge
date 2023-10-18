// getting character data through the element id
const characterData = () => {
    const characters = document.getElementById('data')

    characters.innerHTML = '';
//fetch the candidates info from API and display it
let baseURL = 'https://my-json-server.typicode.com/martinwakaba/code-challenge-2/characters'
    fetch(baseURL)
    .then(response => response.json())//translating into something thats readable

    .then(data => {
        console.log(data);
        //now lets create list of our characters and for rendering our DOM
        data.forEach(candidate =>{
            const characterList = document.createElement('li')
            characterList.textContent = candidate.name;

           // click event for each candidate when clicked
            characterList.addEventListener('click', () => {
                console.log(`${candidate.name}: chosen`)
                //
                const characterImage = document.getElementById('image')
                const characterName = document.getElementById('name')
                const characterVotes = document.getElementById('vote-count')

                characterImage.src = candidate.image;
                characterName.innerText = candidate.name;
                characterVotes.innerText = candidate.votes;

                let currentVote = parseInt(characterVotes.textContent, 10)

                const votesForm = document.getElementById('votes-form')
                const votes = document.getElementById('votes')

                //submit event for the votes
                votesForm.addEventListener('submit', (event) =>{
                    event.preventDefault()// stops reset to default
                    let newVote = parseInt(votes.value, 10)
                    currentVote = currentVote + newVote;
                    characterVotes.textContent = currentVote;


                })

            })
            // appendChild adds a node to the end of the list of children of a specified parent node
            characters.appendChild(characterList)

        })

    })
}
//fires when index.js loads - before DOMContentLoaded is triggered
document.addEventListener('DOMContentLoaded', characterData)