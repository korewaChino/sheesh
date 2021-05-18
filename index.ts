
//debug loop 
import {checkSite} from './Client/CheckStock'
console.log('Running through index.ts!')
const checkTheStock = async () => {
    await checkSite
    console.debug('timeout!!!')
    await setTimeout(checkTheStock, 2);
    console.debug('timed out!!')
};

checkTheStock();
//insert sone load module code here, put all the working code in /Client btw.