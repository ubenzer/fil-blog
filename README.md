# Please disregard everything in this README. It is not working yet.

# How to start your own blog in 5 minute
1. Clone this repository
2. npm i
3. Edit your config
4. npm start
5. npm run publish

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
git remote add app git@github.com:ubenzer/fil-blog-app.git
git remote add site git@github.com:ubenzer/fil-blog-partial-site.git
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
