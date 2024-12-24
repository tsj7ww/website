#!/bin/bash

# Change to the script's directory and then navigate to the parent github folder
cd "$(dirname "$0")"
cd ../../

# Remove all files in tsj7ww.github.io except .gitignore and .github folder
cd tsj7ww.github.io
find . -not -name '.gitignore' \
    -not -name '.' -not -name '..' \
    -not -name '.git' -not -path './.git/*' \
    -not -name '.github' -not -path './.github/*' \
    -delete

# Copy all files from website/static to tsj7ww.github.io
cp -r ../website/static/* .