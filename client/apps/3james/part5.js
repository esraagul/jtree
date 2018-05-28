stage.waitToStart = false;

stage.content = `

    <p>In this part of the experiment you will be a matched with another participant as part of a project. Each of you has to decide on the allocation of {{app.part5End}} points. You can put these {{app.part5End}} points into your <b>private account</b> or you can contribute them <b>fully or partially</b> into a project. Each point you do not contribute to the project will automatically remain in your private account.</p>

    <p><b>Your income from the private account</b><br>
    You will earn one point for each point you put into your private account. No one except you earns something from your private account.</p>

    <p><b>Your income from the project</b><br>
    Your contribution to the project will be added to the other participant's contribution. The combined contributions will be increased by {{((player.part5Mult-1)*100).toFixed(0)}}% (multiplied by {{player.part5Mult}}), then divided equally between you and the other participant. The income for both you and the other participant will be determined as follows:<br>
    <i><b>Income from the project</b> = (sum of both contributions × {{player.part5Mult}})/2</i></p>

    <p><b>Total income</b><br>
    Your total income is the sum of your income from your private account and your income from the project. Each point will be converted to {{app.part5ExchRate}} Euros. </p>

    <p>To help you make your decision you may use the Income Calculator below to see how much you and the other participant would earn for different combinations of contributions:
    <ol>
        <li>Enter a number as your contribution.</li>
        <li>Enter a number as the other participant's contribution.</li>
        <li>Click "Check Incomes" to see how much you and the other participant would earn for these combinations.</li>
    </ol>
    <i>Numbers you enter into the Income Calculator will not affect your final payment in this experiment.</i></p>

    <p>When you have decided how much to contribute to the project, enter this into the box below the Income Calculator and click "Confirm Contribution".</p>

    <div id='part5IncCalc' style='
    border: 1px solid #888;
    padding: 1rem;
    margin: 1rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-row-gap: 0.5rem;
    grid-column-gap: 0.5rem;
    width: fit-content;
    '>
        <b style='grid-column: span 2;'>Income Calculator</b>
        Your contribution:
        <span>
          <input type='number' size=3 min=0 jt-max='app.part5End' step=1 style='width: fit-content' id='myCont'>
          points
        </span>
        Other's contribution:
        <span>
          <input type='number' size=3 min=0 jt-max='app.part5End' step=1 style='width: fit-content' id='otherCont'>
          points
        </span>
        <button style='grid-column: span 2;' onclick='jt.updateCalculator();'>Check Incomes</button>
        <span style='grid-column: span 2; color: red; white-space: pre-wrap' id='part5Msg'></span>
        Your contribution:
        <span id='myContDisp'></span>
        Other's contribution:
        <span id='otherContDisp'></span>
        Your earnings:
        <span id='myEarnings' style='min-width: 20rem;'></span>
        Other's earnings:
        <span id='otherEarnings'></span>
    </div>
    <script>
        isValidContribution = function(x) {
          var check1 = (!isNaN(x));
          var check2 = (x >= 0);
          var check3 = (x <= jt.data.player.group.period.app.part5End);
          var check4 = (parseInt(x) == x);
          return check1 && check2 && check3 && check4;
        }
        jt.updateCalculator = function() {
            var myCont = parseInt($('#myCont').val());
            var otherCont = parseInt($('#otherCont').val());
            if (isValidContribution(myCont) && isValidContribution(otherCont)) {
                var end = jt.data.player.stage.app.part5End;
                var mult = jt.data.player.part5Mult;
                $('#myContDisp').text(myCont + ' points');
                $('#otherContDisp').text(otherCont + ' points');
                var p5c = $('#part5Calcs');
                if (p5c.val().length > 0) {
                    p5c.val(p5c.val() + ',');
                }
                p5c.val(p5c.val() + '(' + myCont + ',' + otherCont + ')');
                var myEarnings = round(end - myCont + (myCont + otherCont) * mult / 2, 2);
                var otherEarnings = round(end - otherCont + (myCont + otherCont) * mult / 2, 2);
                $('#myEarnings').text(end + ' - ' + myCont + ' + (' + myCont + ' + ' + otherCont + ') x ' + mult + '/2 = ' + myEarnings + ' points');
                $('#otherEarnings').text(end + ' - ' + otherCont + ' + (' + otherCont + ' + ' + myCont + ') x ' + mult + '/2 = ' + otherEarnings + ' points');
                $('#part5Msg').text('');
            } else {
              $('#part5Msg').text('Please enter a number for both yourself and the other player.\\nThe numbers must be integers between 0 and 20.');
            }
        }
    </script>

    <p>How many points do you want to contribute to the project?</p>

    <form>
        <input hidden name='player.part5Calculations' id='part5Calcs'>
        <span class='question'>
            <input name='player.part5Cont' required type='number' min='0' jt-max='app.part5End' step='1'>
        </span>
        <p><button>Confirm Contribution</button></p>
    </form>
`

stage.waitToEnd = false;
