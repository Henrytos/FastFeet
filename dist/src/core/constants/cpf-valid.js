"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPFS = exports.CPF_VALID = void 0;
exports.getRandomCpfValid = getRandomCpfValid;
function generateCPF() {
    function calculateDigit(base) {
        let sum = 0;
        for (let i = 0; i < base.length; i++) {
            sum += base[i] * (base.length + 1 - i);
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }
    const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    const digit1 = calculateDigit(base);
    const digit2 = calculateDigit([...base, digit1]);
    return [...base, digit1, digit2].join('');
}
function getRandomCpfValid() {
    const CPFS = Array.from({ length: 50 }, generateCPF);
    const randomIndex = Number(Math.floor(Math.random() * CPFS.length));
    return CPFS[randomIndex];
}
exports.CPF_VALID = getRandomCpfValid();
exports.CPFS = Array.from({ length: 50 }, generateCPF);
//# sourceMappingURL=cpf-valid.js.map