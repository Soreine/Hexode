#!/bin/sh

# run prepare_git before

# Do the build commit
git checkout --orphan build-$VERSION
git reset
git add -f $BUILD_FILES
git commit -m "Travis Build"

# Silent push to avoid the token to be shown in the console ^.^
git push -f deploy build-$VERSION </dev/null >/dev/null 2>/dev/null
