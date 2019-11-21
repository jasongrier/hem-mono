# Official site of the Midst poetry journal

## How to prep .midst files for the journal player

1. Open the file in Visual Studio Code
2. If the file is too big for Visual Studio Code, try Sublime or BBEdit
3. On the first line you will see:

        {"editorTimelineFrames"...

4. Change this to:

        module.exports = {"editorTimelineFrames"...

5. Change the file extension from `.midst` to `.js`
6. Drop the file in this repo, in `src/projects/midst-journal/assets/poems`
7. Open the Poem component at `src/projects/midst-journal/routes/Poem.tsx`
8. Add it to the list of poems:

        const poemsJsData = {
          'a-shade-whiter': require('../assets/poems/angelo_whiter_NO_TITLE'),
          'pool': require('../assets/poems/pool'),
          'prosperity': require('../assets/poems/prosperity'),
          'alphabet-song': require('../assets/poems/AnnelyseGelman_AlphabetSong_NO_TITLE'),
          'untitled-hedgie': require('../assets/poems/untitled-hedgie'),
          'my-new-poem': require('../assets/poems/my-new-poem'),
        } as any

This represents the actual material that gets played back. Next, we add the poem's presentational info.

10. Open up `src/projects/midst-journal/store/reducer.ts` and add that info there:

        ...
        }, {
          slug: 'untitled-hedgie',
          title: 'Untitled',
          author: 'Hedgie Choi',
          processNote: 'Lorem ipsum dolor sit amet',
        }, {
          slug: 'my-new-poem',
          title: 'My New Poem',
          author: 'Me',
          processNote: 'Lorem ipsum dolor sit amet',
        },
        ...