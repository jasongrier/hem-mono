# Midst Website

Midst is a project based on modern web technologies. It consists of a cross-platform app in the form of a React/Redux component, and a website. If you are reading this, then you are probably interested in working on the website

## Prerequisites

You have already cloned this repo, of course. You already have some kind of Node installed on your system. It is advised that you use some Node above version 10. You can adjust this via NVM

## Local dev

    npm i
    npm start midst-press

You also need to start a static file server on your machine: MAMP, Apache, NGINX or SimpleHTTPServer will do. This simulates a CDN serving static files, and offloads a lot of processing power from the actual Midst app/website. Nothing in the CDN is committed to source control, so keep your Midst files in a safe place

# Adding a poem

Midst files are in a proprietary format, but you don't need to worry about how the files work. Simply ZIP up a midst file and push it to your local CDN. The Midst website widget will automatically inflate the ZIP file and display the timeline. There is a registry of Midst poem files to be found in `projects/midst-press/store/reducer.ts`

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
      createPoem('Madeleine Mori', 'After Watching <i>Westworld</i>, the Left Side of My Body Malfunctions'),
      createPoem('Mia You', 'Go Bokito'),
      createPoem('Sarah Matthes', 'Averting My Eyes'),
      createPoem('Annelyse Gelman', 'Prosperity'),
      createPoem('Annelyse Gelman', 'Pool'),
      createPoem('Annelyse Gelman', 'Questions'),
    ]

The `createPoem` function follows a naming convention