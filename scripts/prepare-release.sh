#!/bin/sh

# $1 - the new release version

# Replace the version in the wordpress-block-usm.php file
sed -i '' -e "s/Version:           [0-9]*\.[0-9]*\.[0-9]*/Version:           $1/" wordpress-block-usm.php
