# node-scripts/clone-and-code

`clone-and-code` is a basic NodeJS script that automatically clones a specific _.git_ repo into my own `/code` folder, then runs `yarn install` and finally opens the new cloned folder in VS Code.

## How it works

Simply run:

```sh
node [path-to-script] [git-repo-url]
```

**Note:** The script is programmed to clone the repository into the default directory `~/Desktop/code`.

## Alias

```sh
clcd [git-repo-url]
```

> `clcd` stands for "**clone** _(cl)_ and **code** _(cd)_"

---

### To-do

- Add a tag for running `npm` instead of `yarn`.
