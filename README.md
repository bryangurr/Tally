# Tally — Prototype Design Rationale

[Live prototype](https://tally.bryangurr.com/) · [GitHub repository](https://github.com/bryangurr/Tally)

## 1. Need, persona, capability, and fundamental value

1. Need: Individuals playing games need to keep track of scores and other win conditions to prevent pauses caused by mental math errors and score disputes.



   Persona: Plays a variety of games with friends 2-3 times per week, plays complex games with different scoring needs, and is often disconnected from games, instead worrying about getting scoring just right.



   Capability: Compute scores and track life totals and other custom win conditions. 



   Fundamental Value: Immersion. The player stays present in the game, confident that math and scoring is handled accurately without slowing play. 

## 2. Three screens

2. Screen 1: Landing screen. 

   Facilitates navigation to different parts of the app. The screen has one primary button: New Game (should clearly stand out to the user so that they know to click on it). The screen is clean and free of clutter. This screen is there to guide users to start a new game. 

   Screen 1 design question: Can the user identify that they should press the new game button without having to read any text on the screen?



   Screen 2: Game type selection. 

   This screen allows users to choose from 3 different scoring methods (Total score after number of rounds, first person to a specific score, or life based) and allows for simple configuration of each method (e.g., how many rounds? What score does it go to? How many players? Is there a timer?). This screen sets up the app to fulfill its primary purpose: keeping track of scores/life totals so that players can focus on the game. 

   Screen 2 design question: Does showing selectable icons for each scoring method provide enough information for the user to recognize how each method works? 



   Screen 3: Game screen

   This is the screen that is visible while playing the game, which shows relevant information like round numbers and scores, and gives users the ability to adjust scores and life totals as necessary. This screen fulfills the primary purpose of the app, allowing users to take care of scoring and life totals without having to do calculations by hand.

   Screen 3 Design Question: Can users recognize how to update scores/life totals without a tutorial or explicit instructions? 

## 3. Design question plan

3. Feedback Questions: 
   1. What do you use to track your score in games right now, and what is annoying about it? 
   - Predicted answer: I usually use pen and paper, but it is time consuming and I often make mistakes.  
   * The automatic math on the score screen will be quick and will help prevent errors. 
   2. What would have to be true for you to switch to a different score-keeping tool instead of what you use right now? 
   - Predicted answer: I would need something versatile that works for any game I play, and that allows me to quickly and accurately update scores for each player.  
   * The game setup screen allows you to quickly choose from common game modes, and the score screen keeps track of the score, reducing the need for mental math.  
   3. What apps or other tools have you used to keep scores for games? 
   - Predicted answer: I normally use a pen and paper, but I’ve also tried a couple of other apps; however, they take a while to set up or don’t work for all the different games I play.  
   * The quick setup process allows any game mode to be set up with as few as 3 clicks total.  
   4. I am going to show you this screen for five seconds. What do you think this app does? 
   - Predicted answer: It looks like an app to help me keep track of my game scores.  
   * The simple interface draws attention to the New Game button, and the graphic quickly shows that the game scores are being tracked.  

## 4. Your design justification and first read

1. Does the landing screen signal the primary capability and fundamental value at first glance, before reading?\
   The landing screen does a fair job of signaling that the purpose of the app is to keep score. The visualization helps highlight this capability; however, it does not do as well at specifically highlighting the fundamental value of immersion.

2. Does every element on the landing screen earn its place, or does anything compete with the primary job?\
   The landing screen is very simple. It contains a signifier to start a game with a simple illustration showing the app in action. It contains the phrase, “Less counting, more playing” to help solidify the fundamental value.

3. What information and actions belong together on each screen, and which Gestalt grouping principle communicates that?\
   The game setup screen groups together different setting choices (proximity). The game mode choices are grouped together, the number of players choices are grouped together, and the timer settings are grouped together. The score page uses common region to link scores to players and indicate whose scores are being adjusted.

4. Do screens 2 and 3 stay on mission, and can you return to the landing screen from everywhere?\
   You can return to the landing screen at any point. Screen two sets up screen three to be able to fulfill the apps mission.

5. What did the AI initially get wrong, skip, or oversimplify, and what did you change?\
   AI filled the app with text. There were lots of slogans and taglines all over which distracted from the app’s value and purpose. It also clumped things tightly, which made things confusing.

6. Which design question or grouping/signaling decision motivated each important change?\
   The first major change was removing clutter. I wanted to ensure that people were not distracted by excessive text and illustrations. The next big change I made was to improve the UI of the landing page by making the signifier stand out from everything. This app is designed for mobile view, so I shifted the illustration to be partially offscreen, and cleared space around the new game signifier to draw more attention to the signifier itself.

Initial Commit: [https://github.com/bryangurr/Tally/commit/6a4645c3088727582f056be309fba5145f636695](https://github.com/bryangurr/Tally/commit/6a4645c3088727582f056be309fba5145f636695)

Final Commit: [https://github.com/bryangurr/Tally/commit/3df68a4147bdfafd29c44a861300e88ea3e776da](https://github.com/bryangurr/Tally/commit/3df68a4147bdfafd29c44a861300e88ea3e776da)
