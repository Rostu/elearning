#!/usr/bin/env bash
set -eu

echo "Downloading Stanford CoreNLP"
wget http://nlp.stanford.edu/software/stanford-corenlp-full-2015-04-20.zip >/dev/null 2>&1

echo "Unzipping CoreNLP"
dest="CoreNLP"
zip="stanford-corenlp-full-*.zip"
unzip -d "$dest" "$zip" && f=("$dest"/*) && mv "$dest"/*/* "$dest" && rmdir "${f[@]}"

echo "Deleting CoreNLP archive"
rm stanford-corenlp-full-*.zip

echo "Extracting CoreNLP models"
mkdir tmp
(cd tmp; jar xvf ../CoreNLP/stanford-corenlp-*-models.jar)

echo "Downloading Stanford POS-tagger models"
wget http://nlp.stanford.edu/software/stanford-postagger-full-2015-04-20.zip >/dev/null 2>&1

echo "Unzipping German tagger model"
zip="stanford-postagger-full-*.zip"
germanpos=tmp/edu/stanford/nlp/models/pos-tagger/german
mkdir -p "$germanpos"
unzip -j "$zip" "stanford-postagger-full-*/models/german-hgc.tagger*" -d "$germanpos"

echo "Deleting POS-tagger archive"
rm stanford-postagger-full-*.zip

echo "Downloading Stanford SR-parser models"
wget http://nlp.stanford.edu/software/stanford-srparser-2014-10-23-models.jar >/dev/null 2>&1

echo "Extracting parser models"
(cd tmp; jar xvf ../stanford-srparser-*-models.jar)

echo "Deleting parser-model archive"
rm stanford-srparser-*-models.jar

echo "Removing unnecessary models"
shopt -s extglob
rm tmp/edu/stanford/nlp/models/srparser/!("germanSR.ser.gz")
shopt -u extglob

echo "Regenerating model archive"
pattern="CoreNLP/stanford-corenlp-*-models.jar"
files=( $pattern )
models_filename="${files[0]}"
(cd tmp; jar -cvf ../${models_filename} .)

echo "Deleting folder 'tmp'"
rm -rf tmp
