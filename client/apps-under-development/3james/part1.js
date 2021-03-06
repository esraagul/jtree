stage.waitToStart = false;

stage.content = `
    <p>In this part of the experiment you are matched with another participant. Both you and the other participant are reading the same instructions.</p>
    <p>Both you and the other participant will have to choose between two options "A" and "B" without communicating.</p>
    <p>If you choose option A, you will receive {{app.payoff_b}} Euros no matter what the other participant chooses.</p>
    <p>If you choose option B, you will receive {{app.payoff_a}} Euros if the other participant also chooses option B, and nothing (0 Euros) if he/she chooses option A.</p>
    <p>Which of the two options do you prefer?</p>
    <form>
        <div class='question' style='display: flex; flex-direction: column;'>
            <span>
                <label for='part1A'>
                    <input name='player.part1Ans' type='radio' required jt-value='app.part1OptionA' id='part1A'>
                    <b>Option A:</b>
                    You receive {{app.payoff_b}} Euros.
                </label>
            </span>
            <span>
                <label for='part1B' style='display: flex;'>
                    <input name='player.part1Ans' type='radio' required jt-value='app.part1OptionB' id='part1B'>
                    <span>&nbsp;<b>Option B:</b>&nbsp;</span>
                    <span>
                        You receive {{app.payoff_a}} Euros if the other participant chooses B.<br>
                        You receive nothing (0 Euros) if the other participant chooses A.
                    </span>
                </label>
            </span>
        </div>
        <br>
        <p>
            <button>OK</button>
        </p>
    </form>
`

stage.waitToEnd = false;
