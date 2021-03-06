This tutorial shows how to start and run a session. We will use an implementation of the public goods game described in Box 1 that comes included with jtree. The tutorial that follows this one will show you how to actually build the corresponding app.

*Box 1* - Description of the simple public goods game.
A group of N players is given an endowment E from which they may contribute a certain amount ci to the creation of a public good. The total amount produced of the public good G = a * sum (ci) is a function of the sum of contributions and a production factor a \in (1, N). The public good is then divided equally among all players in the group. The payoff to player i is then E - ci + G/N.

Follow these steps to run a session:

1. Open the "Apps" view.
2. Find the "public-goods" app. Click the blue play button. jtree switches to the "Session" view.
3. Under the "Settings" tab, change "Number of participants" to 4 and click "Set".
4. Start the session: Click the "Start" button.

The session is now running.

The "Participants" tab contains a table of the participants in the session, including data for each player's current period and individual links to open each participant in a new browser tab.

The "Monitor" tab lets you supervise / test multiple participants at the same time. "Show All" opens a preview window for each participant. "Start autoplay" starts all players playing automatically.

Once all participants have finished playing an app, output for that app is written to the session output file. This is a comma-separated value file located at `<jtree>/sessions/<sessionId>/<sessionId>.csv`, where `<jtree>` is the location of the jtree executable, and `<sessionid>` is the name of the session. The last few lines of this file are a list of all session participants and how many points they earned.
