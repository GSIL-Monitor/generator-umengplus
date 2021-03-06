#!/bin/sh
 
git filter-branch --env-filter '
 
an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"
cn="$GIT_COMMITTER_NAME"
cm="$GIT_COMMITTER_EMAIL"
 
if [ "$GIT_COMMITTER_EMAIL" = "gongzhen1027@hotmail.com" ]
then
    cn="gongzhen.gz"
    cm="gongzhen.gz@alibaba-inc.com"
fi
if [ "$GIT_AUTHOR_EMAIL" = "gongzhen1027@hotmail.com" ]
then
    an="gongzhen.gz"
    am="gongzhen.gz@alibaba-inc.com"
fi
 
export GIT_AUTHOR_NAME="$an"
export GIT_AUTHOR_EMAIL="$am"
export GIT_COMMITTER_NAME="$cn"
export GIT_COMMITTER_EMAIL="$cm"