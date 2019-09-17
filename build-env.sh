FILE="./.env"

if [[ $TRAVIS_BRANCH == 'release' ]]; then
cat <<EOM >$FILE
REACT_APP_BASENAME=/a-fathers-lullaby
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
cat <<EOM >$FILE
REACT_APP_BASENAME=/
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
else
    exit 0
fi