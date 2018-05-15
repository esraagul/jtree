stage.waitToStart = false;

stage.content = `
    <form>
        <p id='part3Comp'
            class='comprehension'
            task-name='Part 2'
            task-name-und='the task in Part 2'
            jt-task-desc='player.treatment==1 ? "about the chances that a randomly selected participant would choose Option B" : "how many participants out of 20 chose Option B"'
            id-prefix='part3Comp'>
        </p>

        <p jt-displayIf='player.treatment==1'>In Part 2 you were asked about the chances that a randomly selected participant chose Option B. When you chose between Options A and B in Part 1, how important was it for you to think about the chances that a randomly selected participant would choose Option B?</p>
        <p jt-displayIf='player.treatment==2'>In Part 2 you were asked about how many participants out of 20 chose Option B. When you chose between Options A and B in Part 1, how important was it for you to think about how many participants would choose Option B?</p>
        <div id='part3Ans4' class='likertScale' likert-low='Not important at all' likert-high='Very important'></div>

        <p>Would it have been helpful for you to ask the experimenter a question when making your decision in Part 2?</p>

        <span class='question'>
            <label class='answer' for='part3Ans5Yes'>
                <input name='player.part3Ans5' type='radio' required value='Yes' id='part3Ans5Yes'>
                Yes
            </label>
            <label class='answer' for='part3Ans5No'>
                <input name='player.part3Ans5' type='radio' required value='No' id='part3Ans5No'>
                No
            </label>
        </span><br>
        <button>OK</button>
    </form>
`

stage.waitToEnd = false;
