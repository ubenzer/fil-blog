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
