import{_ as a,c as n,o as p,ae as e}from"./chunks/framework.Dh1jimFm.js";const t="/static/img.png",u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"client-doc/core/personInfoSync.md","filePath":"client-doc/core/personInfoSync.md","lastUpdated":1770358354000}'),l={name:"client-doc/core/personInfoSync.md"};function i(r,s,c,o,d,h){return p(),n("div",null,s[0]||(s[0]=[e('<h3 id="人员信息同步" tabindex="-1">人员信息同步 <a class="header-anchor" href="#人员信息同步" aria-label="Permalink to &quot;人员信息同步&quot;">​</a></h3><p>人员组织架构同步定时任务每天十二点执行 默认打开 全删全插 <img src="'+t+`" alt="流程图"></p><h4 id="部门表" tabindex="-1">部门表 <a class="header-anchor" href="#部门表" aria-label="Permalink to &quot;部门表&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE \`sys_dept\` (</span></span>
<span class="line"><span>  \`dept_id\` bigint(20) NOT NULL AUTO_INCREMENT COMMENT &#39;部门id&#39;,</span></span>
<span class="line"><span>  \`parent_id\` bigint(20) DEFAULT &#39;0&#39; COMMENT &#39;父部门id&#39;,</span></span>
<span class="line"><span>  \`ancestors\` varchar(50) DEFAULT &#39;&#39; COMMENT &#39;祖级列表&#39;,</span></span>
<span class="line"><span>  \`dept_name\` varchar(30) DEFAULT &#39;&#39; COMMENT &#39;部门名称&#39;,</span></span>
<span class="line"><span>  \`order_num\` int(4) DEFAULT &#39;0&#39; COMMENT &#39;显示顺序&#39;,</span></span>
<span class="line"><span>  \`leader\` varchar(20) DEFAULT NULL COMMENT &#39;负责人&#39;,</span></span>
<span class="line"><span>  \`phone\` varchar(11) DEFAULT NULL COMMENT &#39;联系电话&#39;,</span></span>
<span class="line"><span>  \`email\` varchar(50) DEFAULT NULL COMMENT &#39;邮箱&#39;,</span></span>
<span class="line"><span>  \`status\` char(1) DEFAULT &#39;0&#39; COMMENT &#39;部门状态（0正常 1停用）&#39;,</span></span>
<span class="line"><span>  \`del_flag\` char(1) DEFAULT &#39;0&#39; COMMENT &#39;删除标志（0代表存在 2代表删除）&#39;,</span></span>
<span class="line"><span>  \`create_by\` varchar(64) DEFAULT &#39;&#39; COMMENT &#39;创建者&#39;,</span></span>
<span class="line"><span>  \`create_time\` datetime DEFAULT NULL COMMENT &#39;创建时间&#39;,</span></span>
<span class="line"><span>  \`update_by\` varchar(64) DEFAULT &#39;&#39; COMMENT &#39;更新者&#39;,</span></span>
<span class="line"><span>  \`update_time\` datetime DEFAULT NULL COMMENT &#39;更新时间&#39;,</span></span>
<span class="line"><span>  PRIMARY KEY (\`dept_id\`)</span></span>
<span class="line"><span>) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COMMENT=&#39;部门表&#39;;</span></span></code></pre></div><h4 id="部门信息" tabindex="-1">部门信息 <a class="header-anchor" href="#部门信息" aria-label="Permalink to &quot;部门信息&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void deptSynchronize() {</span></span>
<span class="line"><span>        //1.获取ERP部门信息</span></span>
<span class="line"><span>        ErpDept erpDept = new ErpDept();</span></span>
<span class="line"><span>        List&lt;ErpDept&gt; erpDeptList = erpSysDeptMapper.getErpSysDeptInfo(erpDept);</span></span>
<span class="line"><span>        //2.将ERP部门信息转为若依部门信息</span></span>
<span class="line"><span>        List&lt;SysDept&gt; sysDeptList = erpDeptList.stream().map(this::covertErpToRy).collect(Collectors.toList());</span></span>
<span class="line"><span>        //3.将状态设置为无效</span></span>
<span class="line"><span>        erpSysDeptMapper.setDisable();</span></span>
<span class="line"><span>        //4.批量更新部门信息</span></span>
<span class="line"><span>        erpSysDeptMapper.saveBatch(sysDeptList);</span></span>
<span class="line"><span>        //5.更新redis中的缓存数据</span></span>
<span class="line"><span>        //this.resetDeptCache();</span></span>
<span class="line"><span>    }</span></span></code></pre></div><h4 id="人员表" tabindex="-1">人员表 <a class="header-anchor" href="#人员表" aria-label="Permalink to &quot;人员表&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span></code></pre></div><h4 id="人员信息" tabindex="-1">人员信息 <a class="header-anchor" href="#人员信息" aria-label="Permalink to &quot;人员信息&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void userSynchronize() {</span></span>
<span class="line"><span>        //1.获取ERP用户信息</span></span>
<span class="line"><span>        ErpUser erpUser = new ErpUser();</span></span>
<span class="line"><span>        List&lt;ErpUser&gt; erpUserList = erpSysUserMapper.getErpSysUserInfo(erpUser);</span></span>
<span class="line"><span>        //统一默认密码为&quot;ENFIpwd0&quot;（在assembler中设置，状态卡死，故拿出）</span></span>
<span class="line"><span>        String password = SecurityUtils.encryptPassword(&quot;ENFIpwd0&quot;);</span></span>
<span class="line"><span>        erpUserList.forEach(user-&gt; user.setPassword(password));</span></span>
<span class="line"><span>        //2.将ERP人员信息转为若依人员信息</span></span>
<span class="line"><span>        List&lt;SysUser&gt; sysUserList = erpUserList.stream().map(this::coverErpToRy).collect(Collectors.toList());</span></span>
<span class="line"><span>        //3.将状态设置为无效</span></span>
<span class="line"><span>        erpSysUserMapper.setDisable();</span></span>
<span class="line"><span>        //4.批量更新人员信息</span></span>
<span class="line"><span>        erpSysUserMapper.saveBatch(sysUserList);</span></span>
<span class="line"><span>        //5.更新redis中的缓存数据</span></span>
<span class="line"><span>        //this.resetUserCache();</span></span>
<span class="line"><span>    }</span></span></code></pre></div>`,10)]))}const T=a(l,[["render",i]]);export{u as __pageData,T as default};
