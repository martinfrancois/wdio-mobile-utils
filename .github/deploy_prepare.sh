echo "Prepare Git for Commits"
git config user.name "Travis CI"
git config user.email "build@travis-ci.com"
git remote add upstream "https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
git fetch upstream
git checkout $TAG_BRANCH
echo "Finished Prepare Git for Commits"
