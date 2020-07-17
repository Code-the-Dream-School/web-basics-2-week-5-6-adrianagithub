//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it
// with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, 
//you have to create the board for the player2 using the id property 
//'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board 
//(you have to verify if the player is clicking the right board) the program needs to 
//verify if there is an opponent's ship in that cell. If it is then the opponent has one
// less ship
//We want you to store the data of each player in two Player objects. Each object has to
// store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state
// of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 
//'turn_player'. And if there is a winner  a text with: 
//'Congratulations {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 
//'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of
// each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships
// first one more Thing create a 'reset' and a 'new game' buttons as childs of the element
// with the id 'buttons'. the reset button has to start the game again and the new game 
//create a new game with new players and a new random board.
//div with ID

var player1 = {
  name : '',
  shipCount: 4,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};
var player2 = {
  name : '',
  shipCount: 4,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};

var x;
var y;
var currentplayer;
var opponent;

function getRandomNumber() {
  var valmin=0; 
  var valmax=4;  
  var num = Math.floor(Math.random() * (+valmax - +valmin)) + +valmin; 
  return num;
}

function createShip(player, ships) {
  let i = 0;
  do {
    const x = getRandomNumber();
    const y = getRandomNumber();
    if (player.gameBoard[x][y] !== 1) {
      player.gameBoard[x][y] = 1;
      i++;
    }
  } while (i < ships)
}
//console.log("Player 1 " + JSON.stringify(player1.gameBoard));
//console.log("Player 2 " + JSON.stringify(player2.gameBoard));


createShip(player1, 4)
//console.log("Player 1 " + JSON.stringify(player1.gameBoard));
console.log("Player 1 " + player1.gameBoard);
createShip(player2, 4)
console.log("Player 2 " + player2.gameBoard);
//console.log("Player 2 " + JSON.stringify(player2.gameBoard));

function disparar(player,x,y){
  if (player.gameBoard[x][y] === 1){
    console.log("estas disparando")
    console.log(player)
    //alert ("You hit your opponent has one less ship")
    player.gameBoard[x][y] = 0
    player.shipCount --
    // if (currentplayer === player1){//***cambiar turno */
    //   currentplayer = player2;
    // } else{
    //   currentplayer = player1;
    // }
  }else{
    console.log ("lo siento no estas hundiendo barcos de tu oponente")
    //alert("Sorry you did not hit your opponent")
    console.log(player)
    // if (currentplayer === player1){//***cambiar turno */
    //   currentplayer = player2;
    // } else{
    //   currentplayer = player1;
    // }
  }
  return player.name;
}

//TRATAR DE DESHABILITAR DIV Y SUS HIJOS
function disableDivplayer1 () {
  console.log('entroadeshabilitarDivplayer1')
  var nodes = document.getElementById("player1").getElementsByTagName('*');
  for(var i = 0; i < nodes.length; i++){
      nodes[i].disabled = true;
  }
  return;
}

function disableDivplayer2 () {
  console.log('entroadeshabilitarDivplayer2')
  var nodes = document.getElementById("player2").getElementsByTagName('*');
  for(var i = 0; i < nodes.length; i++){
      nodes[i].disabled = true;
    }
  return;  
}

//ANOTHER WAY TO TRY TO DISABLE THE DIV WITH CSS .DISABLED
//div.disabled{
//  display: none;
//} //IN THE DIV ID I SHOULD USE THIS CLASS BUT I STILL NEED TO USE IN THE EVENT CLICK

console.log("Player 1 " + player1.gameBoard);
console.log("Player 2 " + player2.gameBoard);

//function reset() { //DO NOT USE AS WE DO NOT HAVE A FORM HERE
//  document.getElementById("myForm").reset();
//CREATE BUTTONS
const NodeButt = document.getElementById('buttons');
var buttonRes = document.createElement("button");
buttonRes.innerHTML = "Reset Game";
var buttonNew = document.createElement("button");
buttonNew.innerHTML = "New Game";
NodeButt.appendChild(buttonRes);
NodeButt.appendChild(buttonNew);
buttonRes.addEventListener("click", refreshPage);
buttonNew.addEventListener("click", refreshPage);
function refreshPage(){
  window.location.reload();
} 

