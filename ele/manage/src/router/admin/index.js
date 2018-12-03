import addAdmin from '@/components/admin/addAdmin'
import adminLog from '@/components/admin/adminLog'
import updatepwd from '@/components/admin/updatepwd'

export default [
    {
        path: '/adminLog',
        name: 'adminLog',
        component: adminLog,
        alias : '/'
    },{
        path : '/addAdmin',
        name:'addAdmin',
        component : addAdmin
    },{
        path : '/updatePwd',
        name : 'updatepwd',
        component : updatepwd
    }
]
