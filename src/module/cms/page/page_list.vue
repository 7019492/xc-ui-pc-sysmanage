<template>
  <div>
    <!-- 编写页面静态部分，即view部分 -->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      <el-input v-model="params.pageAliase" style="width: 100px" placeholder="页面别名"></el-input>
      <el-button type="primary" size="small" @click="query">查询</el-button>
      <router-link :to="{path:'/cms/page/add',query:{
      page:this.params.page,
      siteId:this.params.siteId
      }}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="page">
          <el-button
            @click="edit(page.row.pageId)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click="del(page.row.pageId)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="changePage"
      :current-page="params.page"
      :page-sizes="page_sizes"
      :page-size="params.size"
      layout="total, sizes, prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
      style="float: right">
    </el-pagination>
  </div>
</template>
<script>
  /**
   * 编写页面静态部分，即model及vm部分
   */
  import * as cmsApi from '../api/cms';

  export default {
    data() {
      return {
        siteList: [],
        list: [],
        total: 0,
        page_sizes: [10, 20, 30, 40],
        params: {
          page: 1,
          size: 10,
          siteId: '',
          pageAliase: ''
        }
      }
    },
    methods: {
      query: function () {
        // alert("查询")
        // 调用服务端接口
        cmsApi.page_list(this.params.page, this.params.size, this.params).then(res => {
          // 将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      changePage: function (page) {
        this.params.page = page;
        this.query()
      },
      sizeChange: function (size) {
        this.params.size = size;
        this.query()
      },
      edit: function (pageId) {
        // 打开编辑页面
        this.$router.push({
          path: '/cms/page/edit/' + pageId,
        })
      },
      del: function (pageId) {
        // 删除页面
        cmsApi.page_del(pageId).then(res => {
          this.$confirm('您确认删除吗?', '提示', {}).then(() => {
            if (res.success) {
              this.$message.success("删除成功.");
              this.query()
            } else {
              this.$message.error("删除失败.")
            }
          });

        })
      }
    },
    created() {
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
    },
    mounted() {
      this.query();
      this.siteList = [{siteName: '门户主站', siteId: '5a751fab6abb5044e0d19ea1'},
        {siteName: '测试站', siteId: '102'}];
    }
  }
</script>

<style>
  /**
  编写页面样式，不是必须的
   */
</style>
