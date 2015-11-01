Prerequisites

1) Install Oracle Java 1.8.

sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -q oracle-java8-installer


2) Installation: Maven
sudo apt-get install maven



Extensions Setup

Go to the root directory of the e-learning project and continue as follows.

1) Build & Setup: LanguageTool Standalone

Pass the correct username as an argument.

./languagetool-setup.sh username
sudo cp languagetool-init /etc/init.d/

2) Download & Setup: CoreNLP
./corenlp-setup.sh

3) Start: LanguageTool
sudo /etc/init.d/languagetool-init start


In order for 'node-gyp rebuild' to be executed successfully during the installation of the node module 'stanford-corenlp', create the following symbolic link or any Ubuntu operating system of the version 14.04 or higher:

sudo ln -s `which nodejs` /usr/bin/node


4) Installation: node modules
npm install
