const baseurl = '/api/' // In Dev
const host = 'http://rap.xes.mobi:8081/app/mock/20'
const api = {
  // 获取目录
  // getMenuList: baseurl + 'commons/getMenuList.do',
  getMenuList: 'http://rap.xes.mobi:8081/app/mock/20/getMenuList',
  // getCategoryList: baseurl + 'dashboard/getCategoryList.do',
  getCategoryList: 'http://rap.xes.mobi:8081/app/mock/20/getCategoryList',

  /* ############### dashboard ################## */
  // dashboard 页面数据
  // getBoardList: baseurl + 'dashboard/getBoardList.do',
  getBoardList: 'http://rap.xes.mobi:8081/app/mock/20/getBoardList',
  // getBoardData: baseurl + 'dashboard/getBoardData.do',
  getBoardData: 'http://rap.xes.mobi:8081/app/mock/20/getBoardData',

  // widget 的具体数据
  getAggregateData: baseurl + 'dashboard/getAggregateData.do',

  // 获得 param 的数据
  getDimensionValues: baseurl + 'dashboard/getDimensionValues.do',

  /* ############### config ################## */
  /* --- dashboard config --- */
  // getDatasetList: baseurl + 'dashboard/getDatasetList.do',
  getDatasetList: 'http://rap.xes.mobi:8081/app/mock/20/getDatasetList',
  // getWidgetList: baseurl + 'dashboard/getWidgetList.do',
  getWidgetList: 'http://rap.xes.mobi:8081/app/mock/20/getWidgetList',
  // 保存
  updateBoard: baseurl + 'dashboard/updateBoard.do',
  // 保存新增布局
  saveNewBoard: baseurl + 'dashboard/saveNewBoard.do',
  // 删除布局
  deleteBoard: baseurl + 'dashboard/deleteBoard.do',
  // config--add param--弹出框的列表
  getColumns: baseurl + 'dashboard/getColumns.do',

  /* ---dashboard category config--- */
  // 新增 dashboard category
  saveNewCategory: baseurl + 'dashboard/saveNewCategory.do',
  // 删除 dashboard category
  deleteCategory: baseurl + 'dashboard/deleteCategory.do',
  // 修改 dashboard category
  // updateCategory: baseurl + 'dashboard/updateCategory.do',
  updateCategory: 'http://rap.xes.mobi:8081/app/mock/20/updateCategory',

  /* ----widget config---- */
  saveNewWidget: baseurl + 'dashboard/saveNewWidget.do',
  updateWidget: baseurl + 'dashboard/updateWidget.do',
  deleteWidget: baseurl + 'dashboard/deleteWidget.do',

  /* ---Dataset 数据集管理--- */
  getDatasourceList: baseurl + 'dashboard/getDatasourceList.do',
  getDatasetCategoryList: baseurl + 'dashboard/getDatasetCategoryList.do',
  updateDataset: baseurl + 'dashboard/updateDataset.do',
  addDataset: baseurl + 'dashboard/saveNewDataset.do',
  deleteDataset: baseurl + 'dashboard/deleteDataset.do',

  /* ---Dataset 数据源管理--- */
  updateDatasource: baseurl + 'dashboard/updateDatasource.do',
  getProviderList: baseurl + 'dashboard/getProviderList.do',
  addDatasource: baseurl + 'dashboard/saveNewDatasource.do',
  deleteDatasource: baseurl + 'dashboard/deleteDatasource.do',
  test: baseurl + 'dashboard/test.do',
  // get : dashboard/getDatasourceParams.do?type=jdbc

  // 用户管理
  getUserList: 'http://rap.xes.mobi:8081/app/mock/20/getUserList',
  getRoleList: 'http://rap.xes.mobi:8081/app/mock/20/getRoleList2',

  // 定时任务
  getJobList: `${host}/getJobList`,
  saveJob: `${host}/saveJob`,
  updateJob: `${host}/updateJob`,
  deleteJob: `${host}/deleteJob`,
  // 资源分配
  getWidgetListUser: `${host}/getWidgetListUser`,
  getDatasetListUser: `${host}/getDatasetListUser`
}

export default api
