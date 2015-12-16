#!/bin/sh

# run prepare_git before

# Publish all reports
git fetch deploy
git checkout gh-pages
git reset
git add -f $REPORT_FILES
git commit -m "Travis Reports"

# Silent push to avoid the token to be shown in the console ^.^
git push deploy gh-pages </dev/null >/dev/null 2>/dev/null
