git filter-branch --commit-filter '
if [ "$GIT_COMMITTER_NAME" = "gongzhen1027@hotmail.com" ];
then
	GIT_COMMITTER_NAME="gongzhen.gz";
	GIT_AUTHOR_NAME="gongzhen.gz";
	GIT_COMMITTER_EMAIL="gongzhen.gz@alibaba-inc.com";
	GIT_AUTHOR_EMAIL="gongzhen.gz@alibaba-inc.com";
	git commit-tree "$@";
else
	git commit-tree "$@";
fi' HEAD