<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="电话号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="phone_number" label="手机号码" width="160" fixed sortable>
            </el-table-column>
            <el-table-column prop="id" label="id" width="60">
            </el-table-column>
            <el-table-column prop="used" label="用量" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="off_and_on" label="开关机" width="120" sortable>
                <template scope="scope">
                    <el-tag
                            :type="scope.row.off_and_on === '开机' ? 'primary' : 'danger'"
                            close-transition>{{scope.row.off_and_on}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="gprs_status" label="gprs状态" width="120" sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="120" sortable>
                <template scope="scope">
                    <el-tag
                            :type="scope.row.status === '正常' ? 'primary' : 'danger'"
                            close-transition>{{scope.row.status}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="ip" label="ip" width="150" sortable>
            </el-table-column>
            <el-table-column prop="apn" label="接入类型" width="120" sortable>
            </el-table-column>
            <el-table-column prop="rat" label="网络类型" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" min-width="180" sortable>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="refresh(scope.$index, scope.row)">刷新</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="limit"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {getSimList,refreshSim} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                list: [],
                total: 0,
                limit: 15,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                }

            }
        },
        methods: {
            //性别显示转换
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    limit: this.limit,
                    start: this.page * this.limit - this.limit,
                    phone_number: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getSimList(para).then((res) => {
                    this.total = res.data.count;
                    this.list = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            refresh(index, row) {
                let id = row.id;
                refreshSim(id).then((res) => {
                    this.$set(this.list, index, res.data);

                    this.$notify({
                        message: row.phone_number +'刷新成功',
                        type: 'success'
                    });
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            }
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped>

</style>