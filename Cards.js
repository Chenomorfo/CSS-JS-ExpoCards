const list = document.getElementById("CardList");
const cards = [];

var CustomCard = {
  width: 175,
  height: 325,
};

const ItemsByRow = 4;
var getDimensions;
var CardFocus = null;

async function LoadData() {
  const Data = await (await fetch("./data.json")).json();

  getDimensions = setDimensions(Data.length);

  for (let i = 0; i < Data.length; i++) {
    CreateCard(Data[i]);

    cards[i].addEventListener("click", () => {
      SetPosition(getDimensions);

      if (cards[i] != CardFocus) {
        CardFocus = cards[i];

        cards[i].style.zIndex = 1111;
        cards[i].style.transform = `translate(0px,0px)`;
        cards[i].style.transform = `scale(200%)`;
        cards[i].children[0].style.filter = `brightness(40%)`;
        cards[i].children[1].style.opacity = `1`;
      } else {
        CardFocus = null;
        /* For better anim */
        cards[i].style.zIndex = 111;
        cards[i].children[0].style.filter = `brightness(100%)`;
        cards[i].children[1].style.opacity = `0`;
        setTimeout(() => {
          cards[i].style.zIndex = 11;
        }, 500);
      }
    });
  }

  SetPosition(getDimensions);
}

LoadData();

/* Creating the cards */
function CreateCard(content) {
  const Card = document.createElement("div");
  Card.classList.add("Card");
  Card.style.width = `${CustomCard.width}px`;
  Card.style.height = `${CustomCard.height}px`;

  const Image = document.createElement("img");
  Image.src = content.img;
  Card.appendChild(Image);

  const Info = document.createElement("div");
  Info.classList.add("Info");
  Info.innerHTML = `<p><span>${content.Name}</span> <br><br>${content.description}</p>`;
  Card.appendChild(Info);

  list.appendChild(Card);
  cards.push(Card);
}

/* Positioning the cards */
function SetPosition(dimensions) {
  var posX = 0,
    posY = 0;

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.transform = `translate(
      ${
        (CustomCard.width + 15) * posX -
        dimensions[0] / 2 +
        CustomCard.width / 2 +
        10
      }px,
      ${
        (CustomCard.height + 15) * posY -
        dimensions[1] / 2 +
        CustomCard.height / 2 +
        10
      }px)`;
    cards[i].style.zIndex = 11;

    if (cards[i].children[0] != undefined)
      cards[i].children[0].style.filter = `brightness(100%)`;
    if (cards[i].children[1] != undefined)
      cards[i].children[1].style.opacity = `0`;

    posX++;
    if (posX == ItemsByRow) {
      posY++;
      posX = 0;
    }
  }
}

function setDimensions(length) {
  var maxHeight;

  if (Math.floor((length - 1) / ItemsByRow + 1) > 1) maxHeight = 2;
  else {
    maxHeight = 1;
    list.style.overflow = "unset";
  }

  //(Item height + margin) * ItemsByRow + margin + 5px
  list.style.width = `${
    (CustomCard.width + 10) * ItemsByRow + ItemsByRow * 5 + 5
  }px`;
  list.style.height = `${(CustomCard.height + 10) * maxHeight + 15}px`;

  //for getDimensions [Width,Height]
  return [
    (CustomCard.width + 10) * ItemsByRow + ItemsByRow * 5 + 5,
    (CustomCard.height + 10) * maxHeight + 15,
  ];
}
