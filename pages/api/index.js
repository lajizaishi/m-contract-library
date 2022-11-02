
import http from '../../utils/axios'
// 获取导航栏菜单
export const CATEGORY_NAVBAR = () => http({ url: '/contract/category/navbar', method: 'GET'})
