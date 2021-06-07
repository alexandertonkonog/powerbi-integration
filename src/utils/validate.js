export const isLength = (min, max) => (value) => {
    if (!value) return 'Это поле обязательно';
    if (value.length > max) return `Длина поля должна быть не больше ${max} знаков`;
    if (value.length < min) return `Длина поля должна быть не меньше ${min} знаков`;
    return undefined;
}