stage.waitToStart = false;

stage.content = `
<style>

    .cols3 > span {
        display: flex;
    }

    .cols3 > span > div {
        margin: 1rem;
        border: 1px solid;
        border-radius: 5px;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .cols3 > button {
        align-self: center;
    }

</style>

    <p style='margin-left: auto; margin-right: auto;'>
        In this Part of the experiment you will be asked to guess three numbers that are related to the contributions made by other participants who faced the same decision as you in Part 5.
    </p>

    <form id='part6Form' class='cols3'>
        <span>
            <div>
                <p>
                    <b>Task 1</b><br><br>
                    Four participants, other than yourself and your partner from Part 5, will be randomly selected. <br><br><br>
                    Guess a number such that you think <b>three</b> of the contributions will be greater than or equal to that number, and <b>one</b> will be less than that number.<br><br>
                    If your guess is correct you will earn 2 Euros. You will also be paid if all four numbers are the same and you guessed that number.
                </p>
                <p>
                    <i>Example</i><br>
                    If the randomly selected contributions were 7, 9, 11 and 13, you would earn 2 Euros if you guessed 8 or 9, and nothing (0 Euros) otherwise.
                </p>
                <p>What is your guess?</p>
                <p class='question'>
                    <input name='player.part6LowQ' type='number' required min='0' jt-max='app.part5End' step='1'>
                </p>
            </div>
            <div>
                <p>
                    <b>Task 2</b><br><br>
                    Four participants, other than yourself and your partner from Part 5, will be randomly selected (different from the participants selected in Task 1).<br><br>
                    Guess a number such that you think <b>two</b> of the contributions will be greater than that number, and <b>two</b> will be less than or equal to that number. <br><br>
                    If your guess is correct you will earn 2 Euros. You will also be paid if all four numbers are the same and you guessed that number.
                </p>
                <p>
                    <i>Example</i><br>
                    If the randomly selected contributions were 7, 9, 11 and 13, you would earn 2 Euros if you guessed 9 or 10, and nothing (0 Euros) otherwise.
                </p>
                <p>What is your guess?</p>
                <p class='question'>
                    <input name='player.part6Med' type='number' required min='0' jt-max='app.part5End' step='1'>
                </p>
            </div>
            <div>
                <p>
                    <b>Task 3</b><br><br>
                    Four participants, other than yourself and your partner from Part 5, will be randomly selected (different from the participants selected in Tasks 1 and 2). <br><br>
                    Guess a number such that you think <b>one</b> of the contributions will be greater than that number, and <b>three</b> will be less than or equal to that number. <br><br>
                    If your guess is correct you will earn 2 Euros. You will also be paid if all four numbers are the same and you guessed that number.
                </p>
                <p>
                    <i>Example</i><br>
                    If the randomly selected contributions were 7, 9, 11 and 13, you would earn 2 Euros if you guessed 11 or 12, and nothing (0 Euros) otherwise.
                </p>
                <p>What is your guess?</p>
                <p class='question'>
                    <input name='player.part6UpQ' type='number' required min='0' jt-max='app.part5End' step='1'>
                </p>
            </div>
        </span>

        <button>OK</button>
    </form>
`

stage.waitToEnd = false;
