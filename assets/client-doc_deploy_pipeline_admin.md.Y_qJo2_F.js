import{_ as s,c as a,o as p,ae as l}from"./chunks/framework.Dh1jimFm.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/deploy/pipeline/admin.md","filePath":"client-doc/deploy/pipeline/admin.md","lastUpdated":1770358354000}'),e={name:"client-doc/deploy/pipeline/admin.md"};function i(c,n,t,o,d,r){return p(),a("div",null,n[0]||(n[0]=[l(`<h4 id="后台管理流水线" tabindex="-1">后台管理流水线 <a class="header-anchor" href="#后台管理流水线" aria-label="Permalink to &quot;后台管理流水线&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pipeline {</span></span>
<span class="line"><span>  agent {</span></span>
<span class="line"><span>    node {</span></span>
<span class="line"><span>      label &#39;nodejs&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  stages {</span></span>
<span class="line"><span>    // 从gitlab克隆代码</span></span>
<span class="line"><span>    stage(&#39;clone code&#39;) {</span></span>
<span class="line"><span>      agent none</span></span>
<span class="line"><span>      steps {</span></span>
<span class="line"><span>        sh &#39;git config --global http.sslVerify false&#39;    </span></span>
<span class="line"><span>        // 修改分支 branch 以及gitlab地址 url</span></span>
<span class="line"><span>        git(</span></span>
<span class="line"><span>          credentialsId: env.GITHUB_CREDENTIAL_ID, </span></span>
<span class="line"><span>          branch: env.GIT_BRANCH, </span></span>
<span class="line"><span>          url: env.GIT_URL, </span></span>
<span class="line"><span>          changelog: true, </span></span>
<span class="line"><span>          poll: false</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // stage(&#39;下载依赖包&#39;) {</span></span>
<span class="line"><span>    //   agent none</span></span>
<span class="line"><span>    //   steps {</span></span>
<span class="line"><span>    //     container(&#39;nodejs&#39;) {</span></span>
<span class="line"><span>    //       sh &#39;npm i --no-package-lock&#39;</span></span>
<span class="line"><span>    //     }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //   }</span></span>
<span class="line"><span>    // }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // stage(&#39;打包项目&#39;) {</span></span>
<span class="line"><span>    //   agent none</span></span>
<span class="line"><span>    //   steps {</span></span>
<span class="line"><span>    //     container(&#39;nodejs&#39;) {</span></span>
<span class="line"><span>    //       sh &#39;npm run build:prod&#39;</span></span>
<span class="line"><span>    //     }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //   }</span></span>
<span class="line"><span>    // }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    stage(&#39;打包镜像&#39;) {</span></span>
<span class="line"><span>      agent none</span></span>
<span class="line"><span>      steps {</span></span>
<span class="line"><span>        container(&#39;nodejs&#39;) {</span></span>
<span class="line"><span>         </span></span>
<span class="line"><span>          withCredentials(</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>              usernamePassword(</span></span>
<span class="line"><span>                credentialsId : env.DOCKER_CREDENTIAL_ID,</span></span>
<span class="line"><span>                passwordVariable : &#39;DOCKER_PASSWORD&#39;,</span></span>
<span class="line"><span>                usernameVariable : &#39;DOCKER_USERNAME&#39;</span></span>
<span class="line"><span>              )</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>          ) {</span></span>
<span class="line"><span>            sh &#39;echo &quot;$DOCKER_PASSWORD&quot; | docker login $REGISTRY -u &quot;$DOCKER_USERNAME&quot; --password-stdin&#39;</span></span>
<span class="line"><span>            sh &#39;docker build -f ./deploy/Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BUILD_NUMBER .&#39;</span></span>
<span class="line"><span>            sh &#39;docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BUILD_NUMBER&#39;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 部署容器，注意gitlab地址下是否存在 deploy/$APP_NAME.yaml</span></span>
<span class="line"><span>    stage(&#39;deploy to dev&#39;) {</span></span>
<span class="line"><span>      steps {</span></span>
<span class="line"><span>        container(&#39;nodejs&#39;) {</span></span>
<span class="line"><span>          withCredentials(</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>              kubeconfigFile(</span></span>
<span class="line"><span>                credentialsId: env.KUBECONFIG_CREDENTIAL_ID,</span></span>
<span class="line"><span>                variable: &#39;KUBECONFIG&#39;</span></span>
<span class="line"><span>              )</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>          ) {</span></span>
<span class="line"><span>            sh &#39;envsubst &lt; ./deploy/deploy.yml | kubectl apply -f -&#39;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // stage(&#39;运行项目至测试环境&#39;) {</span></span>
<span class="line"><span>    //       agent none</span></span>
<span class="line"><span>    //       steps {</span></span>
<span class="line"><span>    //         input(message: &#39;镜像无误，发布至测试环境&#39;, submitter: &#39;&#39;)</span></span>
<span class="line"><span>    //         container(&#39;nodejs&#39;) {</span></span>
<span class="line"><span>    //             withCredentials([</span></span>
<span class="line"><span>    //                 kubeconfigFile(</span></span>
<span class="line"><span>    //                     credentialsId: env.KUBECONFIG_CREDENTIAL_ID,</span></span>
<span class="line"><span>    //                     variable: &#39;KUBECONFIG&#39;)</span></span>
<span class="line"><span>    //                 ]) </span></span>
<span class="line"><span>    //                 {</span></span>
<span class="line"><span>    //                 sh &#39;envsubst &lt; conf/deploy-test.yaml | kubectl apply -f -&#39;</span></span>
<span class="line"><span>    //                 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //         }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //       }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //     }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  environment {</span></span>
<span class="line"><span>    GITHUB_CREDENTIAL_ID = &#39;git-robot&#39;</span></span>
<span class="line"><span>    DOCKER_CREDENTIAL_ID = &#39;harbor-robot&#39;</span></span>
<span class="line"><span>    KUBECONFIG_CREDENTIAL_ID = &#39;kubeconfig&#39;</span></span>
<span class="line"><span>    REGISTRY = &#39;openapi.enfi.com.cn:30012&#39;</span></span>
<span class="line"><span>    DOCKERHUB_NAMESPACE = &#39;scaffolding&#39;</span></span>
<span class="line"><span>    NAMESPACE = &#39;scaffolding&#39;    </span></span>
<span class="line"><span>    APP_NAME = &#39;enfi-admin&#39;</span></span>
<span class="line"><span>    PORT = 80</span></span>
<span class="line"><span>    GIT_BRANCH = &#39;enfi-admin&#39;</span></span>
<span class="line"><span>    GIT_URL = &#39;https://git.enfi.com.cn/in-project/scaffolding.git&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h4>`,3)]))}const g=s(e,[["render",i]]);export{_ as __pageData,g as default};
