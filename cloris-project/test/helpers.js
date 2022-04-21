export const zeroAddress = '0x0000000000000000000000000000000000000000'

export const EVM_REVERT = 'VM exception while processing transaction'

export const ether = (n) => {
    return new web3.utils.BN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}

// same as ether
export const tokens = (n) => ether(n)

// convert time into unixTimeStamp
export const unixTime = (nTime) => {

    const [ mDaysYears, hMinSec ]  = nTime.split(" ");
    const [ month, day, year ] = mDaysYears.split("/");
    const [ hours, minutes, seconds ] = hMinSec.split(":");

    const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
    
    const unixTimeV = Math.floor(date.getTime() / 1000);

    return unixTimeV;

} 

export const seconds = (timeSeconds) => {
    return timeSeconds * 1000;
}

export const wait = (waitTime) => {
    return new Promise(resolve => setTimeout(resolve, waitTime));
}

export const delay = (fn, time) => {
    return setTimeout(fn, time);
}


