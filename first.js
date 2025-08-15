// Pehle player ka turn 'O' se start hoga
let turn = 'O';

// Total kitne moves ho chuke hain uska counter
let total_turn = 0;

// Jeetne ke liye possible winning combinations ka 2D array
let winner = [
   [0,1,2],[3,4,5],[6,7,8], // Rows
   [0,3,6],[1,4,7],[2,5,8], // Columns
   [0,4,8],[2,4,6]           // Diagonals
];

// Board ka initial state, sab cells "E" (Empty) hain
let board_array = new Array(9).fill("E");

// Winner check karne ka function
function checkwinner(){
   // Har winning combination ko check karo
   for(let [index0, index1, index2] of winner) {
      // Agar teeno boxes empty na ho aur teeno me same value ho
      if(board_array[index0] != "E" &&
         board_array[index0] === board_array[index1] &&
         board_array[index1] === board_array[index2]) {
         return 1; // Winner mil gaya
      }
   }
   return 0; // Koi winner nahi
}

// Board pe click hone par chalne wala function
const printer = (event) => {
   const element = event.target; // Jis cell pe click hua usko select karo

   // Sirf tab kaam kare jab cell empty ho
   if(board_array[element.id] === "E"){
      total_turn++; // Turn count badha do

      // Agar current turn 'O' ka hai
      if(turn === 'O'){
         element.innerHTML = "O";         // Cell me 'O' print karo
         board_array[element.id] = "O";   // Array me bhi 'O' store karo

         // Winner check karo
         if(checkwinner()){
            document.getElementById('winningMesaage').innerHTML = "Winner is O🥳";
            board.removeEventListener('click', printer); // Game stop
            return;
         }
         turn = "X"; // Next turn 'X' ka hoga
      } 
      // Agar current turn 'X' ka hai
      else {
         element.innerHTML = "X";         // Cell me 'X' print karo
         board_array[element.id] = "X";   // Array me bhi 'X' store karo

         // Winner check karo
         if(checkwinner()){
            document.getElementById('winningMesaage').innerHTML = "Winner is X🥳";
            board.removeEventListener('click', printer); // Game stop
            return;
         }
         turn = "O"; // Next turn 'O' ka hoga
      }

      // Agar 9 turns complete ho gaye aur koi winner nahi hai
      if(total_turn === 9){
         document.getElementById('winningMesaage').innerHTML = "Match is Draw😖";
      }
   }
};

// HTML se board select karo
const board = document.querySelector('.board');
// Board ke har click par printer function call karo
board.addEventListener('click', printer);

// Restart button ka code
const Restart = document.getElementById('restartButton');
Restart.addEventListener('click', () => {
   // Sabhi cells select karo
   const cell = document.getElementsByClassName('cell');

   // Har cell ko empty karo
   Array.from(cell).forEach((value) => {
      value.innerHTML = "";
   });

   // Game variables reset karo
   turn = "O";
   total_turn = 0;
   board_array = new Array(9).fill("E");
   document.getElementById('winningMesaage').innerHTML = "";

   // Game dobara start karne ke liye event listener lagao
   board.addEventListener('click', printer);
});
