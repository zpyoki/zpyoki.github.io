import{_ as a,c as n,o as t,ae as p}from"./chunks/framework.Dh1jimFm.js";const r=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/api/wpsPreview.md","filePath":"client-doc/api/wpsPreview.md","lastUpdated":1770358354000}'),e={name:"client-doc/api/wpsPreview.md"};function l(o,s,i,u,c,d){return t(),n("div",null,s[0]||(s[0]=[p(`<h4 id="文件预览" tabindex="-1">文件预览 <a class="header-anchor" href="#文件预览" aria-label="Permalink to &quot;文件预览&quot;">​</a></h4><p><strong>接口地址：</strong> <code>GET /getFilePreviewLink</code></p><p><strong>请求参数：</strong></p><table tabindex="0"><thead><tr><th style="text-align:left;">参数名</th><th style="text-align:left;">类型</th><th style="text-align:left;">必填</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">id</td><td style="text-align:left;">String</td><td style="text-align:left;">是</td><td style="text-align:left;">上传的文件id</td></tr></tbody></table><p><strong>响应示例：</strong></p><p>json</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;data&quot;:{</span></span>
<span class="line"><span>        &quot;link&quot;:&quot;http://yun.test.cn/weboffice/office/w/777e2226783346c592f41d4b1362?_w_appid=AKVyEoaNGupKxTOA&amp;wpsPreview=1111111&amp;simple&amp;hidecmb&quot;</span><span>             //文件在线预览链接</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;code&quot;: 200,</span></span>
<span class="line"><span>    &quot;msg&quot;: &quot;success&quot;,</span></span>
<span class="line"><span>    &quot;request_time&quot;: 1653272135097,</span></span>
<span class="line"><span>    &quot;request_id&quot;: &quot;1416070c674445b866fe&quot;,</span></span>
<span class="line"><span>    &quot;response_time&quot;: 1653272135101</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="文件信息回调" tabindex="-1">文件信息回调 <a class="header-anchor" href="#文件信息回调" aria-label="Permalink to &quot;文件信息回调&quot;">​</a></h4><p><strong>接口地址：</strong> <code>GET /wps/callback/v1/3rd/file/info</code></p><p><strong>请求参数：</strong></p><table tabindex="0"><thead><tr><th style="text-align:left;">参数名</th><th style="text-align:left;">类型</th><th style="text-align:left;">必填</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">_w_third_id</td><td style="text-align:left;">String</td><td style="text-align:left;">是</td><td style="text-align:left;">上传的文件id</td></tr><tr><td style="text-align:left;">_w_third_user_name</td><td style="text-align:left;">String</td><td style="text-align:left;">是</td><td style="text-align:left;">预览人工号</td></tr></tbody></table><p><strong>响应示例：</strong></p><p>json</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;file&quot;: {</span></span>
<span class="line"><span>        &quot;id&quot;: &quot;132aa30a87064&quot;, </span></span>
<span class="line"><span>        &quot;name&quot;: &quot;example.doc&quot;, </span></span>
<span class="line"><span>        &quot;version&quot;: 1, </span></span>
<span class="line"><span>        &quot;size&quot;: 200, </span></span>
<span class="line"><span>        &quot;creator&quot;: &quot;id1000&quot;, </span></span>
<span class="line"><span>        &quot;create_time&quot;: 1136185445, </span></span>
<span class="line"><span>        &quot;modifier&quot;: &quot;id1000&quot;, </span></span>
<span class="line"><span>        &quot;modify_time&quot;: 1551409818, </span></span>
<span class="line"><span>        &quot;download_url&quot;: &quot;http://www.xxx.cn/v1/file?fid=f132aa30a87064&quot;, </span></span>
<span class="line"><span>        &quot;preview_pages&quot;: 3, </span></span>
<span class="line"><span>        &quot;user_acl&quot;: {</span></span>
<span class="line"><span>            &quot;rename&quot;: 1, </span></span>
<span class="line"><span>            &quot;history&quot;: 1, </span></span>
<span class="line"><span>            &quot;copy&quot;: 1, </span></span>
<span class="line"><span>            &quot;export&quot;: 1, </span></span>
<span class="line"><span>            &quot;print&quot;: 1</span></span>
<span class="line"><span>        }, </span></span>
<span class="line"><span>        &quot;watermark&quot;: {</span></span>
<span class="line"><span>            &quot;type&quot;: 1, </span></span>
<span class="line"><span>            &quot;value&quot;: &quot;禁止传阅\\r\\nwps-1000&quot;, </span></span>
<span class="line"><span>            &quot;fillstyle&quot;: &quot;rgba( 192, 192, 192, 0.6 )&quot;, </span></span>
<span class="line"><span>            &quot;font&quot;: &quot;bold 20px Serif&quot;, </span></span>
<span class="line"><span>            &quot;rotate&quot;: -0.7853982, </span></span>
<span class="line"><span>            &quot;horizontal&quot;: 50, </span></span>
<span class="line"><span>            &quot;vertical&quot;: 100</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        &quot;attrs&quot;: {</span></span>
<span class="line"><span>            &quot;cachetime&quot;: &quot;100&quot; </span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }, </span></span>
<span class="line"><span>    &quot;user&quot;: {</span></span>
<span class="line"><span>        &quot;id&quot;: &quot;id1000&quot;, </span></span>
<span class="line"><span>        &quot;name&quot;: &quot;wps-1000&quot;, </span></span>
<span class="line"><span>        &quot;permission&quot;: &quot;read&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="配置说明" tabindex="-1">配置说明 <a class="header-anchor" href="#配置说明" aria-label="Permalink to &quot;配置说明&quot;">​</a></h4><p>需要向wps中台申请系统预览 获得配置信息 application.yml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wps:</span></span>
<span class="line"><span>    client:</span></span>
<span class="line"><span>        id: 申请的系统标识</span></span>
<span class="line"><span>    office:</span></span>
<span class="line"><span>        host: http://ip</span></span>
<span class="line"><span>        accessKey: ak</span></span>
<span class="line"><span>        secretKey: sk</span></span></code></pre></div>`,17)]))}const h=a(e,[["render",l]]);export{r as __pageData,h as default};
