import{_ as a,c as n,o as e,ae as p}from"./chunks/framework.Dh1jimFm.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/api/websocket.md","filePath":"client-doc/api/websocket.md","lastUpdated":1770358354000}'),t={name:"client-doc/api/websocket.md"};function c(o,s,l,i,r,d){return e(),n("div",null,s[0]||(s[0]=[p(`<h4 id="websocket连接" tabindex="-1">WebSocket连接 <a class="header-anchor" href="#websocket连接" aria-label="Permalink to &quot;WebSocket连接&quot;">​</a></h4><p><strong>连接地址：</strong> <code>ws://{host}:{port}/websocket</code></p><p><strong>连接参数：</strong></p><p>javascript</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 建立WebSocket连接</span></span>
<span class="line"><span>const ws = new WebSocket(&#39;ws://localhost:9401/websocket&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 发送认证消息</span></span>
<span class="line"><span>ws.onopen = () =&gt; {</span></span>
<span class="line"><span>  ws.send(JSON.stringify({</span></span>
<span class="line"><span>    type: &#39;AUTH&#39;,</span></span>
<span class="line"><span>    token: localStorage.getItem(&#39;token&#39;)</span></span>
<span class="line"><span>  }));</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 接收消息</span></span>
<span class="line"><span>ws.onmessage = (event) =&gt; {</span></span>
<span class="line"><span>  const message = JSON.parse(event.data);</span></span>
<span class="line"><span>  handleMessage(message);</span></span>
<span class="line"><span>};</span></span></code></pre></div>`,5)]))}const k=a(t,[["render",c]]);export{g as __pageData,k as default};
