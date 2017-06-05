# Fil & Fil-Blog

This is a demo blog which uses Fil, content engine.

Fil is a static page generator, unopinionated content management system which is designed to make developing websites
with different data structures easily to build and maintain for technical persons as well as making editing content
pleasurable to the copywriters.

[]To learn more about Fil, go to its repository by clicking here.](https://fil.ubenzer.com/)

# [Demo](https://fil.ubenzer.com/)

[Click here](https://fil.ubenzer.com/) to see how this demo blog looks like when published!

# How to start your own blog in 5 minute
1. Clone this repository
2. `npm i`
3. Edit your config and content where necessary
4. Use `npm start` to live-edit your changes
5. Use `npm run generate` to generate static pages that can be hosted anywhere OR use `npm run publish` to 
generate static files and publish them to configured Github Pages.

# (Optionally) Getting updates
If you want, you can get updates to either application logic part of
this blog (app folder) or theme/ui part of this blog (site) of this
repository. This way, even after you start having your own content or
custom theme you get updates from origin.

All you need is git.

All delivered via git subtree.

## Instructions
1. Add remotes
```sh
git remote add app git@github.com:ubenzer/fil-blog-partial-app.git
git remote add site git@github.com:ubenzer/fil-blog-partial-site.git
```
2. Fetch latest changes to `app` or `site` part of the project. Use regular get conflict resolution if needed.
```sh
git subtree pull -P app app master
git subtree pull -P site site master
```
 
### Initial subtree setup
This is for development purposes. The following commands are useful to
setup an initial repository.
```sh
git subtree add --prefix=app app master
git subtree add --prefix=site site master
git subtree push -P app app master
git subtree push -P site site master
```
