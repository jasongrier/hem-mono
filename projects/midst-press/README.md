# Official site of the Midst poetry journal

## How to prep .midst files for the journal player

1. Open the file in Visual Studio Code
2. If the file is too big for Visual Studio Code, try Sublime or BBEdit
3. On the first line you will see:

        {"editorTimelineFrames"...

4. Change this to:

        module.exports = {"editorTimelineFrames"...

5. Change the file extension from `.midst` to `.js`
6. Drop the file in this repo, in `projects/midst-press/static/assets/poems`
7. Open the Poem component at `projects/midst-press/store/reducer.ts`
8. Add it to the list of poems by adding a line before the right bracket "]" `createPoem('Author Name', 'Name of Poem'),`

const poems = [
createPoem('Anis Mojgani', 'Cuesta'),
createPoem('Eleanor Eli Moss', 'THE HAMMER'),
createPoem('Hedgie Choi', 'I Get It, Phases'),
createPoem('Jackson Holbert', 'Poem Involving the Sea'),
createPoem('Dara Wier', '5x5'),
createPoem('Aja Moore', 'TGIF'),
createPoem('manuel arturo abreu', 'Ablation'),
createPoem('Woosung Sohn', 'Driving License'),
createPoem('Zachary Schomburg', '2 Poems'),
createPoem('Jackson Holbert', 'Poem About Judges', 'jackson-holbert-2'),
createPoem('Jenny Qi', 'When This Is All Over'),
createPoem('Veronica Martin', 'Epilogue in Summer'),
createPoem('Jose Hernandez Diaz', 'The Dahlias in Autumn'),
createPoem('Max Seifert', 'Benjamins'),
createPoem('Mia You', 'Go Bokito'),
createPoem('Sarah Matthes', 'Averting My Eyes'),
createPoem('Annelyse Gelman', 'Prosperity'),
createPoem('Annelyse Gelman', 'Pool'),
createPoem('Annelyse Gelman', 'Questions'),
]
