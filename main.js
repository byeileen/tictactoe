	/*
		
		Stuff to handle ;-):
		1. Make the fields clickable (player0 uses "X", player1 "0")
		2. Keep track of all used fields (fieldsPlayed) and of the fields each player chose (fieldsPlayer0, fieldsPlayer1)
		3. Avoid that úsed fields can be played again and implement feedback like "Field already taken" (alert();)
		4. Check for winning combinations
		5. Implement feedback to the players (winning or game is a draw)
		6. End the game, avoid further playing
		7. Add a "Play again button"
		8. Implement "eternal" game statistics (using local storage!)
		9. Style the game as fancy and responsive as you can ;-)
		
		*/

		// global game variables
		var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, msg, playButton, stats;
		let o_wins = 0;
		let x_wins = 0;

		//Stats
		stats = [];
		if (localStorage && localStorage.getItem("stats")){
			stats = JSON.parse(localStorage.getItem("stats"));
			stats.forEach(element => {
				if(element == "O"){
					o_wins++;
				}
				if(element == "X"){
					x_wins++;
				}
			});
			document.getElementById("O-win").innerHTML = o_wins;
			document.getElementById("X-win").innerHTML = x_wins;
		};

		player = 0;

		fields = [];
		fields = document.getElementsByTagName('td');
		console.log(fields);

		fieldsPlayed = [];
		fieldsPlayer0 = [];
		fieldsPlayer1 = [];

		msg = document.getElementById('msg');

		playButton = document.getElementById('playAgain').addEventListener('click', playAgain);

		for (let i = 0; i < fields.length; i++) {
			fields[i].addEventListener('click', play)
		}


		function play() {
			// game core mechanics, marking the fields
			//console.log('Are you talking to me?');
			if (fieldsPlayed.includes(this.id)) {
				alert('No can do!')
			}
			if (player === 0 && !fieldsPlayed.includes(this.id)) {
				this.innerHTML = 'X';
				this.style.color = '#9EDDE2';
				fieldsPlayer0.push(parseInt(this.id));
				player = 1
			} else if (player === 1 && !fieldsPlayed.includes(this.id)) {
				this.innerHTML = 'O';
				this.style.color = '#9EB5E2';
				fieldsPlayer1.push(parseInt(this.id));
				player = 0
			}

			fieldsPlayed.push(this.id);
			console.log(fieldsPlayed);

			win()
		}

		function win() {
			// analyzing field choices, winning conditions, feedback
			if (
				fieldsPlayer0.includes(1) && fieldsPlayer0.includes(2) && fieldsPlayer0.includes(3) ||
				fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(6) ||
				fieldsPlayer0.includes(7) && fieldsPlayer0.includes(8) && fieldsPlayer0.includes(9) ||
				fieldsPlayer0.includes(1) && fieldsPlayer0.includes(4) && fieldsPlayer0.includes(7) ||
				fieldsPlayer0.includes(2) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(8) ||
				fieldsPlayer0.includes(3) && fieldsPlayer0.includes(6) && fieldsPlayer0.includes(9) ||
				fieldsPlayer0.includes(1) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(9) ||
				fieldsPlayer0.includes(3) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(7)
			) {
				// player 0 won
				msg.innerHTML = 'Player X won!';
				gameOver(1);
			} else if (
				fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) ||
				fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
				fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) ||
				fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(7) ||
				fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
				fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9) ||
				fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
				fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7)
			) {
				// player 1 won
				msg.innerHTML = 'Player O won!'
				gameOver(2);
			} else if (fieldsPlayed.length == 9) {
				// game is a draw
				msg.innerHTML = 'It\'s a draw!'
				gameOver(0);
			}

		}

		function gameOver(X) {
			// ending the game 
			for (let i = 0; i < fields.length; i++) {
				fields[i].removeEventListener('click', play)
			}
			if (X == 1){
				stats.push("X")
			} else if(X == 2){
				stats.push("O")
			}
			localStorage.setItem("stats", JSON.stringify(stats))

		}

		function playAgain() {
			// restart the game
			window.location.reload(true)
		}

		function gameStats() {
			// game stats using local storage
		}