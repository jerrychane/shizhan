document.cookie; // 查看 cookie
document.cookie = 'name=aaaaa;domain=happymmall.com;path=/index.html;expires=Mon, 21 Jun 2022 13:57:32 GMT'; // 增加 cookie
document.cookie = 'name=bbbbb;domain=happymmall.com;path=/index.html;' ; // 修改 cookie
document.cookie = 'name=bbbbb;domain=happymmall.com;path=/index.html;expires=Mon, 21 Jun 2020 13:57:32 GMT'; // 将过期时间设置为过去的时间或0