const board_Player1 = document.getElementById('board_player1');
for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell
      //turnos
      //this function adds the click event to each cell      
      if ((currentplayer === player2) && (opponent === player1))  //SOLO PUEDES DISPARAR EN BOARD1 SI ERES PLAYER2
      {
        //ENTRO BOARD1
        console.log('entro board1')
        //HOW TO SET BOARD PLAYER ENABLE OR DISABLE
        disableDivplayer2 ();//Deshabilita tablero player2 y sus hijos para que no se dispare solo
          cell.addEventListener( 'click', (e) => {//player1          
          let cell = e.target; // get the element clicked
          console.log(cell.textContent)//split by comma and parse two integer
          let coordp1 = cell.textContent.split(',')
          console.log(coordp1,"array")
          //cell.textContent.split(',')
          var x = parseInt(coordp1[0])
          var y = parseInt(coordp1[1])
          console.log (x)
          console.log (y)
          //turnos(player2);//*******PROBAR con function turnos
          //player1 = disparar(player1,x,y);
          disparar(player1,x,y)// player2 shot player 1 in player1 board
          console.log (player1.shipCount)
          console.log (board_Player1);
          console.log (board_Player2);
          currentplayer = player1; //switch turn to shot to player 1
          opponent = player2;
          console.log (currentplayer);        
          if ((player1.shipCount === 0) || (player2.shipCount === 0)){//END THE GAME AND REFRESH THE PAGE
            alert ("I am sorry you loose all your ships the GAME IS OVER");
            refreshPage()
          }
          // //display the coordinates in the console
          cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
          //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
        });
        }
        //else{
           
        //   currentplayer = player1
        //   opponent = player2
        // }
        
      li.appendChild(cell); //adding each cell into the row number x
    }

     board_Player1.appendChild(li); //adding each row into the board
}

//CONSTRUIR TABLERO PLAYER 2
const board_Player2 = document.getElementById('board_player2');
for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell
      //console.log (currentplayer);
      //this function adds the click event to each cell
      if ((currentplayer === player1) && (opponent === player2)) //SOLO PUEDES DISPARAR EN BOARD2 SI ERES PLAYER1
      {//HOW TO SET BOARD PLAYER ENABLE OR DISABLE
      //this function adds the click event to each cell
        disableDivplayer1 (); //Deshabilita tablero player1 y sus hijos
        console.log('entro board2')
        cell.addEventListener ('click', (e) =>  {
        let cell = e.target; // get the element clicked
        console.log( cell.textContent) //display the coordinates in the console
        cell.style.visibility = 'hidden';
        // this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
        //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
        let coordp2 = cell.textContent.split(',')
        console.log(coordp2,"array")
        //cell.textContent.split(',')
        var x = parseInt(coordp2[0])
        var y = parseInt(coordp2[1])
        console.log (x)
        console.log (y)
        //*******PROBAR con function turnos
        //turnos(player1);
        //player2 = disparar(player2,x,y);
        disparar(player2,x,y)//player 1 shot player2 in her board
        console.log (board_Player1);
        console.log (board_Player2);
        currentplayer = player2;//CAMBIA TURNO
        opponent = player1;
        console.log (currentplayer);
        if ((player1.shipCount === 0) || (player2.shipCount === 0)){
        alert ("I am sorry you loose all your ships the GAME IS OVER");
        refreshPage();
        }
      });//END EVENT LISTENER
    }//END IF
      // else { 
      //   currentplayer = player2;
      //   opponent = player1;
      // }
      li.appendChild(cell); //adding each cell into the row number x
    }

     board_Player2.appendChild(li); //adding each row into the board
}

player1.name = prompt ('Welcome, what is your name?')
player2.name = prompt ('Welcome, what is your name?')
alert ("We will play the Battleship Game")
alert ("You will have one turn at the time")
currentplayer = player1;
opponent = player2; //INIT currentplayer


  

