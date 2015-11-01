#!/usr/bin/env bash
set -eu

# Download necessary CoreNLP files
wget http://nlp.stanford.edu/software/stanford-corenlp-full-2015-04-20.zip
wget http://nlp.stanford.edu/software/stanford-srparser-2014-10-23-models.jar
wget http://nlp.stanford.edu/software/stanford-postagger-full-2015-04-20.zip

# unzip CoreNLP
dest="CoreNLP"
zip="stanford-corenlp-full-*.zip"

# unzip files as needed
unzip -d "$dest" "$zip" && f=("$dest"/*) && mv "$dest"/*/* "$dest" && rmdir "${f[@]}"

# extract models and srparser jars
mkdir tmp
(cd tmp; jar xvf ../CoreNLP/stanford-corenlp-*-models.jar)
(cd tmp; jar xvf ../stanford-srparser-*-models.jar)

# add german pos-tagger model
mkdir tmp/edu/stanford/nlp/models/pos-tagger/german
unzip -j "stanford-postagger-full-*.zip" "stanford-postagger-full-*/models/german-hgc.tagger*" -d "tmp/edu/stanford/nlp/models/pos-tagger/german"

# remove unnecessary models
shopt -s extglob
rm tmp/edu/stanford/nlp/models/srparser/!("germanSR.ser.gz")
shopt -u extglob

# regenerate models jar
pattern="CoreNLP/stanford-corenlp-*-models.jar"
files=( $pattern )
models_filename="${files[0]}"
echo "$models_filename"
(cd tmp; jar -cvf ../${models_filename} .)

rm -rf tmp
rm *.zip
rm *.jar
