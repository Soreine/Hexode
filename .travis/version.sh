#!/bin/sh

MAJORS=$(git log --grep="\[ *major *\]" --oneline)

LAST_MAJOR=$(echo $MAJORS | grep -oE "^[a-z0-9]+")
if [ $LAST_MAJOR ]
then
    MINORS=$(git log --grep="\[ *minor *\]" --oneline $LAST_MAJOR..)
    MAJOR=$(echo $MAJORS | grep -oE "[a-z0-9]+ \[" | wc -l)
else
    MINORS=$(git log --grep="\[ *minor *\]" --oneline)
    MAJOR=0
fi

LAST_MINOR=$(echo $MINORS | grep -oE "^[a-z0-9]+")
if [ $LAST_MINOR ]
then
    PATCHES=$(git log --grep="\[ *patch *\]" --oneline $LAST_MINOR..)
    MINOR=$(echo $MINORS | grep -oE "[a-z0-9]+ \[" | wc -l)
else
    if [ $LAST_MAJOR ]
    then
        PATCHES=$(git log --grep="\[ *patch *\]" --oneline $LAST_MAJOR..)
    else
        PATCHES=$(git log --grep="\[ *patch *\]" --oneline)
    fi
    MINOR=0
fi


LAST_PATCH=$(echo $PATCHES | grep -oE "^[a-z0-9]+")
if [ $LAST_PATCH ]
then
    PATCH=$(echo $PATCHES | grep -oE "[a-z0-9]+ \[" | wc -l)
else
    PATCH=0
fi

VERSION=$MAJOR.$MINOR.$PATCH

unset MAJORS
unset MINORS
unset PATCHES
unset LAST_MAJOR
unset LAST_MINOR
unset LAST_PATCH
unset MAJOR
unset MINOR
unset PATCH
