//html tags 
const inventoryParent = document.querySelector('.grid-parent');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeButton = document.querySelector('.x');
const cancelButton = document.querySelector('.btn-cancel');
const sendButton = document.querySelector('.btn-ok');
const score = document.querySelector('.score');
const winner = document.querySelector('.winner-modal');
const replayButton = document.querySelector('.btn-replay'); 
const footer = document.querySelector('.footer');
const okay = document.querySelector('.btn-okay');
const info = document.querySelector('.info-modal');
const btn = document.querySelector('.btn');
let stateVariable; 
let allScores = [];
console.log(allScores);


let init = () => {
    stateVariable = true;
    winner.classList.add('closed');
    let allItems = Array.from(document.querySelectorAll('.item'));
    allItems.forEach(el => el.classList.remove('closeItem'));
    let wholeCanvas = Array.from(document.querySelectorAll('.canvas'));
    wholeCanvas.forEach(box => box.classList.add('closed'));
    document.querySelector('.user-status').textContent = "UserID 28391283 is offline";
    document.querySelector('.winLose').textContent = "";
};


setTimeout(function() {
    document.querySelector('.intro-modal').style.display = 'none';
}, 8000);


class Item {
    constructor(name, img, caption, points, id) {
        this.name = name;
        this.img = img;
        this.caption = caption;
        this.points = points;
        this.id = id;
    }
    //calculate total score and check if computer won
    calcTotalScore() {
        let totalScore = allScores.reduce((a, b) => a + b, 0);
        console.log(totalScore);
        document.querySelector('.score').textContent = totalScore;
        if (totalScore >= 3500) {
            modal.style.display = "none";
            document.querySelector('.user-status').textContent = "UserID 28391283 is seduced.";
            document.querySelector('.winLose').textContent = "Your cookies are accepted.";

           computerWins();
        }
    }
}

class ComputerItem extends Item {
    constructor(name, img, caption, points, id, sendToCanvas=3) {
        super(name, img, caption, points, id);
        this.sendToCanvas = sendToCanvas;
        } 
        openModal() {
            document.querySelector('.slide').style.backgroundImage = this.img;
            document.querySelector('.modal-title').textContent = this.name;
            document.querySelector('.modal-caption').textContent = this.caption;
        }
        //on "send", make grid item inactive and send score for calculation
        sendButtonClick() {
            document.querySelector('#content' + this.id).classList.toggle('closed');
            document.querySelector('#div' + this.id).classList.add('closeItem');

            function calcScore(obj) {
                let score;
                score = document.querySelector('.score').textContent = obj.points;
                allScores.push(score);
                obj.calcTotalScore();
                }
            calcScore(this);
        }
    }

class UserItem extends Item {
    constructor(name, img, caption, points, id) {
    super(name, img, caption, points, id);    
    }
}

const inventory = [new ComputerItem("Conjured hotcake", "url('css/img/cookies.svg'), radial-gradient(circle, #8C4300 10%, #2B2A4C 90%)", "Drop a cookie on UserID 28391283. 100 points.", 100, 0, "Wow, an apple"),
                    new ComputerItem("Well of Desire", "url('css/img/targetAd.svg'), radial-gradient(circle at top left, #2B2A4C, transparent), radial-gradient(circle at top right, #6B69AE, transparent), radial-gradient(at bottom left, #0C8B9C, transparent), radial-gradient(at bottom right, #0C8B9C, transparent)", "Display a targeted ad for a candle she was browsing two days ago. 200 points.", 200, 1, "Wow, a banana"),
                    new ComputerItem("Silver Tongued Automaton", "url('css/img/chat.svg'), radial-gradient(circle at top left, #FFF9C3, transparent), radial-gradient(circle at top right, rgb(49, 49, 133), transparent), radial-gradient(at bottom left, #1f4a50, transparent), radial-gradient(at bottom right, rgb(26, 40, 56), transparent)", "Have a chatbot ask her if she needs help. 300 points.", 300, 2, "wow! a boot!"),
                    new ComputerItem("Courier's Post", "url('css/img/newsletter.svg'), radial-gradient(circle at top left, #8B5447, transparent), radial-gradient(circle at top right, #B62500, transparent), radial-gradient(at bottom left, #FFF9C3, transparent), radial-gradient(at bottom right, #FFF, transparent)", "Invite her to sign up for an email newsletter. 400 points.", 400, 3, "wow a bird"),
                    new ComputerItem("Super-Celestial Dust", "url('css/img/pixel.svg'), radial-gradient(ellipse closest-side, #FFF9C3, #2B2A4C)", "Plant a tracking pixel. 500 points.", 500, 4, "w0w a cat"),
                    new ComputerItem("Librarian's Cloak", "url('css/img/librarian.svg'), radial-gradient(circle at top left, #FFF9C3, transparent), radial-gradient(circle at top right, #8C4300, transparent), radial-gradient(at bottom left, #6B69AE, transparent), radial-gradient(at bottom right, rgb(26, 40, 56), transparent)", "Make content recommendations. 600 points.", 600, 5, "wowwo grapes"),
                    new ComputerItem("Map of Divine Geomancy", "url('css/img/globe.svg'), radial-gradient(ellipse farthest-side, #889799, #2B2A4C)", "Enable location-tracking services. 700 points.", 700, 6, "wow0 guitar"),
                    new ComputerItem("Mechanical Erudition", "url('css/img/machine.svg'), radial-gradient(circle at top left, #FFF9C3, transparent), radial-gradient(circle at top right, rgb(49, 49, 133), transparent), radial-gradient(at bottom left, #1f4a50, transparent), radial-gradient(at bottom right, rgb(26, 40, 56), transparent)", "Use modeling to determine likely traits and behaviors. 800 points.", 800, 7, "wow bug!"),
                    new ComputerItem("Magick from Traveling Stranger", "url('css/img/data.svg'), radial-gradient(ellipse farthest-side, #FFEB39, #889799)", "Buy her data from a third-party seller. 900 points.", 900, 8, "wow scissors")];

