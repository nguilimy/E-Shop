// // let mainTitle = document.getElementById('mainTitle');
// console.log(mainTitle);

// //Select the first list item
// const firstListItem = document.querySelector('#myList li');
// console.log(firstListItem.textContent); // Outputs: Item 1

// // Select the title 
// let Title = document.querySelector('#mainTitle');
// console.log(Title);
// console.log(Title.textContent);
// // Update the title text
// Title.textContent = 'Updated DOM Manipulation Title';
// console.log(Title.textContent);

// // Select the first paragraph & make it bold using html h2 tag
// let firstParagraph = document.querySelector('#paragraph');
// firstParagraph.innerHTML = "<h2>This is a paragraph</h2>";

// let addNewElement = document.createElement('li');
// addNewElement.textContent = 'Item 5';
// myList.appendChild(addNewElement);

// let Removefirst = myList.firstElementChild;
// myList.removeChild(Removefirst);

// let paragraph = document.querySelector('#paragraph');
// paragraph.style.color = 'Black';
// paragraph.style.fontSize = '20px';
// paragraph.style.fontWeight = 'bold';
// paragraph.style.backgroundColor = "Green"

// let paragraph = document.querySelector('#paragraph');
// paragraph.classList.add('style');

let InputField = document.querySelector('input');
let button = document.querySelector('.addBt');
let ListElement = document.querySelector('.Ideas');

button.addEventListener('click', function () {

    let newElement = InputField.value;
    let CreatedDiv = document.createElement('p');

    CreatedDiv.textContent = newElement;
    ListElement.appendChild(CreatedDiv);

    InputField.value = '';
});

ListElement.addEventListener('click', function (event) {
    event.target.remove();
});