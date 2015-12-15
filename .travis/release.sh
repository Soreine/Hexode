#!/bin/sh

# Retrieve repo info
GH_REPO=$(basename `git rev-parse --show-toplevel`)
GH_REMOTE=$(git remote -v | head -n 1 | sed "s/.*github.com\/\([0-9a-zA-Z_-]*\)\/.*/\1/g")

# Set up a bit of configuration
git config --local user.name $GH_USER
git config --local user.username $GH_USER

git remote add deploy https://$GH_USER:$GH_TOKEN@github.com/$GH_REMOTE/$GH_REPO.git

# Do the build commit
git checkout --orphan build-$VERSION
git reset
git add -f backend/dist backend/server.js backend/package.json backend/npm_global_module_list
git commit -m "Travis Build"

git checkout --orphan gh-pages
git reset
git add -f backend/reports
git add -f backend/api
git commit -m "Travis Build"

# Silent push to avoid the token to be shown in the console ^.^
git push -f deploy build-$VERSION </dev/null >/dev/null 2>/dev/null
git push -f deploy gh-pages </dev/null >/dev/null 2>/dev/null
