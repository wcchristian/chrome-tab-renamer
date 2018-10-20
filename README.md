# Chrome Tab Renamer
A tab renamer extension for google chrome. This extension will allow you 

## Tutorial
For practice, I included the chrome extension tutorial in the tutorial folder of this repo.
[Tutorial Link](https://developer.chrome.com/extensions/getstarted)

# How to use
1. Navigate to a tab that you wish to rename
1. Click the Chrome Tab Renamer extension button.
1. Type the new name for your tab
1. Click the "Change Tab Name" or press enter to rename the tab.

## Omnibox
This chrome extension can make use of the omnibox with the prefix ctr

## Hotkey
The default chrome hotkey is Ctrl/Command+E

# Screenshots
Named Tabs

![Image of Tabs](screenshots/tabs.png)

Title input

![Image of Input](screenshots/enter.png)

Omnibox Support

![Image of Omnibox](screenshots/omnibox.png)

# Development
## Build
To build the extension from deployment, run:
```sh
./build.sh
```

When adding new files to the build, you must add them to the build.txt file.

## Versioning
When adding a new version, make sure to update manifest.json and version.txt