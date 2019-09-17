FILE="./.env"

if [[ $TRAVIS_BRANCH == 'release' ]]; then
cat <<EOM >$FILE
REACT_APP_BASENAME=https://thoughtworksarts.io/a-fathers-lullaby/
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
cat <<EOM >$FILE
REACT_APP_BASENAME=https://a-fathers-lullaby.surge.sh/
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
else
    exit 0
fi