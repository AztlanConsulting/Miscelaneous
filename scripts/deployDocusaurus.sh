#!/bin/bash

ID=$1
REPO_DIR=$2
BASE_DIR=$3
REPO_CLONE=$4
BRANCH=$5
REPO_NAME=$6

cd $REPO_DIR/

# Check if user's directory doesn't exist
if [ ! -d $ID ]; then
    mkdir $ID
    cd $ID
    git clone $REPO_CLONE
    sudo chown -R $USER:$USER $REPO_NAME
    mkdir -p $BASE_DIR/$ID/
else
    cd $ID
fi

cd $REPO_NAME/

git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

sed -i "s|^  baseUrl.*$|  baseUrl: '/$REPO_NAME/$ID/',|" docusaurus.config.js

npm install
npm run build

git stash
git stash clear

sudo rm -rf $BASE_DIR/$ID
sudo mv build $BASE_DIR/$ID