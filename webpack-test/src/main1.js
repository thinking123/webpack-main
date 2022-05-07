import other from './other.js'
import _ from 'lodash'

function main1(){
	other()
	_.keyBy({b:'12'} , 'b')
}

main1()
