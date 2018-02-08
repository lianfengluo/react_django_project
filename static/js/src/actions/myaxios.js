import axios from 'axios';

function get_csrf_cookie()
{
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf('csrftoken');   //the length of index
  
    // if we can find the index, it means the "csrftoken" cookie exists
    // otherwise it's not exists.
    if (cookie_pos != -1)
    {
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookie_pos += 'csrftoken'.length + 1;      //这里容易出问题，所以请大家参考的时候自己好好研究一下
        var cookie_end = allcookies.indexOf(";", cookie_pos);
  
        if (cookie_end == -1)
        {
            cookie_end = allcookies.length;
        }
  
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));         //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
};
const my_transformRequest=[function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }];
const my_axios = (url,method,data={},this_trans=my_transformRequest,content_type='application/x-www-form-urlencoded') =>{
	return axios({
          url: url,
          method: method,
          data: data,
          transformRequest: this_trans,
          headers: {
            'Content-Type': content_type,
            "X-CSRFtoken": get_csrf_cookie()
          }
        })
}

export default my_axios;