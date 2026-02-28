import{_ as s,c as a,o as p,ae as e}from"./chunks/framework.Dh1jimFm.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/core/kkfile.md","filePath":"client-doc/core/kkfile.md","lastUpdated":1770358354000}'),l={name:"client-doc/core/kkfile.md"};function t(o,n,i,c,r,u){return p(),a("div",null,n[0]||(n[0]=[e(`<h3 id="kkfile-文件预览" tabindex="-1"><strong>kkfile 文件预览</strong> <a class="header-anchor" href="#kkfile-文件预览" aria-label="Permalink to &quot;**kkfile 文件预览**&quot;">​</a></h3><p>需要部署服务见下方部署运维 kkfile</p><p>已上传文件地址做入参传入 获取kkfile预览地址</p><p>java</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Override</span></span>
<span class="line"><span>public AjaxResult getPreviewUrl(String fileUrl) {</span></span>
<span class="line"><span>    return AjaxResult.success(&quot;操作成功&quot;,getFinalInfoUrl(fileUrl));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public String getFinalInfoUrl(String urlInfo) {</span></span>
<span class="line"><span>    if (ObjectUtil.isEmpty(urlInfo)) {</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    String encode =</span></span>
<span class="line"><span>            Base64.getEncoder().encodeToString(urlInfo.getBytes(StandardCharsets.UTF_8));</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        String previewPathInfo = URLEncoder.encode(encode, &quot;UTF-8&quot;)</span></span>
<span class="line"><span>                .replaceAll(&quot;\\\\+&quot;, &quot;%20&quot;)</span></span>
<span class="line"><span>                .replaceAll(&quot;!&quot;, &quot;%21&quot;)</span></span>
<span class="line"><span>                .replaceAll(&quot;&#39;&quot;, &quot;%27&quot;)</span></span>
<span class="line"><span>                .replaceAll(&quot;\\\\(&quot;, &quot;%28&quot;)</span></span>
<span class="line"><span>                .replaceAll(&quot;\\\\)&quot;, &quot;%29&quot;)</span></span>
<span class="line"><span>                .replaceAll(&quot;~&quot;, &quot;%7E&quot;);</span></span>
<span class="line"><span>        return onlinePreviewPrefix + &quot;?url=&quot; + previewPathInfo;</span></span>
<span class="line"><span>    } catch (UnsupportedEncodingException e) {</span></span>
<span class="line"><span>        e.printStackTrace();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return &quot;&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws UnsupportedEncodingException {</span></span>
<span class="line"><span>    String encode =</span></span>
<span class="line"><span>            Base64.getEncoder().encodeToString(&quot;http://10.10.10.216:9001/keyan/2026/02/039ed3f6db034740b489901230d120e909.jpg&quot;.getBytes(StandardCharsets.UTF_8));</span></span>
<span class="line"><span>    String previewPathInfo = URLEncoder.encode(encode, &quot;UTF-8&quot;)</span></span>
<span class="line"><span>            .replaceAll(&quot;\\\\+&quot;, &quot;%20&quot;)</span></span>
<span class="line"><span>            .replaceAll(&quot;!&quot;, &quot;%21&quot;)</span></span>
<span class="line"><span>            .replaceAll(&quot;&#39;&quot;, &quot;%27&quot;)</span></span>
<span class="line"><span>            .replaceAll(&quot;\\\\(&quot;, &quot;%28&quot;)</span></span>
<span class="line"><span>            .replaceAll(&quot;\\\\)&quot;, &quot;%29&quot;)</span></span>
<span class="line"><span>            .replaceAll(&quot;~&quot;, &quot;%7E&quot;);</span></span>
<span class="line"><span>    System.out.println(previewPathInfo);</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,5)]))}const f=s(l,[["render",t]]);export{d as __pageData,f as default};
