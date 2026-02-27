#!/bin/bash

ID=$1
REPO_DIR=$2
BASE_DIR=$3
REPO_CLONE=$4
BRANCH=$5

cd $REPO_DIR/

# Check if user's directory doesn't exist
if [ ! -d $ID ]; then
    mkdir $ID
    cd $ID
    git clone $REPO_CLONE
    mkdir -p $BASE_DIR/$ID/
else
    cd $ID
fi

cd Wiki/ # TODO: Pasar el nombre

git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

npm install
npm run build

rm -rf $BASE_DIR/$ID
mv build $BASE_DIR/$ID