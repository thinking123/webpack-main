// import x from 'x'
import b from "./index.module.less";
// import "./d.js"
import svg from "./svg/icon.svg";

// __webpack_public_path__ = "/sdfsdf"
// console.log('__webpack_public_path__',__webpack_public_path__,x)

console.log(b, svg);
// __system_context__
// import('./b.js').then(bs=>{

// 	console.log('bs',bs)
// })
// import('./c.js')

/*

curl   -X POST  -H "Content-Type: application/json" -H "authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJodHRwOi8vMC4wLjAuMDoxMDAxMC9sb2dpbiIsInBhc3N3b3JkIjoiZDFmYzk2MzMzMWM2Y2M5MzcxODRkMWU3ZWFiNTVkNmQyNWE2M2JmZjMzM2VlZjcyNjdmODlhOWEzZGRhY2JhODBiZDJmOThkOGU3ZmE5Y2NmMDVlYzM5M2QyZTMwMzY4YzQzYjdiOTYzOWFhOTAxNzJlOGMzNDYzY2YwNjE4MTYiLCJpc3MiOiJodHRwOi8vMC4wLjAuMDoxMDAxMC8iLCJleHAiOjE2NjczNzMwNTIsImp0aSI6IjExNzNiNzVjYWZmNDQyNWVhMTNmMDI4ZWMyZTdiZWE1IiwidXNlcm5hbWUiOiJhZG1pbiJ9.7SPyrnZ2LgO4rXaImlbwDLfGtm1aqNqV35EJzvUZf3g" -d "{ip:'172.24.190.205'}" http://172.24.246.193:10010/actions/get-mysql-status
*/

const json = {
	success: true,
	data: {
		ip: "172.24.190.205",
		ha: true,
		ips: ["172.24.190.205"],
		mysqlStatus: "Running",
		binlogFile: "mysql-bin.000015\n",
		binlogFileTime: "2022-11-02 13:15",
		binlogFileSize: "187916175",
		dbSyncState: true,
		zsha2MnStatusPass: true,
		mnStatusList: {
			"172.24.190.205": {
				ownsVip: true,
				peerReachable: true,
				gwReachable: true,
				vipReachable: true,
				dbStatus: "active",
				mnStatus: "running",
				timeToSyncDB: 0,
				slaveIoRunning: true,
				slaveSqlRuning: true
			}
		}
	}
};
