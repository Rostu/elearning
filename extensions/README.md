# Extensions Setup
## Prerequisites

1. Install Oracle Java 1.8.
```bash
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

2. Installation: Maven

```bash
sudo apt-get install maven
```
## Installation
```bash
cd path/to/elearning
cd extensions
```

1. Build & Setup: LanguageTool Standalone

Note: Pass the correct `username` as an argument.

```bash
./languagetool-setup.sh username
sudo cp languagetool-init /etc/init.d/
```

2) Download & Setup: CoreNLP
```bash
./corenlp-setup.sh
```

3) Start: LanguageTool
```bash
sudo /etc/init.d/languagetool-init start
```

Note: In order for 'node-gyp rebuild' to be executed successfully during the installation of the node module 'stanford-corenlp' on any Ubuntu operating system of the version 14.04 or higher, create the following symbolic link:
```bash
sudo ln -s `which nodejs` /usr/bin/node
```

4) Installation: node modules
```bash
cd ..
npm install
```
