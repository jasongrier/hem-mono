# Official site of the Midst poetry journal

## Recommended Environment

1. Install nvm</br>
       Follow instructions regarding creating a ~/.nvm directory
       and copying recommended script lines in to your environment (e.g. ~/.zshrc)
       * Example:

                brew install nvm
                mkdir ~/.nvm
                vim ~/.zshrc
2. Use nvm to install Node.js 12.x ( see <https://nodejs.org/en/download/releases/> )</br>
       Midst is not yet compatible with newer versions of Node.js

       * Example:
       
                nvm install 12.19.0
                nvm use 12.19.0
3. Install local copy of hem-mono (either clone or fetch/pull if you have cloned earlier)

      * Example:

                git clone https://github.com/jasongrier/hem-mono.git

        or using github, create a social fork of jasongrief/hem-mono and then clone that:

                git clone https://github.com/yourgithubaccountname/hem-mono.git
4. Install packages that midst depends on
       * Example:

                cd hem-mono
                npm install

   You may get errors, especially involving gyp. In which case, install or update XCode and then:

                sudo xcode-select -s  /Applications/Xcode.app/Contents/Developer

   You will likely receive warnings about peer dependencies.  Those can probably be ignored, especially if you have newer versions of the packages installed that are being warned about.
        However, where a newer version of a package isn't already installed, peer dependencies need to be installed.</br>
        In this situation you can try something similar to:

                npm install -g install-peerdeps
                install-peerdeps acorn@8.0.0

5. Confirm your Environment will run midst
       * Example:

                npm start midst-press
        
        There should be a line in the terminal similar to:</br>
        
        Server running at <http://localhost:1234>
        
        Open your browser and enter that URL</br>
        
        You should see the midst welcome screen.

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
8. Add it to the list of poems by adding a line after the left bracket "[" `createPoem('Author Name', 'Name of Poem'),`

const poems = [
</br>
&nbsp; &nbsp; createPoem('Anis Mojgani', 'Cuesta'),</br>
&nbsp; &nbsp; createPoem('Eleanor Eli Moss', 'THE HAMMER'),</br>
&nbsp; &nbsp; createPoem('Hedgie Choi', 'I Get It, Phases'),</br>
&nbsp; &nbsp; createPoem('Jackson Holbert', 'Poem Involving the Sea'),</br>
&nbsp; &nbsp; createPoem('Dara Wier', '5x5'),</br>
&nbsp; &nbsp; createPoem('Aja Moore', 'TGIF'),</br>
&nbsp; &nbsp; createPoem('manuel arturo abreu', 'Ablation'),</br>
&nbsp; &nbsp; createPoem('Woosung Sohn', 'Driving License'),</br>
&nbsp; &nbsp; createPoem('Zachary Schomburg', '2 Poems'),</br>
&nbsp; &nbsp; createPoem('Jackson Holbert', 'Poem About Judges', 'jackson-holbert-2'),</br>
&nbsp; &nbsp; createPoem('Jenny Qi', 'When This Is All Over'),</br>
&nbsp; &nbsp; createPoem('Veronica Martin', 'Epilogue in Summer'),</br>
&nbsp; &nbsp; createPoem('Jose Hernandez Diaz', 'The Dahlias in Autumn'),</br>
&nbsp; &nbsp; createPoem('Max Seifert', 'Benjamins'),</br>
&nbsp; &nbsp; createPoem('Mia You', 'Go Bokito'),</br>
&nbsp; &nbsp; createPoem('Sarah Matthes', 'Averting My Eyes'),</br>
&nbsp; &nbsp; createPoem('Annelyse Gelman', 'Prosperity'),</br>
&nbsp; &nbsp; createPoem('Annelyse Gelman', 'Pool'),</br>
&nbsp; &nbsp; createPoem('Annelyse Gelman', 'Questions'),</br>
]
