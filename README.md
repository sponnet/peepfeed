# Peep Feed

Quick REACT frontend to Peepeth sliced data.

## How is this different ?

It is based on a preprocessor that creates static slices of peepeth data which are linked together as a chronological feed of peeps.
This frontend starts with the latest IPFS hash of a (processed) peep - and walks to the next hash etc.

This is uncensored.

## Running

```
yarn
yarn start
```

Then open your browser and provide the hash of the peep where you want your feed to start.

https://peepfeed.netlify.com/?QmVbmP51zPfWpes1BTAUDs8fMCePvP5Vp8wbsFJAqcjXg8
