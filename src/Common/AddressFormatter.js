export default function AddressFormatter(address) {
    if (address === undefined || address == null || address === '') return '';
    const addressParts = address.toString().split(', ');
    if (addressParts.length < 2) return '';
    return `${addressParts[1].toString().split(' ').at(1)}, ${addressParts[0]}`;
}
