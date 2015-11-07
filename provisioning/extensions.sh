#!/usr/bin/env bash
set -eu

echo 'Installing extensions'
cd elearning/extensions
./languagetool-setup.sh vagrant
chmod a+x languagetool-init
cp languagetool-init /etc/init.d/
rm languagetool-init
./corenlp-setup.sh
