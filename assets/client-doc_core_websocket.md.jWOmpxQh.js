import{_ as n,c as a,o as e,ae as p}from"./chunks/framework.Dh1jimFm.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/core/websocket.md","filePath":"client-doc/core/websocket.md","lastUpdated":1770358354000}'),l={name:"client-doc/core/websocket.md"};function t(o,s,i,c,r,d){return e(),a("div",null,s[0]||(s[0]=[p(`<h3 id="websocket实时通信" tabindex="-1">WebSocket实时通信 <a class="header-anchor" href="#websocket实时通信" aria-label="Permalink to &quot;WebSocket实时通信&quot;">​</a></h3><h4 id="websocket配置" tabindex="-1">WebSocket配置 <a class="header-anchor" href="#websocket配置" aria-label="Permalink to &quot;WebSocket配置&quot;">​</a></h4><p>java</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Configuration</span></span>
<span class="line"><span>@EnableWebSocket</span></span>
<span class="line"><span>public class WebSocketConfig implements WebSocketConfigurer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {</span></span>
<span class="line"><span>        registry.addHandler(webSocketHandler(), &quot;/websocket&quot;)</span></span>
<span class="line"><span>                .setAllowedOrigins(&quot;*&quot;); // 允许跨域访问</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public WebSocketHandler webSocketHandler() {</span></span>
<span class="line"><span>        // 使用自定义的WebSocket处理器</span></span>
<span class="line"><span>        return new CustomWebSocketHandler();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="消息处理" tabindex="-1">消息处理 <a class="header-anchor" href="#消息处理" aria-label="Permalink to &quot;消息处理&quot;">​</a></h4><p>java</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>@Slf4j</span></span>
<span class="line"><span>public class CustomWebSocketHandler extends TextWebSocketHandler {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 用于存储WebSocket会话</span></span>
<span class="line"><span>    private final Map&lt;String, WebSocketSession&gt; sessions = new ConcurrentHashMap&lt;&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void afterConnectionEstablished(WebSocketSession session) throws Exception {</span></span>
<span class="line"><span>        String sessionId = session.getId();</span></span>
<span class="line"><span>        sessions.put(sessionId, session);</span></span>
<span class="line"><span>        log.info(&quot;WebSocket连接建立成功：{}&quot;, sessionId);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {</span></span>
<span class="line"><span>        String payload = message.getPayload();</span></span>
<span class="line"><span>        log.info(&quot;收到消息：{}&quot;, payload);</span></span>
<span class="line"><span>        // 发送回复消息</span></span>
<span class="line"><span>        String replyMessage = &quot;服务器收到消息：&quot; + payload;</span></span>
<span class="line"><span>        session.sendMessage(new TextMessage(replyMessage));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {</span></span>
<span class="line"><span>        String sessionId = session.getId();</span></span>
<span class="line"><span>        sessions.remove(sessionId);</span></span>
<span class="line"><span>        log.info(&quot;WebSocket连接关闭：{}&quot;, sessionId);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {</span></span>
<span class="line"><span>        log.error(&quot;WebSocket传输错误&quot;, exception);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 广播消息给所有连接的客户端</span></span>
<span class="line"><span>    public void broadcastMessage(String message) {</span></span>
<span class="line"><span>        sessions.values().forEach(session -&gt; {</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                session.sendMessage(new TextMessage(message));</span></span>
<span class="line"><span>            } catch (IOException e) {</span></span>
<span class="line"><span>                log.error(&quot;广播消息失败&quot;, e);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="websocket连接" tabindex="-1">WebSocket连接 <a class="header-anchor" href="#websocket连接" aria-label="Permalink to &quot;WebSocket连接&quot;">​</a></h4><p><strong>连接地址：</strong> <code>ws://{host}:{port}/websocket</code></p><p><strong>连接参数：</strong></p><p>javascript</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 建立WebSocket连接</span></span>
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
<span class="line"><span>};</span></span></code></pre></div><h4 id="消息类型" tabindex="-1">消息类型 <a class="header-anchor" href="#消息类型" aria-label="Permalink to &quot;消息类型&quot;">​</a></h4><p>json</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;type&quot;: &quot;NOTIFICATION&quot;,</span></span>
<span class="line"><span>  &quot;data&quot;: {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;msg_001&quot;,</span></span>
<span class="line"><span>    &quot;title&quot;: &quot;系统通知&quot;,</span></span>
<span class="line"><span>    &quot;content&quot;: &quot;您的申请已审批通过&quot;,</span></span>
<span class="line"><span>    &quot;type&quot;: &quot;INFO&quot;,</span></span>
<span class="line"><span>    &quot;timestamp&quot;: 1677666600000,</span></span>
<span class="line"><span>    &quot;read&quot;: false</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,15)]))}const g=n(l,[["render",t]]);export{b as __pageData,g as default};
