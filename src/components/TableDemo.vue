<template>
  <a-table
    class="table-content"
    :columns="columns"
    :row-key="record => record.login.uuid"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="id" slot-scope="id">
      <span class="table-content-span-ellipsis" :title="id.value">
        {{ id.value }}
      </span>
    </template>
    <template slot="name" slot-scope="name">
      <span class="table-content-span-ellipsis" :title="name.first+name.last">
        {{ name.first }}{{name.last}}
      </span>
    </template>
    <template slot="phone" slot-scope="phone">
      <span class="table-content-span-ellipsis" :title="phone">
        {{ phone }}
      </span>
    </template>
    <template slot="location" slot-scope="location">
      <span class="table-content-span-ellipsis" :title="location.country+location.city+location.state+location.street.name+location.street.number">
        {{ location.country }}{{ location.city }}{{ location.state }}{{ location.street.name }}{{ location.street.number }}
      </span>
    </template>
    <template slot="email" slot-scope="email">
      <span class="table-content-span-ellipsis" :title="email">
        {{ email }}
      </span>
    </template>
    <template slot="operation" slot-scope="text, record">
      <a href="javascript:;">查看</a>
      <a-popconfirm
        v-if="data.length"
        title="Sure to delete?"
        @confirm="() => onDelete(record.id.value)"
      >
        <a href="javascript:;">删除</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
  import reqwest from 'reqwest';
  const columns = [
    {
      title: '编码',
      dataIndex: 'id',
      sorter: true,
      width: '10%',
      minWidth: '150px',
      scopedSlots: { customRender: 'id' },
    },
    {
      title: '客户名',
      dataIndex: 'name',
      sorter: true,
      width: '15%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: '客户助记符',
      dataIndex: 'nat',
      sorter: true,
      width: '15%',
    },
    {
      title: '手机',
      dataIndex: 'phone',
      sorter: true,
      width: '10%',
      scopedSlots: { customRender: 'phone' },
    },
    {
      title: '详细地址',
      dataIndex: 'location',
      width: '20%',
      scopedSlots: { customRender: 'location' },
    },
    {
      title: '域名',
      dataIndex: 'email',
      width: '20%',
      scopedSlots: { customRender: 'email' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '15%',
      scopedSlots: { customRender: 'operation' },
    },
  ];

  export default {
    name: 'TableDemo',
    data() {
      return {
        data: [],
        pagination: {},
        loading: false,
        columns,
      };
    },
    mounted() {
      this.fetch();
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
      fetch(params = {}) {
        console.log('params:', params);
        this.loading = true;
        reqwest({
          url: 'https://randomuser.me/api',
          method: 'get',
          data: {
            results: 10,
            ...params,
          },
          type: 'json',
        }).then(data => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.data = data.results;
          this.pagination = pagination;
        });
      },
      onDelete(key) {
        const data = [...this.data];
        this.data = data.filter(item => item.id.value !== key);
      },
    },
  };
</script>

<style scoped>
  .table-content{
    height: calc(100vh - 300px);
    overflow: auto;
    min-width: 1104px;
  }
</style>
