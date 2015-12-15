#!/bin/sh

# Temporary
VERSION='1.0.0'

# Retrieve repo info
GH_REPO=$(basename `git rev-parse --show-toplevel`)
GH_REMOTE=$(git remote -v | head -n 1 | sed "s/.*github.com\/\([a-zA-Z_-]*\)\/.*/\1/g")

echo $GH_USER
echo $GH_REPO
echo $GH_REMOTE
echo $GH_TOKEN | head -c 5

# Set up a bit of configuration
git config --local user.name $GH_USER
git config --local user.username $GH_USER
git remote add deploy https://$GH_USER:$GH_TOKEN@github.com/$GH_REMOTE/$GH_REPO.git

# Do the release commit
git fetch origin
if [ $(git branch -a | grep "remotes/origin/release-$VERSION") ]; then
    git checkout "release-$VERSION"
else
    git checkout -b "release-$VERSION"
fi
git add .
git commit -m "Travis Build $PLATFORM"

echo $(git status)

# Silent push to avoid the token to be shown in the console ^.^
git push deploy release-$VERSION </dev/null >/dev/null 2>/dev/null
