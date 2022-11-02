# 使用git pages 部署 RED UID  官方网站
# git repository for web https://github.com/chinarma/mrredui-web.git
# git pages https://chinarma.github.io/mrredui-web/
# git branch -M master  修改分支名称为master

rm -rf dist &&
    yarn build &&
    cd dist &&
    git init &&
    git add . &&
    git commit -m "update" &&
    git branch -M master &&
    git remote add origin https://github.com/chinarma/mrredui-web.git &&
    git push -f -u origin master &&
    cd -
echo https://chinarma.github.io/mrredui-web/
