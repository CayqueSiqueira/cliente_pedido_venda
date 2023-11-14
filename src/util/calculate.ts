export function valTot(amount: any, unitary_value: any) {
    let valortotal = 0
    valortotal = amount * unitary_value
    return valortotal
}

export function valTotImp(amount: any, unitary_value: any) {
    let valortotal = 0
    valortotal = amount * unitary_value
    let valimp = 0
    valimp = valortotal + valortotal * 0.10
    return valimp
}