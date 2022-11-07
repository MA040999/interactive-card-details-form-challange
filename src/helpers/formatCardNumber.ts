export const formatCardNumber = (cardNumber: string | undefined) => {

    return cardNumber?.replaceAll(" ", "")
        .padEnd(16, "0")
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
}