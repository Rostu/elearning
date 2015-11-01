#!/usr/bin/env bash
set -eu

user=${1?missing argument: no user specified}

git clone https://github.com/languagetool-org/languagetool.git

(cd languagetool; ./build.sh languagetool-standalone package -DskipTests)

current="$(dirname $(which $0))"
if [ ! -d "${current}}" ]; then current="$PWD"; fi

home="languagetool"
package="languagetool-standalone/target"
version=$(sed -ne '/<\/languagetool\.version>/ { s/<[^>]*>\(.*\)<\/languagetool\.version>/\1/; p }' ${home}"/pom.xml" | tr -d '[[:space:]]')
folder="LanguageTool-${version}"
server="${home}"/"${package}"/"${folder}"/"${folder}"

if [ -d "$server" ]; then
  # remove old symlink to the LanguageTool server folder if it exists
  if [ -e languagetool-server ]; then
    rm languagetool-server
  fi
  # create a new symlink to the LanguageTool server folder
  ln -s "${server}" languagetool-server
else
  >&2 echo "'${server}': no such file or directory"
  exit 1
fi

sed -i "s:server-directory:${current}/${server}:g" languagetool-init
sed -i "s:server-user:${user}:g" languagetool-init
