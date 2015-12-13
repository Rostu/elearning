#!/usr/bin/env bash
set -eu

echo 'Installing extensions'
cd elearning/extensions
./languagetool-setup.sh vagrant
chmod a+x languagetool-init
cp languagetool-init /etc/init.d/
/etc/init.d/languagetool-init start
rm languagetool-init
./corenlp-setup.sh