const userAction = [new UserItem("knife", "#", "User clears cache", -100, 0),
                    new UserItem("shovel", "#", "User does not accept cookies", -200, 0), 
                    new UserItem("spoon", "#", "User installs adblocker", -300, 0), 
                    new UserItem("needle", "#", "User is not attracted to little ad servers", -400, 0)];


//set interval to loop through user actions, triggering them if they haven't been set off yet
let startTheGame = (() => { 
        document.querySelector('.user-status').textContent = "UserID 28391283 is online.";
        document.querySelector('.active').src = "css/img/online.png"; 
    
    setInterval(function() {
        let i = Math.floor(Math.random() * userAction.length);
        userScore = parseInt(userAction[i].points);
        userCaption = userAction[i].caption;

        document.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                sendItem();
            } 
         })

        if(!allScores.includes(userScore)) {
            allScores.push(userScore);
            userAction[i].calcTotalScore();
            document.querySelector('.user-score').textContent = `${userScore} points, ${userCaption}`;
            document.querySelector('.user-score.play').style.display = 'block';
        } else {
            document.querySelector('.user-score.play').style.display = 'none'; 
        }
    }, 6000);

    sendButton.removeEventListener('click', startTheGame);
})

//Upon winning
let computerWins = () => {
      setTimeout(function() {
        winner.classList.toggle('closed');
        if (winner.classList.contains('is-paused')){
            winner.classList.remove('is-paused');
          }
}, 2000)
};

//Open correct modal and fade it in
let selectItem = (e => {
    if (e.target !== e.currentTarget) {
        let clickedItem = e.target.id;
        modal.classList.toggle('closed');
        if (modal.classList.contains('is-paused')){
          modal.classList.remove('is-paused');
        }
        const idArr = clickedItem.split('div');
        const i = idArr[1]; 
        inventory[i].openModal();
    }
});

//Send selected item to canvas
let sendItem = e => {
        modal.classList.toggle('closed');
        let itemName = document.querySelector('.modal-title').textContent;
        let j = inventory.findIndex(el => el.name === itemName);
        inventory[j].sendButtonClick();
};

let closeModal = () => modal.classList.toggle('closed');

let closeInfo = () => info.classList.toggle('closed');

let restartGame = () => {
    location.reload();
    init();
}

let openInfo = () => {
    info.classList.toggle('closed');
    if(info.classList.contains('is-paused')){
      info.classList.remove('is-paused');
    }
}

//***** SET UP EVENT LISTENERS *****//
let setUpEventListeners = () => { 
    if(stateVariable) {
        inventoryParent.addEventListener('click', selectItem);      //bubble events when item is clicked 

        document.addEventListener('click', e => {                   //close modal on button click
            if(e.target === cancelButton || e.target === modal || e.target === closeButton) {
                modal.style.backgroundColor = "rgba(0,0,0,0.8)";
                modal.classList.toggle('closed');
            } 
            e.stopPropagation();
        })
        
        document.addEventListener('keydown', e => {
           if(e.keyCode === 27) {
               closeModal();
           } 
        })
        sendButton.addEventListener('click', sendItem);
        sendButton.addEventListener('click', startTheGame); 
        replayButton.addEventListener('click', restartGame);
        footer.addEventListener('click', openInfo);
        okay.addEventListener('click', closeInfo);
        btn.addEventListener('click', restartGame);
    }
};

init();
setUpEventListeners();


//detonate the game 
setTimeout(function() {
    score.textContent = 0; 
    document.querySelector('.user-status').textContent = "UserID 28391283 has rejected you.";
    document.querySelector('.winLose').textContent = "Your cookies are dropped.";
    btn.style.display = "block";
    document.querySelector('.active').src = "css/img/offline.png";
    inventoryParent.removeEventListener('click', selectItem);  
    let allItems = Array.from(document.querySelectorAll('.item'));
    allItems.forEach(el => el.classList.add('closeItem'));
    stateVariable = false;
}, 50000);




/*function to calc totals from both sides -- return to later? */
/*
let posArr = [];
let negArr = [];

for(let pos = 1; pos < 10; pos++){
    posArr.push(pos * 100);
}
for(let neg = -1; neg > -5; neg--){
    neg * 100;
    negArr.push(neg * 100);
}
function sumArr(arr){
    let sumTotal = arr.reduce((a, b) => a + b, 0);
    return sumTotal;
}   
let totalPos = sumArr(posArr); 
let totalNeg = sumArr(negArr); 
console.log(totalPos + totalNeg);
*/