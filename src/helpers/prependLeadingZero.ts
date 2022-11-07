export const prependLeadingZero = (num: number) => {

    const formattedNumber = num?.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    return formattedNumber == "NaN" ? '00' : formattedNumber
}