//FUNCTION TO SWAPT THE TURN
// function turnos (currentplayer){//always starts with player1 by default
//    var winner
//    do{
//       if (currentplayer === player1) {     
//         player2 = disparar(player2,x,y);
//         console.log(player1.shipCount)
// //     console.log(player2.gameBoard);//aqui cuento numero de ships tambien
// //     //alert(`${player1.name} tiene ships${player1.shipCount}`);
// //     //pasar turno player2
//      currentplayer = player2 //pasar turno a player2
//      }
//      else  {
//        player1 = disparar (player1,x,y)
// //       //alert (player1.gameBoard)    
//        console.log(player1.shipCount)
// //       //alert (`${player2.name}tiene ships${player2.shipCount}`)
// //       //regresar turno a player1
// //       console.log('termino en else')
//        currentplayer = player1 //pasar turno a player1
//      }
//      } while (player2.shipCount > 0 && player1.shipCount > 0)
//  }//END FUNCTION TURNOS  


//function turnos (currentplayer){//always starts with player1 by default
//var winner
//   do{
//      if (currentplayer === player1) {
//           player2 = disparar(player2,x,y);//aqui es donde no entiendo bien
//           console.log(player2.gameBoard);//aqui cuento numero de ships tambien
//           //pasar turno player2
//           currentplayer = player2 //pasar turno a player2
//else  {  
//         player1 = disparar (player1,x,y)
//         //alert (player1.gameBoard)    
//         console.log(player1.shipCount)
//         //alert (`${player2.name}tiene ships${player2.shipCount}`)
//         //regresar turno a player1
//         console.log('termino en else')
//         currentplayer = player1 //pasar turno a player1
//         // console.log (player1.name)
//          console.log (player1.gameBoard)
//          console.log (player1.shipCount)
//          console.log (currentplayer)         
//         }
//    } while (player2.shipCount > 0 && player1.shipCount > 0)




//*******************************//
// // Create a function to give turns to the Players
// function turnos (currentplayer){//always starts with player1 by default
// var winner
//   do{
//      if (currentplayer === player1) {
//           var x= prompt("Player1 Introduce the coordenates x of your opponent ship", "0");
//           var y = prompt("Player1 Introduce the coordenates y of your opponent ship", "0"); 
//           player2 = disparar(player2,x,y);//aqui es donde no entiendo bien
//           console.log(player2.gameBoard);//aqui cuento numero de ships tambien
//           //pasar turno player2
//           currentplayer = player2 //pasar turno a player2
//           //if ((player1.shipCount !== 0) || (player2.shipCount !== 0)) {
//           //  break
//           //}
//           // console.log ('termino en if')         
//           //  console.log (player2.name)
//           //  console.log (player2.gameBoard)
//           //  console.log (player2.shipCount)
//           //  console.log (currentplayer)
//        }
//      else  {
//         var x = prompt ( "Player 2 Introduce the coordenates x of your opponent ship", "0")
//         var y = prompt ( "Player 2 Introduce the coordenates y of your opponent ship", "0") 
//         player1 = disparar (player1,x,y)
//         //alert (player1.gameBoard)    
//         console.log(player1.shipCount)
//         //alert (`${player2.name}tiene ships${player2.shipCount}`)
//         //regresar turno a player1
//         console.log('termino en else')
//         currentplayer = player1 //pasar turno a player1
//         // console.log (player1.name)
//          console.log (player1.gameBoard)
//          console.log (player1.shipCount)
//          console.log (currentplayer)         
//         }
//    } while (player2.shipCount > 0 && player1.shipCount > 0)
//    //(player2.shipCount !== 0 && player1.shipCount !== 0)  
//     if (player1.shipCount === 0)
//     {
//       winner = player2.name;
//       console.log(player2.name)
//     }
//     else {
//       winner = player1.name;
//       console.log(player1.name)
//     } 
 
 //return winner//winner
 //}//end function turnos
 //turnos(player1)

// // Get names of my players
// // Generate the boards
// createShip(player1, player1.shipCount)
// console.log(player1.gameBoard)
// createShip(player2, player2.shipCount)
// console.log(player2.gameBoard)
// alert (player1.gameBoard)
// alert (player2.gameBoard)

// const gameResult = turnos(player1)


// const htmlTarget = document.getElementById('result')
// htmlTarget.innerHTML = gameResult
