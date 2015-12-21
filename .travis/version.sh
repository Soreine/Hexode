#!/bin/sh

REGMAJ="^\[.*major\|MAJOR.*\]"
REGMIN="^\[.*minor\|MINOR.*\]"
REGPAT="^\[.*patch\|PATCH.*\]"
REGLST="^[a-z0-9]+"
REGCOM="[a-z0-9]+ \["

MAJORS=$(git log --grep="$REGMAJ" --oneline)


LAST_MAJOR=$(echo $MAJORS | grep -oE "$REGLST")
if [ $LAST_MAJOR ]
then
    MINORS=$(git log --grep="$REGMIN" --oneline $LAST_MAJOR..)
    MAJOR=$(echo $MAJORS | grep -oE "$REGCOM" | wc -l)
else
    MINORS=$(git log --grep="$REGMIN" --oneline)
    MAJOR=0
fi

LAST_MINOR=$(echo $MINORS | grep -oE "$REGLST")
if [ $LAST_MINOR ]
then
    PATCHES=$(git log --grep="$REGPAT" --oneline $LAST_MINOR..)
    MINOR=$(echo $MINORS | grep -oE "$REGCOM" | wc -l)
else
    if [ $LAST_MAJOR ]
    then
        PATCHES=$(git log --grep="$REGPAT" --oneline $LAST_MAJOR..)
    else
        PATCHES=$(git log --grep="$REGPAT" --oneline)
    fi
    MINOR=0
fi

LAST_PATCH=$(echo $PATCHES | grep -oE "$REGLST")
if [ $LAST_PATCH ]
then
    PATCH=$(echo $PATCHES | grep -oE "$REGCOM" | wc -l)
else
    PATCH=0
fi

VERSION=$MAJOR.$MINOR.$PATCH
echo VERSION: $VERSION

unset MAJORS
unset MINORS
unset PATCHES
unset LAST_MAJOR
unset LAST_MINOR
unset LAST_PATCH
unset MAJOR
unset MINOR
unset PATCH
unset REGMAJ
unset REGMIN
unset REGPAT
unset REGCOM
unset REGLST
