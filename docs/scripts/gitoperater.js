const shell = require("shelljs");  // 执行文件操作

shell.cd('E:\\temporary');
/*先根据配置文件安装*/
shell.exec('gitbook install')
/*build 到 git 目录下 */
shell.exec('gitbook build . E:\\githubdown\\ytwotap.github.io\\docs')

/*cd 到 git目录*/
shell.cd('E:\\githubdown\\ytwotap.github.io');
shell.exec('git add .');
/*完成自动commit*/
shell.exec(`git commit -m "auto commit for js"`);

/*完成推送.. 这个 有点问题 可以手动来*/
shell.exec('git push');