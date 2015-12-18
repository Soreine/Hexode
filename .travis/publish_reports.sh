#!/bin/sh

# run prepare_git before

# Publish all reports
git fetch deploy
git checkout --orphan gh-pages-temp
git reset
git add -f $REPORT_FILES
git commit -m "Whatever"
git checkout gh-pages
git merge -X theirs --squash gh-pages-temp
git commit -m "Travis Reports #$TRAVIS_BUILD_NUMBER"

# Silent push to avoid the token to be shown in the console ^.^
git push deploy gh-pages </dev/null >/dev/null 2>/dev/null

git status
git log HEAD~3..
